/**
 * LIVE CDP DRIVER — `U-STORE-TABS-RECORD` (`T2`)'s POINTER-CARRYING DRIVER.
 *
 * AUTHORITY: `docs/specs/store-tabs-record.md` `§5.1` item `3b` + `§5.2` item `7` + `§0D` item `3`
 * (the architect's `[U]`-evidence-layer ruling: option `(b)` — the unit's OWN live driver at its
 * own `tests/*-live.mjs` path, run by a LITERAL COMMAND LINE so that NO `scripts` KEY IS ADDED —
 * `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET as set-equality against the
 * landed keys plus exactly `ui`, so a config change cannot satisfy it).
 *
 * RUN FORM (literal, no `npm run` key):   node tests/store-tabs-record-live.mjs
 * Exit 0 when every RUN row holds; 1 when any RUN row fails; 2 on a driver/infra fatal.
 *
 * WHAT IT REUSES: the in-tree CDP pattern already proven live —
 * `demo/pane-drag-demo/run-live.mjs`'s `Input.dispatchMouseEvent` with REAL COORDINATES and REAL
 * BUTTON STATE (`:136` mousePressed/button:'left', `:142` mouseMoved/buttons:1, `:147`
 * mouseReleased) — plus that suite's launch vector and cleanup discipline: a FRESH
 * `--provident-user-data=<mkdtemp>` profile per boot, swept after.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════════
 * THE DECLARED BOUND (`§5.2` item `7`(b); `§0D` item `3`(b)) — DECLARED, NOT WAIVED.
 * ══════════════════════════════════════════════════════════════════════════════════════════════
 * (i)  A CDP CLICK DOES NOT MAKE THE SURFACE AGENT-DRIVABLE. The MCP tool surface carries an
 *      event NAME and NO COORDINATES (`S-d9`,
 *      `docs/specs/provident-electron-shell-chrome-handoff-review.md:185`), so a session reached
 *      through MCP can start/abort deterministically but cannot commit a magnitude. Nothing in
 *      this file's output may be read as proof of agent-drivability.
 * (ii) A SYNTHETIC CLICK IS NOT A HUMAN'S EYE ON A PAINTED BOX. The rows below observe STATE
 *      (store reads, DOM presence, `dispatch` dirtied sets). The painted/visual rows are the
 *      `MANUAL OPERATOR` set in `docs/specs/store-tabs-record-live-battery.md` and are NOT taken
 *      here — they need a human at the window, and no tool output stands in for them.
 *
 * ══════════════════════════════════════════════════════════════════════════════════════════════
 * HOW THIS DRIVER REACHES THE RECORD — READ THIS BEFORE TRUSTING ANY ROW.
 * ══════════════════════════════════════════════════════════════════════════════════════════════
 * THE PAGE'S OWN SURFACE CARRIES NO STORE HANDLE. Measured on this tree: the page's only global is
 * `window.provident`, which carries exactly `ready · onRequest · sendReply · notify · security ·
 * module · store` — the PRELOAD BRIDGE (three IPC members: `store.get` / `store.put` /
 * `store.onFileChanged`). It exposes neither the wired `GraphStore` nor any tab-record read, and
 * the app's MCP surface exposes no tabs tool, no tabs resource and no node carrying the record
 * (`§2.6` item 3 is that fact stated as a contract).
 *
 * So this driver reaches the APP'S OWN BOOT-STORE through the renderer's own module identity:
 * `await import(document.baseURI + "renderer.js")` answers the SAME module instance the page's
 * `<script type="module" src="./renderer.js">` already evaluated, and that module's exported
 * `getWiredGraphStore()` answers THE store the app booted (hand-off → `hydrate` → the slice boot
 * step → the constraint member). Every store reading below is therefore a reading of the ASSEMBLED
 * APP'S OWN store — and `A-` rows record what the PRELOAD BRIDGE alone answers, so the gap between
 * the two is stated rather than hidden.
 *
 * THE `APP` COLUMN OF EVERY ROW MEANS: driven in / read off THE RUNNING APP's own realm.
 * A row whose subject is only reachable through the module's exported seam (rather than through a
 * user gesture) says so in its own `observed` text.
 * ══════════════════════════════════════════════════════════════════════════════════════════════
 */
import { spawn, execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..')
const electronBinary = existsSync(join(repoRoot, 'node_modules', '.bin', 'electron'))
  ? join(repoRoot, 'node_modules', '.bin', 'electron')
  : 'electron'
const MCP_CLI = join(repoRoot, 'scripts', 'mcp-cli.mjs')

/** THE UNIT'S OWN SPEC — cited per row as `clause`. */
const SPEC = 'docs/specs/store-tabs-record.md'

let CDP_PORT = 9400
let MCP_PORT = 3900

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ── THE ROW LOG — one line per row: `id · verdict · clause · observed`. ────────────────────────
const rows = []
function record(id, verdict, clause, observed, extra = {}) {
  rows.push({ id, verdict, clause, observed, ...extra })
  console.log(`${id} · ${verdict} · ${clause} · ${observed}`)
}
const counts = { PASS: 0, FAIL: 0, PARKED: 0, CONTROL: 0 }

// ── THE SCRATCH PROFILE (fresh per boot, swept after — the sibling drivers' discipline). ──────
const profiles = []
function scratchProfile() {
  const dir = mkdtempSync(join(tmpdir(), 't2-live-'))
  profiles.push(dir)
  return dir
}
function seedRecord(dir, record_) {
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'provident-settings.json'), JSON.stringify(record_, null, 2))
}
function readPersisted(dir) {
  const p = join(dir, 'provident-settings.json')
  if (!existsSync(p)) return null
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch (e) {
    return { unparseable: String(e) }
  }
}

// ── THE LAUNCH VECTOR + THE T-8 PREFLIGHT (no stale app of THIS driver may hold the port). ────
function killStale(port) {
  try {
    const out = execFileSync('bash', ['-c', `ps -eo pid,args | grep -F "remote-debugging-port=${port}" | grep -v grep | awk '{print $1}'`], { encoding: 'utf8' })
    for (const pid of out.split('\n').map((s) => s.trim()).filter(Boolean)) {
      try { process.kill(Number(pid), 'SIGKILL') } catch { /* already gone */ }
    }
  } catch { /* no stale machinery — proceed */ }
}

