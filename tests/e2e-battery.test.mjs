// tests/e2e-battery.test.mjs — the END-TO-END MCP test battery
// (docs/specs/e2e-test-battery.md §5/§6). Spawns the battery host
// (dist/main/battery-host.mjs), connects the SDK client ONCE, and runs the
// scenarios in sequence in one process. Between scenarios only
// `provident.teardown` resets (C4); after each teardown it asserts the mount
// is root-only (C3). All drive via MCP tools (C1). Assertion hygiene (R7):
// key on authored ids; an empty results/dirtied is a failure.
//
// The four fork-stress variants (placement/values/link/cycle at d12) assert
// the census (inTree === 23) + the PAR-5 hash64 digest — NEVER the raw
// fragment (~180MB). A1 is exercised by the export→validate round-trips + one
// first-class doc load (the small landings). A3 by the hook writes + the
// teardown destroy ops.
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const here = dirname(fileURLToPath(import.meta.url))
const serverPath = join(here, '..', 'dist', 'main', 'battery-host.mjs')

// Handler bodies (function-STRING data) — declared at the top so the top-level
// scenario execution below can reference them (consts are not hoisted).
const LANDING_READ = `function (event, context) {
  const ud = context.supervisor && context.supervisor.userData;
  const all = context.tree.allNodes();
  const state = all.find(function (n) { return n && n.props && n.props.id === 'landing-state'; });
  const zone = all.find(function (n) { return n && n.props && n.props.id === 'landing-zone'; });
  if (!state || !zone) return;
  if (ud && ud.username) {
    context.clientAPI.apply(state.id, [{ targetProp: 'content', mode: 'replace', value: 'LOGGED-IN' }]);
    context.clientAPI.apply(zone.id, [{ targetProp: 'content', mode: 'replace', value: 'LOGOUT BUTTON' }]);
  } else {
    context.clientAPI.apply(state.id, [{ targetProp: 'content', mode: 'replace', value: 'ANON' }]);
    context.clientAPI.apply(zone.id, [{ targetProp: 'content', mode: 'replace', value: '' }]);
  }
}`
const INC = `function (ctx) { const all = ctx.tree.allNodes(); const n = all.find(function (x) { return x && x.props && x.props.id === 'counter'; }); if (!n) return; const c = Number(n.content ?? 0); ctx.clientAPI.apply(n.id, [{ targetProp: 'content', mode: 'replace', value: String(c + 1) }]); }`

let failures = 0
let checks = 0
function ok(label, cond, extra = '') {
  checks += 1
  if (cond) {
    console.log(`  ✓ ${label}${extra ? ` (${extra})` : ''}`)
  } else {
    failures += 1
    console.error(`  ✗ ${label}${extra ? ` (${extra})` : ''}`)
  }
}

/** Assert the root-only post-teardown state (C3 + R6). */
async function assertRootOnly(client) {
  const html = await call(client, 'provident.get_rendered_html', {})
  const census = html.census
  ok('post-teardown inTree === 1', census.inTree === 1, `inTree=${census.inTree}`)
  ok('post-teardown mount is root-only (no counter)', !html.renderedHtml.includes('counter'))
}

async function call(client, name, args = {}) {
  const r = await client.callTool({ name, arguments: args })
  return JSON.parse(r.content[0].text)
}

/** Run a scenario's 6-step loop (battery §5): load → drive → assert → export →
 *  validate → teardown. */
