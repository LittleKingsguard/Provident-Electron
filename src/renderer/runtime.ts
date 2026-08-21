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
  emitElements,
  applyOps,
  diffMinimal,
  type RenderOp,
  type LegacyInitialData,
} from 'provident-ssr'
import type { Node } from 'provident-ssr/core/node.js'
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
  private readonly supervisor: Supervisor
  private readonly adapter: DomAdapter
  private readonly ssr = new SSRFragmentAdapter()
  private readonly mount: HTMLElement
  private readonly rootNode: Node
  private readonly nodes: Node[]
  private readonly prevStates = new Map<string, CompiledState[]>()
  private prevMap: Map<string, unknown> | null = null
  private bootstrapped = false

  constructor(opts: RuntimeOptions) {
    this.mount = opts.mount
    const translated = translateLegacy(opts.envelope)
    this.rootNode = translated.root
    this.nodes = translated.nodes
    this.supervisor = new Supervisor({ events: new EventBridge() })
    for (const n of translated.nodes) this.supervisor.registerNode(n)
    this.adapter = new DomAdapter(opts.mount, { onEvent: this.handleDomEvent })
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
      const cr = this.rootNode.compile(this.nodes)
      this.setStates(cr.actionable)
      this.supervisor.recordResolved(cr.actionable as never)
      this.bootstrapped = true
    } else {
      this.mergePass2()
    }
    const actionable: CompiledState[] = []
    for (const states of this.prevStates.values()) actionable.push(...states)
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]))
    // Opt-in data-node-id (REQ-GAP-3/A2): every emitted element carries its
    // engine nodeId so an MCP agent reading the rendered HTML can trace each
    // element back to its producing graph node.
    const els = emitElements(actionable as never, byNode as never, { nodeIdAttribute: true })
    const ops = diffMinimal(this.prevMap as never, els as never)
    this.adapter.beginBatch()
    applyOps(this.adapter, ops as never)
    this.adapter.endBatch()
    // The op stream is adapter-neutral: apply the SAME ops to the SSR adapter
    // so the build-time fragment stays in parity with the live DOM (PAR-5).
    applyOps(this.ssr, ops as never)
    this.prevMap = new Map(els.map((e) => [(e as { wire: string }).wire, e]))
    return { els, ops }
  }

  private mergePass2(): void {
    const pass2 = this.supervisor.takePass2States()
    for (const [id, arr] of pass2) {
      if (!this.supervisor.getNode(id)?.isInTree) continue
      this.prevStates.set(id, arr)
    }
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
      return n ? n.id : null
    }
    if (target.kind === 'cssId') {
      const n = this.nodeByCssId(target.cssId)
      return n ? n.id : null
    }
    return null
  }

  private resolveString(s: string): string | null {
    if (this.supervisor.getNode(s)) return s
    const byCss = this.nodeByCssId(s)
    if (byCss) return byCss.id
    const byProps = this.nodeByPropsId(s)
    if (byProps) return byProps.id
    return null
  }

  private nodeByCssId(cssId: string): Node | undefined {
    return this.supervisor
      .allNodes()
      .find((n) => !n.destroyed && (n.css as { id?: string })?.id === cssId)
  }

  private nodeByPropsId(id: string): Node | undefined {
    return this.supervisor
      .allNodes()
      .find((n) => !n.destroyed && (n.props as { id?: string })?.id === id)
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
      if (n.destroyed) continue
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