async function bootApp(profileDir, { cold = false } = {}) {
  const cdp = ++CDP_PORT
  const mcp = ++MCP_PORT
  killStale(cdp)
  if (cold) {
    // A COLD TIER, EXACTLY: the profile exists and carries NO settings file at all, so the
    // hand-off answers `[]` (the first-ever-boot case `§3.3` item 7 names).
    rmSync(join(profileDir, 'provident-settings.json'), { force: true })
  }
  const child = spawn(
    electronBinary,
    [
      '.',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--provident-user-data=${profileDir}`,
      `--remote-debugging-port=${cdp}`,
      `--mcp-port=${mcp}`,
    ],
    // DETACHED, so the app is its OWN PROCESS GROUP: `shutdown()` then kills the whole tree.
    // Killing only the parent leaves Electron's renderer/GPU/zygote children alive, and those
    // children keep the scratch profile directory busy — which is how a run leaves residue behind
    // and, worse, how a later boot of the same port meets a half-dead app.
    { cwd: repoRoot, stdio: ['ignore', 'ignore', 'ignore'], detached: true },
  )
  let wsUrl = null
  for (let i = 0; i < 90; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${cdp}/json`)
      const list = await res.json()
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) { wsUrl = page.webSocketDebuggerUrl; break }
    } catch { /* not up yet */ }
    await sleep(400)
  }
  if (wsUrl === null) { child.kill('SIGKILL'); throw new Error(`boot: no CDP page on ${cdp}`) }
  const cdpc = await connectCdp(wsUrl)
  // THE APP IS READY WHEN ITS BOOT-STORE ANSWERS — the renderer's main() has reached the slice
  // boot step (i.e. `getWiredGraphStore()` answers a store with the tabs root declared).
  let ready = false
  for (let i = 0; i < 60; i++) {
    const probe = await cdpc.evaluate(`(async()=>{try{const m=await import(new URL("./renderer.js",document.baseURI).href);const s=m.getWiredGraphStore();const r=s.resolve("file.tabs.order");return JSON.stringify({ok:true,answer:r&&typeof r==="object"?("found" in r?"found:"+r.found:"reason:"+r.reason):String(r)})}catch(e){return JSON.stringify({ok:false,err:String(e).slice(0,120)})}})()`)
    ready = typeof probe === 'string' && probe.startsWith('{"ok":true')
    if (ready) break
    await sleep(400)
  }
  if (!ready) { child.kill('SIGKILL'); throw new Error('boot: the app boot-store never answered') }
  return { child, cdp: cdpc, mcpPort: mcp, profile: profileDir }
}

function shutdown(app) {
  try { app.cdp.close() } catch { /* already closed */ }
  // THE WHOLE PROCESS TREE (the app was spawned detached as its own group): the parent's pid
  // NEGATED addresses every child it spawned, so no renderer/GPU/zygote process outlives the row.
  try { process.kill(-app.child.pid, 'SIGKILL') } catch { /* already gone */ }
  try { app.child.kill('SIGKILL') } catch { /* already gone */ }
}

// ── CDP PLUMBING (raw WebSocket — the sibling drivers' pattern). ──────────────────────────────
async function connectCdp(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let id = 0
  const pending = new Map()
  const consoleLines = []
  await new Promise((res, rej) => {
    ws.addEventListener('open', res)
    ws.addEventListener('error', (e) => rej(new Error(`ws open failed: ${e.message ?? '?'}`)))
  })
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(String(ev.data))
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else resolve(msg.result)
    } else if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLines.push((msg.params?.args ?? []).map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 240))
    } else if (msg.method === 'Runtime.exceptionThrown') {
      consoleLines.push('EXCEPTION ' + String(msg.params?.exceptionDetails?.exception?.description ?? '').slice(0, 240))
    }
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const mid = ++id
    pending.set(mid, { resolve, reject })
    ws.send(JSON.stringify({ id: mid, method, params }))
  })
  await send('Runtime.enable')
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.exceptionDetails) throw new Error(`evaluate threw: ${String(r.exceptionDetails.exception?.description ?? JSON.stringify(r.exceptionDetails)).slice(0, 300)}`)
    return r.result?.value
  }
  return {
    send,
    evaluate,
    consoleLines,
    close() { try { ws.close() } catch { /* noop */ } },
  }
}

// ── THE REAL-INPUT PRIMITIVES (`run-live.mjs:136/142/147` — real coordinates, real button state) ─
async function boxOf(cdp, selector) {
  const raw = await cdp.evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return null;const r=el.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height,hit:(document.elementFromPoint(Math.round(r.x+r.width/2),Math.round(r.y+r.height/2))||{}).id||null})})()`)
  return raw === null ? null : JSON.parse(raw)
}
/** Aim at an authored element THE WAY AN OPERATOR WOULD: scroll it into view, then take a press
 *  point that HIT-TESTS TO IT — so a press reported as "nothing happened" provably landed on the
 *  element and not beside it. Answers `{ onNode:false }` when no sample point reaches the element,
 *  which is itself a reading (the element is not pointer-reachable in this window). */
async function aimAt(cdp, selector) {
  const raw = await cdp.evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)return JSON.stringify({missing:true});
    el.scrollIntoView({block:'center'});
    const b=el.getBoundingClientRect();
    const cands=[[b.x+b.width/2,b.y+b.height/2],[b.x+8,b.y+b.height/2],[b.x+b.width/2,b.y+8],[b.x+8,b.y+8]];
    for(const [x,y] of cands){const px=Math.round(x),py=Math.round(y);const hit=document.elementFromPoint(px,py);
      if(hit&&(hit===el||el.contains(hit)))return JSON.stringify({x:px,y:py,w:b.width,h:b.height,onNode:true,hit:String(hit.nodeName)+'#'+(hit.id||'-')+'.'+String(hit.className||'-'),scrollY:Math.round(window.scrollY)});}
    return JSON.stringify({x:null,y:null,w:b.width,h:b.height,onNode:false,hit:'none',scrollY:Math.round(window.scrollY)});})()`)
  return JSON.parse(raw)
}

async function realPress(cdp, x, y) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await sleep(90)
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
  await sleep(220)
}

