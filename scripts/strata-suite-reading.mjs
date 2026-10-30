#!/usr/bin/env node
// strata-suite-reading.mjs — run the node suite and report the GATING reading and the ON-NOTICE reading
// side by side (D-30's runner split). A marked file reports on notice and does not gate; an unmarked file
// gates. `strata/marks.json` is the index of which is which, and this script only classifies what the
// runner already said — it never re-decides a marker (D-30) and never prints a count a document owns.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'

const REPO = process.cwd()
const dir = mkdtempSync(join(tmpdir(), 'strata-suite-'))
const out = join(dir, 'vitest.json')
let raw
try {
  execFileSync('npx', ['vitest', 'run', '--reporter=json', `--outputFile=${out}`], { cwd: REPO, stdio: 'ignore' })
} catch {
  // a non-zero exit is the normal case when anything fails; the report file is what matters
} finally {
  try {
    raw = readFileSync(out, 'utf8')
  } catch {
    console.error('strata-suite-reading: the runner wrote no report — run `npm test` directly')
    process.exit(2)
  }
  rmSync(dir, { recursive: true, force: true })
}

const report = JSON.parse(raw)
const marks = JSON.parse(readFileSync(join(REPO, 'strata/marks.json'), 'utf8'))
const marked = new Set((marks.marked ?? []).map((m) => m.file))
const carveOut = new Set((marks.gates ?? []).map((g) => g.file))
/** `marks.json` names a carve-out by its scenario text; a failing test carries that text in its name,
 *  so membership is a prefix test rather than a file-level guess (D-38: a row inside a marked file gates). */
const carveOutScenarios = (marks.gates ?? []).map((g) => ({ file: g.file, scenario: String(g.scenario ?? '').trim() }))
const isCarveOut = (file, test) =>
  carveOutScenarios.some((g) => g.file === file && g.scenario.length > 0 && test.includes(g.scenario))
const rel = (p) => relative(REPO, p ?? '').split('\\').join('/')

/** A file gates unless it is marked; a carved-out row inside a marked file gates too, so a failure in
 *  such a file is reported under BOTH readings rather than being silently absorbed by the mark. */
const classify = (file) => (marked.has(file) ? 'on-notice' : 'gating')

const failedFiles = new Map()
for (const suite of report.testResults ?? []) {
  const file = rel(suite.name)
  const bad = (suite.assertionResults ?? []).filter((a) => a.status === 'failed')
  if (bad.length > 0) failedFiles.set(file, bad.map((a) => a.fullName ?? a.title))
}

const buckets = { gating: [], 'on-notice': [] }
for (const [file, tests] of failedFiles) {
  const where = classify(file)
  for (const t of tests) {
    // A carve-out row INSIDE a marked file still gates (D-30, D-38): its file's mark may not absorb it,
    // so it is reported under both readings and counts against the gating one.
    const carved = isCarveOut(file, t)
    if (carved) buckets.gating.push({ file, test: t, carveOut: true })
    buckets[where].push({ file, test: t, carveOut: carved })
  }
}

const pass = (report.numPassedTests ?? 0)
const fail = (report.numFailedTests ?? 0)
const skip = (report.numPendingTests ?? 0)

console.log(`strata-suite-reading · ${pass} passed · ${fail} failed · ${skip} skipped`)
console.log(`  GATING     ${buckets.gating.length} failing test(s) in ${new Set(buckets.gating.map((f) => f.file)).size} file(s)`)
for (const f of buckets.gating) console.log(`     ${f.file} — ${f.test.slice(0, 100)}`)
console.log(`  ON NOTICE  ${buckets['on-notice'].length} failing test(s) in ${new Set(buckets['on-notice'].map((f) => f.file)).size} file(s)`)
for (const f of buckets['on-notice']) console.log(`     ${f.file}${f.carveOut ? ' (carve-out gates)' : ''} — ${f.test.slice(0, 100)}`)
console.log(`\n  a file gates unless strata/marks.json marks it rework (D-30); the ON NOTICE reading is debt, not a gate`)
process.exitCode = buckets.gating.length > 0 ? 1 : 0