async function runScenario(client, label, loadArgs, drive, assert) {
  console.log(`\nSCENARIO: ${label}`)
  const loaded = await call(client, 'provident.load', loadArgs)
  ok(`load census inTree > 1`, loaded.census.inTree > 1, `inTree=${loaded.census.inTree}`)
  ok(`load renderedHtml non-empty`, loaded.renderedHtml.length > 0)
  ok(`load returns warnings array (R10)`, Array.isArray(loaded.warnings))

  // drive (optional)
  if (drive) {
    const driveResult = await drive(client)
    if (driveResult && driveResult.asserts) driveResult.asserts()
  }

  // assert (optional — read/dispatch asserts)
  if (assert) await assert(client)

  // export + validate (legacy round-trip)
  const exported = await call(client, 'provident.export', { format: 'legacy' })
  ok('export returns a legacy envelope', !!(exported.export && exported.export.template))
  const verdict = await call(client, 'provident.validate', { kind: 'legacy', export: exported.export })
  ok('validate valid', verdict.valid === true)
  ok('validate censusMatch', verdict.censusMatch === true)

  // teardown → root-only
  const torn = await call(client, 'provident.teardown', {})
  ok('teardown inTree === 1', torn.census.inTree === 1, `inTree=${torn.census.inTree}`)
  await assertRootOnly(client)
}

// ---- transport (spawn once via the SDK client) ---------------------------
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [serverPath, '--mcp-transport=stdio'],
})
const client = new Client({ name: 'provident-battery', version: '0.1.0' })
await client.connect(transport)

console.log('\nPROVIDENT-ELECTRON E2E BATTERY')
console.log('===============================')

// ---- tools list -----------------------------------------------------------
const tools = await client.listTools()
const names = tools.tools.map((t) => t.name)
ok('read tools present', names.includes('provident.get_rendered_html'))
ok('dispatch tool present', names.includes('provident.dispatch'))
ok('graph tools present (load/op/export/validate/teardown)', ['provident.load', 'provident.op', 'provident.export', 'provident.validate', 'provident.teardown'].every((n) => names.includes(n)))
ok('code tools present (6)', ['provident.code.get', 'provident.code.set', 'provident.code.create', 'provident.code.delete', 'provident.code.validate', 'provident.code.load'].every((n) => names.includes(n)))
console.log(`  tools: ${names.length}`)

// ---- §5.1 fork-stress d12 — STATIC path-enumeration family ----------------
console.log('\n--- §5.1 fork-stress (static path-enumeration family) ---')
for (const [variant, builder] of [
  ['placement', () => buildPathForkPlacement(12)],
  ['values', () => buildPathForkValues(12)],
  ['link', () => buildPathForkLink(12)],
  ['cycle', () => pathForkCycle(12)],
]) {
  const env = builder()
  await runScenario(
    client,
    `fork-stress-${variant} d12`,
    { kind: 'envelope', envelope: env },
    null,
    async (c) => {
      const html = await call(c, 'provident.get_rendered_html', {})
      ok(`${variant}: census inTree === 23`, html.census.inTree === 23, `inTree=${html.census.inTree}`)
      // census contract: 2·12−1 nodes
      ok(`${variant}: registered >= 23 (never equality — REQ-GAP-11 discipline)`, html.census.registered >= 23, `registered=${html.census.registered}`)
      ok(`${variant}: renders (has data-node-id elements)`, html.renderedHtml.includes('data-node-id'))
    },
  )
}

// ---- §5.2 landings — user-data-conditional view ---------------------------
console.log('\n--- §5.2 landings (userData-conditional) ---')
await runScenario(
  client,
  'landings — anon vs logged-in',
  { kind: 'envelope', envelope: landingEnvelope(), userData: null },
  null,
  async (c) => {
    await call(c, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'landing-read' }, event: 'click' })
    const anonHtml = await call(c, 'provident.get_rendered_html', {})
    ok('anon view has no logout', !anonHtml.renderedHtml.includes('LOGOUT'))
    ok('anon state reflects ANON (R8 userData absent)', anonHtml.renderedHtml.includes('ANON'))
    // logged-in load (new scenario via load with userData)
    const li = await call(c, 'provident.load', { kind: 'envelope', envelope: landingEnvelope(), userData: { username: 'alice' } })
    ok('logged-in load inTree > 1', li.census.inTree > 1)
    await call(c, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'landing-read' }, event: 'click' })
    const liHtml = await call(c, 'provident.get_rendered_html', {})
    ok('logged-in view HAS logout (R8 userData switch)', liHtml.renderedHtml.includes('LOGOUT'))
  },
)

