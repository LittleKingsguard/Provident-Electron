#!/usr/bin/env node
// tests/e2e/store-crossings/crossings-live.mjs — **THE LIVE INSTRUMENT D-94 LANDED, WHICH IS WHAT CLOSED THE
// GAP `pending.md`'s ROW 5 CARRIED UNTIL ITS WORK LANDED AND IT LEFT THAT FILE**: a driver that reaches BOTH
// `provident-storeroom` crossings over a real process boundary, and that a LEG RUNS (`npm run crossings`, a
// `package.json` key — D-94). No row of `pending.md` waits on this file any more, and it claims no such row.
//
// WHY THIS FILE EXISTS, IN THE CORPUS'S OWN WORDS. `D-93` retired BOTH live drivers whole —
// `tests/store-tabs-record-live.mjs` (19 rows) and `tests/store-compliance-live.mjs` (32) — because
// every row of them reached the app through ONE deleted mechanism (`getWiredGraphStore()` and
// `provident.store.*`). Neither was run by any leg, and neither is runnable now, so after `D-93` the
// two crossings were gated by the node suite alone — which is envelope-green and NEVER app-green
// (`strata/brief.md` §6). **THE FAILURE MODE THIS FILE MUST NOT REPEAT IS "AN INSTRUMENT NOBODY
// RUNS": a driver invoked by a literal command line that no leg calls was exactly what was retired
// twice.** So this is a leg: `package.json` carries the key, the key runs this file, and the key-set
// censuses were moved with it (D-38, D-94).
//
// WHAT IT DRIVES, AND THROUGH WHICH DOOR — the doors the app ACTUALLY exposes, never internals:
//   · THE NORMAL CROSSING, at its raw address, through the app's own MCP surface. `provident.data.read`
//     / `.write` / `.delete` act on the boot's ONE `createProfileStore` instance (`src/main/main.ts`) —
//     the instance the six tab-record declarations are batched into — so a whole-record write at
//     `['tabs']` is the crossing's own store being written, and a repair that fires is the engine's.
//   · THE NORMAL CROSSING'S DECLARED ROUTES, through the PRELOAD/IPC bridge: `window.provident.tabs.read`
//     / `.commit` / `.remove` run in the RENDERER realm, inside a handler body this driver authors and
//     loads with `provident.load` — the measurement channel the `secure-panels` leg established. The body
//     is evaluated in the page; only the EVENT that runs it is synthetic.
//   · THE CHANGE PUSH, through the app's OWN subscriber: the renderer's `tabs-client` reads the record on
//     every delivery and `driveTabsLandingPage` writes each authored page's `css.style`. This leg reads
//     those two nodes back with `provident.get_node_state` — so the row is "the push crossed the
//     boundary and reached a subscriber", observed at the rendered node, not "a callback fired".
//   · THE SECURE CROSSING'S THREE ADDRESSES, through the same bridge: `security.set` → `['operator-settings']`
//     (`file`), `module.setDisabled` → `['operator-app-state']` (`file`), `security.setExclusion` →
//     `['operator-exclusion']` (`mem`). The two `file` addresses are then read FROM THIS PROCESS out of
//     `<profile>/provident-operator-settings.json`; the `mem` address has no file image to read (a `mem`
//     value can never come from a file), so it is read through the crossing and then at a FRESH BOOT.
//   · **THE VIEW RECORD'S FOUR FAMILIES, THREE OF THEM DRIVEN HERE** (`D-87`, `D-91`, `D-95`; the fourth
//     arrives at `D-98`), through the `view` bridge member and the app's OWN profile file: `['panes']`
//     (`file`), `['focus']` (`mem`) and `['zones']` (`mem`) are driven, and `['theme']` (`file` since
//     `D-98`) is the APPEARANCE family, whose own rows are `store-view-record`'s battery and not this leg's.
//     The two `mem` families have no file image, so their non-survival is read at a FRESH PROCESS; the `file`
//     family's value is read out of `<profile>/provident-profile.json` BY THIS PROCESS as well as through
//     the crossing, which is what makes "the repair's placeholder stands" a reading of the store's bytes
//     rather than of the crossing's opinion of them.
//
// FIVE BOOTS, ONE PER SUBJECT, on three scratch profiles. Boot A loads NO driver envelope and reads the
// untouched app graph (the page drive is the app's own writing — loading an envelope would REPLACE that
// graph, whichever crossing is being measured, which is why the TAB record's push is measured here); boot B
// loads the envelope for the bridge routes and the secure crossing; boot C is a SECOND PROCESS on boot B's
// profile, which is how a `file` address's survival and a `mem` address's non-survival are told apart; boot
// D drives the view record's three DRIVEN families on a THIRD profile, and boot E is a SECOND PROCESS on boot D's,
// which answers the same question for `['panes']` against `['focus']`/`['zones']`.
//
// THIS LEG'S OWN LIMITS, stated rather than hidden:
//   · The view record's CHANGE PUSH is read THROUGH THE BRIDGE and not at an authored terminal, because the
//     app's own view subscriber takes a NO-OP handler (`src/renderer/renderer.ts`'s `startViewShape`:
//     `client.subscribe(() => undefined)`), so no authored node moves when the view does. The subscriber
//     this leg installs on `window.provident.view.onChanged` is the app's own BRIDGE MEMBER and the app's
//     own realm; the row says so and claims nothing about a rendered node.
//   · `security.setExclusion`'s own `{applied:true}` answer is NOT read back: the write closes the MCP
//     invocation tier, so every later call is refused (`exclusion-closed`) and the observation written
//     inside the body cannot be retrieved over the boundary. What the row measures instead is the
//     CONSEQUENCE — the gate closes on that write, so the mem address was written — plus the file's
//     silence about the address, plus the fresh boot. That is stated in the row, not papered over.
//   · The body-issued `click` is not a pointer gesture (the `panes` leg's `R4` limit, unchanged): the
//     rows here are store-crossing readings, not rendered-input readings.
//   · A `DISPLAY` is a PREREQUISITE, not a skip: the app opens a real `BrowserWindow`.
//
// EXIT CODES (closed vocabulary; no failure may become a skip, a `0` or a green):
//   `0` every declared row passed · `1` a row failed, a spawn/handshake failure, or the bundle is absent ·
//   `3` PREREQUISITE ERROR (no display, decided before any boot).
//
// RUN: npm run crossings   (the key is `npm run build && node tests/e2e/store-crossings/crossings-live.mjs`)
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import {
  ChildProcessTransport,
  cleanupProfiles,
  makeFreshProfile,
  repoRoot,
  spawnElectron,
} from '../../../scripts/electron-spawn.mjs'

const root = repoRoot
/** The built main-process bundle every boot runs (`npm run build`). */
const mainBundle = join(root, 'dist', 'main', 'main.mjs')
/** The ONE additive startup flag the seam parses: it relocates the user-data root for THIS boot. */
const USER_DATA_FLAG = '--provident-user-data='
/** The groups the DRIVER supplies as this run's state, through the retired name's import-once path.
 *  `data` is among them because the normal crossing's raw address is reached through `provident.data.*`
 *  (D-11, D-79) — this leg does not measure the pane's grant, so it seeds what it needs. */
const SEEDED_GROUPS = ['read', 'dispatch', 'graph', 'code', 'data']
/** The retired security carrier, read ONCE at the boot by the record address's own repair. */
const SECURITY_SEED = 'provident-security.json'
/** The retired tier-1 SETTINGS carrier, read once by `['operator-app-state']`'s repair (`D-85`): the
 *  driver's only lawful way to supply an app-state row, since no bridge route can install a module. */
const APP_STATE_SEED = 'provident-settings.json'
/** The secure crossing's OWN file — every `file` address lands here and nothing else may write it. */
const INSTANCE_FILE = 'provident-operator-settings.json'
/** The secure crossing's three addresses, spelled once each (`D-84`, the module's own three). */
const RECORD_ADDRESS = 'operator-settings'
const EXCLUSION_ADDRESS = 'operator-exclusion'
const APP_STATE_ADDRESS = 'operator-app-state'
/** The tab record's one address (`D-63`, `D-64`). */
const TABS_ADDRESS = 'tabs'
/** **THE ONE ROOT THIS LEG'S `data.*` ROUTE ROW WRITES AT, AND IT IS A CALLER-CHOSEN ADDRESS** (`D-112`;
 *  `docs/L2/central-data/interface.md` §1). It is spelled here because the row asserts the SAME path coming back out of
 *  `list` and `journal`; it is a name NO crossing declares, because a write at a declared root is that family's business
 *  and could perturb the rows beside it — and it is written and DELETED inside one act, so the profile this leg leaves
 *  behind carries no row of it. */
const DATA_PROBE = 'bridge-probe'
/** **THE APP'S OWN PROFILE FILE** — the normal crossing's one register, and the ONLY place a `file`-tier value can be
 *  read without asking the crossing (`src/main/data/store.ts`'s `PROFILE_FILE_NAME`). The `mem` tiers have no image
 *  here at all, which is what makes the fresh-boot reading decisive. */
const PROFILE_FILE = 'provident-profile.json'
/** **THE VIEW RECORD'S THREE ADDRESSES** (`src/main/view-record/index.ts`'s `VIEW_PANES_ADDRESS`, `VIEW_FOCUS_ADDRESS`,
 *  `VIEW_ZONES_ADDRESS`): one root per family and never one root with three members, because a value lives at ONE tier
 *  and two of these three are `mem` (D-87, D-91). Spelled once each here, as the file's own keys. */
const PANES_KEY = 'panes'
const FOCUS_KEY = 'focus'
const ZONES_KEY = 'zones'
/** **THE MEASURED DEFAULTS, SPELLED BECAUSE THIS FILE IMPORTS NO TYPESCRIPT** (`src/shared/view-shape.ts`'s
 *  `DEFAULT_PANE_SIZE` / `DEFAULT_PANE_BOUNDS` / `DEFAULT_PANE_ID`): the authored pane's `props`, the figures
 *  `panes-must-stand`'s repair mints at the store's creation and the figures `paneGeometryIn` answers for a pane the
 *  family does not name. They are the row's EXPECTED values and not this leg's invention. */
