// src/renderer/secure-panels.ts — the operator-only Security Settings + Debug
// panes, rendered as provident data in a SECOND, ISOLATED graph (multi-graph
// isolation adoption, 2026-08-25).
//
// The shell's project-wide constraint: every non-shell UI element must be
// rendered with the provident framework. The Security Settings pane is
// manual-UI-only (mcp-endpoint.md §6.4) — an agent must never be able to grant
// itself capabilities. So this pane lives in its OWN provident graph (a
// `createIsolatedScope()` GraphScope + own hub + own Supervisor + own
// DomAdapter → its own root element), ISOLATED from the agent-visible app
// graph: the app Runtime's `dispatch`/`get_rendered_html`/`list_targets`
// never see it (no cross-graph addressability — multi-graph-isolation-spec.md).
//
// Pane handlers call the IPC bridge (`window.provident.security.get/set`),
// NEVER an MCP tool — the security channel is main→renderer→main only. An
// agent cannot reach these handlers (they are in the isolated graph, not the
// app graph the MCP endpoints read).
import {
  translateLegacy,
  Supervisor,
  EventBridge,
  DomAdapter,
  renderProducingProcess,
  createLinkHub,
  type RenderOptions,
  type LegacyInitialData,
} from 'provident-ssr'
import { createIsolatedScope, type GraphScope } from 'provident-ssr/core/registry.js'
import type { SecuritySettings, RpcRequest, RpcReply } from '../shared/types.js'
// G3 §1.3 item 4 — the NEW `SecurityWriteReceipt` type lives in
// `src/main/security-store.ts` and reaches the pane's bridge DECLARATION by
// IMPORT (type-only — erased at build; no runtime coupling to the main side).
// `tier4-arbitrary-storage.md` `§2.4` item 8 adds the tier-4 refusal's own type
// (`Tier4ClosedRefusal`) and the store's answer superset (`Tier4WriteAnswer`) to
// the SAME import: the two declaration sites widen in LOCKSTEP with `preload.ts`
// and `SecuritySettings` itself is untouched (§1.3 item 5).
import type { SecurityWriteReceipt, Tier4ClosedRefusal, Tier4WriteAnswer } from '../main/security-store.js'
// PAR-13 — the two closed state tokens, imported TYPE-ONLY from the gate module that owns them
// (the `SecurityWriteReceipt` precedent above: erased at build, no runtime coupling to main).
import type { ExclusionState as EXCLUSION_STATE } from '../main/security.js'

declare global {
  interface Window {
    provident?: {
      ready(): void
      onRequest(handler: (req: RpcRequest) => void): void
      sendReply(reply: RpcReply): void
      notify(payload: { uri: string }): void
      security?: {
        // PAR-13 / §1.5 item 5 — this re-declaration MUST widen in LOCKSTEP with
        // `preload.ts` or the pane cannot read the member: both sites declare the
        // SAME `SecuritySettings & { exclusion }` superset (a half-widening FAILS), and
        // `tier4-arbitrary-storage.md` `§2.4` item 8 adds the ONE further additive member
        // `read` at BOTH sites together (the pane's refusal segment is sourced from it).
        get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE; read: Tier4ClosedRefusal | null }>
        // G3 §2.3 item 2 — the pane's declared `security.set` follows the same
        // superset as the preload's (the receipt's additive `write` member), with the holder's
        // type following the store's own declared answer superset (`Tier4WriteAnswer`).
        set(patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }): Promise<SecuritySettings & { write: Tier4WriteAnswer }>
        // §2.4 item 4 / PAR-10 — the exclusion transition's OWN member. The control's
        // body calls it and NEVER throws; a malformed request answers `applied: false`.
        setExclusion(state: EXCLUSION_STATE): Promise<{ applied: boolean; state: EXCLUSION_STATE; reason?: 'malformed-state' }>
      }
      module?: {
        get(): Promise<{ corrupt: boolean; quarantined: string[]; loaded: string[]; modules: Array<{ name: string; version: string; capabilities?: unknown; disabled?: boolean; quarantined?: boolean }> }>
        setDisabled(name: string, disabled: boolean): Promise<{ corrupt: boolean; quarantined: string[]; loaded: string[]; modules: Array<{ name: string; version: string; capabilities?: unknown; disabled?: boolean; quarantined?: boolean }> }>
      }
    }
  }
}

