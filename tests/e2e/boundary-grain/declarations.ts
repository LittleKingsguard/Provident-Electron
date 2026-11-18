// tests/e2e/boundary-grain/declarations.ts — THE ONE READER BOTH BOUNDARY READINGS IMPORT (D-301).
// FOUR EXPORTED VALUES AND TWO TYPES ARE THE MAP ROW'S `endpoints: 4`: cap `50 + 10×4 = 90` lines, and this file holds
// under it (D-14, design §5). THE VALIDATOR IS NOT HERE — `declarationProblems`, the `D-n` resolver, the fixtures and every
// arm live in the battery beside this file, because `W` needs the reader and no validator and a battery is evidence while
// a harness is capped (E-4, D-14). Nothing here asserts, no `strata:marked` (D-40).

import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { isAbsolute, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** THE FENCE INFO STRING, SPELLED ONCE — a block whose info string is not EXACTLY this is not a declaration (D-74). */
const DECLARATION_FENCE = 'boundary-declared'
/** WHERE A DECLARATION MAY LIVE — `P-4`'s table (design §3): L1 → `docs/L1/`, L2 → `docs/L2/<m>/`, L3 → `docs/L3/<m>/`,
 *  **L0 → `strata/`** (its own pages and `strata/records/`, so this tree's own charter file is declarable — E-1). L4 declares
 *  nothing; its L3 page says `by: "L4"` (E-3). */
const DECLARATION_HOMES = ['docs/L1', 'docs/L2', 'docs/L3', 'strata'] as const
const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url)) // the `cwd` `W`'s reading always used, unmoved.
/** THE SENTINEL A FAILED `git` READ ANSWERS, path-shaped on purpose so `B-1` reds naming it and `P-5` reds every entry. */
const GIT_READING_FAILED = '__GIT_READING_FAILED__'
/** One `writes[]` entry (path, reason, the authorizing `D-n`, and `by` — the layer that MADE the write) and one block with the page it was read out of, repo-relative and POSIX: the in-flight rule's key. */
export type DeclarationEntry = { readonly path: string; readonly why: string; readonly d: string; readonly by: string }
export type Declaration = { readonly page: string; readonly unit: string; readonly layer: string; readonly module: string | null; readonly writes: readonly DeclarationEntry[] }

/** A declaration fence and its body — the close repeats the opener's exact run — and an opener on its own, which is REFUSED. */
const DECLARATION_BLOCK = /^[ \t]*(`{3,}|~{3,})[ \t]*boundary-declared[ \t]*\r?\n([\s\S]*?)^[ \t]*\1[ \t]*\r?$/gm
const DECLARATION_OPEN = /^[ \t]*(?:`{3,}|~{3,})[ \t]*boundary-declared[ \t]*\r?$/gm
// THE EDIT SET, READ OFF THE TREE ITSELF. The path is sliced from index 3 and the line is NOT trimmed first: an unstaged
// modification reads `" M tests/…"`, and trimming before the slice shifted the path by one byte — the `RCA-8(d)` defect.
// A RENAME carries `old -> new` and the DESTINATION is the path to declare; a DELETION is an edit too.
// **`--untracked-files=all` IS PART OF THE INSTRUMENT**: without it git collapses a wholly untracked directory into ONE
// line naming no FILE (`docs/L2/app-shell/`), and the only scope that could satisfy such a reading declares the DIRECTORY,
// which admits every file a later pass drops under it.
export function editSetFromWorkingTree(): readonly string[] {
  try {
    return execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: REPO_ROOT, encoding: 'utf8' }).split('\n').filter((line) => line.length > 3).map((line) => line.slice(3).split(' -> ').pop()!.trim()).filter((path) => path.length > 0)
  } catch {
    return [GIT_READING_FAILED]
  }
}

/** EVERY `boundary-declared` BLOCK IN ONE PAGE'S TEXT, IN DOCUMENT ORDER — AND IT THROWS RATHER THAN SKIPS (D-74). */
export function parseDeclarationBlocks(text: string, page: string): Declaration[] {
  const blocks = [...text.matchAll(DECLARATION_BLOCK)]
  const unclosed = [...text.matchAll(DECLARATION_OPEN)].find((open) => !blocks.some((block) => block.index === open.index))
  if (unclosed !== undefined) throw new Error(`${page}:${text.slice(0, unclosed.index ?? 0).split('\n').length} — a \`${DECLARATION_FENCE}\` fence opens and is never closed; a declaration that cannot be read must RED, never be skipped (D-74)`)
  return blocks.map((block) => shapeOf(block[2], page, text.slice(0, block.index ?? 0).split('\n').length))
}