const MEASURED_PANE_ID = 'pane-a'
const MEASURED_PANE_SIZE = 100
const MEASURED_PANE_BOUNDS = { min: 0, max: 200 }
/** **THE DRIVEN FIGURES — one per route, each a value the measured default COULD NOT answer**, so a read-back that
 *  reports them is the write's effect and never the creation repair's placeholder. The pane size is outside
 *  `{min…max}` on purpose: the crossing composes the family and this leg reads it back, and no policy clamps at the
 *  address (the clamp is the drag's `move`, which is not driven here). */
const DRIVEN_PANE_SIZE = 240
const DRIVEN_FOCUS_ID = 'focus-alpha'
const DRIVEN_ZONE_ID = 'zone-1'
const DRIVEN_ZONE = { slot: 'slot-alpha', distance: 3, size: 120, display: 'normal' }
/** The two authored terminals the app's own subscriber drives (`src/shared/demo-envelope.ts`). */
const LANDING_PAGE_ID = 'tabs-landing-page'
const ERROR_PAGE_ID = 'tabs-error-page'
/** The module row the driver seeds and then toggles: a name no reserved namespace claims. */
const DEMO_MODULE = 'demo-crossings'
const DEMO_MODULE_SOURCE = 'export default { name: "demo-crossings" }'
/** The driven journal cap: a durable value that changes nothing the MCP surface depends on, and one no
 *  default could answer. */
const DRIVEN_MAX_JOURNAL = 2048
/** ONE boot's MCP handshake bound (`src/main/mcp-server.ts`'s own 30 000 ms readiness bound). */
const HANDSHAKE_TIMEOUT_MS = 30000
/** The settle bound: a store write reaches the renderer over IPC, so a read taken in the same tick can
 *  precede the paint. Bounded, and the poll count is PRINTED so a timed-out read is visible as one. */
const SETTLE_READS_MAX = 20
const SETTLE_DELAY_MS = 250
/** The record-file poll bound (boot B's two `file` addresses ride the instance's own store call). */
const FILE_POLL_MAX = 24
const FILE_POLL_DELAY_MS = 125

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ---- the row printer -------------------------------------------------------
let failures = 0
let rowsChecked = 0
function row(id, subject, cond, detail) {
  rowsChecked += 1
  const line = `  ${cond ? '✓' : '✗'} [${id}] ${subject}`
  if (cond) console.log(`${line}\n      observed: ${detail}`)
  else {
    failures += 1
    console.error(`${line}\n      observed: ${detail}`)
  }
}

// ---- MCP plumbing ----------------------------------------------------------
const MCP_CALLS = []
/** The envelope-settle polls (`provident.list_targets` until the driver's out node is addressable):
 *  their NUMBER depends on how fast a load settles, so the reading prints them apart from the
 *  driver's own calls — a bare total is not a stable figure and this leg does not pin one. */
let settlePolls = 0
async function callRaw(client, name, args = {}) {
  MCP_CALLS.push(name)
  try {
    const r = await client.callTool({ name, arguments: args })
    const text = r.content?.[0]?.text ?? ''
    try {
      return { ok: true, parsed: JSON.parse(text), text }
    } catch {
      return { ok: true, parsed: { __unparsable: text }, text }
    }
  } catch (e) {
    return { ok: false, parsed: null, text: `MCP ERROR: ${e instanceof Error ? e.message : String(e)}` }
  }
}
const call = async (client, name, args = {}) => (await callRaw(client, name, args)).parsed

/** THE NODE STATE READING — `provident.get_node_state` on an AUTHORED css id. The `display` value is
 *  extracted by a TOTAL walk of the answer (the state record's own nesting is the runtime's, not this
 *  file's to pin): the FIRST string `display` member found, with its path printed beside the row so a
 *  reader can see where it was read rather than trusting a pattern. */
async function nodeDisplay(client, cssId) {
  const answer = await call(client, 'provident.get_node_state', { target: { kind: 'cssId', cssId } })
  const found = findMember(answer, 'display')
  return { answer, display: found.value, path: found.path }
}
function findMember(value, name, path = []) {
  if (value === null || typeof value !== 'object') return { value: null, path: null }
  if (!Array.isArray(value) && typeof value[name] === 'string') return { value: value[name], path: [...path, name].join('.') }
  const children = Array.isArray(value) ? value.map((v, i) => [String(i), v]) : Object.entries(value)
  for (const [key, child] of children) {
    const hit = findMember(child, name, [...path, key])
    if (hit.value !== null) return hit
  }
  return { value: null, path: null }
}

// ---- the record's own shape, read WITHOUT the crossing's types ---------------
/** The record's rows, as the store's value carries them: every member that is not the `order` seat. */
const rowsOf = (value) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return null
  return Object.entries(value)
    .filter(([key, member]) => key !== 'order' && member !== null && typeof member === 'object' && !Array.isArray(member))
    .map(([id, member]) => ({ id, row: member }))
}
const orderOf = (value) => (value !== null && typeof value === 'object' && Array.isArray(value.order) ? value.order.map(String) : null)
const activeOf = (rows) => (rows === null ? null : rows.filter(({ row: r }) => r.active === true).map(({ id }) => id))
const nonBlank = (v) => typeof v === 'string' && v.length > 0

/** **THE SIX DECLARATIONS' OWN TERMS, EVALUATED AFTER THE FACT ON THE STANDING RECORD** (`D-69`, `D-83`) —
 *  the driver does not predict a repair's value; it asserts the invariants the six pairs own, by name, so
 *  "the declarations fired" is a reading of the record rather than an inference from the write's answer. */
function declaredTerms(value) {
  const rows = rowsOf(value)
  const order = orderOf(value)
  const active = activeOf(rows)
  const ids = rows === null ? [] : rows.map(({ id }) => id)
  const byId = new Map((rows ?? []).map(({ id, row: r }) => [id, r]))
  return {
    // `tabs-must-stand` — the root exists and is a record.
    stands: rows !== null,
    // `order-names-its-tabs` — a seat naming the record's own rows, once each, and nothing else.
    orderNamesItsTabs:
      order !== null && order.length > 0 && new Set(order).size === order.length && order.every((id) => byId.has(id)),
    // `exactly-one-active` — one row reads active, and it is the one the family derives from.
    exactlyOneActive: active !== null && active.length === 1,
    // the three field pairs.
    tabHasTitle: (rows ?? []).every(({ row: r }) => nonBlank(r.label)),
    tabHasContent: (rows ?? []).every(({ row: r }) => nonBlank(r.target)),
    tabHasLastActiveAt: (rows ?? []).every(({ row: r }) => nonBlank(r.lastActiveAt)),
    ids,
    order,
    active,
  }
}
const termsPassed = (t) => t.stands && t.orderNamesItsTabs && t.exactlyOneActive && t.tabHasTitle && t.tabHasContent && t.tabHasLastActiveAt
const termsText = (t) =>
  `tabs-must-stand=${t.stands} order-names-its-tabs=${t.orderNamesItsTabs} exactly-one-active=${t.exactlyOneActive} ` +
  `tab-has-title=${t.tabHasTitle} tab-has-content=${t.tabHasContent} tab-has-lastActiveAt=${t.tabHasLastActiveAt}`

/** The record as the crossing's `read` answers it (`order`/`landing`/`rows`) OR as the store's value
 *  carries it (`order` + one member per tab). ONE reader for both, so no row compares oranges. */
function recordView(reading) {
  if (reading === null || typeof reading !== 'object') return { status: null, order: null, landing: null, active: [] }
  if (Array.isArray(reading.rows) && Array.isArray(reading.order)) {
    // the bridge's `read()`: rows are objects carrying their own `id`.
    return {
      status: reading.status ?? null,
      order: reading.order.map(String),
      landing: typeof reading.landing === 'string' ? reading.landing : null,
      active: reading.rows.filter((r) => r && r.active === true).map((r) => String(r.id)),
      rowIds: reading.rows.map((r) => String(r && r.id)),
      terms: null,
    }
  }
  const value = reading && Object.prototype.hasOwnProperty.call(reading, 'value') ? reading.value : reading
  const t = declaredTerms(value)
  return { status: reading?.status ?? null, order: t.order, landing: null, active: t.active, rowIds: t.ids, terms: t, value }
}

// ---- the view record's families, read off its own answer ---------------------
/** ONE MEMBER OF AN ADMITTED FAMILY, BY ID — the answer's own spelling (`{id, ...}`), or `null` where the family names
 *  no such member. `null` is the family's declared miss (`zoneIn`'s own arm) and never a substituted default. */
const paneIn = (reading, id) =>
  (Array.isArray(reading?.panes) ? reading.panes : []).find((pane) => pane !== null && pane !== undefined && pane.id === id) ?? null
const zoneIn = (reading, id) =>
  (Array.isArray(reading?.zones) ? reading.zones : []).find((zone) => zone !== null && zone !== undefined && zone.id === id) ?? null

// ---- the driver's envelope (the measurement channel) ------------------------
const OUT_ID = 'xg-out'
const DUMP_ID = 'xg-dump'
/** ONE handler body per crossing act. Every body frames its answer into ONE authored node
 *  (`XG!…!END_XG`, percent-encoded) so the observation comes back over the EXISTING
 *  `provident.get_rendered_html` and never as a new tool (D-18, D-35). The bridge calls are the
 *  preload's own members; the body awaits them and writes when they settle. */
function actBody(label, act) {
  return `function (ctx) {
  // THE FRAME IS STASHED, NOT WRITTEN. A bridge call settles AFTER this dispatch's own render
  // turn, so a write made in its \`.then\` would land in a graph the boundary has already rendered
  // — measured on this head as an observation that never reaches \`get_rendered_html\`. The act
  // therefore stores its frame on the realm, and \`xg-dump\` writes it INSIDE a dispatch turn,
  // where the write rides the render the dispatch itself triggers.
  var frame = function (text) { window.__XG_FRAME = text }
  var ok = function (answer) { frame('act=${label};status=ok;answer=' + encodeURIComponent(JSON.stringify(answer === undefined ? null : answer))) }
  var no = function (e) { frame('act=${label};status=error;answer=' + encodeURIComponent(String(e && e.message ? e.message : e))) }
  var bridge = (typeof window !== 'undefined' && window.provident) ? window.provident : null
  var need = function (member) {
    if (bridge === null) throw new Error('no window.provident bridge in this realm')
    if (!bridge[member]) throw new Error('the bridge carries no ' + member + ' member')
    return bridge[member]
  }
  try {
    ${act}
  } catch (e) { no(e) }
}`
}
/** THE DUMP — the ONE synchronous body: it copies the realm's stashed frame into the authored out
 *  node, inside its own dispatch, so the observation crosses the boundary as rendered content. */