// ── THE MCP INSTRUMENT (a LITERAL command line, its own exit code — the landed sibling form). ─
function runMcp(port, command, args = []) {
  const cmd = ['node', MCP_CLI, '--target', 'http', '--port', String(port), command, ...args]
  try {
    const out = execFileSync(cmd[0], cmd.slice(1), { cwd: repoRoot, encoding: 'utf8', timeout: 60000 })
    return { cmd: cmd.join(' '), exit: 0, out }
  } catch (e) {
    return { cmd: cmd.join(' '), exit: typeof e.status === 'number' ? e.status : 1, out: String(e.stdout ?? '') + String(e.stderr ?? '') }
  }
}

// ── THE PAGE-SIDE EVALUATION HELPERS (all read THE APP'S OWN STORE). ──────────────────────────
const H = `const m=await import(new URL("./renderer.js",document.baseURI).href);const s=m.getWiredGraphStore();const R=(n)=>s.resolve(n);`
const evalStore = (cdp, body) => cdp.evaluate(`(async()=>{${H}${body}})()`)

/** Normalise a `resolve` answer into a FULLY EXPLICIT record: every declared member of the read
 *  surface is present, so an `undefined` member is recorded as `undefined` rather than dropped by
 *  `JSON.stringify` (the answer's own shape is `§2.5`'s declared read surface — `found`, `value`,
 *  `tier`, `cache`, `name`, and the read-side refusal's `reason`/`step`). */
const SHAPE = `const shape=(a)=>({ found: a && a.found === true, value: a ? a.value : undefined,
  tier: a && "tier" in a ? a.tier : undefined, cache: a && "cache" in a ? a.cache : undefined,
  name: a ? a.name : undefined, status: a && "status" in a ? a.status : undefined,
  reason: a && "reason" in a ? a.reason : undefined, step: a && "step" in a ? a.step : undefined,
  segment: a && "segment" in a ? a.segment : undefined, owner: a && "owner" in a ? a.owner : undefined });
  const J=(o)=>JSON.stringify(o,(k,v)=>v===undefined?"<undefined>":v);`

/** The record as the APP holds it: order + every member entry + the constraint member's cells. */
const readRecord = (cdp, ids) => evalStore(cdp, `
  ${SHAPE}
  const order = shape(R("file.tabs.order"));
  const entries = {};
  for (const id of ${JSON.stringify(ids)}) entries[id] = shape(R("file.tabs."+id));
  const rootProbe = s.commit("tabs.__probe", 1);
  return J({
    order, entries,
    constraints: s.constraints.map(c => ({ id: c.id, matchedSet: c.matchedSet, evaluatedOn: c.evaluatedOn })),
    rootProbe: { status: rootProbe.status, reason: rootProbe.reason === undefined ? null : rootProbe.reason }
  });`)

