// tests/integration/secure-panels/foundation-registry.ts — **THE FIXTURE EVERY PANE ROW NEEDS, AND WHY IT IS NOT
// EVIDENCE**: `S-10` makes the pane's toggle rows the declaration registry's PROJECTION (`docs/L3/secure-panels/
// roster-and-placeholders.md` §2, `ASM-SP-1`), so a pane constructed with no registry authors NO row — the honest
// statement of "nothing has been declared to this pane" (`D-129`'s reading rule, `ASM-1`'s posture). A row that wants the
// foundation's six rows must therefore HAND one over, exactly as `src/renderer/renderer.ts` hands the one it composes.
//
// THIS IS A FIXTURE AND NOT A SECOND AUTHORITY: it composes the SAME foundation literal `main.ts` and `renderer.ts` found
// their registries on (`TOOL_GROUP_IDS`, `PLACEHOLDER_IDS`) and adds no id of its own (`D-26`'s derive-don't-restate). A
// row that needs a MODULE group passes its own declarations and its own carrier — the label is the declarer's (`C-9`), so
// the fixture cannot invent one.
import { createRegistry, type Declaration, type DeclarationRegistry } from '../../../src/shared/registry/index.js'
import { PLACEHOLDER_IDS } from '../../../src/renderer/secure-panels.js'
import { TOOL_GROUP_IDS } from '../../../src/shared/types.js'

/** The foundation's registry, composed the way both realms compose theirs: the five foundation literals this realm can
 *  read, and the declarations a row hands (none by default). The placeholder domain is the pane's own pinned set, because
 *  the renderer is the realm that composes it (`C-4`; main composes it empty). */
export function paneRegistry(declarations: readonly Declaration[] = []): DeclarationRegistry {
  return createRegistry(
    { pane: [], zone: [], group: TOOL_GROUP_IDS, tool: [], placeholder: PLACEHOLDER_IDS },
    declarations,
  ).registry
}
