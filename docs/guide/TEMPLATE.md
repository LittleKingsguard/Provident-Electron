# Page template — BINDING for every page under `docs/guide/`

This file is the template every guide page MUST follow. It is **binding**: a page
that drops a section, reorders them, or invents one is a review finding.

A page describes a **mechanism or surface of this repo** for two readers:

- a **developer consuming this repo as a prebuild baseline** — you are starting an
  Electron app on `provident-ssr` and want to know what you already have; and
- a **fork author** — you are changing a seam, so you must know which contracts are
  yours to implement and what degradation is declared when you don't.

## THE BINDING RULES (three; the third added 2026-10-04 — the page's other references to *"the two rules"* are read with this note and are not rewritten)

1. **NEVER RESTATE A SPEC.** The contract lives in `docs/specs/*.md`. A guide page
   **cites it by path + section** and says what the mechanism is *for*. If you find
   yourself paraphrasing a normative clause, stop and cite it instead. A restated
   clause is a second authority and drifts silently; a citation cannot.
2. **NEVER CLAIM BEHAVIOUR YOU HAVE NOT READ.** Every behavioural sentence must be
   traceable to bytes you read in this repo — a `src/**` file, a `docs/specs/*.md`
   file, or a test. Cite the path (and a test, when the fact was measured by one).
   Anything you could not verify is written **`unverified`** in the text, with what
   would settle it. "Probably", "should" and remembered-upstream behaviour are not
   evidence.
3. **A MODULE HEADER IS NOT A CLAUSE (added 2026-10-04, after a real miscommunication).**
   Neither is a doc-comment, a page's own scope paragraph, or a sibling page. The
   **normative** text is the spec (`docs/specs/*.md`) and, where an architect ruled,
   the `docs/decisions.md` **ACTIVE row cited by row name**. A header states what a
   mechanism is **for** and whose values it handles — a summary, written for
   orientation — and reading it as the admissibility rule is exactly how a downstream
   fork concluded that `slot-host` refused the very container shape its spec admits
   (any value offering a function-valued `appendChild`: `docs/specs/slothost.md` §2.1's
   container-source clause item 3; the header's *"for CALLER-CREATED nodes"* describes
   **whose nodes the host places**, not what it accepts). **Cite the spec section; if a
   header and a spec appear to disagree, the spec governs and the header is the thing
   to fix. And a fork-facing seam with no row anywhere is a documentation defect, not a
   pointer: give it a row in the `What a fork must supply` table with its spec cited.**

Use **real names** throughout: the exact export names, tool names, argument keys,
result members and file paths that exist in the tree. An example that would not
compile or would dispatch to a nonexistent tool is worse than no example.

## Sections, in this order

```markdown
# <Unit id or surface> — <what it is, in one clause>

<One short paragraph: the reader, the problem this page solves, and the one-line
answer. State the unit id (`U-THEME`, `provident.focus`, …) and the wave/ledger row
where the tracker carries one.>

## What it is

<What the mechanism/surface IS, at the level of responsibility and boundary — not
its clauses. Name what it owns and what it deliberately does not. Two to six
paragraphs.>

## Where it lives

<Files, as a table or list, each with the EXACT export names it publishes.>

| File | Exports |
| --- | --- |
| `src/shared/<x>.ts` | `<fnA>`, `<fnB>`, type `<T>` |
| `tests/<x>.test.ts` | the unit's own rows (a fact measured by a test is cited where it is used) |

## The contract it obeys

<CITATIONS ONLY. One row per contract, path + section, never the section's prose.>

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/<unit>.md` | §2.1 | the surface + its exports |
| `docs/specs/<unit>.md` | §2.3 | the declared refusals |
| `docs/specs/mcp-endpoint.md` | §3, §6.2 | the MCP tool table + the group model |

## Use cases

<Two to four REAL developer scenarios. Each is a job a baseline consumer or fork
author actually has — "I want the agent to see X", "I must replace the injected
reading with mine" — never an abstract description of the API. One short paragraph
each, named UC-1 … UC-n; the code section below carries one complete example per
use case, numbered to match.>

## Code, runnable

<One COMPLETE, copy-pasteable example per use case, in UC order. Complete means:
imports, the call, and what it returns. No `...`, no "your code here", no invented
helper. Every identifier must exist in the tree at the path cited above.>

```ts
// UC-1 — <the job>
import { <realExport> } from '../shared/<x>.js'

const result = <realCall>
// result: { <realMembers> }
```

## What it refuses / does not do

<The declared non-goals and refusals, as bullets. This is where a reader learns a
mechanism will NOT do the thing they assumed. Cite the spec section that fixes each
refusal; do not restate it.>

## What a fork must supply

<REQUIRED for a unit with seams; write "this unit has no seams" if it truly has
none, and say how you established that (e.g. the module's import census is zero).>

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `<seamName>` | REQUIRED / OPTIONAL | the host / the fork | the declared degradation (`docs/specs/<unit>.md` §…) | the declared degradation (…) | the declared degradation (…) |

<A seam row without a citation is a review finding. The three degradation columns
are separate readings; "absent" and "non-callable" are not the same arm.>

## Gotchas measured in this repo

<Only VERIFIED facts, each with its source. Typically: a real name that surprises
readers, a host guard that refuses an apparently-correct call, an off-by-one, a
count that changed in a later unit. Format: the fact, then `(source: <path>)`.>

- <fact> (`src/<path>.ts`, measured by `tests/<path>.test.ts`)
- <fact you could not verify> — **unverified**; would be settled by <what>.

## See also

<Related guide pages and the spec set, as links. Keep it short.>
```

## Notes that outlive any single page

- **Section titles are exact.** Use the headings above verbatim (`What it is`,
  `Where it lives`, `The contract it obeys`, `Use cases`, `Code, runnable`,
  `What it refuses / does not do`, `What a fork must supply`,
  `Gotchas measured in this repo`).
- **Counts are duplicated checks, never the claim.** When a page asserts a set
  (the five groups, the seven mutating methods, the 22 `ALL_TOOLS` members), assert
  it **by name** and give the count beside it, citing the source of the name set.
  A count alone goes stale the next time the set changes.
- **The page is not a spec.** If the guide and a spec disagree, the spec governs and
  the guide page is the thing to fix — in the same pass, per `AGENTS.md` item 6.
