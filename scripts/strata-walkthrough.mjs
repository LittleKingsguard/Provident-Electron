#!/usr/bin/env node
// scripts/strata-walkthrough.mjs — the walkthrough INSTRUMENT the corpus has been missing.
//
// `strata/walkthrough.md` §3 describes a staging root that no pass ever built by hand correctly: the
// first attempt generated `archive-tree.txt` with the prefix prepended to paths that already carried it,
// and a blind run reported that as a corpus defect. Seven runs then spent themselves re-finding drifted
// counts and non-landing cites that a script can refuse in a second (D-29).
//
// Three verbs, no dependencies:
//
//   stage <unit> [dest]   build the staging root §3 declares: the corpus, the layers, the root pointers,
//                         the manifest, a correct tracked-path listing, a correct archived-path listing,
//                         the built bundles, an empty work directory, and a STAGING.md stating the limits.
//   check <root>          resolve every backticked path a staged document cites, against the listings;
//                         exit 1 and name each failure. This is the check every blind run did by hand.
//   pins [root]           print the counts a document must not restate (D-26): test files flat and
//                         nested, src files, map rows and the cap each row derives, so a doc cites the
//                         script instead of a number that drifts.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const verb = args[0]

function tracked() {
  return execFileSync('git', ['ls-files'], { cwd: REPO, encoding: 'utf8' }).split('\n').filter(Boolean)
}

function archived() {
  const out = execFileSync('sh', ['-c', 'find archive -type f 2>/dev/null | sort'], { cwd: REPO, encoding: 'utf8' })
  return out.split('\n').filter(Boolean)
}

function head() {
  return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPO, encoding: 'utf8' }).trim()
}

