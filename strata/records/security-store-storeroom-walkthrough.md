# record — `security-store-storeroom` exit walkthrough (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 what replaced the store and where state lives ·
2 prove the isolation · 3 boot and import · 4 who may write, and a commit that cannot land · 5 find the
coverage. Seat: one fresh delegation, quarantined to `strata/`, `docs/L1..L3/`, the root pointers and
`package.json`, with the two module subtrees visible as file names only.

## Run 1 — `STALE`

Every step was answerable with a citation and the runner reached the right facts: the instance and
surface split, the two addresses and their tiers, the receipt/refusal vocabulary, the six isolation
absences with the battery that carries them, the five-arm import table with "the import writes no byte",
the one-reference rule, and the coverage ledger with its evidence status. What it falsified:

| Finding | Disposition |
|---|---|
| `docs/L1/security-store-storeroom.md` §8 still said the twelve e2e scenarios were "not yet authored at this grain" | replaced — they are authored as `S-1`..`S-12`, with the recovered seven beside them |
| `docs/L1/security-store-storeroom-exception.md` §6 pinned `preload.ts`'s **six** `window.provident` members against its own §9 and three other documents at **seven** | corrected to seven |
| D-18's wording put the construction in `main.ts`, while L2's `ASM-L2-8` gives it to the surface module | **D-21** filed: the invariant is unchanged and is what `ISO-5` asserts — the surface holds the one reference, `main.ts` holds the surface — and the rule for an ASM that satisfies a D-row is stated |

**docs-insufficient, routed:** none remained after D-21. **undocumented:** none within the wall; the
wall itself is the limit — no built artifact was staged, so the running surface was not tested
(`walkthrough.md` §3's staging root was not built; that remains the standing deviation from
`strata-bootstrap`'s record).

**Verdict: not green.** A second blind run is owed before this unit is recommended as ready (D-10, D-11).

## Run 2 — `STALE` (not green)

Second blind run: content and coverage sufficient, no step guessed. Two live contradictions found and
fixed — `docs/L2/security-store-storeroom/interface.md` §1 still attributed one address to L1 §3 (live:
two), and this unit's N=10/15 pin no longer resolved after the carrier retirement moved the map to
12/19. Both corrected in place. A further run is owed.
