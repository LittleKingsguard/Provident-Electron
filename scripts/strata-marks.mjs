#!/usr/bin/env node
// scripts/strata-marks.mjs — the triage INSTRUMENT for D-30.
//
// D-30 splits the suite by what a scenario states, not by which folder it sits in:
//
//   retained    tests/e2e/** and the three Electron legs — an agent or a drive supplies a state, a
//               surface answers, and the answer is the product. A red there is a defect, not a stale
//               expectation. A `tests/e2e/` file NEVER carries a marker; `check` refuses one.
//   marked      every integration and unit scenario — tests/integration/**, tests/unit/** and the flat
//               tests/*.test.ts suite — because the machinery they pin is to be reworked onto the
//               storeroom's constraint/repair and listener engines. A marked site reports ON NOTICE and
//               stops gating; the rework replaces it whole instead of a pass re-pointing it.
//
// The marker is the authority and the index is generated from it, never hand-edited:
//
//   // strata:marked-file rework — <reason>     in a file's HEADER: every scenario in it is marked.
//   // strata:marked rework — <reason>          immediately above one `it`/`test`: that one is marked.
//   // strata:gates <reason>                    immediately above one `it`/`test` inside a marked file:
//                                               this one still gates (D-30's instrument carve-out).
//
// Three verbs, no dependencies:
//
//   index  [root]   scan the sources and write the index (`strata/marks.json`); refuses to write when a
//                   marker is malformed or violates D-30, so a bad marker never lands in the index.
//   check  [root]   refuse drift: a marker the index does not carry, an index row no marker backs, and
//                   every marker problem `index` refuses. Exit 1 and name each failure.
//   report [root]   print the two readings — what gates and what is on notice — writing nothing.
//
// WHAT IT DOES NOT DO: it counts and indexes markers. It cannot tell whether a marked scenario truly
// pins machinery rather than product, nor whether a retained one still states something true. That is
// the reader's judgement, and the count is only as honest as the markers (D-29's lesson).
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const INDEX = 'strata/marks.json'
const KINDS = ['rework']
const args = process.argv.slice(2)
const verb = args[0]
const root = args[1] ? resolve(args[1]) : REPO

const FILE_MARK = /^\s*\/\/\s*strata:marked-file\s+([A-Za-z][A-Za-z-]*)\s+—\s*(\S.*)$/
const SPEC_MARK = /^\s*\/\/\s*strata:marked\s+([A-Za-z][A-Za-z-]*)\s+—\s*(\S.*)$/
const GATE_MARK = /^\s*\/\/\s*strata:gates\s+—?\s*(\S.*)$/
const ANY_MARK = /^\s*\/\/\s*strata:(?:marked|marked-file|gates)\b/
const SPEC = /^\s*(?:it|test)(?:\.(?:each|skip|todo|only|concurrent|fails|sequential)(?:\([^)]*\))?)?\s*\(/
const DESCRIBE = /^\s*describe(?:\.\w+(?:\([^)]*\))?)?\s*\(/
const COMMENT_OR_BLANK = /^\s*(?:\/\/|\/\*|\*|$)/

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p, out)
    else if (entry.name.endsWith('.test.ts')) out.push(relative(root, p).split('\\').join('/'))
  }
  return out
}

function suiteOf(file) {
  if (file.startsWith('tests/e2e/')) return 'e2e'
  if (file.startsWith('tests/integration/')) return 'integration'
  if (file.startsWith('tests/unit/')) return 'unit'
  return 'flat'
}

// The marker binds to the NEXT non-blank line. A `describe` there is refused rather than guessed at:
// scoping a brace block is exactly the parsing this script declines to approximate (D-30).
function targetOf(lines, i) {
  for (let j = i + 1; j < Math.min(i + 4, lines.length); j += 1) {
    if (lines[j].trim() === '') continue
    if (SPEC.test(lines[j])) return { index: j, kind: 'spec' }
    if (DESCRIBE.test(lines[j])) return { index: j, kind: 'describe' }
    return { index: j, kind: 'other' }
  }
  return null
}

function headerOnly(lines, i) {
  return lines.slice(0, i).every((l) => COMMENT_OR_BLANK.test(l))
}