const GROUPS = ['read', 'dispatch', 'graph', 'code', 'module'] as const
const GROUP_LABELS: Record<string, string> = {
  read: 'read (get_rendered_html, get_markdown, list_targets, get_node_state, code.get, code.validate)',
  dispatch: 'dispatch (synthetic event driving)',
  graph: 'graph (load, op, export, validate, teardown)',
  code: 'code (code.set/create/delete/load — evaluates handler bodies)',
  module: 'module (module.install/update/list + module:<name>.<tool> extensions — trusted-equivalent to code)',
}

/** U-ENGINE-PIN §2.4 (AMENDED — ruling 1 applied to the pane channel) — the
 *  managed channel's OWN call site for the same SHAPE-ONLY predicate as
 *  `Runtime.applyCommand` (`src/renderer/runtime.ts`, which cannot be imported
 *  here: the pane graph is deliberately isolated from the app runtime).
 *  Module-local, NOT exported and NOT on the class — no new public API, no new
 *  seam, and the shipped writes below are untouched (both are defined strings,
 *  so they pass). Returns `false` (⇒ that node's whole batch is SKIPPED, and
 *  its last-known state survives the render) for a NON-ARRAY batch, a
 *  non-object element or a missing/non-string `targetProp` — its ONLY reject
 *  class. It does not inspect `value`: an `undefined`/`null`/absent `value` on
 *  `props.<key>` / `props:<key>` / `css.<key>` / `css:<key>` is a legitimate
 *  attribute REMOVAL in the engine and is APPLIED (the shim completion makes it
 *  safe, §2.2.6). The predicate must differ from §2.3's in nothing but its
 *  container — and that class explicitly INCLUDES the non-array batch
 *  (§2.4b item 3, the `M9` requirement): the guard lives here, in the
 *  predicate, so BOTH call sites carry the same class — the public seam
 *  (outcome (i), `{status:'rejected', applied:false}`) and `syncConfig`'s own
 *  call site (skip-whole). Before it, `for (const m of mutation)` threw
 *  `TypeError: mutation is not iterable` where the contract promises a status.
 *  `Array.isArray` is used rather than any iterator-protocol duck-typing: it
 *  never reads `Symbol.iterator`, so a hostile Proxy cannot throw out of the
 *  seam. */
function paneMutationValid(mutation: unknown[]): boolean {
  if (!Array.isArray(mutation)) return false
  for (const m of mutation) {
    if (m === null || typeof m !== 'object') return false
    const target = (m as { targetProp?: unknown }).targetProp
    if (typeof target !== 'string') return false
  }
  return true
}

function randToken(len = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < len; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

// ---- handler bodies (function-STRING data). They reach the IPC bridge via
// `window.provident.security` — NEVER an MCP API. The SecurePanels host
// re-fetches + re-renders after the change over the main-process store.
const TOKEN_GEN_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  s.set({ token: String(Math.random().toString(36).slice(2, 34)) });
}`
const TOKEN_CLEAR_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  s.set({ token: null });
}`
// One shared toggle body; the group + the "is it currently on?" are read from
// the node's OWN props (`data-group` / `data-on`). Toggling flips the group.
const TOGGLE_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  var group = ctx.node.props && ctx.node.props['data-group'];
  if (!group) return;
  var on = ctx.node.props && ctx.node.props['data-on'] === 'true';
  if (on) s.set({ disable: [group] }); else s.set({ groups: [group] });
}`
// The maxJournalLength input handler: reads the numeric value from the input
// and persists it via the managed channel. Empty/null clears the setting.
const JOURNAL_LENGTH_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  var val = ctx.node && ctx.node.props && ctx.node.props['value'];
  var num = val ? parseInt(val, 10) : NaN;
  if (isNaN(num) || num <= 0) s.set({ maxJournalLength: null });
  else s.set({ maxJournalLength: num });
}`

