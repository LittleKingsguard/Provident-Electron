#!/usr/bin/env node
/**
 * `demo/pane-drag-demo/build.mjs` — **THE ONE COMMAND THAT REGENERATES `demo.mjs`, AND THE ROW THAT PROVES IT IS CURRENT**
 * (`D-118`).
 *
 * WHY THIS FILE EXISTS. `D-94` deleted the demo's old source because it could not compile against the tree, and kept the
 * checked-in bundle on the argument that nothing rebuilt it — which is exactly how the tree came to carry a bundle a
 * version behind its own code, with no way to catch up. **A generated file with no generator is a copy, and a copy cannot
 * track its original.** This script is the generator: `demo.mjs` is derived from `demo.ts` and the `src/` modules it
 * imports, every time, by esbuild (already a devDependency, so no script key moves — the `package.json` `scripts` key set
 * is pinned by six censuses and none of them is touched here).
 *
 * THE THREE THINGS IT DOES.
 *
 *   1. **BUILD** (no arguments): bundles `demo/pane-drag-demo/demo.ts` for the browser into `demo/pane-drag-demo/demo.mjs`
 *      and PREPENDS a provenance header carrying one `sha256` per esbuild input, sorted by path. The header is the
 *      bundle's own statement of what it was built from — not a timestamp and not a mtime.
 *
 *   2. **CHECK** (`--check`, the default file): rebuilds the manifest from the sources as they stand NOW and compares it
 *      with the header the file on disk carries. A source that moved, an input that appeared (a new import) or one that
 *      vanished each answer a NAMED disagreement and exit `1`. `tests/demo-bundle.test.ts`'s `DB-1` runs exactly this, so
 *      the suite reds the moment the bundle falls behind — the durable fix for the failure this pass was given.
 *
 *   3. **VERIFY** (`--verify <path>`, the control): the same comparison against ANY file. `DB-2` copies the committed
 *      bundle, plants a one-byte edit, and requires this arm to refuse it — a staleness instrument that cannot fail is a
 *      deleted row wearing a new name.
 *
 * **WHY A CONTENT HASH AND NOT AN MTIME COMPARISON, STATED BECAUSE THE INSTRUCTION OFFERED BOTH.** Git writes a checkout's
 * files in index order and mtimes follow the write order, so on a fresh clone `demo.ts` is NEWER than `demo.mjs` while the
 * content is exactly what the bundle was built from: an mtime gate would red every clean clone for a file that is not
 * stale, and a gate that reds on clean trees is not a gate. A content hash answers the question actually being asked — is
 * this bundle the bundle these sources produce? — and it is stable across checkout order, `touch`, and `git archive`. It
 * also catches what an mtime gate cannot: a source whose content changed while its mtime was preserved.
 *
 * **THE ONE TRANSFORMATION THIS SCRIPT APPLIES TO APP CODE, AND WHY IT IS NOT AN EDIT.** `src/renderer/renderer.ts` ends
 * its module scope with a boot guard — `if (typeof document !== 'undefined') { ... void main() }` — which, imported,
 * BOOTS THE APP into `#app`: it constructs `Runtime`, loads the authored envelope and clobbers the demo's page. The demo
 * page is not the app (no preload, no main process, no graph), so the import must not boot it. The plugin below neutralises
 * exactly that one guard, and it FAILS THE BUILD unless the guard's text appears EXACTLY ONCE in the module, so a renderer
 * whose boot site moves reds here rather than silently booting inside the demo. **Nothing else in `src/` is transformed:
 * every other app byte in the bundle is the app's own, unmodified, and the bundle's `// src/…` source markers say so.**
 */
import { build } from 'esbuild'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..', '..')
const ENTRY = 'demo/pane-drag-demo/demo.ts'
const OUTFILE = join(HERE, 'demo.mjs')
const GENERATOR = 'demo/pane-drag-demo/build.mjs'

/** THE GUARD THIS SCRIPT NEUTRALISES — matched as literal text, and required to occur exactly once (see the header). */
const BOOT_GUARD = "if (typeof document !== 'undefined') {"

const sha256 = (value) => createHash('sha256').update(value).digest('hex')

/** Neutralise `renderer.ts`'s one boot guard, and refuse the build if its text is not exactly where this script expects it. */
const bootGuardPlugin = {
  name: 'neutralise-renderer-boot',
  setup(context) {
    context.onLoad({ filter: /[\\/]src[\\/]renderer[\\/]renderer\.ts$/ }, (args) => {
      const text = readFileSync(args.path, 'utf8')
      const occurrences = text.split(BOOT_GUARD).length - 1
      if (occurrences !== 1) {
        throw new Error(
          `${GENERATOR}: expected renderer.ts's boot guard to appear exactly once, found ${occurrences}. ` +
            `The demo imports the app's renderer for its pane-drag composition and must neutralise that guard; ` +
            `fix this script (and its header) rather than letting the app boot inside the demo page.`,
        )
      }
      const contents = text.replace(
        BOOT_GUARD,
        `if (false) { /* ${GENERATOR}: the app boot is neutralised for the demo page (D-118) */`,
      )
      return { contents, loader: 'ts', resolveDir: dirname(args.path) }
    })
  },
}

/** ONE BUNDLE, UNWRITTEN — the body and the exact input manifest (which is what the header records). */
async function bundle() {
  const result = await build({
    absWorkingDir: ROOT,
    entryPoints: [ENTRY],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    target: ['es2022'],
    outfile: OUTFILE,
    write: false,
    metafile: true,
    logLevel: 'silent',
    legalComments: 'none',
    plugins: [bootGuardPlugin],
  })
  const inputs = Object.keys(result.metafile.inputs).sort()
  const manifest = [[GENERATOR, sha256(readFileSync(join(ROOT, GENERATOR)))]]
  for (const path of inputs) manifest.push([path, sha256(readFileSync(join(ROOT, path)))])
  manifest.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
  return { body: result.outputFiles[0].text, manifest }
}