/** The shape check, one `throw` per way a body can be wrong, each naming the page and the line (D-74). */
function shapeOf(body: string, page: string, line: number): Declaration {
  const at = `${page}:${line}`
  const value = jsonOf(body, at)
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error(`${at} — a \`${DECLARATION_FENCE}\` body is a JSON OBJECT \`{"unit","layer","module","writes"}\` (D-301 §3)`)
  const block = value as Record<string, unknown>
  for (const key of ['unit', 'layer'] as const) if (typeof block[key] !== 'string') throw new Error(`${at} — \`${key}\` must be a STRING naming the seat that declares (D-301 §3)`)
  if (block.module !== null && typeof block.module !== 'string') throw new Error(`${at} — \`module\` is a STRING or \`null\`, the spelling for a seat with no module (D-301 §3)`)
  if (!Array.isArray(block.writes)) throw new Error(`${at} — \`writes\` is an ARRAY of \`{path,why,d,by?}\` entries (D-301 §3)`)
  const writes = block.writes.map((write: unknown, position: number) => shapeEntry(write, `${at} writes[${position}]`, block.layer as string))
  return { page, unit: block.unit as string, layer: block.layer as string, module: block.module, writes }
}
/** One entry's shape; `by` is RESOLVED here so every entry carries it, and whether a present one is lawful is `P-4`'s arm (E-3). */
function shapeEntry(write: unknown, where: string, layer: string): DeclarationEntry {
  if (typeof write !== 'object' || write === null || Array.isArray(write)) throw new Error(`${where} — an entry is a JSON OBJECT \`{"path","why","d","by"?}\` (D-301 §3)`)
  const entry = write as Record<string, unknown>
  for (const key of ['path', 'why', 'd'] as const) if (typeof entry[key] !== 'string') throw new Error(`${where} — \`${key}\` must be a STRING; the reason is the half the rule exists for (D-301 §3)`)
  if (entry.by !== undefined && typeof entry.by !== 'string') throw new Error(`${where} — \`by\` is absent or a STRING naming a layer (D-301 §3, E-3)`)
  return { path: entry.path as string, why: entry.why as string, d: entry.d as string, by: typeof entry.by === 'string' ? entry.by : layer }
}

// THE IN-FLIGHT DECLARATIONS — **THE FILTER RUNS BEFORE THE PARSE** (E-5): a committed page's block is history and is never
// even read, so a typo in another seat's committed page cannot red this row, and a declaration dies at the commit that lands
// it (D-1, D-146). `homes` is a parameter so `P-1` drives the reader over a FIXTURE home (E-8).
export function readInFlightDeclarations(editSet: readonly string[], homes: readonly string[] = DECLARATION_HOMES): Declaration[] {
  const inFlight = new Set(editSet)
  return homes.flatMap((home) => {
    const root = isAbsolute(home) ? home : join(REPO_ROOT, home)
    if (!isDirectory(root)) return []
    return markdownPages(root).filter((relative) => inFlight.has(`${home}/${relative}`)).flatMap((relative) => parseDeclarationBlocks(readFileSync(join(root, relative), 'utf8'), `${home}/${relative}`))
  }).sort((a, b) => (a.page < b.page ? -1 : a.page > b.page ? 1 : 0))
}
/** **`DECLARED_SCOPE`, AS A COMPUTATION AND NOT A LIST** — never de-duplicated, so `W`'s set arm still fails (D-146). */
export const declaredScope = (declarations: readonly Declaration[]): readonly string[] => declarations.flatMap((declaration) => declaration.writes.map((write) => write.path))
const isDirectory = (path: string): boolean => { try { return statSync(path).isDirectory() } catch { return false } }
const markdownPages = (root: string, prefix = ''): string[] => readdirSync(join(root, prefix), { withFileTypes: true }).flatMap((entry) => {
  const relative = `${prefix === '' ? '' : `${prefix}/`}${entry.name}`
  return entry.isDirectory() ? markdownPages(root, relative) : entry.name.endsWith('.md') ? [relative] : []
}).sort()
const jsonOf = (body: string, at: string): unknown => { try { return JSON.parse(body) as unknown } catch (error) { throw new Error(`${at} — the \`${DECLARATION_FENCE}\` body is not JSON (${String(error)}); a declaration that cannot be read must RED (D-74)`) } }