function stage(unit, dest) {
  const root = resolve(dest ?? `/tmp/wt-${unit}`)
  rmSync(root, { recursive: true, force: true })
  mkdirSync(join(root, 'work'), { recursive: true })
  // `src/` IS STAGED, because a document's claims about code are checkable only against the code, and a
  // claim about a comment is checkable only in source — a `declare global` block is erased from every
  // bundle, which is how a true claim came back as a falsified one (D-44).
  for (const p of ['strata', 'docs', 'dist', 'src']) {
    if (existsSync(join(REPO, p))) cpSync(join(REPO, p), join(root, p), { recursive: true })
  }
  for (const p of ['README.md', 'AGENTS.md', 'package.json']) cpSync(join(REPO, p), join(root, p))
  writeFileSync(join(root, 'tree.txt'), tracked().join('\n') + '\n')
  // THE BUG THIS FILE EXISTS TO PREVENT: archived paths are written exactly as `find` reports them from
  // the repository root, with no prefix added — prepending one put every topic a segment too deep.
  writeFileSync(join(root, 'archive-tree.txt'), archived().join('\n') + '\n')
  const h = head()
  writeFileSync(join(root, 'STAGING.md'), `# staging root — a blind run's whole universe

Built by \`scripts/strata-walkthrough.mjs stage\` at HEAD \`${h}\` of branch \`strata\`. It is not the source
repository: \`src/\` is staged so that a claim about code — including a claim about a comment, which no bundle
carries — is checkable here, while \`tests/\`, \`scripts/\` and \`node_modules/\` are deliberately absent (D-44).

| Path | What it is |
|---|---|
| \`strata/\` | the live corpus: brief, decisions, the six procedures, platform facts, unit records, unit state, returns |
| \`docs/L1/\`, \`docs/L2/\`, \`docs/L3/\` | every layered design document as its owning layer wrote it |
| \`README.md\`, \`AGENTS.md\`, \`package.json\` | the root pointers and the manifest — \`package.json\` is staged, so its claims are checkable here |
| \`tree.txt\` | every tracked path at this head, names only |
| \`archive-tree.txt\` | every archived file at its real path from the repository root |
| \`src/\` | the TypeScript the bundles were built from, comments intact (D-44) |
| \`dist/\` | the built bundles from \`npm run build\` (no runner) |
| \`work/\` | empty scratch |

A path either listing carries resolves as a name, and a \`file:line\` cite into \`src/\` resolves against the
staged copy. A cite into \`tests/\`, \`scripts/\` or \`node_modules/\` cannot resolve here: that is a declared limit
of this instrument, never a finding against the document that carries it, and a claim the root cannot settle is
recorded as **unverifiable** rather than as falsified (\`strata/walkthrough.md\` §3, D-44).
`)
  const counts = { files: walk(root).length }
  console.log(`staged ${unit} at ${root} (HEAD ${h}, ${counts.files} files)`)
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

/** Every backticked token that looks like a repository-relative path, with its `:line` suffix kept aside. */
function pathTokens(text) {
  const out = new Map()
  for (const m of text.matchAll(/`([^`\n]+)`/g)) {
    for (const raw of m[1].split(/\s+/)) {
      const cleaned = raw.replace(/[,;)]+$/, '')
      const at = cleaned.match(/^([^:]+?)(:\d[\d,\-\u2013]*)$/)
      const tok = at ? at[1] : cleaned
      const lines = at ? at[2].slice(1) : ''
      // Only repo-relative paths: a token with a separator, no template/glob marker, not a directory.
      if (!tok.includes('/') || /[<>*{}.]{2}|^\//.test(tok) || tok.endsWith('/') || tok.startsWith('..')) continue
      if (/^\d/.test(tok) || tok.startsWith('@') || tok.startsWith('origin/')) continue // fractions, packages, refs
      if (!/^[\w.@][\w./@-]*$/.test(tok)) continue
      out.set(tok, lines)
    }
  }
  return [...out.entries()]
}

function check(root) {
  const tree = new Set(readFileSync(join(root, 'tree.txt'), 'utf8').split('\n').filter(Boolean))
  const arch = new Set(readFileSync(join(root, 'archive-tree.txt'), 'utf8').split('\n').filter(Boolean))
  const staged = new Set(['STAGING.md', 'tree.txt', 'archive-tree.txt'])
  let checked = 0
  const fails = []
  const retired = []
  const dirs = new Set()
  const tops = new Set()
  for (const p of [...tree, ...arch]) {
    const parts = p.split('/')
    tops.add(parts[0])
    for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join('/'))
  }
  for (const t of ['node_modules', 'dist']) tops.add(t)
  for (const file of walk(root)) {
    if (!/\.(md|json)$/.test(file)) continue
    const rel = relative(root, file)
    const text = readFileSync(file, 'utf8')
    for (const [tok, lineSpec] of pathTokens(text)) {
      if (tok.startsWith('node_modules/') || tok.startsWith('dist/')) continue
      if (/^src\/|^tests\/|^scripts\/|^demo\//.test(tok) && !tree.has(tok)) {
        // A code path absent from the tree is either a retired file the document names as deleted (which
        // the corpus cites on purpose) or a real defect. Report the class, never fail on it: the runner
        // judges, the script only saves them the search.
        retired.push(`${rel}: ${tok}`)
        continue
      }
      const known = tree.has(tok) || arch.has(tok) || staged.has(tok)
      // A `docs/<x>` cite resolves through the archive prefix (archive.md §2), never to the top level.
      const mapped = tok.startsWith('docs/') ? `archive/gate-corpus-2026-10-29/${tok.slice(5)}` : undefined
      // Only a token whose first segment is a real top-level entry is a repository path at all;
      // everything else is a protocol method, a git ref, a package name or a relative shorthand.
      if (!tops.has(tok.split('/')[0])) continue
      if (!known && !dirs.has(tok) && !(mapped && arch.has(mapped)) && !arch.has(tok) && !tree.has(tok + '/')) {
        fails.push(`${rel}: ${tok} (no tracked, archived or mapped referent)`)
        continue
      }
      // A `path:N` or `path:A-B` cite must also land inside the file — the runner found one that did not.
      if (lineSpec && existsSync(join(root, tok))) {
        const total = readFileSync(join(root, tok), 'utf8').split('\n').length
        const nums = lineSpec.split(',').flatMap((part) => {
          const [a, b] = part.split(/[-\u2013]/).map(Number)
          return b === undefined ? [a] : [a, b]
        })
        const over = nums.filter((n) => Number.isFinite(n) && n > total)
        if (over.length) { fails.push(`${rel}: ${tok}:${lineSpec} (line ${over[0]} past the file's ${total})`); continue }
      }
      checked++
    }
  }
  console.log(`checked ${checked} path cite(s) across the staged documents`)
  if (retired.length) console.log(`note ${retired.length} cite(s) name a path the tree does not carry — retired files the documents call deleted: ${retired.slice(0, 3).join('; ')}${retired.length > 3 ? ' …' : ''}`)
  if (fails.length) {
    for (const f of fails) console.log(`FAIL ${f}`)
    console.log(`exit 1 — ${fails.length} cite(s) do not resolve`)
    process.exit(1)
  }
  console.log('exit 0 — every path cite resolves to a tracked, archived or prefix-mapped referent')
}

function pins(root) {
  const base = root ? resolve(root) : undefined
  const tree = base ? readFileSync(join(base, 'tree.txt'), 'utf8').split('\n').filter(Boolean) : tracked()
  const mapPath = base ? join(base, 'strata/modules.json') : join(REPO, 'strata/modules.json')
  const flat = tree.filter((p) => /^tests\/[^/]+\.test\.ts$/.test(p)).length
  const nested = tree.filter((p) => /^tests\/.+\/.+\.test\.ts$/.test(p)).length
  const src = tree.filter((p) => /^src\/.*\.ts$/.test(p)).length
  const map = JSON.parse(readFileSync(mapPath, 'utf8')).modules
  console.log(JSON.stringify({
    testFiles: { flat, nested, total: flat + nested },
    srcTypeScriptFiles: src,
    mapRows: map.length,
    caps: Object.fromEntries(map.map((m) => [m.name, 50 + 10 * m.endpoints])),
  }, null, 2))
}

if (verb === 'stage') stage(args[1] ?? 'unit', args[2])
else if (verb === 'check') check(resolve(args[1] ?? '.'))
else if (verb === 'pins') pins(args[1])
else {
  console.log('strata-walkthrough <stage|check|pins> [args]')
  console.log('  stage <unit> [dest]   build the staging root walkthrough.md §3 declares')
  console.log('  check <root>          resolve every backticked path cite against the listings; exit 1 on any failure')
  console.log('  pins [root]           print the counts a document must cite, never restate (D-26)')
  process.exit(verb ? 2 : 0)
}