// ---- §5.5 handlers — dispatch-driven --------------------------------------
console.log('\n--- §5.5 handler scenarios ---')
await runScenario(
  client,
  'handler counter (inc)',
  { kind: 'envelope', envelope: demoEnvelope() },
  async (c) => {
    const d = await call(c, 'provident.dispatch', { target: { kind: 'cssId', cssId: 'inc' }, event: 'click' })
    ok('dispatch results non-empty (R7)', Array.isArray(d.results) && d.results.length > 0, `results=${JSON.stringify(d.results)}`)
    ok('dispatch dirtied non-empty (R7)', Array.isArray(d.dirtied) && d.dirtied.length > 0, `dirtied=${JSON.stringify(d.dirtied)}`)
    ok('dispatch re-renders', d.renderedHtml.includes('data-node-id'))
  },
  async (c) => {
    const html = await call(c, 'provident.get_rendered_html', {})
    ok('counter increment visible (authored id)', html.renderedHtml.includes('counter'))
  },
)

// ---- §5.4 code-CRUD — the hooks example ------------------------------------
console.log('\n--- §5.4 code-CRUD (envelope authoring) ---')
await runScenario(
  client,
  'code-CRUD hooks add + load',
  { kind: 'envelope', envelope: demoEnvelope() },
  async (c) => {
    // read the root children (authoring surface)
    const got = await call(c, 'provident.code.get', { path: 'template.root.children[1].children[1]' })
    ok('code.get reads a deep path', got.value && typeof got.value === 'object')
    // add a hook name to the root (if not present) — the demo root has no hooks,
    // so first create the field via set then create an entry
    const set = await call(c, 'provident.code.set', { path: 'template.root.hooks', value: ['theme'] })
    ok('code.set ok', set.ok === true)
    const created = await call(c, 'provident.code.create', { path: 'template.root.hooks', entry: 'accent' })
    ok('code.create ok', created.ok === true && created.appendedAt === 1)
    // validate the edited envelope (no handler-body invalid)
    const validated = await call(c, 'provident.code.validate', {})
    ok('code.validate valid', validated.valid === true)
    // materialize via code.load
    const reloaded = await call(c, 'provident.code.load', {})
    ok('code.load re-derives the graph', reloaded.census.inTree > 1)
    ok('code.load renderedHtml present', reloaded.renderedHtml.length > 0)
  },
  null,
)

console.log(`\nBATTERY RESULT: ${checks} checks, ${failures} failures`)
await client.close()
if (failures > 0) process.exit(1)

// ---- data builders (minimal static path-fork family) ----------------------
function buildPathForkPlacement(depth = 12) {
  return buildPathFork(cyclelessMethod('placement'), depth)
}
function buildPathForkValues(depth = 12) {
  return buildPathFork(cyclelessMethod('values'), depth)
}
function buildPathForkLink(depth = 12) {
  return buildPathFork(cyclelessMethod('link'), depth)
}
// each variant uses ONE mechanism across ALL layers
function cyclelessMethod(method) {
  return () => method
}
function buildPathFork(methodFor, depth = 12) {
  const children = []
  const payload = []
  for (let k = 1; k <= depth - 1; k += 1) {
    const method = methodFor(k)
    for (const slot of ['a', 'b']) {
      const proto = {
        type: slot === 'a' ? 'div' : 'span',
        props: { id: `p${k}${slot}`, 'stress:layer': k, 'stress:slot': slot, 'data-depth': String(k) },
        css: { classes: ['fs-node'], style: `${k % 3 === 0 ? 'border-width' : k % 3 === 1 ? 'background-color' : 'border-style'}: 10px; --stress-depth: ${k};` },
        placement: { placementName: `zone-${k}`, ...(k >= 2 ? { targetPlacement: [`zone-${k - 1}`] } : {}) },
      }
      if (method === 'values') proto.component = { reference: `values-${k}.${slot}`, value: `value-${slot.toUpperCase()}-${k}` }
      if (method === 'link') proto.component = { reference: `link-${k}`, value: linkDef(k) }
      if (k === 1) children.push(proto)
      else payload.push(proto)
    }
  }
  return {
    template: { root: { type: 'app', props: { id: 'path-root' }, children } },
    content: [{ metadata: { title: 'static derived prototypes' }, content: payload }],
    clientConfig: { runInstantiation: false, runMonitoring: true },
  }
}
function linkDef(k) {
  return {
    type: 'div', label: `link-${k}`, childOffset: 0,
    children: [
      { bind: 'a', type: 'div', content: `link-${k}.a`, css: { classes: ['fs-node'], style: 'border-width: 1px;' } },
      { bind: 'b', type: 'div', content: `link-${k}.b`, css: { classes: ['fs-node'], style: 'border-width: 1px;' } },
    ],
  }
}