/** THE HEADER — the bundle's own statement of what it was built from. Parsed back by `--check`/`--verify`. */
function headerFor(manifest, body) {
  return [
    '// demo/pane-drag-demo/demo.mjs — GENERATED FILE, DO NOT EDIT (D-118).',
    `// The source is ${ENTRY} (plus stub-view.ts) and every app module it imports from src/; the bundler is esbuild.`,
    `// Rebuild:  node ${GENERATOR}`,
    `// Verify:   node ${GENERATOR} --check`,
    '// The @source lines below are the bundle\'s PROVENANCE: one sha256 per input, sorted by path, plus the digest of the',
    '// generated body itself. A source that moved, an import that appeared, or a hand-edited body makes --check exit 1',
    '// and the suite\'s DB-1 row red.',
    `// @generated-by ${GENERATOR}`,
    `// @source-count ${String(manifest.length)}`,
    `// @body-sha256 ${sha256(body)}`,
    ...manifest.map(([path, digest]) => `// @source ${digest} ${path}`),
    '// @end-sources',
    '',
  ].join('\n')
}

/** WHERE THE GENERATED BODY BEGINS — the first `@end-sources` line, found from the top (the provenance block is first). */
const BODY_MARKER = '// @end-sources\n'

/** The provenance a file on disk carries — or a named reason where it carries no header at all. */
function manifestOf(text) {
  const entries = []
  let declared = null
  let bodySha = null
  let reason = null
  for (const line of text.split('\n')) {
    if (line.startsWith('// @source ')) {
      const rest = line.slice('// @source '.length)
      const space = rest.indexOf(' ')
      if (space <= 0) {
        reason = 'a malformed @source line'
        break
      }
      entries.push([rest.slice(space + 1), rest.slice(0, space)])
      continue
    }
    if (line.startsWith('// @source-count ')) declared = Number(line.slice('// @source-count '.length))
    if (line.startsWith('// @body-sha256 ')) bodySha = line.slice('// @body-sha256 '.length)
    if (line.startsWith('// @end-sources')) break
  }
  if (reason === null && entries.length === 0) reason = 'no provenance header'
  if (reason === null && bodySha === null) reason = 'no @body-sha256 line'
  const marker = text.indexOf(BODY_MARKER)
  const body = marker < 0 ? '' : text.slice(marker + BODY_MARKER.length)
  // A REFUSED READ ANSWERS `null` AND NOT AN EMPTY LIST: an empty list is a *current* bundle with no inputs, which would
  // compare clean against nothing. The caller's short-circuit is what makes a headerless file a STATED refusal.
  return { entries: reason === null ? entries : null, declared, bodySha, body, reason }
}

/** Compare a recorded manifest with the current one, answering the NAMED disagreements (never a bare boolean). */
function disagreements(recorded, current) {
  const now = new Map(current)
  const was = new Map(recorded)
  const out = []
  for (const [path, digest] of was) {
    const held = now.get(path)
    if (held === undefined) out.push(`removed  ${path} (the bundle carries it; the tree does not)`)
    else if (held !== digest) out.push(`changed  ${path}`)
  }
  for (const path of now.keys()) if (!was.has(path)) out.push(`added    ${path} (not in the bundle's provenance)`)
  return out
}

/** THE CHECK — one implementation, used by `--check`, by `--verify <path>`, and therefore by the suite's rows. */
async function check(target) {
  const recorded = manifestOf(readFileSync(target, 'utf8'))
  if (recorded.entries === null) {
    console.error(`STALE  ${target}: ${String(recorded.reason)} — this file was not produced by ${GENERATOR}`)
    return 1
  }
  const current = await bundle()
  const found = disagreements(recorded.entries, current.manifest)
  if (sha256(recorded.body) !== recorded.bodySha) {
    found.unshift(`edited   the generated body does not match its own @body-sha256 (a hand edit, or a truncated file)`)
  }
  if (sha256(current.body) !== recorded.bodySha) {
    found.unshift(`changed  the body ${GENERATOR} produces from these sources differs from the one this file carries`)
  }
  if (recorded.declared !== recorded.entries.length) {
    found.unshift(`declared  @source-count ${String(recorded.declared)} but ${String(recorded.entries.length)} @source line(s)`)
  }
  if (found.length === 0) {
    console.log(`CURRENT  ${target} — ${String(current.manifest.length)} inputs, every digest agrees with the sources`)
    return 0
  }
  console.error(`STALE    ${target} — the sources moved after it was built:`)
  for (const line of found) console.error(`  ${line}`)
  console.error(`  regenerate with: node ${GENERATOR}`)
  return 1
}

async function main() {
  const argv = process.argv.slice(2)
  const verifyAt = argv.indexOf('--verify')
  if (verifyAt >= 0) {
    const target = argv[verifyAt + 1]
    if (target === undefined) {
      console.error(`usage: node ${GENERATOR} --verify <path-to-a-bundle>`)
      return 2
    }
    return check(target)
  }
  if (argv.includes('--check')) return check(OUTFILE)
  const { body, manifest } = await bundle()
  writeFileSync(OUTFILE, `${headerFor(manifest, body)}${body}`, 'utf8')
  console.log(`wrote demo/pane-drag-demo/demo.mjs — ${String(body.length)} bytes of bundle, ${String(manifest.length)} inputs`)
  return 0
}

process.exitCode = await main()