// §2.4 item 2 / PAR-10 — THE EXCLUSION TOGGLE'S HANDLER BODY, in the SAME function-STRING form
// as its four landed siblings above and with the SAME `!s` early-return guard: the bridge absent
// ⇒ an early return, never a throw. It is STATELESS: the CURRENT state is read from the node's
// OWN props (`data-state`, refreshed by `syncConfig` exactly as the group toggles' `data-on` is),
// so the control is a pure flip and holds no state of its own.
const EXCLUSION_TOGGLE_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  var state = ctx.node.props && ctx.node.props['data-state'];
  if (state !== 'mcp-enabled' && state !== 'mcp-disabled') return;
  if (state === 'mcp-disabled') s.setExclusion('mcp-enabled'); else s.setExclusion('mcp-disabled');
}`

/** The pane-graph envelope: the Security Settings pane + the Debug pane,
 *  authored as provident data. The group toggles are one node per group; their
 *  `data-on`/`data-group` props are refreshed by syncConfig on each refresh. */
function paneEnvelope(): LegacyInitialData {
  const toggles = GROUPS.map((g) => ({
    type: 'label',
    props: { id: `toggle:${g}`, 'data-group': g, 'data-on': 'false' },
    css: { classes: ['group-row'] },
    content: GROUP_LABELS[g],
    handlers: [{ name: `toggle-${g}`, event: 'click', body: TOGGLE_BODY }],
  }))
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'secure-panes' },
        children: [
          // ---- Security Settings pane -----------------------------------
          {
            type: 'section',
            props: { id: 'settings-pane' },
            css: { classes: ['card'] },
            children: [
              { type: 'h2', content: 'Security & agent permissions' },
              { type: 'p', css: { classes: ['hint'] }, content: 'Manual-UI only — never exposed over MCP (an agent cannot grant itself capabilities).' },
              { type: 'div', props: { id: 'security-status' }, content: 'loading…' },
              {
                type: 'div',
                props: { id: 'security-token' },
                children: [
                  { type: 'label', content: 'Loopback token' },
                  {
                    type: 'div',
                    css: { classes: ['token-row'] },
                    children: [
                      { type: 'input', props: { id: 'token-input', placeholder: '(none)', readonly: true } },
                      { type: 'button', props: { id: 'token-clear' }, css: { classes: ['btn'] }, content: 'Clear', handlers: [{ name: 'token-clear', event: 'click', body: TOKEN_CLEAR_BODY }] },
                      { type: 'button', props: { id: 'token-gen' }, css: { classes: ['btn'] }, content: 'Regenerate', handlers: [{ name: 'token-gen', event: 'click', body: TOKEN_GEN_BODY }] },
                    ],
                  },
                ],
              },
              { type: 'div', props: { id: 'group-toggles' }, children: toggles },
              // §2.4 item 2 — THE ONE NEW CONTROL, authored as provident data inside the landed
              // `settings-pane` section in EXACTLY the landed `journal-length` row's shape (the
              // same `group-row` class + `token-row` inner div + `<button>` + handler), so the
              // addition introduces no new class, no new CSS and no new structural pattern. It
              // adds NO pane, no group row, no new pane id namespace and no new DOM.
              {
                type: 'div',
                props: { id: 'exclusion-control' },
                css: { classes: ['group-row'] },
                children: [
                  { type: 'label', content: 'MCP / secure-tier exclusion (mutually exclusive)' },
                  {
                    type: 'div',
                    css: { classes: ['token-row'] },
                    children: [
                      {
                        type: 'button',
                        props: { id: 'exclusion-toggle', 'data-state': 'mcp-enabled' },
                        css: { classes: ['btn'] },
                        content: 'Disable MCP',
                        handlers: [{ name: 'exclusion-toggle', event: 'click', body: EXCLUSION_TOGGLE_BODY }],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'div',
                props: { id: 'journal-length' },
                css: { classes: ['group-row'] },
                children: [
                  { type: 'label', content: 'Max journal entries' },
                  {
                    type: 'div',
                    css: { classes: ['token-row'] },
                    children: [
                      { type: 'input', props: { id: 'journal-length-input', placeholder: '(never condense)', type: 'number', min: '1' } },
                      { type: 'button', props: { id: 'journal-length-apply' }, css: { classes: ['btn'] }, content: 'Apply', handlers: [{ name: 'journal-length-apply', event: 'click', body: JOURNAL_LENGTH_BODY }] },
                    ],
                  },
                ],
              },
            ],
          },
          // ---- Debug / agent-visibility pane -----------------------------
          {
            type: 'section',
            props: { id: 'debug-pane' },
            css: { classes: ['card'] },
            children: [
              { type: 'h2', content: 'Debug / agent visibility' },
              { type: 'div', props: { id: 'status' }, content: 'booting…' },
            ],
          },
          // ---- Module management pane (U8) --------------------------------
          {
            type: 'section',
            props: { id: 'module-pane' },
            css: { classes: ['card'] },
            children: [
              { type: 'h2', content: 'Modules / extensions' },
              { type: 'p', css: { classes: ['hint'] }, content: 'Manual-UI only — installed modules + versions + quarantine status.' },
              { type: 'div', props: { id: 'module-status' }, content: 'loading…' },
              { type: 'div', props: { id: 'module-list' }, content: '' },
            ],
          },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

const PREVIEW_MAX = 120

/** The isolated pane-graph owner. Renders the Security + Debug panes through
 *  its OWN GraphScope (isolated from the app graph), driven by the IPC bridge.
 *  Never an MCP surface — the MCP endpoints read the APP Runtime, which does
 *  not include this graph. */
export class SecurePanels {
  private scope: GraphScope
  private supervisor: Supervisor
  private adapter: DomAdapter
  private readonly mount: HTMLElement
  private root: unknown
  private nodes: unknown[]
  private prevMap: Map<string, unknown> | null = null
  // PAR-13 — the pane's own snapshot holder follows the WIDENED declared return of the
  // manual-UI read (the `SecuritySettings & { exclusion }` superset, `§2.4` item 8's additive
  // `read` included). `SecuritySettings` itself is unmoved; this is the renderer's local reading
  // of the same additive members. `read: null` is the declared INITIAL reading — "the last
  // observed read was performed" (`§2.6` item 3: the refusal segment is rendered IFF `read` is
  // non-null, so an un-refreshed pane fabricates no refusal).
  //
  // ⟶ AMENDED `2026-10-11` (GATE 4's REPAIR CONTRACT, **`D-vi`**; `§3c`'s `S2-ADV-01`, `HIGH`,
  // `HOST-FIX`; `§2.6` item 3's dated note / `§3.2` `FS-T4-13`): **THE PANE FABRICATES NOTHING.**
  // **`cfg.exclusion` IS NULLABLE, and `null` is the declared INITIAL *"no reading yet"* state**
  // — the as-filed field initializer's `exclusion:'mcp-enabled'` is SUPERSEDED IN EFFECT as a
  // PAINT SOURCE (a state member is carried only when the CARRIER supplied one), so a never-
  // answered pane — the first paint, and a bridge rejection — paints NO `· MCP:` word, writes NO
  // `data-state` prop and words NO affordance. `read` counts `undefined` as `null` (a missing
  // member is not a refusal), and a PREVIOUSLY CARRIER-SUPPLIED value is retained across a later
  // bridge error (that is the declared reading of item 3's "absent means the last observed read
  // was performed": no reading was TAKEN this turn, never that the state flipped). BOTH additive
  // members are therefore `null`-OR-`undefined` before the first carrier answer, and NEITHER arm
  // below is painted from that absence.
  private cfg: SecuritySettings & { exclusion?: EXCLUSION_STATE | null; read: Tier4ClosedRefusal | null | undefined } = { token: null, enabled: ['read', 'dispatch'], read: null }
  private debugValue = 'booting…'
  private moduleStatus = 'loading…'
  private moduleListText = ''
  /** G3 §2.5 (gate-4 finding 2, 2026-10-03) — the pane journal's declared cap:
   *  the tier-4 `maxJournalLength` value passed at construction (IDENTITY with
   *  the operator's setting; `undefined` = never condense). The engine receives
   *  it too (`new Supervisor({…, maxJournalLength})` below) so its deferred
   *  condense triggers, but the CAP IS ENFORCED HERE over the raw journal
   *  entries (`applyJournalCap()`) — the engine's own round-trip condense is
   *  defeated on this pane (§2.5 items 1/2/4's measured evidence). */
  private readonly maxJournalLength: number | undefined

  /** Test/visibility accessor — the current Debug pane text (census + SSR
   *  preview). */
  debugText(): string {
    return this.debugValue
  }

  constructor(mount: HTMLElement, opts?: { maxJournalLength?: number }) {
    this.mount = mount
    this.maxJournalLength = opts?.maxJournalLength
    this.scope = createIsolatedScope()
    const hub = createLinkHub()
    const t = translateLegacy(paneEnvelope(), { hub, graphScope: this.scope })
    // RH-3 half (a) (G3 §2.5 items 1/2 — the pane-cap IDENTITY): the pane
    // Supervisor is built WITH `maxJournalLength` — the tier-4 operator's
    // setting, read ONCE at boot and passed in from the SAME snapshot the app
    // Runtime consumed (never re-read after boot; `undefined` = never condense).
    // There is NO independent pane-cap constant — a second knob would be a
    // second journal authority with no owner.
    this.supervisor = new Supervisor({ events: new EventBridge(), graphScope: this.scope, maxJournalLength: opts?.maxJournalLength })
    for (const n of t.nodes as unknown[]) this.supervisor.registerNode(n as never)
    this.adapter = new DomAdapter(mount, { onEvent: this.handleDomEvent })
    this.root = t.root
    this.nodes = t.nodes as unknown[]
  }

  /** THE DECLARED TEST SEAM (G3 §2.5 item 4 — the plan's `D-8` carry: "the seam
   *  is the unit's to declare"): a read-only accessor over the pane supervisor's
   *  journal depth (the engine's read-only `undoDepth` accessor, `J1`'s FIXED
   *  surface at provident-ssr@^0.5.1). TEST-ONLY, with the production-negative
   *  row of `R C-8`'s seam discipline — no production code path calls it; it is
   *  NOT exposed on the bridge, NOT an MCP surface and NOT a pane node handler,
   *  and the pane graph it reads is the isolated scope the MCP endpoints cannot
   *  reach (§2.5 item 4). */
  journalDepth(): number {
    return this.supervisor.undoDepth
  }

  /** Wire a real DOM interaction on a pane control to the pane graph's
   *  synthetic dispatch (mirrors the app Runtime's onEvent path). */
  private handleDomEvent = (wire: string, domEvent: Event): void => {
    const node = this.supervisor.getNode(wire)
    if (!node) return
    const eventName = domEvent?.type ?? String(domEvent ?? '')
    const extra = domEvent?.target && 'value' in domEvent.target
      ? [String((domEvent.target as HTMLInputElement).value)]
      : []
    this.supervisor.dispatchEvent(node.id, eventName, ...extra)
    void this.supervisor.flush().then(() => {
      this.render()
      void this.refresh()
    })
  }

  /** The test seam: dispatch a synthetic click on a pane control by its
   *  authored props.id, in the PANE graph (never the app graph). */
  async dispatch(id: string): Promise<void> {
    const node = this.supervisor.allNodes().find((n) => (n.props as { id?: string })?.id === id)
    if (!node) throw new Error(`secure-panels: unresolved pane id '${id}'`)
    this.supervisor.dispatchEvent(node.id, 'click')
    await this.supervisor.flush()
    this.render()
    await this.refresh()
  }

  /** U-ENGINE-PIN §2.4a (ruling 2) — the ONE test-only injection point the
   *  amendment authorises, so the pane-managed channel's predicate is
   *  REACHABLE and its behaviour assertable (before it, `syncConfig` is private
   *  and both shipped writes are defined strings, so no test could drive the
   *  channel — the adversarial pass's false-green finding `H-02`).
   *
   *  Contract, exactly as §2.4b pins it (amendment block 7 — the amended
   *  return shape; §5.1 item 5's diff scope is this method + the predicate):
   *   - runs `paneMutationValid(mutation)` first;
   *   - **`applied` means "the ENGINE applied it": `applied ===
   *     (status === 'applied')`; a refusal is never reported as applied.** The
   *     `status` field stays the ENGINE's own verdict where the engine was
   *     reached (`'applied'`, its `rejected`, or its other verdict); the
   *     predicate's own refusal contributes the one literal `'rejected'`;
   *   - the THREE reachable outcomes (§2.4b item 1), and no fourth:
   *     (i) **shape-refused** — the predicate refuses (a non-array batch, a
   *     non-object element, a missing/non-string `targetProp`) ⇒
   *     `{ status: 'rejected', applied: false }`, nothing applied, nothing
   *     re-rendered (the node keeps its prior state and its last-known render),
   *     **NEVER a throw**;
   *     (ii) **engine-applied** ⇒ `{ status: 'applied', applied: true }`;
   *     (iii) **engine-refused** — the predicate passed and the engine did not
   *     apply it (an unknown / foreign `nodeId` ⇒ `getNode` `undefined` ⇒ the
   *     engine's own `unknown-node` rejection) ⇒
   *     `{ status: <the engine's verdict>, applied: false }`. `applied: false`
   *     is therefore NOT a synonym for "the predicate refused": the public
   *     `{status}` alone carries no predicate-vs-engine discriminator (use a
   *     shape-malformed input to attribute a refusal to the predicate);
   *   - on a predicate pass it calls `this.supervisor.apply({kind:'state-slice',
   *     node, mutation})` on the ISOLATED pane graph and re-renders. A nullish
   *     value is a legitimate removal and PASSES THROUGH (ruling 1); the shim
   *     completion makes the engine's `removeAttribute` path safe;
   *   - the first parameter is the ENGINE `nodeId` of a node in the PANE graph
   *     (§2.4b item 4) — an authored `props.id` is an unresolved id (outcome
   *     (iii)), and no public pane-side accessor converts one into the other.
   *
   *  It adds no shim member, no DOM capability and no browser emulation (it is
   *  not `H-r7` shim expansion), no vocabulary, no content, no default, no
   *  store and no MCP/IPC surface: the node id and the mutation are the
   *  caller's. `syncConfig`'s own call site and its shipped writes are
   *  unchanged. */
  applyPaneMutation(nodeId: string, mutation: unknown[]): { status: string; applied: boolean } {
    if (!paneMutationValid(mutation)) return { status: 'rejected', applied: false }
    const node = this.supervisor.getNode(nodeId)
    const result = this.supervisor.apply({ kind: 'state-slice', node, mutation } as never) as { status?: unknown }
    this.applyJournalCap()
    this.render()
    const status = typeof result?.status === 'string' ? result.status : 'unknown'
    return { status, applied: status === 'applied' }
  }

  /** The Debug pane's live agent-visibility line: set from the APP runtime's
   *  census + SSR preview. Written into the pane graph's `#status` node (its
   *  own isolated graph — never the app graph). */
  refreshDebug(runtime: {
    renderedHtmlResult(): { census: { inTree?: unknown; registered?: unknown; unplaced?: unknown; destroyed?: unknown; prototypes?: unknown }; ssrHtml: unknown }
  }): void {
    const { census, ssrHtml } = runtime.renderedHtmlResult()
    const c = (v: unknown): string | number => (typeof v === 'number' && Number.isFinite(v) ? v : '?')
    const censusLine =
      `inTree ${c(census.inTree)} · registered ${c(census.registered)} · ` +
      `unplaced ${c(census.unplaced)} · destroyed ${c(census.destroyed)} · prototypes ${c(census.prototypes)}`
    const raw = typeof ssrHtml === 'string' ? ssrHtml : ''
    const collapsed = raw.replace(/\s+/g, ' ').trim()
    const preview = collapsed.length === 0
      ? '(empty)'
      : collapsed.length > PREVIEW_MAX
        ? collapsed.slice(0, PREVIEW_MAX) + '…'
        : collapsed
    this.debugValue = `${censusLine}\n${preview}`
    this.syncConfig()
    this.render()
  }

  /** Re-fetch the security config over IPC, merge it into the pane graph nodes,
   *  and re-render. Async (the bridge is async). */
  async refresh(): Promise<void> {
    const security = typeof window !== 'undefined' && window.provident?.security
    if (security) {
      try {
        this.cfg = await security.get()
      } catch {
        // keep the last-known config on a bridge error
      }
    }
    // U8 — read the module store status + list over the module bridge.
    const moduleBridge = typeof window !== 'undefined' && window.provident?.module
    if (moduleBridge) {
      try {
        const res = await moduleBridge.get()
        this.moduleStatus = `corrupt: ${res.corrupt} · quarantined: [${res.quarantined.join(', ')}] · loaded: [${res.loaded.join(', ')}]`
        this.moduleListText = res.modules
          .map((m) => `${m.disabled ? '☐' : '☑'} ${m.name}@${m.version}${m.quarantined ? ' (quarantined)' : ''}`)
          .join('\n')
      } catch {
        // keep the last-known module state on a bridge error
      }
    }
    this.syncConfig()
    this.render()
  }

  /** Write the current cfg into the pane graph nodes (token status, enabled
   *  groups, per-group toggle on/off) through the MANAGED CHANNEL (state-slice
   *  content + props writes), then the render reflects it. Never mutates a
   *  Node's derived fields directly. */
  private syncConfig(): void {
    for (const n of this.supervisor.allNodes()) {
      const id = (n.props as { id?: string })?.id
      const mutation: Array<{ targetProp: string; value: unknown; mode?: string }> = []
      if (id === 'security-status') {
        const jl = this.cfg.maxJournalLength !== undefined ? ` · journal: ≤${this.cfg.maxJournalLength}` : ' · journal: ∞'
        // §2.4 item 3 / PAR-11 — ONE TRAILING SEGMENT appended to the landed line, never a new
        // node: the off-state's operator-visible signal. It carries a STATE WORD, never a tier-4
        // value (the forbidden carriers stand). **⟶ `D-vi` (`2026-10-11`, the gate-4 repair
        // contract): the segment is composed ONLY from a CARRIER-SUPPLIED reading** — with
        // `exclusion` at its declared `null` (*"no reading yet"*, the first paint before any
        // carrier answer and a bridge rejection alike) NO `· MCP:` word is painted at all, and a
        // missing/`undefined` `read` counts as `null` (no refusal was supplied this turn).
        const carrierState = this.cfg.exclusion
        const excl = carrierState === null || carrierState === undefined
          ? ''
          : carrierState === 'mcp-disabled' ? ' · MCP: disabled' : ' · MCP: enabled'
        // `tier4-arbitrary-storage.md` `§2.6` items 3/4 — THE REFUSAL'S OWN SEGMENT, the SECOND
        // trailing segment on this same line: rendered **IFF the carrier's `read` is non-null**
        // (absent means the last observed read was PERFORMED), carrying the refusal **TOKEN** and
        // never its message, never a tier-4 value, never a name and never a group set. Both cells
        // above are fed by the carrier's BOOLEAN-sourced `exclusion` member — never by a
        // store-derived value and never by this pane's own prior state.
        const refused = this.cfg.read === null || this.cfg.read === undefined ? '' : ' · refused: tier4-closed'
        mutation.push({ targetProp: 'content', value: `token: ${this.cfg.token ? '••••' : '(none)'} · enabled: [${this.cfg.enabled.join(', ')}]${jl}${excl}${refused}` })
      } else if (id === 'status') {
        mutation.push({ targetProp: 'content', value: this.debugText() })
      } else if (id === 'token-input') {
        mutation.push({ targetProp: 'content', value: this.cfg.token ?? '' })
      } else if (typeof id === 'string' && id.startsWith('toggle:')) {
        const g = id.slice('toggle:'.length)
        const on = this.cfg.enabled.includes(g)
        mutation.push({ targetProp: 'props.data-on', mode: 'replace', value: on ? 'true' : 'false' })
        mutation.push({ targetProp: 'content', value: `${on ? '☑' : '☐'} ${GROUP_LABELS[g]}` })
      } else if (id === 'exclusion-toggle') {
        // §2.4 items 2/3 — the toggle's `data-state` + its affordance word, refreshed by THIS pass
        // exactly as the group toggles' `data-on` is. **⟶ `D-vi` (`2026-10-11`, the gate-4 repair
        // contract): NOTHING is painted from the pane's OWN FIELD DEFAULT.** With NO
        // carrier-supplied reading yet (`exclusion === null`) the pane writes NO `data-state` prop
        // and NO affordance word — the authored envelope's own default is CLEARED rather than
        // re-worded, so a never-answered (or bridge-rejected) pane fabricates no state at all. A
        // value the CARRIER previously supplied is retained and re-painted, which is the declared
        // reading of `§2.6` item 3's *"absent means the last observed read was performed"*.
        const carrierReading = this.cfg.exclusion
        if (carrierReading === null || carrierReading === undefined) {
          mutation.push({ targetProp: 'content', value: '' })
        } else {
          const open = carrierReading === 'mcp-disabled'
          mutation.push({ targetProp: 'props.data-state', mode: 'replace', value: open ? 'mcp-disabled' : 'mcp-enabled' })
          mutation.push({ targetProp: 'content', value: open ? 'Enable MCP' : 'Disable MCP' })
        }
      } else if (id === 'journal-length-input') {
        mutation.push({ targetProp: 'props.value', mode: 'replace', value: this.cfg.maxJournalLength ?? '' })
      } else if (id === 'module-status') {
        mutation.push({ targetProp: 'content', value: this.moduleStatus })
      } else if (id === 'module-list') {
        mutation.push({ targetProp: 'content', value: this.moduleListText })
      }
      if (mutation.length > 0 && paneMutationValid(mutation)) {
        this.supervisor.apply({ kind: 'state-slice', node: n, mutation })
      }
    }
    this.applyJournalCap()
  }

  /** G3 §2.5 items 1/2/4 — THE PANE JOURNAL'S CAP, ENFORCED AT THE HOST
   *  (gate-4 finding 2, RED-SET-FIX, 2026-10-03): the engine's own deferred
   *  condense cannot drop this pane's journal past the cap — measured defeat
   *  paths: (1) the D5 containment aborts (`condense-aborted:
   *  serialization-error`) while the journal/newest entries carry a non-JSON
   *  value (the refresh's `status` write once shipped the `debugText` METHOD
   *  reference — a function — into the node's content instead of the string;
   *  fixed above), and (2) the D5 size guard skips a small journal (`base >=
   *  journal`: MEASURED — a 1-cycle 11-entry journal is ~1864B while the pane
   *  graph's base snapshot is ~5249B), so at small N the engine's condense
   *  never rewrites and `journalDepth()` stays ≥ the cap. The cap is therefore
   *  made REAL by condensing over the RAW journal entries — never a graph
   *  round-trip — with the engine's OWN D6 rewrite semantics (`supervisor.js`
   *  condense): the oldest excess entries are dropped from the journal and the
   *  parallel undo stack, and the redo stack clears (a truncation invalidates
   *  the redo basis — D6's rule). `maxJournalLength === undefined` (no cap)
   *  never trims; the falsifier's observable — "a journal depth > M means the
   *  cap is not applied" — is closed: after every pane journaling cycle the
   *  depth is ≤ M, while an UNCAPPED pane keeps growing per mutated node. */
  private applyJournalCap(): void {
    const max = this.maxJournalLength
    if (max === undefined) return
    const sup = this.supervisor as unknown as {
      journal: unknown[]
      undoStack: unknown[]
      redoStack: unknown[]
    }
    const excess = sup.undoStack.length - max
    if (excess <= 0) return
    sup.journal.splice(0, excess)
    sup.undoStack.splice(0, excess)
    sup.redoStack.length = 0
  }

  /** Compile the pane graph root + re-render into the pane mount. */
  private render(): void {
    const cr = (this.root as { compile(nodes: unknown[]): { actionable: unknown[] } }).compile(this.nodes as never)
    this.supervisor.recordResolved(cr.actionable as never)
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]))
    const renderOptions: RenderOptions = { nodeIdAttribute: true, graphScope: this.scope }
    this.adapter.beginBatch()
    const dom = renderProducingProcess(cr.actionable as never, byNode as never, this.adapter, this.prevMap as never, renderOptions)
    this.adapter.endBatch()
    this.prevMap = dom.prevMap as unknown as Map<string, unknown>
  }
}