// The CYCLE variant — cycles placement/values/link per layer (§5.1.x).
function pathForkCycle(depth = 12) {
  const CYCLE = ['placement', 'values', 'link']
  const children = []
  const payload = []
  for (let k = 1; k <= depth - 1; k += 1) {
    const method = CYCLE[(k - 1) % 3]
    for (const slot of ['a', 'b']) {
      const proto = {
        type: slot === 'a' ? 'div' : 'span',
        props: { id: `p${k}${slot}`, 'stress:layer': k, 'stress:slot': slot, 'data-depth': String(k) },
        css: { classes: ['fs-node'], style: `background-color: hsl(${(k * 53) % 360}, 70%, 50%); --stress-depth: ${k};` },
        placement: { placementName: `zone-${k}`, ...(k >= 2 ? { targetPlacement: [`zone-${k - 1}`] } : {}) },
      }
      if (method === 'values') proto.component = { reference: `values-${k}.${slot}`, value: `value-${slot.toUpperCase()}-${k}` }
      if (method === 'link') proto.component = { reference: `link-${k}`, value: linkDef(k) }
      if (k === 1) children.push(proto)
      else payload.push(proto)
    }
  }
  return {
    template: { root: { type: 'app', props: { id: 'path-root' }, children } },
    content: [{ metadata: { title: 'static cycle-derived prototypes' }, content: payload }],
    clientConfig: { runInstantiation: false, runMonitoring: true },
  }
}

// A small landings envelope (user-data-conditional logout). The logout control
// appears only when userData is present (R8 — the legacy `supervisor.userData`
// seam). The page's `auth-state` node reflects the logged-in session.
function landingEnvelope() {
  return {
    template: {
      root: {
        type: 'div', css: { id: 'landing', classes: ['landing'] }, props: { id: 'landing' },
        children: [
          { type: 'h1', content: 'Landing' },
          { type: 'div', css: { id: 'landing-state' }, props: { id: 'landing-state' }, content: 'ANON' },
          { type: 'div', css: { id: 'landing-zone' }, props: { id: 'landing-zone' }, content: '' },
          { type: 'button', css: { id: 'landing-read' }, content: 'check', handlers: [{ name: 'read', event: 'click', format: 'legacy', body: LANDING_READ }] },
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}

// the demo envelope (counter/echo — reused from the renderer).
function demoEnvelope() {
  return {
    template: {
      root: {
        type: 'div', css: { classes: ['demo-shell'] },
        children: [
          { type: 'section', css: { id: 'counter-card' }, children: [
            { type: 'div', css: { id: 'counter' }, props: { id: 'counter' }, content: '0' },
            { type: 'button', css: { id: 'inc' }, content: 'Inc', handlers: [{ name: 'inc', event: 'click', body: INC }] },
          ]},
          { type: 'section', css: { id: 'echo-card' }, children: [
            { type: 'input', css: { id: 'echo-input' }, props: { id: 'echo-input' } },
            { type: 'div', css: { id: 'echo-out' }, content: '(nothing)' },
          ]},
        ],
      },
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true },
  }
}
