// src/renderer/runtime.ts — the provident-ssr producing process that lives in
// the Electron renderer. It keeps the live Supervisor graph + the DOM render,
// and exposes the MCP-facing operations (synthetic dispatch, rendered-HTML
// visibility, target listing, node state) as plain methods.
//
// This is the P1 producing-process-keeps-graph pattern from the Phase B
// synthetic-event contract (docs/specs/ssr-synthetic-event.md §2.1) — the
// graph co-exists with the emitted HTML, and the host can dispatch AFTER
// rendering.
import {
  translateLegacy,
  Supervisor,
  EventBridge,
  DomAdapter,
  SSRFragmentAdapter,
  renderProducingProcess,
  focusedSliceFor,
  reverseTranslate,
  serializeSlice,
  loadState,
  createLinkHub,
  reconcileParentTargets,
  dropPayload,
  Node,
  type RenderOp,
  type LegacyInitialData,
  type RenderOptions,
  type SerializedRenderDoc,
  type Payload,
} from 'provident-ssr'
import type { CompiledState } from 'provident-ssr/core/types.js'
import type {
  DispatchRequest,
  DispatchResult,
  RenderedHtmlResult,
  ListTargetsResult,
  NodeStateResult,
  NodeInfo,
  Census,
  DispatchTarget,
} from '../shared/types.js'

export interface RuntimeOptions {
  mount: HTMLElement
  envelope: LegacyInitialData
}

export class Runtime {
  private supervisor: Supervisor
  private readonly adapter: DomAdapter
  private readonly ssr = new SSRFragmentAdapter()
  private readonly mount: HTMLElement
  private rootNode: Node
  private nodes: Node[]
  private readonly prevStates = new Map<string, CompiledState[]>()
  private domPrevMap: Map<string, unknown> | null = null
  private ssrPrevMap: Map<string, unknown> | null = null
  private bootstrapped = false
  /** The opt-in data-node-id (REQ-GAP-3/A2 + REQ-GAP-8): every emitted element
   *  carries its engine nodeId in BOTH views so an MCP agent reading the
   *  rendered HTML can trace each element back to its producing graph node. */
  private readonly renderOptions: RenderOptions = { nodeIdAttribute: true }
  /** A5 — the authored-id index, rebuilt on every load/teardown: css.id →
   *  nodeId and props.id → nodeId. A destroyed node's id is NEVER in the
   *  index (the tombstone-shadow hazard is avoided) — resolution checks the
   *  index first, then falls back to `getNode` (nodeId/wire). */
  private cssIndex = new Map<string, string>()
  private propsIndex = new Map<string, string>()
  /** The content payloads (roots + payload metadata/userData) of the current
   *  graph — built at load, consumed by teardown's dropPayload + userData
   *  clear, so a teardown returns to a root-only graph. */
  private payloads: Payload[] = []

  constructor(opts: RuntimeOptions) {
    this.mount = opts.mount
    const translated = translateLegacy(opts.envelope)
    this.rootNode = translated.root
    this.nodes = translated.nodes
    this.supervisor = new Supervisor({ events: new EventBridge() })
    for (const n of translated.nodes) this.supervisor.registerNode(n)
    this.adapter = new DomAdapter(opts.mount, { onEvent: this.handleDomEvent })
    this.payloads = this.buildPayloads(translated.content, opts.envelope.content)
    this.rebuildIdIndex()
  }

  /** Wire real DOM events (browser interaction) to the same graph dispatch
   *  the MCP synthetic path uses, then re-render. Phase A dispatch is a
   *  trigger; the public `flush()` settles the cascade (the 0.1.1 shared
   *  surface — no hand-rolled tick loop), then we drain + re-emit. */
  private handleDomEvent = (wire: string, domEvent: Event): void => {
    const node = this.supervisor.getNode(wire)
    if (!node) return
    const eventName = domEvent?.type ?? String(domEvent ?? '')
    const extra = domEvent?.target && 'value' in domEvent.target
      ? [String((domEvent.target as HTMLInputElement).value)]
      : []
    this.supervisor.dispatchEvent(node.id, eventName, ...extra)
    void this.supervisor.flush().then(() => {
      this.mergePass2()
      this.render()
    })
  }