function titleOf(lines, i) {
  const m = lines[i].match(/^\s*(?:it|test)(?:\.\w+(?:\([^)]*\))?)?\s*\(\s*(['"`])((?:(?!\1).)*)\1/)
  return m ? m[2] : `(line ${i + 1})`
}

function scan() {
  const files = walk(join(root, 'tests')).sort()
  const marked = []
  const gates = []
  const problems = []
  const records = []
  const suites = {}
  for (const file of files) {
    const suite = suiteOf(file)
    const lines = readFileSync(join(root, file), 'utf8').split('\n')
    const sites = []
    lines.forEach((line, i) => { if (SPEC.test(line)) sites.push(i) })
    suites[suite] ??= { files: 0, sites: 0 }
    suites[suite].files += 1
    suites[suite].sites += sites.length

    const fileMark = lines.map((l, i) => (FILE_MARK.test(l) && headerOnly(lines, i) ? l.match(FILE_MARK) : null)).find(Boolean)
    if (fileMark) {
      if (suite === 'e2e') problems.push(`${file}: a \`tests/e2e/\` file is retained (D-30) and cannot be marked`)
      else if (!KINDS.includes(fileMark[1])) problems.push(`${file}: unknown marker kind \`${fileMark[1]}\` (D-30 knows: ${KINDS.join(', ')})`)
      else marked.push({ file, scope: 'file', kind: fileMark[1], reason: fileMark[2].trim() })
    }
    const isFileMarked = Boolean(fileMark) && suite !== 'e2e'
    if (isFileMarked && sites.length === 0) problems.push(`${file}: marked-file but the file holds no \`it\`/\`test\``)

    let markedHere = 0
    let exemptHere = 0
    lines.forEach((line, i) => {
      // A MARKER THE SCRIPT DOES NOT PARSE IS THE DRIFT THIS FILE EXISTS TO PREVENT, so a malformed one
      // is a failure rather than a silent no-op: the line announces intent and the regex refuses it.
      if (ANY_MARK.test(line) && !FILE_MARK.test(line) && !SPEC_MARK.test(line) && !GATE_MARK.test(line)) {
        problems.push(`${file}:${i + 1}: malformed marker — want \`// strata:marked[-file] <kind> — <reason>\` or \`// strata:gates <reason>\``)
        return
      }
      const target = targetOf(lines, i)
      const gate = line.match(GATE_MARK)
      if (gate) {
        if (!isFileMarked) problems.push(`${file}:${i + 1}: \`strata:gates\` is only legal inside a marked-file file`)
        else if (target?.kind !== 'spec') problems.push(`${file}:${i + 1}: \`strata:gates\` is not immediately above an \`it\`/\`test\``)
        else {
          exemptHere += 1
          gates.push({ file, scenario: titleOf(lines, target.index), reason: gate[1].trim() })
        }
        return
      }
      const spec = line.match(SPEC_MARK)
      if (!spec) return
      if (suite === 'e2e') {
        problems.push(`${file}:${i + 1}: a \`tests/e2e/\` file is retained (D-30) and cannot be marked`)
        return
      }
      if (isFileMarked) {
        problems.push(`${file}:${i + 1}: a per-scenario marker inside a marked-file file`)
        return
      }
      if (target?.kind === 'describe') {
        problems.push(`${file}:${i + 1}: a marker above a \`describe\` — mark the file, or each scenario (D-30)`)
        return
      }
      if (target?.kind !== 'spec') {
        problems.push(`${file}:${i + 1}: \`strata:marked\` is not immediately above an \`it\`/\`test\``)
        return
      }
      if (!KINDS.includes(spec[1])) {
        problems.push(`${file}:${i + 1}: unknown marker kind \`${spec[1]}\` (D-30 knows: ${KINDS.join(', ')})`)
        return
      }
      markedHere += 1
      marked.push({ file, scope: 'scenario', scenario: titleOf(lines, target.index), kind: spec[1], reason: spec[2].trim() })
    })
    records.push({ file, suite, sites: sites.length, markedSites: isFileMarked ? sites.length : markedHere, exempt: exemptHere })
  }
  return { files, suites, marked, gates, problems, records }
}

function readings(scan_) {
  const gating = { files: 0, sites: 0 }
  const onNotice = { files: 0, sites: 0 }
  const retained = { files: 0, sites: 0 }
  for (const r of scan_.records) {
    if (r.suite === 'e2e') {
      retained.files += 1
      retained.sites += r.sites
      gating.files += 1
      gating.sites += r.sites
      continue
    }
    const stillGating = r.sites - r.markedSites + r.exempt
    if (stillGating > 0) { gating.files += 1; gating.sites += stillGating }
    const notice = r.markedSites - r.exempt
    if (notice > 0) { onNotice.files += 1; onNotice.sites += notice }
  }
  return { gating, onNotice, retained }
}

function build(scan_) {
  return {
    rule: 'D-30',
    instrument: 'scripts/strata-marks.mjs',
    suites: scan_.suites,
    marked: scan_.marked.sort((a, b) => (a.file + (a.scenario ?? '')).localeCompare(b.file + (b.scenario ?? ''))),
    gates: scan_.gates.sort((a, b) => (a.file + a.scenario).localeCompare(b.file + b.scenario)),
    readings: readings(scan_),
  }
}

function printReadings(r) {
  console.log(`  gating    ${r.gating.sites} spec site(s) in ${r.gating.files} file(s), incl. ${r.retained.sites} retained boundary site(s)`)
  console.log(`  on notice ${r.onNotice.sites} spec site(s) marked for the storeroom rework (D-30)`)
  console.log('  retained drivers (outside npm test): scripts/electron-{spawn,divergence,ui}.mjs')
  // A SITE IS NOT A COLLECTED ROW: `it.each` expands one site into many. The collected-row reading is
  // `npm test`'s own and lives in `strata/brief.md` §6 — restating it here would drift (D-26).
  console.log("  a spec SITE is not a collected row — `it.each` expands; the row count is brief.md §6's")
}

const scan_ = scan()
const index = build(scan_)
const label = relative(REPO, root) || '.'

if (verb === 'index' || verb === 'report') {
  for (const p of scan_.problems) console.log(`FAIL marker    ${p}`)
  console.log(`strata-marks · root=${label} · ${scan_.files.length} test file(s)`)
  printReadings(index.readings)
  if (verb === 'report') process.exit(scan_.problems.length ? 1 : 0)
  if (scan_.problems.length) {
    console.log(`exit 1 — ${scan_.problems.length} marker problem(s); ${INDEX} NOT written (D-30: the marker is the authority)`)
    process.exit(1)
  }
  writeFileSync(join(root, INDEX), `${JSON.stringify(index, null, 2)}\n`)
  console.log(`wrote ${INDEX} — ${index.marked.length} marker(s), ${index.gates.length} carve-out(s)`)
  process.exit(0)
}

if (verb === 'check') {
  let failures = scan_.problems.length
  for (const p of scan_.problems) console.log(`FAIL marker    ${p}`)
  const path = join(root, INDEX)
  if (!existsSync(path)) {
    if (scan_.marked.length) {
      console.log(`FAIL index     ${INDEX} is absent but ${scan_.marked.length} marker(s) exist — run \`index\``)
      failures += 1
    } else {
      console.log(`INFO index     no markers and no ${INDEX} — the whole suite is gated at this head (D-30)`)
    }
  } else {
    const onDisk = JSON.parse(readFileSync(path, 'utf8'))
    for (const key of ['marked', 'gates', 'readings']) {
      if (JSON.stringify(onDisk[key] ?? null) !== JSON.stringify(index[key])) {
        console.log(`FAIL index     ${key} disagrees with the sources — run \`index\` (D-30: the marker is the authority)`)
        failures += 1
      }
    }
  }
  console.log(`strata-marks · root=${label} · ${scan_.files.length} test file(s)`)
  printReadings(index.readings)
  console.log(failures ? `exit 1 — ${failures} failure(s)` : 'exit 0 — markers and index agree, no marker violates D-30')
  process.exit(failures ? 1 : 0)
}

console.log('usage: node scripts/strata-marks.mjs index|check|report [root]  (D-30)')
process.exit(2)