// ══════════════════════════════════════════════════════════════════════════════════════════════
// THE ROWS
// ══════════════════════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log(`[live] ${SPEC} — U-STORE-TABS-RECORD (T2) live driver`)
  console.log(`[live] node ${process.versions.node}; repo ${repoRoot}`)
  console.log('')

  const SEED_ONE_TAB = {
    schemaVersion: '1',
    'file.tabs.order': ['t9'],
    'file.tabs.t9': { target: 'page-9', active: false, label: 'T9' },
  }
  const SEED_TWO_TABS = {
    schemaVersion: '1',
    'file.tabs.order': ['t9', 'tA'],
    'file.tabs.t9': { target: 'page-9', active: false, label: 'T9' },
    'file.tabs.tA': { target: 'page-A', active: false, label: 'TА' },
  }
  const SEED_SEATED_NEVER_WRITTEN = {
    schemaVersion: '1',
    'file.tabs.order': ['t9', 'ghost'],
    'file.tabs.t9': { target: 'page-9', active: true, label: 'T9' },
  }
  const SEED_LANDING_ACTIVE = {
    schemaVersion: '1',
    'file.tabs.order': ['t9', 'landing'],
    'file.tabs.t9': { target: 'page-9', active: false, label: 'T9' },
    'file.tabs.landing': { target: 'landing', active: true, label: 'Landing' },
  }

  // ── M1 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_ONE_TAB)
    const app = await bootApp(prof)
    try {
      const t = runMcp(app.mcpPort, 'targets')
      const nodes = t.exit === 0 ? JSON.parse(t.out).nodes : []
      const tabsNodes = nodes.filter((n) => String(n.cssId ?? '').startsWith('tabs-'))
      const rec = JSON.parse(await readRecord(app.cdp, ['t9', 'landing']))
      const held = rec.order.found === true && JSON.stringify(rec.order.value) === JSON.stringify(['t9'])
        && rec.entries.t9.found === true && rec.entries.t9.value.active === true
      // THE DECLARED-ROOT CONTROL (`§2.1`: the `tabs` root is one of the six already-declared
      // root names): a write under an UNDECLARED root answers `'undeclared-name'`, so a write
      // under `tabs` answering anything else is the positive control that the root IS declared.
      const rootDeclared = rec.rootProbe.status === 'refused' ? rec.rootProbe.reason !== 'undeclared-name' : true
      record('M1', held && rootDeclared && tabsNodes.length === 2 ? 'PASS' : 'FAIL',
        `${SPEC} §2.1 (the record and its already-declared root) + §2.6 item 3`,
        `app booted on a seeded tier: the APP'S OWN STORE holds order=${JSON.stringify(rec.order.value)} at tier=${rec.order.tier} and entry t9=${JSON.stringify(rec.entries.t9.value)}; ROOT CONTROL: a write under the declared tabs root answered ${JSON.stringify(rec.rootProbe)} (never 'undeclared-name'); MCP list_targets exit ${t.exit} carries ${nodes.length} nodes of which ${tabsNodes.length} are tabs-* (${tabsNodes.map((n) => n.cssId).join(', ') || 'none'})`)
    } finally { shutdown(app) }
  }

  // ── M2 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_SEATED_NEVER_WRITTEN)
    const app = await bootApp(prof)
    try {
      const rec = JSON.parse(await readRecord(app.cdp, ['t9', 'ghost']))
      const orderHeld = JSON.stringify(rec.order.value) === JSON.stringify(['t9', 'ghost'])
      const ghost = rec.entries.ghost
      // THE ADMISSIBLE READ PAIR (`§3.6`'s dated note): a NEVER-WRITTEN id seated in `order`
      // answers a READ-SIDE REFUSAL (`'no-such-anchor'` measured; `'undeclared-name'` the other
      // admissible read-side member) and NEVER the declared MISS `{found:false}`.
      const refused = ghost.found !== true && (ghost.reason === 'no-such-anchor' || ghost.reason === 'undeclared-name')
      record('M2', orderHeld && refused ? 'PASS' : 'FAIL',
        `${SPEC} §2.1 (the flat per-tab spelling) + §3.1 M-3's dated note + §3.6's dated note`,
        `membership=${JSON.stringify(rec.order.value)} and the NEVER-WRITTEN member "ghost" reads ${JSON.stringify({ found: ghost.found, status: ghost.status, reason: ghost.reason, step: ghost.step, value: ghost.value })}; control: t9 (a WRITTEN entry) reads found=${rec.entries.t9.found} value=${JSON.stringify(rec.entries.t9.value)} (${rec.entries.t9.found === true ? 'the read pair is not collapsed' : 'CONTROL BROKEN'})`)
    } finally { shutdown(app) }
  }

  // ── M3 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_ONE_TAB)
    const app = await bootApp(prof)
    try {
      const r = JSON.parse(await evalStore(app.cdp, `
        const c = s.constraints.map(x => ({id:x.id, matchedSet:x.matchedSet, evaluatedOn:x.evaluatedOn}));
        return JSON.stringify({ count: s.constraints.length, members: c });`))
      const one = r.count === 1 && r.members[0].id === 'exactly-one-active' && r.members[0].matchedSet === 'tabs'
        && JSON.stringify(r.members[0].evaluatedOn) === JSON.stringify(['set', 'commit', 'remove'])
      record('M3', one ? 'PASS' : 'FAIL',
        `${SPEC} §2.2 items 1-3 (the ONE member, its one supply site and its three evaluation points)`,
        `THE APP'S OWN CONSTRUCTION carries ${r.count} constraint member(s): ${JSON.stringify(r.members)}`)
    } finally { shutdown(app) }
  }

  // ── M4 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_TWO_TABS)
    const app = await bootApp(prof)
    try {
      const rec = JSON.parse(await readRecord(app.cdp, ['t9', 'tA', 'landing']))
      const actives = ['t9', 'tA'].filter((id) => rec.entries[id].found === true && rec.entries[id].value && rec.entries[id].value.active === true)
      // THE RULED REFERENT ON A WRITE-TRIGGERED ZERO-ACTIVE EVALUATION (`§3.2` F-T2-1): the
      // referent index is the position of the caller's own written reference; with no written
      // reference the arm's declared index is 0, so `order[0]` is the entry it activates.
      const held = actives.length === 1 && actives[0] === 't9'
      record('M4', held ? 'PASS' : 'FAIL',
        `${SPEC} §3.2 F-T2-1 (the zero-active arm and its next-surviving-by-order referent) + §1.1 item 3`,
        `seeded ZERO-ACTIVE over order=["t9","tA"]: the APP'S OWN STORE's post-state carries exactly ${actives.length} active (${actives.join(',') || 'none'}) — order[0]="t9" activated, the surplus arm never needed; the landing entry stays ${rec.entries.landing.found === true ? 'written (seeded)' : 'unwritten'} and is NOT the survivor (order has a live member)`)
    } finally { shutdown(app) }
  }

  // ── M5 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const pref = scratchProfile(); seedRecord(pref, SEED_ONE_TAB)
    const before = readPersisted(pref)
    const cold = scratchProfile()
    const app = await bootApp(cold, { cold: true })
    try {
      const rec = JSON.parse(await readRecord(app.cdp, ['landing']))
      const order = rec.order
      const persisted = readPersisted(cold)
      const noWrite = order.found !== true && persisted === null
      record('M5', noWrite ? 'PASS' : 'FAIL',
        `${SPEC} §3.3 item 7 (the declared NO-WRITE arm) + §6 PAR-11 / PAR-16 (the cold-tier OUTSIDE arm)`,
        (`COLD boot (no settings file): the APP'S OWN STORE answers file.tabs.order as ${JSON.stringify({ found: order.found, status: order.status, value: order.value, reason: order.reason })}; the profile still carries ${persisted === null ? 'NO settings file at all' : JSON.stringify(persisted)}; NON-VACUITY CONTROL: a SEEDED profile's file before its own boot was ${JSON.stringify(before)} (so "no file" is the cold arm and not a blanket absence of the instrument)`.replace(/\s+/g, ' ')))
    } finally { shutdown(app) }
  }

  // ── M6 ─────────────────────────────────────────────────────────────────────────────────────
  // THE BOOT ROUND-TRIP, TAKEN AS TWO REAL BOOTS ON THE SAME PROFILE (`§3.1` M-5's subject).
  // THE SEED IS CHOSEN SO THE BOOT STEP'S WRITE ACTUALLY MOVES THE RECORD: an EMPTY `order` is
  // `§3.2` F-T2-4's declared arm — the zero-active repair re-seats the reserved entry as
  // `order[0]` AND activates it — so the boot step's evaluated write carries a CHANGED membership
  // value, which is the only arm on which `A-3`'s crossing reaches the tier (a value the tier
  // already holds is the store's own equal-value arm and fires nothing).
  {
    const prof = scratchProfile()
    seedRecord(prof, { schemaVersion: '1', 'file.tabs.order': [] })
    const fileBefore = readPersisted(prof)
    const first = await bootApp(prof)
    let firstRecord = null
    try { firstRecord = JSON.parse(await readRecord(first.cdp, ['landing'])) } finally { shutdown(first) }
    await sleep(900)
    const fileAfterFirst = readPersisted(prof)
    const second = await bootApp(prof)
    let secondRecord = null
    try { secondRecord = JSON.parse(await readRecord(second.cdp, ['landing'])) } finally { shutdown(second) }
    await sleep(500)
    const fileAfterSecond = readPersisted(prof)
    const bootMovedTheTier = JSON.stringify(fileBefore) !== JSON.stringify(fileAfterFirst)
    const realm1Order = JSON.stringify(firstRecord.order.value)
    const realm2Order = JSON.stringify(secondRecord.order.value)
    const carried = realm2Order === realm1Order && bootMovedTheTier
    const repairLanded = Array.isArray(firstRecord.order.value)
      && JSON.stringify(firstRecord.order.value) === JSON.stringify(['landing'])
    // THE CLAIM (`§3.1` M-5): the SECOND realm's hand-off carries what the FIRST realm landed —
    // so the boot-derived membership must be readable from the tier, never re-derived per boot.
    record('M6', carried && repairLanded ? 'PASS' : 'FAIL',
        `${SPEC} §3.3 items 3/5 (the boot step's ONE evaluated write) + §3.1 M-5 (the record survives the realm)`,
        `seed order=[] (the F-T2-4 arm): REALM 1's repair landed — its own store reads order=${realm1Order} with the reserved entry ${JSON.stringify(firstRecord.entries.landing.value ?? { reason: firstRecord.entries.landing.reason })} (${repairLanded ? 'the declared re-seat' : 'NOT the declared re-seat'}); REALM 1's file is ${bootMovedTheTier ? 'MOVED — the boot step\'s evaluated write reached the tier: ' + JSON.stringify(fileAfterFirst) : 'BYTE-UNCHANGED — the boot step\'s write did not reach the tier: ' + JSON.stringify(fileAfterFirst)} (before: ${JSON.stringify(fileBefore)}); REALM 2's hand-off reads order=${realm2Order} (${carried ? 'carried' : 'RE-DERIVED, not carried'}); file after realm 2 = ${JSON.stringify(fileAfterSecond)} — ${carried ? 'the boot-derived membership survives the realm' : 'the boot-derived membership is re-derived on every boot and is NOT carried by a landed projection'}`
          .replace(/\s+/g, ' '))
  }

  // ── M7 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_LANDING_ACTIVE)
    const fileBefore = readPersisted(prof)
    const app = await bootApp(prof)
    let outcome = null
    let after = null
    try {
      outcome = JSON.parse(await evalStore(app.cdp, `
        const rec = m.closeTab(s, "t9", ["landing"]);
        const pre = new Date().toISOString();
        return JSON.stringify({ callerOperations: rec.callerOperations, refusal: rec.refusal,
          removeStatus: rec.remove ? rec.remove.status : null, removeReason: rec.remove ? rec.remove.reason : null,
          commitStatus: rec.commit ? rec.commit.status : null, commitCrossings: rec.commit ? rec.commit.crossings : null,
          commitRepaired: rec.commit && rec.commit.repaired ? rec.commit.repaired : null, pre });`))
      after = JSON.parse(await evalStore(app.cdp, `
        const order = R("file.tabs.order"); const landing = R("file.tabs.landing"); const t9 = R("file.tabs.t9");
        return JSON.stringify({ order: order.found === true ? order.value : { refused: order.reason },
          landing: landing.found === true ? landing.value : { refused: landing.reason },
          t9: t9.found === true ? t9.value : { refused: t9.reason } });`))
    } finally { shutdown(app) }
    await sleep(400)
    const fileAfter = readPersisted(prof)
    const fileUntouched = JSON.stringify(fileBefore) === JSON.stringify(fileAfter)
    const orderHeld = Array.isArray(after.order) && JSON.stringify(after.order) === JSON.stringify(['landing'])
    const refusalsClean = outcome.removeStatus === 'refused' || outcome.removeStatus === 'committed'
    record('M7', orderHeld && !fileUntouched ? 'PASS' : 'FAIL',
        `${SPEC} §2.4 items 1/3 (the two-operation close and its order rewrite) + §3.1 M-5 (persistence)`,
        `close of the ACTIVE tab over order=["t9","landing"]: callerOperations=${outcome.callerOperations}, refusal=${outcome.refusal}, remove=${outcome.removeStatus}/${outcome.removeReason}, commit=${outcome.commitStatus} (crossings=${outcome.commitCrossings}, repaired=${JSON.stringify(outcome.commitRepaired)}); the app's own store's FINAL order=${JSON.stringify(after.order)} (rewrite holds: ${orderHeld}); the profile file after the close is ${fileUntouched ? 'BYTE-UNCHANGED — the CLOSE did not persist: ' + JSON.stringify(fileAfter) : 'updated'} (shape control: the store answered a RETURNED record, never a throw: ${refusalsClean})`)
  }

  // ── M8 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_LANDING_ACTIVE)
    const app = await bootApp(prof)
    let out = null
    try {
      out = JSON.parse(await evalStore(app.cdp, `
        const reserved = m.closeTab(s, "landing", ["t9"]);
        const control = m.closeTab(s, "t9", []);
        const order = R("file.tabs.order"); const landing = R("file.tabs.landing");
        return JSON.stringify({
          reserved: { refusal: reserved.refusal, callerOperations: reserved.callerOperations,
            storeReason: reserved.remove ? (reserved.remove.reason ?? reserved.remove.status) : null,
            cleared: reserved.remove && reserved.remove.cleared ? reserved.remove.cleared : null,
            events: reserved.remove ? reserved.remove.events : null, commitUndefined: reserved.commit === undefined },
          control: { refusal: control.refusal, removeStatus: control.remove ? control.remove.status : null,
            commitStatus: control.commit ? control.commit.status : null },
          orderAfter: order.found === true ? order.value : { refused: order.reason },
          landingAfter: landing.found === true ? landing.value : { refused: landing.reason } });`))
    } finally { shutdown(app) }
    const refusedByName = out.reserved.refusal === 'reserved-name' && out.reserved.storeReason === 'reserved-name'
      && out.reserved.commitUndefined === true && out.reserved.events === 0 && JSON.stringify(out.reserved.cleared) === '[]'
    // THE POSITIVE CONTROL (`§3.2` F-T2-3): a NON-reserved sibling's own removal must succeed,
    // or "refused" would be attributable to the call path rather than to the reservation.
    const controlHolds = out.control.removeStatus === 'refused' ? out.control.refusal === null : true
    const controlHasTeeth = JSON.stringify(out.orderAfter) !== JSON.stringify(['t9', 'landing'])
    record('M8', refusedByName && controlHasTeeth ? 'PASS' : 'FAIL',
        `${SPEC} §2.1 item 6 + §3.2 F-T2-3/F-T2-6 (the reserved ENTRY refused by name, siblings ordinary) + §3.1 M-1`,
        `close of the RESERVED spelling: refusal=${out.reserved.refusal}, the store's own reason=${out.reserved.storeReason}, cleared=${JSON.stringify(out.reserved.cleared)}, events=${out.reserved.events}, commit withheld=${out.reserved.commitUndefined}; CONTROLS: the non-reserved sibling's close = {refusal:${out.control.refusal}, remove:${out.control.removeStatus}, commit:${out.control.commitStatus}}, the order moved ${JSON.stringify(['t9', 'landing'])} -> ${JSON.stringify(out.orderAfter)} (so the call path DOES write), and the reserved entry ${out.landingAfter.value !== undefined ? 'still reads ' + JSON.stringify(out.landingAfter.value) + ' — UNTOUCHED' : 'answers ' + out.landingAfter.reason + ' at ' + out.landingAfter.step} after its refused close`)
  }

  // ── M9 ─────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_LANDING_ACTIVE)
    const app = await bootApp(prof)
    let out = null
    try {
      out = JSON.parse(await evalStore(app.cdp, `
        const close = m.closeTab(s, "t9", []);
        const order = R("file.tabs.order"); const landing = R("file.tabs.landing");
        const landingShaped = landing && landing.found === true
          ? { found: true, value: landing.value, valueType: typeof landing.value, activeRead: m.driveTabsLandingPage(s, { elementForNodeId: (id) => ({ id }) }).landing.witness }
          : { found: landing && landing.found === true, reason: landing && landing.reason, step: landing && landing.step, status: landing && landing.status };
        const actives = [];
        const members = order.found === true && Array.isArray(order.value) ? order.value : [];
        for (const id of members) { const e = R("file.tabs."+id); if (e.found === true && e.value && typeof e.value === "object" && e.value.active === true) actives.push(id); if (e.found === true && e.value === true) actives.push(id); }
        return JSON.stringify({ close: { refusal: close.refusal, callerOperations: close.callerOperations },
          order: order.found === true ? order.value : { refused: order.reason },
          landing: landingShaped,
          actives, members });`))
    } finally { shutdown(app) }
    // `§3.2` F-T2-3/F-T2-4: closing the last non-landing entry empties the caller's `order`; the
    // zero-active arm re-seats the RESERVED entry as `order[0]` AND activates it IN THE SAME
    // COMMITTED WRITE — so the post-state must hold `order` non-empty, the reserved entry WRITTEN
    // and EXACTLY ONE active. `§3.1` M-1: the zero-tab state is unreachable by design.
    const orderReseated = JSON.stringify(out.order) === JSON.stringify(['landing'])
    // THE RESERVED ENTRY'S OWN STATE, READ THROUGH THE DECLARED ACCESSOR PAIR (`§0D` item 1(c)):
    // an OBJECT-valued entry reads active through its own `active` member, a SCALAR-valued one IS
    // the caller's boolean — so the assertion accepts exactly one of the two declared arms and
    // records WHICH arm the app's own store surfaced.
    const landingArm = out.landing.found === true
      ? (out.landing.valueType === 'object'
        ? (out.landing.value && out.landing.value.active === true ? 'object-arm-active' : 'object-arm-not-active')
        : (out.landing.value === true ? 'scalar-arm-active' : 'scalar-arm-not-active'))
      : 'not-written'
    const landingWrittenAndActive = landingArm === 'object-arm-active' || landingArm === 'scalar-arm-active'
    const exactlyOneActive = out.actives.length === 1 && out.actives[0] === 'landing'
    record('M9', orderReseated && landingWrittenAndActive && exactlyOneActive ? 'PASS' : 'FAIL',
        `${SPEC} §3.2 F-T2-3/F-T2-4 (the close-last-tab repair) + §3.1 M-1 (no zero-tab state) + §3.1 M-2`,
        `close of the last NON-reserved entry: final order=${JSON.stringify(out.order)} (${orderReseated ? 're-seated' : 'NOT re-seated'}); the reserved entry after the repair: arm=${landingArm}, record value=${JSON.stringify(out.landing.value ?? null)}, landing-page witness=${JSON.stringify(out.landing.activeRead)}; actives over the record's own entries = ${JSON.stringify(out.actives)} (exactly-one-active ${exactlyOneActive ? 'holds' : 'FAILS'})`)
  }

  // ── M10 ────────────────────────────────────────────────────────────────────────────────────
  {
    const pref = scratchProfile(); seedRecord(pref, SEED_LANDING_ACTIVE)
    const cold = scratchProfile()
    const app = await bootApp(cold, { cold: true })
    try {
      const armed = runMcp(app.mcpPort, 'node-state', ['tabs-landing-page'])
      const armedJson = armed.exit === 0 ? JSON.parse(armed.out) : null
      const err = runMcp(app.mcpPort, 'node-state', ['tabs-error-page'])
      const errJson = err.exit === 0 ? JSON.parse(err.out) : null
      const html = runMcp(app.mcpPort, 'html')
      const rendered = html.exit === 0 ? JSON.parse(html.out).renderedHtml : ''
      const census = html.exit === 0 ? JSON.parse(html.out).census : null
      const landingMarkup = (rendered.match(/<section[^>]*id="tabs-landing-page"[^>]*>[^<]*<\/section>/) ?? ['(absent)'])[0]
      const errorMarkup = (rendered.match(/<section[^>]*id="tabs-error-page"[^>]*>[^<]*<\/section>/) ?? ['(absent)'])[0]
      const props = armedJson?.states?.[0]?.props ?? null
      const roleOk = props?.id === 'tabs-landing-page' && props?.role === 'page'
      const errRoleOk = errJson?.states?.[0]?.props?.id === 'tabs-error-page' && errJson?.states?.[0]?.props?.role === 'page'
      record('M10', roleOk && errRoleOk && landingMarkup.includes('tabs-landing-page') && errorMarkup.includes('tabs-error-page') ? 'PASS' : 'FAIL',
        `${SPEC} §0A item 5 + §3.5 items 1/3 + §6 PAR-9 (the two authored nodes' ids, roles and envelope provenance)`,
        `COLD boot, MCP instrument: landing node ${armed.exit === 0 ? JSON.stringify(props) : 'exit ' + armed.exit}; error node ${err.exit === 0 ? JSON.stringify(errJson.states?.[0]?.props) : 'exit ' + err.exit}; rendered markup ${JSON.stringify(landingMarkup)} / ${JSON.stringify(errorMarkup)}; census=${JSON.stringify(census)}`)
    } finally { shutdown(app) }
  }

  // ── M11 ────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile()
    seedRecord(prof, {
      schemaVersion: '1',
      'file.tabs.order': ['t9'],
      'file.tabs.t9': { target: 'no-such-node-id', active: true, label: 'T9', error: 'unresolvable-target' },
    })
    const app = await bootApp(prof)
    let out = null
    try {
      out = JSON.parse(await evalStore(app.cdp, `
        const order = R("file.tabs.order"); const t9 = R("file.tabs.t9");
        const pages = m.driveTabsLandingPage(s, { elementForNodeId: (id) => ({ id, probe: true }) });
        return JSON.stringify({ order: order.found === true ? order.value : { refused: order.reason },
          t9: t9.found === true ? t9.value : { refused: t9.reason }, pages });`))
    } finally { shutdown(app) }
    const errWitness = out.pages.error.witness === true && out.pages.error.tabId === 't9' && out.pages.error.nodeId === 'tabs-error-page'
    record('M11', errWitness ? 'PASS' : 'FAIL',
        `${SPEC} §3.5 item 2 + §3.1 M-6 (the error page's record witness) + §6 PAR-5/PAR-15`,
        `a tab whose own ENTRY carries an error token: the wiring role's reading answers ${JSON.stringify(out.pages.error)}; control: the landing arm's witness=${out.pages.landing.witness} (false here — the entry reading active is the TAB, not the reserved entry), and the record the reading came from is ${JSON.stringify(out.t9)} over order ${JSON.stringify(out.order)}`)
  }

  // ── M12 ────────────────────────────────────────────────────────────────────────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_ONE_TAB)
    const app = await bootApp(prof)
    try {
      const before = JSON.parse(await readRecord(app.cdp, ['t9']))
      const htmlBefore = runMcp(app.mcpPort, 'html')
      const markupBefore = htmlBefore.exit === 0 ? JSON.parse(htmlBefore.out).renderedHtml : ''
      // THE REAL USER INPUT: a real CDP press at the authored landing node's own box centre.
      // THE PRESS POINT IS VERIFIED ON THE NODE ITSELF (non-vacuity): the coordinate is chosen
      // from the node's OWN box and the element under it is read BEFORE the press, so a press
      // that never reached the authored page cannot be reported as "the page has no effect".
      const aim = await aimAt(app.cdp, '#tabs-landing-page')
      const box = { x: aim.x, y: aim.y, w: aim.w, h: aim.h }
      if (aim.onNode) await realPress(app.cdp, box.x, box.y)
      const afterPress = JSON.parse(await readRecord(app.cdp, ['t9']))
      const htmlAfter = runMcp(app.mcpPort, 'html')
      const markupAfter = htmlAfter.exit === 0 ? JSON.parse(htmlAfter.out).renderedHtml : ''
      const dispatched = runMcp(app.mcpPort, 'dispatch', ['tabs-landing-page', 'click'])
      const dispatchedJson = dispatched.exit === 0 ? JSON.parse(dispatched.out) : null
      // THE NON-VACUITY CONTROL: the same real-input path over an authored affordance that DOES
      // carry an effect must MOVE the rendered DOM — so "nothing changed" is a property of the
      // page node and not of the press machinery.
      const beforeCount = await app.cdp.evaluate(`document.getElementById('counter').textContent`)
      const controlAim = await aimAt(app.cdp, '#inc')
      if (controlAim.onNode) await realPress(app.cdp, controlAim.x, controlAim.y)
      const afterCount = await app.cdp.evaluate(`document.getElementById('counter').textContent`)
      const unchanged = JSON.stringify(before.order.value) === JSON.stringify(afterPress.order.value)
        && JSON.stringify(before.entries.t9.value) === JSON.stringify(afterPress.entries.t9.value)
        && markupBefore === markupAfter
      const controlMoved = beforeCount !== afterCount
      record('M12', (aim.onNode && unchanged) && controlMoved ? 'PASS' : 'FAIL',
        `${SPEC} §3.5 item 3 (the page carries no state; the record is the driver) + §3.1 M-6`,
        `${aim.onNode ? `a REAL CDP press at (${box.x},${box.y}) on the authored landing node (scrolled into view to scrollY=${aim.scrollY} first; box ${box.w}x${box.h}; the element under that point is ${aim.hit}, i.e. the node itself or its descendant)` : `NO PRESS WAS DELIVERABLE: the authored landing node's box is ${box.w}x${box.h} and none of its own sample points hit-tests to it (${aim.hit}; scrolled to scrollY=${aim.scrollY})`}: the record held by the app is ${unchanged ? 'UNCHANGED (order + entries + rendered markup byte-identical)' : 'CHANGED'}; the MCP dispatch of the page's own authored handler (name tabs-landing-page-open) answered dirtied=${JSON.stringify(dispatchedJson?.dirtied ?? null)}; CONTROL: a real press on the authored #inc button (aimed the same way: onNode=${controlAim.onNode}, hit=${controlAim.hit}) moved #counter ${beforeCount} -> ${afterCount} (${controlMoved ? 'the press machinery has teeth' : 'CONTROL BROKEN'})`)
    } finally { shutdown(app) }
  }

  // ── P1/P2/P3 — PARKED FOR A STRUCTURAL REASON (the only lawful park reason). ────────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_ONE_TAB)
    const app = await bootApp(prof)
    let targets = { exit: 1, out: '' }
    try {
      targets = runMcp(app.mcpPort, 'targets')
    } finally { shutdown(app) }
    const nodes = targets.exit === 0 ? JSON.parse(targets.out).nodes : []
    const tabsNodes = nodes.filter((n) => String(n.cssId ?? '').startsWith('tabs-'))
    const affordances = tabsNodes.filter((n) => Array.isArray(n.handlers) && n.handlers.length > 0)
    console.log('')
    record('P1', 'PARKED', `${SPEC} §1.1 items 7/8 + §2.5 W-1/W-2 (the authored tab affordances: the close control and the mint control)`,
      `${nodes.length} authored nodes; the tabs-* set is ${JSON.stringify(tabsNodes.map((n) => n.cssId))} and it carries ${affordances.length} handler-bearing node(s): ${JSON.stringify(affordances.map((n) => ({ id: n.cssId, handlers: n.handlers })))} — NO close control and NO mint control exists in the ASSEMBLED APP, so no press on one can be driven. STRUCTURAL: the affordance would have to be authored, and src/shared/demo-envelope.ts is a declared wiring point whose edit is NOT this driver's (this pass creates ONE driver file).`)
    record('P2', 'PARKED', `${SPEC} §3.2 F-T2-3 (close-last-tab -> the landing terminal) + §1.1 item 7 (the landing page as a TERMINAL)`,
      `the landing page's RECORD witness IS measurable (M11/M9) and its authored node IS in the assembled tree (M10, node-24) — but the FLOW that renders it as a terminal is not driveable: "when the last tab closes" needs a close control (P1) or a per-tab focus/activate control, neither authored. M9 measures the repair's own end state; the terminal RENDER cannot be reached from any app-visible input.`)
    record('P3', 'PARKED', `${SPEC} §5.2 item 7(a) + §7 item 2(d) (the painted rows: the strip geometry, an affordance's rendered word/position, a visual state change)`,
      `every painted claim is a human's eye on a box; this driver's oracles are store reads, DOM presence and dispatch dirtied sets, none of which is a rendered-box reading (a computed-style read would prove FAIL, not PASS). The three operator rows are recorded as MANUAL OPERATOR in docs/specs/store-tabs-record-live-battery.md with their boot command, literal steps and value to read — owner: the supervisor, at a session with a human at the window.`)
  }

  // ── A-1/A-2 — THE PRELOAD-SURFACE CONTROL ROWS (what the PAGE alone can reach). ─────────────
  {
    const prof = scratchProfile(); seedRecord(prof, SEED_ONE_TAB)
    const app = await bootApp(prof)
    try {
      const globals = await app.cdp.evaluate(`JSON.stringify(Object.getOwnPropertyNames(window).filter(k=>/prov|store|tabs/i.test(k)))`)
      const provKeys = await app.cdp.evaluate(`JSON.stringify(Object.keys(window.provident||{}))`)
      const storeKeys = await app.cdp.evaluate(`JSON.stringify(window.provident&&window.provident.store?Object.keys(window.provident.store):null)`)
      const hasTabs = await app.cdp.evaluate(`JSON.stringify({wiredStore: typeof window.__wiredStore, tabsRead: typeof window.provident?.tabs, mcpStoreTool: false})`)
      record('A-1', 'CONTROL', `${SPEC} §2.6 item 3 (this slice's MCP-observable effect is NONE today) + §5.2 item 7(b)(i) (S-d9: the MCP surface carries no coordinates)`,
        `the page's globals matching /prov|store|tabs/i = ${globals}; window.provident keys = ${provKeys}; the bridge's store keys = ${storeKeys}; ${hasTabs} — so the PAGE carries NO tab-record read and the MCP surface exposes NO tabs tool/resource; the driver therefore reaches the app's own boot-store through the renderer module's exported getWiredGraphStore(), which is recorded in every row above as the reach mechanism.`)
      record('A-2', 'CONTROL', `${SPEC} §5.2 item 7(b)(ii) (a synthetic click is NOT a human's eye on a painted box)`,
        `the real-input rows (M12 and the M7/M8/M9 drives) dispatch REAL CDP input and read STATE; NO row in this driver asserts that a painted surface was SEEN, and NO row claims agent-drivability. The painted rows are P3 and the MANUAL OPERATOR set of the battery record.`)
      // ── A-3 — THE CROSSING'S OWN DIAGNOSTIC: does a file-tier write made THROUGH THIS APP'S
      //    store reach the tier at all? Driven by its own fresh boot so no earlier row's state
      //    can colour it, and its subject is the CHANNEL, not this unit's record.
      const crossingFile = readPersisted(app.profile)
      const diag = await evalStore(app.cdp, `
        const fresh = s.commit("file.settings.liveProbe", "written-by-the-app-store");
        return JSON.stringify({ status: fresh.status, reason: fresh.reason, crossings: fresh.crossings, repaired: fresh.repaired, events: fresh.events, name: fresh.name });`)
      await sleep(900)
      const crossingAfter = readPersisted(app.profile)
      const reachedDisk = JSON.stringify(crossingFile) !== JSON.stringify(crossingAfter)
      record('A-3', 'CONTROL', `${SPEC} §3.3 item 3 (the boot step's write is a COMMITTED write through the store's ONE construction) + §6 PAR-11`,
        `DIAGNOSTIC (not this unit's row): a file-tier commit made through THIS APP'S OWN store answered ${diag}; the profile's file is ${reachedDisk ? 'UPDATED — the crossing seam reaches the tier: ' + JSON.stringify(crossingAfter) : 'BYTE-UNCHANGED — the crossing does not reach the tier: ' + JSON.stringify(crossingAfter)} (before: ${JSON.stringify(crossingFile)}). Read with M6/M7: their file-unchanged readings are consistent with this channel behaviour, so the rows report the OBSERVED end state and do not attribute a cause.`)
    } finally { shutdown(app) }
  }

  // ── SWEEP THE SCRATCH PROFILES (the sibling drivers' cleanup discipline). ───────────────────
  for (const dir of profiles) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort */ }
  }

  for (const r of rows) if (counts[r.verdict] !== undefined) counts[r.verdict] += 1
  const run = counts.PASS + counts.FAIL
  console.log('')
  console.log(`[live] rows=${rows.length} (run ${run} = PASS ${counts.PASS} + FAIL ${counts.FAIL}; PARKED ${counts.PARKED}; CONTROL ${counts.CONTROL})`)
  console.log(`[live] U-STORE-TABS-RECORD (T2) LIVE DRIVER: ${counts.FAIL === 0 ? 'ALL RUN ROWS HOLD' : counts.FAIL + ' RUN ROW(S) FAILED'}`)
  process.exit(counts.FAIL === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error('[live] fatal:', err?.stack ?? err?.message ?? String(err))
  for (const dir of profiles) {
    try { rmSync(dir, { recursive: true, force: true }) } catch { /* best effort */ }
  }
  process.exit(2)
})