  private setStates(actionable: CompiledState[]): void {
    const byNode = new Map<string, CompiledState[]>()
    for (const s of actionable) {
      const id = (s as unknown as { nodeId: string }).nodeId
      const arr = byNode.get(id) ?? []
      arr.push(s)
      byNode.set(id, arr)
    }
    for (const [id, arr] of byNode) {
      if (!this.supervisor.getNode(id)?.isInTree) continue
      this.prevStates.set(id, arr)
    }
  }

  private render(): { els: unknown[]; ops: RenderOp[] } {
    if (!this.bootstrapped) {
      // Placement-routed (a node with a content-role anchor) → the
      // path-enumeration pass (compilePath per node); else the default
      // root compile. (runtime-host.md §3.1 R-new — the adversarial fix.)
      if (this.isPlacementRouted()) {
        const actionable: CompiledState[] = []
        for (const n of this.nodes) actionable.push(...(n.compilePath().actionable as CompiledState[]))
        this.setStates(actionable)
        this.supervisor.recordResolved(actionable as never)
      } else {
        const cr = this.rootNode.compile(this.nodes)
        this.setStates(cr.actionable)
        this.supervisor.recordResolved(cr.actionable as never)
      }
      this.bootstrapped = true
    } else {
      this.mergePass2()
    }
    const actionable: CompiledState[] = []
    for (const states of this.prevStates.values()) actionable.push(...states)
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]))
    // The canonical re-emit loop (REQ-GAP-5/8, 0.1.2): the exported
    // renderProducingProcess with the opt-in nodeIdAttribute threaded through.
    // The caller owns each per-tree prevMap (null on first render); the loop
    // prunes destroyed/not-in-tree nodes and never drains takePass2States.
    this.adapter.beginBatch()
    const dom = renderProducingProcess(actionable as never, byNode as never, this.adapter, this.domPrevMap as never, this.renderOptions)
    this.adapter.endBatch()
    this.domPrevMap = dom.prevMap as unknown as Map<string, unknown>
    // Same actionable + options → identical els; the SSR adapter mirrors the
    // same element set (PAR-5 parity) through its own prevMap.
    const ssr = renderProducingProcess(actionable as never, byNode as never, this.ssr, this.ssrPrevMap as never, this.renderOptions)
    this.ssrPrevMap = ssr.prevMap as unknown as Map<string, unknown>
    return { els: dom.els, ops: dom.ops }
  }

  private mergePass2(): void {
    const pass2 = this.supervisor.takePass2States()
    for (const [id, arr] of pass2) {
      if (!this.supervisor.getNode(id)?.isInTree) continue
      this.prevStates.set(id, arr)
    }
  }

  /** True when any node carries a content-role anchor (placement-routed) —
   *  such a tree must bootstrap via the path-enumeration `compilePath` pass,
   *  not the default `rootNode.compile` (runtime-host.md §3.1 R-new). */
  private isPlacementRouted(): boolean {
    return this.nodes.some((n) => n.anchors.some((a) => a.role === 'content'))
  }

  /** Bootstrap render — called once after the mount is available. */
  bootstrap(): void {
    this.render()
  }

  // ---- target resolution -------------------------------------------------

  private resolveTarget(target: DispatchTarget | string): string | null {
    if (typeof target === 'string') {
      // A plain string: try nodeId, then css.id, then props.id.
      return this.resolveString(target)
    }
    if (target.kind === 'nodeId' || target.kind === 'wire') {
      const ref = target.kind === 'nodeId' ? target.nodeId : target.wire
      const n = this.supervisor.getNode(ref)
      return n && !n.destroyed && n.isInTree ? n.id : null
    }
    if (target.kind === 'cssId') {
      const n = this.nodeByCssId(target.cssId)
      return n ? n.id : null
    }
    return null
  }

  // ---- id-index (A5) ------------------------------------------------------

  private rebuildIdIndex(): void {
    this.cssIndex = new Map()
    this.propsIndex = new Map()
    for (const n of this.supervisor.allNodes()) {
      // A5/adversarial: only IN-TREE, not-destroyed nodes are addressable — a
      // destroyed/unplaced ghost must never resolve via the index (a torn-down
      // node id must NOT be targetable).
      if (n.destroyed || !n.isInTree) continue
      const cssId = (n.css as { id?: string })?.id
      if (cssId !== undefined) this.cssIndex.set(cssId, n.id)
      const propsId = (n.props as { id?: string })?.id
      if (propsId !== undefined) this.propsIndex.set(propsId, n.id)
    }
  }

  /** Wrap the per-node content roots (TranslatedTree.content or loadState's
   *  content nodes) into a Payload-like handle the teardown path can drop,
   *  carrying the translate-scoped userData for the legacy clear (R8). */
  private buildPayloads(contentNodes: Node[], userData?: unknown): Payload[] {
    return [{ id: 'p0', roots: [...contentNodes], userData }]
  }

  private resolveString(s: string): string | null {
    const direct = this.supervisor.getNode(s)
    if (direct && !direct.destroyed && direct.isInTree) return s
    const byCss = this.cssIndex.get(s) ?? this.nodeByCssId(s)?.id
    if (byCss) return byCss
    const byProps = this.propsIndex.get(s) ?? this.nodeByPropsId(s)?.id
    if (byProps) return byProps
    return null
  }

  private nodeByCssId(cssId: string): Node | undefined {
    const fromIndex = this.cssIndex.get(cssId)
    if (fromIndex !== undefined) {
      const n = this.supervisor.getNode(fromIndex)
      if (n && !n.destroyed && n.isInTree) return n
    }
    return this.supervisor
      .allNodes()
      .find((n) => !n.destroyed && n.isInTree && (n.css as { id?: string })?.id === cssId)
  }

  private nodeByPropsId(id: string): Node | undefined {
    const fromIndex = this.propsIndex.get(id)
    if (fromIndex !== undefined) {
      const n = this.supervisor.getNode(fromIndex)
      if (n && !n.destroyed && n.isInTree) return n
    }
    return this.supervisor
      .allNodes()
      .find((n) => !n.destroyed && n.isInTree && (n.props as { id?: string })?.id === id)
  }

  // ---- host capabilities (runtime-host.md §2/§3) --------------------------

  /** A2 — replace the current graph from a legacy envelope. Tears down the
   *  existing content, sets/clears the translate-scoped userData (R8), then
   *  translate → register → compile → recordResolved → render. */
  loadEnvelope(envelope: LegacyInitialData, opts?: { userData?: unknown }): Census {
    this.tearDownGraph()
    const env = structuredClone(envelope)
    if (opts?.userData !== undefined) {
      // R8 — inject the userData into the envelope's FIRST content payload so
      // translate captures it into the legacy bridge's supervisor.userData.
      if (!Array.isArray(env.content)) env.content = []
      if (env.content.length === 0) env.content.push({ content: [] })
      env.content[0].userData = opts.userData
    }
    const translated = translateLegacy(env)
    this.rootNode = translated.root
    this.nodes = translated.nodes
    this.supervisor = new Supervisor({ events: new EventBridge() })
    for (const n of translated.nodes) this.supervisor.registerNode(n)
    this.payloads = this.buildPayloads(translated.content, translated.userData)
    this.rebuildIdIndex()
    this.bootstrapped = false
    this.render()
    return this.census()
  }

  /** A1 — snapshot/restore load: loadState → seeds → Node(d, hub) (template
   *  root first, content after) → reconcileParentTargets → register per node →
   *  compile → recordResolved → render. */
  loadDoc(doc: SerializedRenderDoc): Census {
    this.tearDownGraph()
    const seeds = loadState(doc)
    const hub = createLinkHub()
    const nodes = seeds.map((s) => new Node(s, hub))
    reconcileParentTargets(nodes)
    this.rootNode = nodes[0]
    this.nodes = nodes
    this.supervisor = new Supervisor({ events: new EventBridge() })
    for (const n of nodes) this.supervisor.registerNode(n)
    this.payloads = this.buildPayloads(nodes, undefined)
    this.rebuildIdIndex()
    this.bootstrapped = false
    this.render()
    return this.census()
  }

  /** A3 — a single managed-channel op: resolve the string `node` to a Node,
   *  supervisor.apply → flush() → drain takePass2States once → render. */
  applyCommand(cmd: { kind: string; node?: string; [k: string]: unknown }): { status: string; dirtied?: string[]; minted?: string[] } {
    // If the op names a string `node` that does NOT resolve, reject cleanly
    // (never throw — a raw string must not reach `source.clone()` for the
    // node-less clone-instance op). Adversarial A3 fix.
    if (typeof cmd.node === 'string' && !this.resolveTarget(cmd.node)) {
      return { status: 'rejected' }
    }
    const payload: { kind: string; node?: Node; [k: string]: unknown } = { ...cmd } as never
    if (typeof cmd.node === 'string') {
      const id = this.resolveTarget(cmd.node)
      const n = id ? this.supervisor.getNode(id) : undefined
      if (n) payload.node = n
    }
    const result = this.supervisor.apply(payload)
    const dirty = (result.dirtied ?? []).filter((id) => this.supervisor.getNode(id)?.isInTree)
    for (const id of dirty) {
      const node = this.supervisor.getNode(id)
      if (!node) continue
      const cr = node.compile(this.focusedSlice(node), { focusNodeId: node.id })
      const grouped = new Map<string, CompiledState[]>()
      for (const s of cr.actionable) {
        const arr = grouped.get(s.nodeId) ?? []
        arr.push(s)
        grouped.set(s.nodeId, arr)
      }
      for (const [gid, arr] of grouped) {
        if (this.supervisor.getNode(gid)?.isInTree) this.prevStates.set(gid, arr)
      }
    }
    this.render()
    const out: { status: string; dirtied?: string[]; minted?: string[] } = { status: result.status }
    if (result.dirtied) out.dirtied = result.dirtied as string[]
    if (result.minted) out.minted = result.minted as string[]
    this.rebuildIdIndex()
    return out
  }

  private focusedSlice(node: Node): Node[] {
    return focusedSliceFor(node, () => this.supervisor.allNodes())
  }

  /** The current graph's legacy export — no mutation. */
  exportLegacy(): LegacyInitialData {
    const rev = reverseTranslate(this.rootNode, { content: this.nodes.slice(1) })
    return {
      ...rev,
      content: rev.content ?? [],
      clientConfig: { runInstantiation: true, runRendering: true },
    }
  }

  /** The current graph's serialized export — no mutation. */
  exportSerialized(): SerializedRenderDoc {
    return serializeSlice(this.rootNode, this.nodes, { adapter: 'dom', persistence: false })
  }

  /** Re-load an export into a THROWAWAY graph (a fresh Supervisor + hub; never
   *  the live one) and compare census. Never throws on a malformed export. */
  validateExport(kind: 'legacy' | 'serialized', exp: unknown): { valid: boolean; censusMatch: boolean; warnings: unknown[] } {
    try {
      let nodes: Node[]
      let hub = createLinkHub()
      if (kind === 'legacy') {
        const translated = translateLegacy(exp as LegacyInitialData)
        nodes = translated.nodes
      } else {
        const seeds = loadState(exp as SerializedRenderDoc)
        nodes = seeds.map((s) => new Node(s, hub))
        reconcileParentTargets(nodes)
      }
      const throwaway = new Supervisor({ events: new EventBridge() })
      for (const n of nodes) throwaway.registerNode(n)
      const cr = nodes[0].compile(nodes)
      throwaway.recordResolved(cr.actionable)
      const theirs = {
        registered: throwaway.allNodes().length,
        inTree: throwaway.allNodes().filter((n) => !n.destroyed && n.isInTree).length,
        unplaced: throwaway.allNodes().filter((n) => !n.destroyed && n.state === 'unplaced').length,
        destroyed: throwaway.allNodes().filter((n) => n.destroyed).length,
        prototypes: throwaway.allNodes().filter((n) => n.state === 'prototype').length,
      }
      const ours = this.census()
      return { valid: true, censusMatch: theirs.inTree === ours.inTree && theirs.registered === ours.registered, warnings: [] }
    } catch {
      return { valid: false, censusMatch: false, warnings: [] }
    }
  }

  /** C3/C4 — tear down every in-tree child of root (supervisor destroy per
   *  node), drop content payloads, clear userData, then settle-gate (R6), then
   *  re-render. Returns the post-teardown census (inTree === 1). Idempotent. */
  teardown(): Census {
    this.tearDownGraph()
    return this.census()
  }

  // ---- internal teardown helpers -----------------------------------------

  private tearDownGraph(): void {
    // Destroy EVERY in-tree non-root node (family children + content-owned),
    // not just the root's direct children — otherwise they linger as
    // resolvable `unplaced` ghosts (the adversarial A2 fix). Use the destroy
    // op so nodes are truly destroyed (evicted from the registry + the
    // id-index drops them).
    for (const n of this.supervisor.allNodes()) {
      if (n.destroyed || n.id === this.rootNode.id || !n.isInTree) continue
      this.supervisor.apply({ kind: 'destroy', node: n })
    }
    for (const p of this.payloads) dropPayload(p)
    this.payloads = []
    // Re-render from an empty actionable set: the kept prevMaps make
    // diffMinimal emit removal ops for every prior element, emptying the mount
    // to the root-only graph (the root stays in-tree, inTree === 1).
    this.prevStates.clear()
    this.render()
    this.rebuildIdIndex()
  }

  // ---- MCP-facing operations ---------------------------------------------

  async dispatch(req: DispatchRequest): Promise<DispatchResult> {
    const nodeId = this.resolveTarget(req.target)
    if (nodeId === null) {
      throw new Error(`unresolved target: ${JSON.stringify(req.target)}`)
    }
    // The shared 0.1.1 dispatch-report surface (ssr-synthetic-event.md §3):
    // dispatchAndReport resolves + guards identically to dispatchEvent, awaits
    // the public flush() internally, derives `dirtied` (apply().dirtied ∪
    // pass-2 keys), and applies the opt-in bounded requestId dedup (echo
    // semantics — a duplicate returns the FIRST caller's report).
    const report = await this.supervisor.dispatchAndReport(
      nodeId,
      req.event,
      req.requestId !== undefined ? { requestId: req.requestId } : {},
      ...(req.args ?? []),
    )
    // dispatchAndReport consumed the pass-2 drain as the report's caller; the
    // NON-draining resolved store carries the fresh states for the dirtied
    // nodes — refresh the render baseline from it (P4: the graph mutated, the
    // fragment is untouched until the host explicitly re-renders).
    for (const id of report.dirtied) {
      const resolved = this.supervisor.getResolvedStates(id)
      if (resolved.length > 0) this.prevStates.set(id, resolved)
    }
    this.render()
    return {
      results: report.results,
      dirtied: report.dirtied,
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
    }
  }

  renderedHtmlResult(): RenderedHtmlResult {
    return {
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      census: this.census(),
    }
  }

  private renderedHtml(): string {
    return this.mount.innerHTML
  }

  private ssrHtml(): string {
    return this.ssr.toString()
  }

  listTargets(): ListTargetsResult {
    const nodes: NodeInfo[] = []
    for (const n of this.supervisor.allNodes()) {
      // Only in-tree, not-destroyed nodes are ADDRESSABLE — a torn-down
      // unplaced/destroyed node must not appear as a dispatch target (the
      // ghost-tree adversarial fix).
      if (n.destroyed || !n.isInTree) continue
      const cssId = (n.css as { id?: string })?.id
      const propsId = (n.props as { id?: string })?.id
      nodes.push({
        nodeId: n.id,
        ...(cssId !== undefined ? { cssId } : {}),
        ...(propsId !== undefined ? { propsId } : {}),
        type: n.type,
        content: n.content,
        state: n.state,
        inTree: !!n.isInTree,
        handlers: (n.handlers as Array<{ name?: string; event?: string; phase?: string }> | undefined)?.map((h) => ({
          ...(h.name !== undefined ? { name: h.name } : {}),
          ...(h.event !== undefined ? { event: h.event } : {}),
          ...(h.phase !== undefined ? { phase: h.phase } : {}),
        })) ?? [],
      })
    }
    return { nodes }
  }

  nodeState(target: DispatchTarget | string): NodeStateResult {
    const nodeId = this.resolveTarget(target)
    if (nodeId === null) throw new Error(`unresolved target: ${JSON.stringify(target)}`)
    const states = this.supervisor.getResolvedStates(nodeId)
    return { nodeId, states: states as unknown[], census: this.census() }
  }

  private census(): Census {
    const all = this.supervisor.allNodes()
    return {
      registered: all.length,
      inTree: all.filter((n) => !n.destroyed && n.isInTree).length,
      unplaced: all.filter((n) => !n.destroyed && n.state === 'unplaced').length,
      destroyed: all.filter((n) => n.destroyed).length,
      prototypes: all.filter((n) => n.state === 'prototype').length,
    }
  }
}