const DUMP_BODY = `function (ctx) {
  var out = null
  var all = ctx.tree.allNodes()
  for (var i = 0; i < all.length; i += 1) { var n = all[i]; if (n && n.props && n.props.id === '${OUT_ID}') out = n }
  if (!out) return
  var held = (typeof window !== 'undefined' && typeof window.__XG_FRAME === 'string') ? window.__XG_FRAME : 'act=none;status=none;answer=null'
  ctx.clientAPI.apply(out.id, [{ targetProp: 'content', mode: 'replace', value: 'XG!' + held + '!END_XG' }])
}`
const ACTS = [
  {
    id: 'xg-read',
    label: 'read',
    act: `var tabs = need('tabs'); tabs.read().then(ok, no)`,
  },
  {
    id: 'xg-commit-alpha',
    label: 'commit-alpha',
    act: `var tabs = need('tabs')
    tabs.commit({ id: 'alpha', target: '/alpha', active: true, label: 'Alpha', lastActiveAt: new Date().toISOString() })
      .then(function (receipt) { tabs.read().then(function (reading) { ok({ receipt: receipt, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xg-remove-alpha',
    label: 'remove-alpha',
    act: `var tabs = need('tabs')
    tabs.remove('alpha')
      .then(function (receipt) { tabs.read().then(function (reading) { ok({ receipt: receipt, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xg-commit-beta',
    label: 'commit-beta',
    act: `var tabs = need('tabs')
    tabs.commit({ id: 'beta', target: '/beta', active: true, label: 'Beta', lastActiveAt: new Date().toISOString() })
      .then(function (receipt) { tabs.read().then(function (reading) { ok({ receipt: receipt, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xg-security-set',
    label: 'security-set',
    act: `var security = need('security')
    security.set({ maxJournalLength: ${DRIVEN_MAX_JOURNAL} })
      .then(function (receipt) { security.get().then(function (reading) { ok({ receipt: receipt, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xg-module-disable',
    label: 'module-disable',
    act: `var moduleBridge = need('module')
    moduleBridge.setDisabled('${DEMO_MODULE}', true)
      .then(function (result) { moduleBridge.get().then(function (registry) { ok({ result: result, registry: registry }) }, no) }, no)`,
  },
  // ── THE SECURITY RECORD'S DELIVERY (`D-106`) — the ONE subscription this leg needs to measure the push the secure
  //    crossing's record and pair never delivered. Same instrument as `X-14b`: the subscriber is registered on the REALM
  //    (`window.__XS_HITS`) because the bridge call that installs it and the delivery that fires it are two separate turns,
  //    and a counting handler is the only place a delivery is observable at all — the app's own subscriber fills the pane
  //    graph, which is the ISOLATED scope the MCP endpoints cannot read (`src/renderer/secure-panels.ts`), so no authored node
  //    of the app graph moves when the record does. The row says so rather than claiming a rendered surface.
  {
    id: 'xg-security-subscribe',
    label: 'security-subscribe',
    act: `var security = need('security')
    window.__XS_HITS = 0
    window.__XS_WITHDRAW = security.onChanged(function () { window.__XS_HITS = (window.__XS_HITS || 0) + 1 })
    ok({ subscribed: true, withdrawal: typeof window.__XS_WITHDRAW })`,
  },
  {
    id: 'xg-security-push',
    label: 'security-push',
    act: `var security = need('security')
    security.get().then(function (record) { ok({ hits: window.__XS_HITS || 0, record: record }) }, no)`,
  },
  {
    id: 'xg-security-exclusion',
    label: 'security-exclusion',
    act: `var security = need('security')
    security.setExclusion('mcp-disabled').then(function (result) { ok(result) }, no)`,
  },
  {
    id: 'xg-security-read',
    label: 'security-read',
    act: `var security = need('security'); security.get().then(ok, no)`,
  },
  {
    id: 'xg-module-read',
    label: 'module-read',
    act: `var moduleBridge = need('module'); moduleBridge.get().then(ok, no)`,
  },
  // ── THE APP-STATE ROWS' DELIVERY (`D-104`; `D-82`'s `V3`) — the ONE subscription this leg needs to measure the push the
  //    secure crossing's third address did not have. The subscriber is registered on the REALM (`window.__XM_HITS`) because
  //    the bridge call that installs it and the delivery that fires it are two separate turns, and a counting handler is the
  //    only place a delivery is observable at all: the app's own subscriber fills the pane graph, which is the ISOLATED
  //    scope the MCP endpoints cannot read (`src/renderer/secure-panels.ts`), so no authored node of the app graph moves
  //    when a module row does. The row says so rather than claiming a rendered surface.
  {
    id: 'xg-module-subscribe',
    label: 'module-subscribe',
    act: `var moduleBridge = need('module')
    window.__XM_HITS = 0
    window.__XM_WITHDRAW = moduleBridge.onChanged(function () { window.__XM_HITS = (window.__XM_HITS || 0) + 1 })
    ok({ subscribed: true, withdrawal: typeof window.__XM_WITHDRAW })`,
  },
  {
    id: 'xg-module-push',
    label: 'module-push',
    act: `var moduleBridge = need('module')
    moduleBridge.get().then(function (registry) { ok({ hits: window.__XM_HITS || 0, registry: registry }) }, no)`,
  },
  // ── THE VIEW RECORD'S THREE FAMILIES (`D-95`) — the same channel, one act per route, plus the ONE subscription this
  //    leg needs to measure the push. The subscriber is registered on the REALM (`window.__XV_HITS`) because the bridge
  //    call that installs it and the delivery that fires it are two separate turns, and the counting handler is the only
  //    place a delivery is observable at all: the app's own subscriber takes a no-op.
  {
    id: 'xv-read',
    label: 'view-read',
    act: `var view = need('view'); view.read().then(ok, no)`,
  },
  {
    id: 'xv-subscribe',
    label: 'view-subscribe',
    act: `var view = need('view')
    window.__XV_HITS = 0
    window.__XV_WITHDRAW = view.onChanged(function () { window.__XV_HITS = (window.__XV_HITS || 0) + 1 })
    ok({ subscribed: true, withdrawal: typeof window.__XV_WITHDRAW })`,
  },
  {
    id: 'xv-commit-pane',
    label: 'view-commit-pane',
    act: `var view = need('view')
    view.commitPane('${MEASURED_PANE_ID}', { size: ${DRIVEN_PANE_SIZE} })
      .then(function (answer) { view.read().then(function (reading) { ok({ answer: answer, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xv-push',
    label: 'view-push',
    act: `var view = need('view')
    view.read().then(function (reading) { ok({ hits: window.__XV_HITS || 0, reading: reading }) }, no)`,
  },
  {
    id: 'xv-commit-focus',
    label: 'view-commit-focus',
    act: `var view = need('view')
    view.commitFocus({ entries: [{ id: '${DRIVEN_FOCUS_ID}', target: '/alpha' }], activeId: '${DRIVEN_FOCUS_ID}' })
      .then(function (answer) { view.read().then(function (reading) { ok({ answer: answer, reading: reading }) }, no) }, no)`,
  },
  {
    id: 'xv-commit-zones',
    label: 'view-commit-zones',
    act: `var view = need('view')
    view.commitZones('${DRIVEN_ZONE_ID}', ${JSON.stringify(DRIVEN_ZONE)})
      .then(function (answer) { view.read().then(function (reading) { ok({ answer: answer, reading: reading }) }, no) }, no)`,
  },
  // ── THE FIVE `data.*` ROUTES, THROUGH THE BRIDGE (`D-112`) — THE ANSWER SITES `strata/pending.md` ROW 1 STOOD ON from the
  //    `RpcMethod` declaration until this pass, and the one route of this leg that the NODE suite cannot measure: there the
  //    renderer's arm and the module's adapter are driven with the `ipcRenderer.invoke` hop REPLACED
  //    (`tests/integration/central-data/bridge-route.test.ts`), while here every call is the PRELOAD'S OWN MEMBER crossing
  //    `ipcMain` into `createDataSurface` on the boot's one store. **ALL FIVE VERBS IN ONE ACT** because they are one route
  //    set over one register: write, read, list, journal, delete, and a second read for the absence the delete leaves. The
  //    probe root is written and removed inside this act, so nothing of it survives the row.
  {
    id: 'xg-data-route',
    label: 'data-route',
    act: `var data = need('data')
    data.write({ path: ['${DATA_PROBE}'], value: 'x' })
      .then(function (wrote) {
        return data.read({ path: ['${DATA_PROBE}'] }).then(function (read) {
          return data.list({}).then(function (list) {
            return data.journal({}).then(function (journal) {
              return data.delete({ path: ['${DATA_PROBE}'] }).then(function (deleted) {
                return data.journal({}).then(function (journalAfter) {
                  return data.read({ path: ['${DATA_PROBE}'] }).then(function (after) {
                    ok({ wrote: wrote, read: read, list: list, journal: journal, deleted: deleted, journalAfter: journalAfter, after: after })
                  })
                })
              })
            })
          })
        })
      }, no)`,
  },
]

function driverEnvelope() {
  return {
    template: {
      root: {
        type: 'div',
        props: { id: 'xg-driver' },
        children: [
          ...ACTS.map(({ id, label, act }) => ({
            type: 'button',
            css: { id },
            props: { id },
            content: label,
            handlers: [{ name: id, event: 'click', body: actBody(label, act) }],
          })),
          {
            type: 'button',
            css: { id: DUMP_ID },
            props: { id: DUMP_ID },
            content: 'dump the stashed frame',
            handlers: [{ name: DUMP_ID, event: 'click', body: DUMP_BODY }],
          },
          { type: 'div', props: { id: OUT_ID }, content: '(no observation yet)' },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

let gestures = 0
let dumps = 0
/** Issue ONE act and read its framed observation back, bounded. The act's bridge call settles
 *  asynchronously, so the frame is collected by a SECOND dispatch (`xg-dump`) — ONE synchronous body
 *  whose write rides its own render turn — and the pair is repeated while the frame is not the act's
 *  own. Every poll is printed with the row, so a timed-out read is visible as one. */
async function drive(client, actId, label) {
  gestures += 1
  await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: actId }, event: 'click' })
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    await sleep(SETTLE_DELAY_MS)
    dumps += 1
    await call(client, 'provident.dispatch', { target: { kind: 'cssId', cssId: DUMP_ID }, event: 'click' })
    const answer = await call(client, 'provident.get_rendered_html', {})
    const frame = /XG!([\s\S]*?)!END_XG/.exec(String(answer?.renderedHtml ?? ''))
    if (frame !== null) {
      const fields = { act: '', status: '', answer: '' }
      for (const part of frame[1].split(';')) {
        const eq = part.indexOf('=')
        if (eq < 0) continue
        const key = part.slice(0, eq)
        if (Object.prototype.hasOwnProperty.call(fields, key)) fields[key] = decodeSafe(part.slice(eq + 1))
      }
      if (fields.act !== label) continue
      let parsed = null
      try {
        parsed = JSON.parse(fields.answer)
      } catch {
        parsed = fields.answer
      }
      return { polls, status: fields.status, answer: parsed }
    }
  }
  return { polls: SETTLE_READS_MAX, status: 'timeout', answer: null }
}
function decodeSafe(v) {
  try {
    return decodeURIComponent(String(v))
  } catch {
    return String(v)
  }
}

// ---- the instance's own file, read from THIS process -----------------------
/** The secure crossing's file as the STORE wrote it: one JSON object whose keys are the addresses'
 *  joined spellings. An empty file is the construction's own exclusive create and is reported as such. */
function readInstanceFile(profile) {
  const file = join(profile, INSTANCE_FILE)
  if (!existsSync(file)) return { present: false, keys: [], record: null, appState: null, raw: '', reason: 'the instance file is absent' }
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') return { present: true, keys: [], record: null, appState: null, raw, reason: 'zero-length: the construction created it and no address has landed' }
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    return { present: true, keys: [], record: null, appState: null, raw, reason: `unparsable: ${e instanceof Error ? e.message : String(e)}` }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { present: true, keys: [], record: null, appState: null, raw, reason: 'the file carries no object' }
  }
  const pick = (name) => (parsed[name] !== null && typeof parsed[name] === 'object' ? parsed[name] : null)
  return { present: true, keys: Object.keys(parsed).sort(), record: pick(RECORD_ADDRESS), appState: pick(APP_STATE_ADDRESS), raw, reason: '' }
}
/** **THE APP'S OWN PROFILE FILE AS THE STORE WROTE IT** — one JSON object whose keys are the `file`-tier addresses'
 *  joined spellings, read BY THIS PROCESS and never through the crossing. A `mem` address has no key here by
 *  construction (`D-84`: a `mem` value can never come from a file), so a row that read one would be reading the
 *  driver's own fixture; the `keys` list is printed with every row so that absence is a measurement. */
function readProfileFile(profile) {
  const file = join(profile, PROFILE_FILE)
  const absent = { present: false, keys: [], panes: null, focus: null, zones: null, raw: '', reason: 'the profile file is absent' }
  if (!existsSync(file)) return absent
  const raw = readFileSync(file, 'utf8')
  if (raw.trim() === '') return { ...absent, present: true, reason: 'zero-length: the construction created it and no address has landed' }
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    return { ...absent, present: true, reason: `unparsable: ${e instanceof Error ? e.message : String(e)}` }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ...absent, present: true, reason: 'the file carries no object' }
  }
  const pick = (name) => (parsed[name] !== null && typeof parsed[name] === 'object' ? parsed[name] : null)
  return { present: true, keys: Object.keys(parsed).sort(), panes: pick(PANES_KEY), focus: pick(FOCUS_KEY), zones: pick(ZONES_KEY), raw, reason: '' }
}
/** **ONE BOUNDED SETTLE FOR EITHER FILE** — the same poll, so a `file` tier's landing is read the same way at both
 *  crossings and a timed-out read is PRINTED as one rather than asserted away. A store write reaches its file at the
 *  instance's own flush, which is not the caller's turn, so the wait is the measurement and never a sleep with a hope. */
async function settleFile(readFn, profile, until, what) {
  let read = readFn(profile)
  for (let polls = 1; polls <= FILE_POLL_MAX; polls += 1) {
    if (until(read)) return { read, polls, settled: true }
    await sleep(FILE_POLL_DELAY_MS)
    read = readFn(profile)
  }
  console.log(`  · note: ${what} had not settled within ${FILE_POLL_MAX} reads — the last read stands`)
  return { read, polls: FILE_POLL_MAX, settled: false }
}
const settleInstanceFile = (profile, until, what) => settleFile(readInstanceFile, profile, until, what)

// ---- profiles and boots ----------------------------------------------------
const liveBoots = []
process.on('exit', () => {
  for (const boot of liveBoots) {
    try {
      boot.child.kill('SIGKILL')
    } catch {
      /* already gone */
    }
  }
  cleanupProfiles()
})

/** A fresh scratch profile carrying the DRIVER's supplied state through the two retired carriers'
 *  import-once paths (never a hand-written instance file: its bytes are the store's own image). */
function seededProfile(name, { appStateRow = false } = {}) {
  const profile = makeFreshProfile(name)
  writeFileSync(join(profile, SECURITY_SEED), JSON.stringify({ token: null, enabled: SEEDED_GROUPS }, null, 2))
  if (appStateRow) {
    const row = {
      name: DEMO_MODULE,
      version: '1.0.0',
      source: DEMO_MODULE_SOURCE,
      hash: createHash('sha256').update(DEMO_MODULE_SOURCE, 'utf8').digest('hex'),
      capabilities: [],
      installedAt: '2026-11-03T00:00:00.000Z',
      disabled: false,
      quarantined: false,
    }
    writeFileSync(
      join(profile, APP_STATE_SEED),
      JSON.stringify({ schemaVersion: '1', [`file.modules.${DEMO_MODULE}`]: row }, null, 2),
    )
  }
  return profile
}

async function connectBoot(tag, profile, { loadEnvelope }) {
  const spawned = spawnElectron([`${USER_DATA_FLAG}${profile}`])
  const child = spawned.child
  const boot = { tag, profile, child, transport: null, client: null, stderr: '' }
  liveBoots.push(boot)
  child.stderr.on('data', (d) => {
    boot.stderr += String(d)
  })
  const transport = new ChildProcessTransport(child)
  boot.transport = transport
  const client = new Client({ name: `crossings-live-${tag}`, version: '0.1.0' })
  boot.client = client
  let timedOut = false
  let timer = null
  const timeout = new Promise((_resolve, reject) => {
    timer = setTimeout(() => {
      timedOut = true
      reject(new Error(`MCP handshake did not complete within ${HANDSHAKE_TIMEOUT_MS} ms`))
    }, HANDSHAKE_TIMEOUT_MS)
  })
  try {
    await Promise.race([client.connect(transport), timeout])
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e)
    throw new Error(
      `boot ${tag} could not open its MCP transport: ${why}${timedOut ? ' (the handshake timed out)' : ''}; ` +
        `child (code ${child.exitCode}, signal ${child.signalCode})` +
        `${boot.stderr === '' ? '' : `\n  child stderr (tail): ${boot.stderr.split('\n').slice(-12).join('\n    ')}`}`,
    )
  } finally {
    if (timer !== null) clearTimeout(timer)
  }
  if (loadEnvelope) {
    await call(client, 'provident.load', { kind: 'envelope', envelope: driverEnvelope() })
    // Settle the load: a body is dispatched only once the envelope's own nodes resolve.
    for (let polls = 0; polls < SETTLE_READS_MAX; polls += 1) {
      settlePolls += 1
      const targets = await call(client, 'provident.list_targets', {})
      const ids = (Array.isArray(targets?.nodes) ? targets.nodes : []).flatMap((n) => [n?.cssId, n?.propsId]).filter((v) => typeof v === 'string')
      if (ids.includes(OUT_ID)) return boot
      await sleep(SETTLE_DELAY_MS)
    }
    throw new Error(`boot ${tag}: the driver's envelope did not settle — \`${OUT_ID}\` is not addressable`)
  }
  return boot
}

async function teardownBoot(boot) {
  try {
    await boot.client?.close()
  } catch {
    /* already gone */
  }
  try {
    boot.transport?.close()
  } catch {
    /* already gone */
  }
  try {
    boot.child.kill('SIGKILL')
  } catch {
    /* already gone */
  }
  await sleep(300)
}

// ══════════════════════════════════════════════════════════════════════════════
// THE RUN
// ══════════════════════════════════════════════════════════════════════════════
console.log('\nCROSSINGS — both `provident-storeroom` crossings over a process boundary, and THREE of the view record\'s four families (D-94, D-95, D-98)')
console.log('='.repeat(96))

if (typeof process.env.DISPLAY !== 'string' || process.env.DISPLAY === '') {
  console.error('PREREQUISITE ERROR — no display server: DISPLAY is unset.')
  console.error('  This leg boots a REAL Electron BrowserWindow, so the renderer realm it drives cannot exist without one.')
  console.error('  FIX: `DISPLAY=:0 npm run crossings`, or wrap the run in xvfb-run.')
  console.error('  This is exit 3 — a prerequisite error, never a skip and never a green.')
  process.exit(3)
}
console.log(`  · display: DISPLAY=${process.env.DISPLAY} (prerequisite satisfied)`)
if (!existsSync(mainBundle)) {
  console.error(`\n  ✗ the built bundle is absent: ${mainBundle}`)
  console.error('  FIX: npm run build — `npm run crossings` builds first; this file never builds.')
  process.exit(1)
}

let exitCode = 0
try {
  // ══ BOOT A — the normal crossing at its raw address, and the app's own subscriber ══
  const profileA = seededProfile('provident-crossings-a')
  console.log(`\n--- BOOT A (the crossing's raw address + the app's own subscriber; no driver envelope) ---`)
  console.log(`  · scratch profile: ${profileA}`)
  console.log(`  · driver-supplied state through ${SECURITY_SEED}: enabled=[${SEEDED_GROUPS.join(', ')}]`)
  const bootA = await connectBoot('A', profileA, { loadEnvelope: false })
  console.log(`  · boot A pid ${bootA.child.pid}`)

  // ── X-1: the landing entry stands at the boot, over the boundary ────────────
  const bootRead = await call(bootA.client, 'provident.data.read', { path: [TABS_ADDRESS] })
  const bootView = recordView(bootRead)
  row(
    'X-1',
    'the normal crossing holds `[\'tabs\']` at the boot, before any act: the record stands, its `order` seat names its own tabs once each, exactly one row is active — and that row is the LANDING entry the creation repair minted',
    bootView.terms !== null && termsPassed(bootView.terms) && bootView.active.length === 1 && bootView.active[0] === 'landing',
    `provident.data.read → ${JSON.stringify(bootRead).slice(0, 420)}; terms: ${bootView.terms === null ? 'no record' : termsText(bootView.terms)}; active=[${bootView.active.join(', ')}]`,
  )

  // ── X-2: the push at the boot, read off the authored pages ─────────────────
  const bootLanding = await nodeDisplay(bootA.client, LANDING_PAGE_ID)
  const bootError = await nodeDisplay(bootA.client, ERROR_PAGE_ID)
  row(
    'X-2',
    "the app's own subscriber has ALREADY been driven from the record: the landing terminal reads display:'block' and the error terminal display:'none' on a fresh profile",
    bootLanding.display === 'block' && bootError.display === 'none',
    `${LANDING_PAGE_ID}.display=${JSON.stringify(bootLanding.display)} (read at ${bootLanding.path}) · ${ERROR_PAGE_ID}.display=${JSON.stringify(bootError.display)} (read at ${bootError.path})`,
  )

  // ── X-3: a commit at the crossing's raw address, carrying the error field ──
  const nowIso = new Date().toISOString()
  const errorRecord = {
    order: ['landing'],
    landing: { target: '/landing', active: true, label: 'Landing', lastActiveAt: nowIso, error: 'the error terminal is witness' },
  }
  const wroteError = await call(bootA.client, 'provident.data.write', { path: [TABS_ADDRESS], value: errorRecord })
  const afterErrorWrite = recordView(await call(bootA.client, 'provident.data.read', { path: [TABS_ADDRESS] }))
  const errorRowLanded =
    afterErrorWrite.value !== null &&
    afterErrorWrite.value.landing !== null &&
    typeof afterErrorWrite.value.landing === 'object' &&
    typeof afterErrorWrite.value.landing.error === 'string' &&
    afterErrorWrite.value.landing.active === true
  row(
    'X-3',
    "a whole-record WRITE at `['tabs']` through `provident.data.write` lands on the normal crossing: the standing record is the one the driver wrote, error field included",
    wroteError?.status === 'committed' && errorRowLanded,
    `data.write → ${JSON.stringify(wroteError)}; standing record → ${JSON.stringify(afterErrorWrite.value)}`,
  )

  // ── X-4: the change PUSH crossed the boundary and reached a subscriber ─────
  let pushedError = { display: null, path: null }
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    pushedError = await nodeDisplay(bootA.client, ERROR_PAGE_ID)
    if (pushedError.display === 'block') break
    await sleep(SETTLE_DELAY_MS)
  }
  const pushedLanding = await nodeDisplay(bootA.client, LANDING_PAGE_ID)
  row(
    'X-4',
    "THE CHANGE PUSH REACHES A SUBSCRIBER: the record written in X-3 moves the error terminal to display:'block' on the rendered node, without any driver-side read or write of the page",
    pushedError.display === 'block' && pushedLanding.display === 'block',
    `${ERROR_PAGE_ID}.display=${JSON.stringify(pushedError.display)} · ${LANDING_PAGE_ID}.display=${JSON.stringify(pushedLanding.display)}`,
  )

  // ── X-5: the six declarations fire on an empty value ─────────────────────
  const wroteEmpty = await call(bootA.client, 'provident.data.write', { path: [TABS_ADDRESS], value: {} })
  const afterEmpty = recordView(await call(bootA.client, 'provident.data.read', { path: [TABS_ADDRESS] }))
  row(
    'X-5',
    "the six declarations fire inside the crossing's own commit: a WRITE of `{}` is answered committed, and what STANDS is a legal record — root standing, the seat naming its own tabs once each, exactly one active, and all three field pairs present, with the LANDING entry minted back",
    wroteEmpty?.status === 'committed' && afterEmpty.terms !== null && termsPassed(afterEmpty.terms) && afterEmpty.active.length === 1 && afterEmpty.active[0] === 'landing',
    `data.write({}) → ${JSON.stringify(wroteEmpty)}; standing record → ${JSON.stringify(afterEmpty.value)}; terms: ${afterEmpty.terms === null ? 'no record' : termsText(afterEmpty.terms)}`,
  )

  // ── X-6: the two-active arm keeps the most recent ────────────────────────
  const t1 = new Date(Date.now() - 60000).toISOString()
  const t2 = new Date().toISOString()
  const twoActive = {
    order: ['alpha', 'beta'],
    alpha: { target: '/alpha', active: true, label: 'Alpha', lastActiveAt: t1 },
    beta: { target: '/beta', active: true, label: 'Beta', lastActiveAt: t2 },
  }
  const wroteTwo = await call(bootA.client, 'provident.data.write', { path: [TABS_ADDRESS], value: twoActive })
  const afterTwo = recordView(await call(bootA.client, 'provident.data.read', { path: [TABS_ADDRESS] }))
  row(
    'X-6',
    'a record naming TWO actives is repaired by the crossing: exactly one row stands active afterwards and it is the most recently active one (`beta`), which is the referent discipline the repair carries',
    wroteTwo?.status === 'committed' && afterTwo.terms !== null && afterTwo.terms.exactlyOneActive && afterTwo.active.length === 1 && afterTwo.active[0] === 'beta' && afterTwo.terms.orderNamesItsTabs,
    `data.write(two actives) → ${JSON.stringify(wroteTwo)}; standing record → ${JSON.stringify(afterTwo.value)}; terms: ${afterTwo.terms === null ? 'no record' : termsText(afterTwo.terms)}`,
  )

  // ── X-7: the record cannot be REMOVED ────────────────────────────────────
  const removed = await call(bootA.client, 'provident.data.delete', { path: [TABS_ADDRESS] })
  const afterDelete = recordView(await call(bootA.client, 'provident.data.read', { path: [TABS_ADDRESS] }))
  row(
    'X-7',
    "`\\['tabs'\\]` is an ENFORCED INVARIANT: a DELETE at the record's own address removes nothing and the record still stands, legal, afterwards",
    removed?.status === 'committed' && removed?.removed === false && afterDelete.terms !== null && termsPassed(afterDelete.terms),
    `data.delete(['tabs']) → ${JSON.stringify(removed)}; standing record → ${JSON.stringify(afterDelete.value)}`,
  )

  // ── X-8: the push is TWO-SIDED ───────────────────────────────────────────
  let backError = { display: null, path: null }
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    backError = await nodeDisplay(bootA.client, ERROR_PAGE_ID)
    if (backError.display === 'none') break
    await sleep(SETTLE_DELAY_MS)
  }
  const backLanding = await nodeDisplay(bootA.client, LANDING_PAGE_ID)
  row(
    'X-8',
    "and the push is two-sided: once the record carries no error row again, the error terminal returns to display:'none' while the landing terminal stays 'block' — the reading X-4 measured was a delivery, not a stuck paint",
    backError.display === 'none' && backLanding.display === 'block',
    `${ERROR_PAGE_ID}.display=${JSON.stringify(backError.display)} · ${LANDING_PAGE_ID}.display=${JSON.stringify(backLanding.display)}`,
  )
  await teardownBoot(bootA)

  // ══ BOOT B — the preload's declared routes, both crossings ══
  const profileB = seededProfile('provident-crossings-b', { appStateRow: true })
  console.log(`\n--- BOOT B (the preload's routes: \`tabs\` and the secure crossing; driver envelope loaded) ---`)
  console.log(`  · scratch profile: ${profileB}`)
  console.log(`  · app-state carrier seeded through ${APP_STATE_SEED}: file.modules.${DEMO_MODULE} (hash re-derived from its own source)`)
  const bootB = await connectBoot('B', profileB, { loadEnvelope: true })
  console.log(`  · boot B pid ${bootB.child.pid}`)

  // ── X-9: the route read, at a fresh boot ─────────────────────────────────
  const read9 = await drive(bootB.client, 'xg-read', 'read')
  const view9 = recordView(read9.answer)
  row(
    'X-9',
    "the `tabs` BRIDGE MEMBER reaches the same crossing from the renderer realm: `window.provident.tabs.read()` answers a committed reading whose order is `['landing']`, landing `landing`, one active row — at a fresh profile, before any act",
    read9.status === 'ok' && view9.status === 'committed' && JSON.stringify(view9.order) === JSON.stringify(['landing']) && view9.landing === 'landing' && view9.active.length === 1 && view9.active[0] === 'landing',
    `(${read9.polls} read(s)) reading → ${JSON.stringify(read9.answer)}`,
  )

  // ── X-10: a COMMIT through the declared route ────────────────────────────
  const committed = await drive(bootB.client, 'xg-commit-alpha', 'commit-alpha')
  const view10 = recordView(committed.answer?.reading)
  const receipt10 = committed.answer?.receipt
  row(
    'X-10',
    "a tab is COMMITTED through the crossing's own route: `tabs.commit(row)` answers committed, its order grows by the new id, the new tab is the ONE active row, and the landing witness moves to it — and the receipt reports `repaired: true`, because the write that made `alpha` active also de-activated the entry the landing mint had seated",
    committed.status === 'ok' && receipt10?.status === 'committed' && receipt10?.repaired === true &&
      JSON.stringify(view10.order) === JSON.stringify(['landing', 'alpha']) && view10.landing === 'alpha' && view10.active.length === 1 && view10.active[0] === 'alpha',
    `(${committed.polls} read(s)) receipt → ${JSON.stringify(receipt10)}; reading → ${JSON.stringify(committed.answer?.reading)}`,
  )

  // ── X-11: a REMOVE through the declared route ────────────────────────────
  const removedTab = await drive(bootB.client, 'xg-remove-alpha', 'remove-alpha')
  const view11 = recordView(removedTab.answer?.reading)
  row(
    'X-11',
    "a tab is REMOVED through the crossing's own route: `tabs.remove('alpha')` answers committed, the id leaves BOTH the order seat and the rows, and the landing entry is the one active row again",
    removedTab.status === 'ok' && removedTab.answer?.receipt?.status === 'committed' &&
      JSON.stringify(view11.order) === JSON.stringify(['landing']) && !view11.rowIds.includes('alpha') && view11.active.length === 1 && view11.active[0] === 'landing',
    `(${removedTab.polls} read(s)) receipt → ${JSON.stringify(removedTab.answer?.receipt)}; reading → ${JSON.stringify(removedTab.answer?.reading)}`,
  )

  // ── X-31: THE FIVE `data.*` ROUTES ANSWER FROM THIS REALM (`D-112`) ──────
  // **THE ONE ROW IN THIS TREE THAT STANDS ON THE FAR SIDE OF THE `ipcRenderer.invoke` HOP**, and it says so: the node
  // battery drives the renderer's arm and the module's adapter with that hop replaced, and this row drives the PRELOAD'S
  // OWN MEMBER instead — `window.provident.data.*` → `ipcMain.handle` → `createDataSurface` on the boot's one store. The
  // row reads the whole route set in one act: the write's `committed` answer carrying `repaired` and a MATERIALIZED `log`
  // (D-103), the read's `row` arm, the list's paths, the journal's own two entries, the delete's `removed`/`tiers`, and the
  // `absent` the second read answers — the last one being what makes the probe leave nothing behind.
  const dataRoute = await drive(bootB.client, 'xg-data-route', 'data-route')
  const dataAnswer = dataRoute.answer
  const listedPaths = Array.isArray(dataAnswer?.list?.paths) ? dataAnswer.list.paths : []
  const journalEntries = Array.isArray(dataAnswer?.journal?.entries) ? dataAnswer.journal.entries : []
  const journalled = Array.isArray(dataAnswer?.journalAfter?.entries) ? dataAnswer.journalAfter.entries : []
  row(
    'X-31',
    `THE FIVE \`data.*\` ROUTES CROSS THE BOUNDARY: \`window.provident.data.write/read/list/journal/delete\` answer §2's shapes from the boot's own surface — the write committed with \`repaired:false\` and an enumerable \`log\`, the read a \`row\` carrying the value, the list naming \`['${DATA_PROBE}']\`, the journal carrying the write before the delete and the write then the delete after it, the delete \`removed:true\` at tier \`'file'\` — and the second read answers \`absent\`, so the probe leaves no row behind`,
    dataRoute.status === 'ok' &&
      dataAnswer?.wrote?.status === 'committed' && dataAnswer?.wrote?.repaired === false && Array.isArray(dataAnswer?.wrote?.log) && dataAnswer.wrote.log.length > 0 &&
      dataAnswer?.read?.status === 'read' && dataAnswer.read.kind === 'row' && dataAnswer.read.value === 'x' &&
      listedPaths.some((path) => JSON.stringify(path) === JSON.stringify([DATA_PROBE])) &&
      journalEntries.length === 1 && journalEntries[0].kind === 'write' && JSON.stringify(journalEntries[0].path) === JSON.stringify([DATA_PROBE]) &&
      journalled.length === 2 && journalled[1].kind === 'delete' && JSON.stringify(journalled[1].path) === JSON.stringify([DATA_PROBE]) &&
      dataAnswer?.deleted?.status === 'committed' && dataAnswer.deleted.removed === true && JSON.stringify(dataAnswer.deleted.tiers) === JSON.stringify(['file']) &&
      dataAnswer?.after?.status === 'absent',
    `(${dataRoute.polls} read(s)) answer → ${JSON.stringify(dataAnswer)}`,
  )

  // ── X-12: a SECOND commit, kept for the restart ──────────────────────────
  const keptBeta = await drive(bootB.client, 'xg-commit-beta', 'commit-beta')
  const view12 = recordView(keptBeta.answer?.reading)
  row(
    'X-12',
    "a second commit leaves a record the RESTART can be read against: order `['landing','beta']` and `beta` the one active row, on the file tier",
    keptBeta.status === 'ok' && keptBeta.answer?.receipt?.status === 'committed' && JSON.stringify(view12.order) === JSON.stringify(['landing', 'beta']) && view12.active.length === 1 && view12.active[0] === 'beta',
    `(${keptBeta.polls} read(s)) reading → ${JSON.stringify(keptBeta.answer?.reading)}`,
  )

  // ── X-13: the secure crossing's RECORD address, through `security.set` ──
  // THE SUBSCRIBER IS INSTALLED BEFORE THE WRITE (`D-106`, the `X-14b` discipline): a delivery is observable only from a
  // handler, and the handler has to stand when the crossing delivers — so the counter goes up here, the `security.set` below
  // is the act that fires it, and `X-13b` reads the counter back out of the realm.
  const securitySub = await drive(bootB.client, 'xg-security-subscribe', 'security-subscribe')
  const setRecord = await drive(bootB.client, 'xg-security-set', 'security-set')
  const read13 = setRecord.answer?.reading
  row(
    'X-13',
    "the secure crossing's `['operator-settings']` address is driven through `security.set`: its `write` receipt is committed — the answer is the post-state settings carrying that receipt as its OWN `write` member — and the crossing's read answers the DRIVEN journal cap beside the seeded grant set",
    setRecord.status === 'ok' && setRecord.answer?.receipt?.write?.status === 'committed' && read13?.maxJournalLength === DRIVEN_MAX_JOURNAL &&
      Array.isArray(read13?.enabled) && SEEDED_GROUPS.every((g) => read13.enabled.includes(g)),
    `(${setRecord.polls} read(s)) set answer → ${JSON.stringify(setRecord.answer?.receipt)}; read answer → ${JSON.stringify(read13)}`,
  )

  // ── X-13b: THE SECURITY RECORD'S DELIVERY CROSSES THE BOUNDARY (`D-106`) ──
  // **MEASURED AT A SUBSCRIBER AND NOT AT A NODE, AND SAYS SO**: the app's own subscriber paints the ISOLATED pane graph, which
  // is the scope the MCP endpoints cannot read — so the delivery is counted where it arrives and the record is re-read
  // beside the counter, which is the whole of what a delivery is.
  const securityPush = await drive(bootB.client, 'xg-security-push', 'security-push')
  const pushedRecord = securityPush.answer?.record
  row(
    'X-13b',
    `THE SECURITY RECORD'S DELIVERY CROSSES THE BOUNDARY AND REACHES A SUBSCRIBER: the handler this leg installed on \`window.provident.security.onChanged\` BEFORE the write has FIRED for the \`security.set\` act X-13 drove — the instance's one subscription bound \`['${RECORD_ADDRESS}']\` and the pair, the surface handed each delivery to the composition's broadcast, and \`provident:security:changed\` carried it into this realm — and the re-read taken beside the counter carries the driven journal cap, so what arrived was a delivery and not a timer. **IT IS MEASURED AT A SUBSCRIBER AND NOT AT A NODE, AND SAYS SO**: the app's own subscriber fills the ISOLATED pane graph, which the MCP endpoints cannot read`,
    securitySub.status === 'ok' && securitySub.answer?.withdrawal === 'function' &&
      securityPush.status === 'ok' && (securityPush.answer?.hits ?? 0) >= 1 &&
      pushedRecord?.maxJournalLength === DRIVEN_MAX_JOURNAL,
    `(${securitySub.polls}+${securityPush.polls} read(s)) subscribe → ${JSON.stringify(securitySub.answer)}; hits=${JSON.stringify(securityPush.answer?.hits)}; record → ${JSON.stringify(pushedRecord)}`,
  )

  // ── X-14: the secure crossing's APP-STATE address, through `module.setDisabled` ──
  // THE SUBSCRIBER IS INSTALLED BEFORE THE WRITE (`D-104`): a delivery is observable only from a handler, and the handler has
  // to stand when the crossing delivers — so the counter is put up here, the write below is the act that should fire it, and
  // the row after this one reads the counter back out of the realm.
  const moduleSub = await drive(bootB.client, 'xg-module-subscribe', 'module-subscribe')
  const disabled = await drive(bootB.client, 'xg-module-disable', 'module-disable')
  const registry = disabled.answer?.registry
  const moduleRow = (Array.isArray(registry?.modules) ? registry.modules : []).find((m) => m && m.name === DEMO_MODULE)
  row(
    'X-14',
    "the secure crossing's `['operator-app-state']` address is driven through the operator path: `module.setDisabled` re-commits the WHOLE rows list and the registry read back carries the seeded module with `disabled: true`",
    disabled.status === 'ok' && moduleRow?.disabled === true,
    `(${disabled.polls} read(s)) registry answer → ${JSON.stringify(registry)}`,
  )

  // ── X-14b: THE APP-STATE DELIVERY CROSSES THE BOUNDARY (`D-104`; `D-82`'s `V3`) ──
  const pushed = await drive(bootB.client, 'xg-module-push', 'module-push')
  const pushRegistry = pushed.answer?.registry
  row(
    'X-14b',
    `THE APP-STATE DELIVERY CROSSES THE BOUNDARY AND REACHES A SUBSCRIBER: the handler this leg installed on \`window.provident.module.onChanged\` before the write has FIRED for the \`module.setDisabled\` act X-14 drove — the instance's one subscription bound \`['${APP_STATE_ADDRESS}']\`, the surface handed the change to the composition's broadcast, and \`provident:module:changed\` carried it into this realm — and the re-read taken beside the counter carries the disabled row, so what arrived was a delivery and not a timer. **IT IS MEASURED AT A SUBSCRIBER AND NOT AT A NODE, AND SAYS SO**: the app's own subscriber fills the ISOLATED pane graph, which the MCP endpoints cannot read`,
    moduleSub.status === 'ok' && moduleSub.answer?.withdrawal === 'function' &&
      pushed.status === 'ok' && (pushed.answer?.hits ?? 0) >= 1 &&
      (Array.isArray(pushRegistry?.modules) ? pushRegistry.modules : []).some((m) => m && m.name === DEMO_MODULE && m.disabled === true),
    `(${moduleSub.polls}+${pushed.polls} read(s)) subscribe → ${JSON.stringify(moduleSub.answer)}; hits=${JSON.stringify(pushed.answer?.hits)}; registry → ${JSON.stringify(pushRegistry)}`,
  )

  // ── X-15: BOTH FILE ADDRESSES, read from THIS process, out of the instance's own file ──
  const instance = await settleInstanceFile(
    profileB,
    (r) => r.record !== null && Array.isArray(r.record.enabled) && r.record.maxJournalLength === DRIVEN_MAX_JOURNAL && r.appState !== null,
    'both `file` addresses',
  )
  const fileRows = Array.isArray(instance.read.appState?.rows) ? instance.read.appState.rows : []
  const fileModuleRow = fileRows.find((r) => r && r.name === `file.modules.${DEMO_MODULE}`)
  row(
    'X-15',
    `BOTH file addresses STAND IN THE INSTANCE'S OWN FILE, read by the DRIVER PROCESS: \`['${RECORD_ADDRESS}']\` carries the driven journal cap and the seeded grants, \`['${APP_STATE_ADDRESS}']\` carries the rows list with the toggled module — and the file spells NO \`${EXCLUSION_ADDRESS}\` key, because a mem address has no file image`,
    instance.read.record !== null && instance.read.record.maxJournalLength === DRIVEN_MAX_JOURNAL &&
      Array.isArray(instance.read.record.enabled) && SEEDED_GROUPS.every((g) => instance.read.record.enabled.includes(g)) &&
      fileModuleRow !== undefined && fileModuleRow.value?.disabled === true &&
      !instance.read.keys.includes(EXCLUSION_ADDRESS),
    `(${instance.polls} read(s)) file keys=[${instance.read.keys.join(', ')}] · record=${JSON.stringify(instance.read.record)} · app-state rows=${JSON.stringify(fileRows)}`,
  )

  // ── X-16: the secure crossing's EXCLUSION address, and the consequence it has ──
  gestures += 1
  await call(bootB.client, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'xg-security-exclusion' }, event: 'click' })
  let afterExclusion = { ok: true, text: '' }
  let exclusionClosed = false
  for (let polls = 1; polls <= SETTLE_READS_MAX; polls += 1) {
    await sleep(SETTLE_DELAY_MS)
    afterExclusion = await callRaw(bootB.client, 'provident.get_rendered_html', {})
    if (/exclusion-closed/.test(String(afterExclusion.text))) {
      exclusionClosed = true
      break
    }
  }
  row(
    'X-16',
    "the secure crossing's `['operator-exclusion']` (mem) address is driven through `security.setExclusion`, and the write is visible AT THE BOUNDARY AS ITS CONSEQUENCE: the instance re-arms the gate on that write and the next MCP call answers `exclusion-closed`. The drive's own `{applied:true}` frame is NOT retrieved — the tier the write closes is the tier that would have carried the observation — so the consequence here and the fresh boot (X-18) are what this row rests on",
    exclusionClosed && !/renderedHtml/.test(String(afterExclusion.text)),
    `the next MCP call answered: ${String(afterExclusion.text).slice(0, 320)}`,
  )
  // Boot B is NOT restored: it ends with the mem address holding `mcp-disabled`, which is what makes
  // boot C's reading of the minted default decisive rather than an echo of a driver-side undo.
  await teardownBoot(bootB)

  // ══ BOOT C — a SECOND PROCESS on boot B's profile ══
  console.log(`\n--- BOOT C (a second process on boot B's scratch profile) ---`)
  const bootC = await connectBoot('C', profileB, { loadEnvelope: true })
  console.log(`  · boot C pid ${bootC.child.pid}`)

  // ── X-17: the tab record survived the process boundary ───────────────────
  const read17 = await drive(bootC.client, 'xg-read', 'read')
  const view17 = recordView(read17.answer)
  row(
    'X-17',
    "THE TAB RECORD SURVIVES THE PROCESS: a fresh process on the same profile reads order `['landing','beta']` off the file tier, with `beta` still the one active row",
    read17.status === 'ok' && JSON.stringify(view17.order) === JSON.stringify(['landing', 'beta']) && view17.active.length === 1 && view17.active[0] === 'beta',
    `(${read17.polls} read(s)) reading → ${JSON.stringify(read17.answer)}`,
  )

  // ── X-18: the two FILE addresses survived; the MEM address was re-minted ──
  const secureRead = await drive(bootC.client, 'xg-security-read', 'security-read')
  const registryC = await drive(bootC.client, 'xg-module-read', 'module-read')
  const secureAnswer = secureRead.answer
  const registryAnswer = registryC.answer
  const moduleRowC = (Array.isArray(registryAnswer?.modules) ? registryAnswer.modules : []).find((m) => m && m.name === DEMO_MODULE)
  row(
    'X-18',
    `THE TWO FILE ADDRESSES SURVIVE AND THE MEM ADDRESS DOES NOT: at the fresh process \`['${RECORD_ADDRESS}']\` still carries the driven journal cap with the seeded grants, \`['${APP_STATE_ADDRESS}']\` still carries the module with \`disabled: true\` — and \`['${EXCLUSION_ADDRESS}']\` reads the creation repair's minted \`mcp-enabled\`, NOT the \`mcp-disabled\` boot B ended holding`,
    secureRead.status === 'ok' && secureAnswer?.maxJournalLength === DRIVEN_MAX_JOURNAL &&
      Array.isArray(secureAnswer?.enabled) && SEEDED_GROUPS.every((g) => secureAnswer.enabled.includes(g)) &&
      secureAnswer?.exclusion === 'mcp-enabled' && moduleRowC?.disabled === true,
    `security read → ${JSON.stringify(secureAnswer)}; module read → ${JSON.stringify(registryAnswer)}`,
  )
  await teardownBoot(bootC)

  // ══ BOOT D — THE VIEW RECORD'S THREE FAMILIES: existence, the push, and the three declared routes ══
  const profileD = seededProfile('provident-crossings-view')
  console.log(`\n--- BOOT D (the view record: \`['panes']\` file · \`['focus']\` mem · \`['zones']\` mem; driver envelope loaded) ---`)
  console.log(`  · scratch profile: ${profileD}`)
  const bootD = await connectBoot('D', profileD, { loadEnvelope: true })
  console.log(`  · boot D pid ${bootD.child.pid}`)

  // ── V-1: the `file` family's EXISTENCE AND REPAIR, read out of the STORE'S OWN BYTES ──
  const profileFresh = await settleFile(
    readProfileFile,
    profileD,
    (r) => r.panes !== null,
    `the \`['${PANES_KEY}']\` family`,
  )
  const freshPanes = profileFresh.read.panes
  const freshPaneA = freshPanes === null ? null : freshPanes[MEASURED_PANE_ID]
  row(
    'V-1',
    `THE \`['${PANES_KEY}']\` FAMILY STANDS AT THE STORE'S OWN CREATION, read out of the app's profile file BY THIS PROCESS before any act: the creation repair (\`panes-must-stand\`) minted the MEASURED DEFAULT the tree states — pane \`${MEASURED_PANE_ID}\`, size ${MEASURED_PANE_SIZE}, bounds {${MEASURED_PANE_BOUNDS.min}, ${MEASURED_PANE_BOUNDS.max}} — and the file spells NEITHER \`${FOCUS_KEY}\` NOR \`${ZONES_KEY}\`, because a mem address has no file image`,
    freshPaneA !== null &&
      freshPaneA.size === MEASURED_PANE_SIZE &&
      freshPaneA.bounds?.min === MEASURED_PANE_BOUNDS.min &&
      freshPaneA.bounds?.max === MEASURED_PANE_BOUNDS.max &&
      !profileFresh.read.keys.includes(FOCUS_KEY) &&
      !profileFresh.read.keys.includes(ZONES_KEY),
    `(${profileFresh.polls} read(s)${profileFresh.settled ? '' : ', NOT settled'}) file=${PROFILE_FILE} keys=[${profileFresh.read.keys.join(', ')}] · ${PANES_KEY}=${JSON.stringify(freshPanes)}`,
  )

  // ── V-2: the crossing's OWN READ, at a fresh profile, answers all three measured defaults ──
  const freshRead = await drive(bootD.client, 'xv-read', 'view-read')
  const freshShape = freshRead.answer
  const freshShapePane = paneIn(freshShape, MEASURED_PANE_ID)
  row(
    'V-2',
    `the view record's ONE READ answers all FOUR families the creation repairs minted — the three ASSERTED HERE over the boundary, and the fourth (\`['theme']\`, the appearance family at \`file\` since D-98) left to its own battery: \`['${PANES_KEY}']\` names \`${MEASURED_PANE_ID}\` at ${MEASURED_PANE_SIZE}/{${MEASURED_PANE_BOUNDS.min},${MEASURED_PANE_BOUNDS.max}}, the focus mirror is the DECLARED EMPTY PAIR (\`entries: []\`, \`activeId: null\`), the zone family is the family naming NO ZONE (\`[]\`) — and every family reports \`source: 'record'\`, because a repair and not a default made each one stand`,
    freshRead.status === 'ok' &&
      freshShape?.status === 'committed' &&
      freshShapePane !== null &&
      freshShapePane.size === MEASURED_PANE_SIZE &&
      freshShapePane.bounds?.min === MEASURED_PANE_BOUNDS.min &&
      freshShapePane.bounds?.max === MEASURED_PANE_BOUNDS.max &&
      Array.isArray(freshShape?.focus?.entries) &&
      freshShape.focus.entries.length === 0 &&
      freshShape.focus.activeId === null &&
      Array.isArray(freshShape?.zones) &&
      freshShape.zones.length === 0 &&
      freshShape?.source?.panes === 'record' &&
      freshShape?.source?.focus === 'record' &&
      freshShape?.source?.zones === 'record',
    `(${freshRead.polls} read(s)) reading → ${JSON.stringify(freshShape)}`,
  )

  // ── V-3: THE SUBSCRIBER — installed through the app's own bridge member, before the write that must reach it ──
  const subscribed = await drive(bootD.client, 'xv-subscribe', 'view-subscribe')
  row(
    'V-3',
    "a SUBSCRIBER stands on the app's own bridge member before any write: `window.provident.view.onChanged(handler)` in the renderer realm answers a callable withdrawal, which is the route the app's own shape client registers on (`src/renderer/view-client.ts`'s `subscribe`). **The app's own subscriber is a no-op** (`startViewShape`'s `client.subscribe(() => undefined)`), so no authored node moves when the view does — this leg's handler is what makes a delivery observable, and the next row reads it",
    subscribed.status === 'ok' && subscribed.answer?.subscribed === true && subscribed.answer?.withdrawal === 'function',
    `(${subscribed.polls} read(s)) subscription answer → ${JSON.stringify(subscribed.answer)}`,
  )

  // ── V-4: the `file` route — `commitPane`, driven once, its effect read back through the crossing AND the file ──
  const paneRoute = await drive(bootD.client, 'xv-commit-pane', 'view-commit-pane')
  const paneAnswer = paneRoute.answer?.answer
  const paneReadBack = paneIn(paneRoute.answer?.reading, MEASURED_PANE_ID)
  const paneOnFile = await settleFile(
    readProfileFile,
    profileD,
    (r) => r.panes?.[MEASURED_PANE_ID]?.size === DRIVEN_PANE_SIZE,
    `the driven pane size ${DRIVEN_PANE_SIZE}`,
  )
  row(
    'V-4',
    `THE \`${PANES_KEY}\` ROUTE IS DRIVEN ONCE AND ITS EFFECT READ BACK: \`commitPane('${MEASURED_PANE_ID}', {size: ${DRIVEN_PANE_SIZE}})\` answers committed, the crossing's next read carries size ${DRIVEN_PANE_SIZE} with the standing bounds pair KEPT (the crossing composes the family over what stands), and the value is in the app's profile file — the \`file\` tier's landing-arm save, read by THIS process`,
    paneAnswer?.status === 'committed' &&
      paneReadBack !== null &&
      paneReadBack.size === DRIVEN_PANE_SIZE &&
      paneReadBack.bounds?.min === MEASURED_PANE_BOUNDS.min &&
      paneReadBack.bounds?.max === MEASURED_PANE_BOUNDS.max &&
      paneOnFile.read.panes?.[MEASURED_PANE_ID]?.size === DRIVEN_PANE_SIZE,
    `(${paneRoute.polls} read(s)) route answer → ${JSON.stringify(paneAnswer)}; read back → ${JSON.stringify(paneReadBack)}; on file (${paneOnFile.polls} read(s)) → ${JSON.stringify(paneOnFile.read.panes)}`,
  )

  // ── V-5: THE PUSH — the write above crossed the boundary and fired the subscriber ──
  const pushRead = await drive(bootD.client, 'xv-push', 'view-push')
  const pushHits = pushRead.answer?.hits
  const pushReadBack = paneIn(pushRead.answer?.reading, MEASURED_PANE_ID)
  row(
    'V-5',
    `THE CHANGE PUSH CROSSES THE BOUNDARY AND REACHES A SUBSCRIBER: the handler V-3 installed on \`window.provident.view.onChanged\` has FIRED (at least once) for the write V-4 made — the crossing's own \`onChanged\` → the preload's \`provident:view:changed\` listener → this realm — and the re-read taken in that same turn carries the written size, so what arrived was a delivery and not a timer`,
    pushRead.status === 'ok' &&
      typeof pushHits === 'number' &&
      pushHits >= 1 &&
      pushReadBack !== null &&
      pushReadBack.size === DRIVEN_PANE_SIZE,
    `(${pushRead.polls} read(s)) deliveries observed = ${JSON.stringify(pushHits)}; re-read → ${JSON.stringify(pushRead.answer?.reading?.panes)}`,
  )

  // ── V-6: the `mem` route — `commitFocus`, driven once, its effect read back ──
  const focusRoute = await drive(bootD.client, 'xv-commit-focus', 'view-commit-focus')
  const focusAnswer = focusRoute.answer?.answer
  const focusReadBack = focusRoute.answer?.reading?.focus
  const focusEntries = Array.isArray(focusReadBack?.entries) ? focusReadBack.entries : []
  row(
    'V-6',
    `THE \`${FOCUS_KEY}\` ROUTE IS DRIVEN ONCE AND ITS EFFECT READ BACK: \`commitFocus({entries: [{id: '${DRIVEN_FOCUS_ID}', target: '/alpha'}], activeId: '${DRIVEN_FOCUS_ID}'})\` answers committed, and the crossing's next read carries that ONE entry with the active id naming it — the whole mirror, handed through as one value and composed by nothing`,
    focusAnswer?.status === 'committed' &&
      focusEntries.length === 1 &&
      String(focusEntries[0]?.id) === DRIVEN_FOCUS_ID &&
      String(focusEntries[0]?.target) === '/alpha' &&
      String(focusReadBack?.activeId) === DRIVEN_FOCUS_ID,
    `(${focusRoute.polls} read(s)) route answer → ${JSON.stringify(focusAnswer)}; read back → ${JSON.stringify(focusReadBack)}`,
  )

  // ── V-7: the `mem` route — `commitZones`, driven once, its effect read back ──
  const zoneRoute = await drive(bootD.client, 'xv-commit-zones', 'view-commit-zones')
  const zoneAnswer = zoneRoute.answer?.answer
  const zoneReadBack = zoneIn(zoneRoute.answer?.reading, DRIVEN_ZONE_ID)
  row(
    'V-7',
    `THE \`${ZONES_KEY}\` ROUTE IS DRIVEN ONCE AND ITS EFFECT READ BACK: \`commitZones('${DRIVEN_ZONE_ID}', {slot, distance, size, display})\` answers committed, and the crossing's next read carries that zone with ALL FOUR members it was given — the family composed from what stands, so one act cannot erase a sibling zone`,
    zoneAnswer?.status === 'committed' &&
      zoneReadBack !== null &&
      JSON.stringify(zoneReadBack.slot) === JSON.stringify(DRIVEN_ZONE.slot) &&
      zoneReadBack.distance === DRIVEN_ZONE.distance &&
      zoneReadBack.size === DRIVEN_ZONE.size &&
      zoneReadBack.display === DRIVEN_ZONE.display,
    `(${zoneRoute.polls} read(s)) route answer → ${JSON.stringify(zoneAnswer)}; read back → ${JSON.stringify(zoneReadBack)}`,
  )
  await teardownBoot(bootD)

  // ══ BOOT E — a SECOND PROCESS on boot D's profile: the `file` family against the two `mem` ones ══
  console.log(`\n--- BOOT E (a second process on boot D's scratch profile) ---`)
  const bootE = await connectBoot('E', profileD, { loadEnvelope: true })
  console.log(`  · boot E pid ${bootE.child.pid}`)
  const survivedRead = await drive(bootE.client, 'xv-read', 'view-read')
  const survivedShape = survivedRead.answer
  const survivedPane = paneIn(survivedShape, MEASURED_PANE_ID)
  const profileAtE = readProfileFile(profileD)

  // ── V-8: the `file` family SURVIVED the process ──
  row(
    'V-8',
    `THE \`${PANES_KEY}\` FAMILY SURVIVES THE PROCESS: a FRESH process on the same profile reads pane \`${MEASURED_PANE_ID}\` at the size the previous process wrote (${DRIVEN_PANE_SIZE}) with \`source: 'record'\`, and the value stands in the profile file's own bytes at this boot too — the \`file\` tier is the crossing's durable one`,
    survivedRead.status === 'ok' &&
      survivedPane !== null &&
      survivedPane.size === DRIVEN_PANE_SIZE &&
      survivedShape?.source?.panes === 'record' &&
      profileAtE.panes?.[MEASURED_PANE_ID]?.size === DRIVEN_PANE_SIZE,
    `(${survivedRead.polls} read(s)) pane → ${JSON.stringify(survivedPane)} (source ${JSON.stringify(survivedShape?.source?.panes)}); on file → ${JSON.stringify(profileAtE.panes)}`,
  )

  // ── V-9: the focus mirror was RE-MINTED, and never had a file image ──
  const survivedFocus = survivedShape?.focus
  const survivedFocusEntries = Array.isArray(survivedFocus?.entries) ? survivedFocus.entries : null
  row(
    'V-9',
    `THE \`${FOCUS_KEY}\` MIRROR DOES NOT SURVIVE THE PROCESS: the fresh process reads the DECLARED EMPTY PAIR — no entry, no active id — and NOT the \`${DRIVEN_FOCUS_ID}\` mirror boot D ended holding, because a mem address can never come from a file and \`focus-must-stand\` re-mints it at every construction; the profile file spells no \`${FOCUS_KEY}\` key, which is the mechanism stated as a measurement`,
    survivedRead.status === 'ok' &&
      survivedFocusEntries !== null &&
      survivedFocusEntries.length === 0 &&
      survivedFocus?.activeId === null &&
      survivedShape?.source?.focus === 'record' &&
      !profileAtE.keys.includes(FOCUS_KEY),
    `(${survivedRead.polls} read(s)) focus → ${JSON.stringify(survivedFocus)} (source ${JSON.stringify(survivedShape?.source?.focus)}); file keys=[${profileAtE.keys.join(', ')}]; a \`${FOCUS_KEY}\` key on file=${profileAtE.keys.includes(FOCUS_KEY)}`,
  )

  // ── V-10: the zone family was RE-MINTED, and never had a file image ──
  const survivedZones = Array.isArray(survivedShape?.zones) ? survivedShape.zones : null
  row(
    'V-10',
    `THE \`${ZONES_KEY}\` FAMILY DOES NOT SURVIVE THE PROCESS EITHER: the fresh process reads the family naming NO ZONE — \`[]\`, not the \`${DRIVEN_ZONE_ID}\` zone boot D ended holding — because that address is mem as well and \`zones-must-stand\` re-mints \`{}\` at every construction; the profile file spells no \`${ZONES_KEY}\` key, so the write never had a file image to survive in`,
    survivedRead.status === 'ok' &&
      survivedZones !== null &&
      survivedZones.length === 0 &&
      survivedShape?.source?.zones === 'record' &&
      !profileAtE.keys.includes(ZONES_KEY),
    `(${survivedRead.polls} read(s)) zones → ${JSON.stringify(survivedShape?.zones)} (source ${JSON.stringify(survivedShape?.source?.zones)}); a \`${ZONES_KEY}\` key on file=${profileAtE.keys.includes(ZONES_KEY)}`,
  )
  await teardownBoot(bootE)
} catch (e) {
  failures += 1
  console.error(`\n  ✗ the leg could not complete: ${e instanceof Error ? e.message : String(e)}`)
}

// ---- the reading ------------------------------------------------------------
console.log('\n' + '-'.repeat(96))
console.log(`CROSSINGS RESULT: ${failures} failure(s) — ${rowsChecked} row(s) checked`)
console.log(
  `  MCP calls made: ${MCP_CALLS.length} (of which ${settlePolls} are the envelope-settle ` +
  `\`provident.list_targets\` polls, whose count follows the load's timing — the driver's own calls ` +
  `are ${MCP_CALLS.length - settlePolls}); acts dispatched: ${gestures}; observation dumps: ${dumps}`,
)
if (failures === 0) exitCode = 0
else exitCode = 1
process.exit(exitCode)
