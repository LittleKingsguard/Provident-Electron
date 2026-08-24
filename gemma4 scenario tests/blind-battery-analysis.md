# Blind-Battery Analysis Report (gemma4)

Comparison of blind-test results against ground-truth expectations in `docs/specs/gemma4-blind-expected.md`.

| Scenario | Result | Finding Category | Explanation |
| --- | --- | --- | --- |
| S1 | MATCH | - | Verified `registered >= inTree` (equality holds for demo). |
| S2 | MISMATCH | DOC-COMPLETENESS | Writer failed to predict `userEnvelope` dependency as it's not pinned in greens docs. |
| S3 | MATCH | - | Verified `census.inTree > 1` and `counter` render. |
| S4 | MATCH | - | Verified `{status:'rejected'}` for clone-instance on node 5. |
| S5 | MATCH | - | Verified `{status:'rejected'}` for null/undefined ops. |
| S6 | MATCH | - | Verified `{status:'rejected'}` for bogus-kind. |
| S7 | MISMATCH | DOC trap | Writer predicted `kind:'state'` instead of `state-slice` based on stale `runtime-host-greens.md` #15. |
| S8 | MISMATCH | DOC-COMPLETENESS | Writer predicted `treeSigMatch: true` for serialized round-trip; truth is `false`. |
| S9 | MATCH | - | Verified `{valid:false}` for bogus validation. |
| S10 | MATCH | - | Verified `inTree === 1` and root-only mount (not empty string). |
| S11 | MATCH | - | Verified idempotency of teardown. |
| S12 | MATCH | - | Verified throw `/unresolved target/` for post-teardown state request. |
| S13 | MISMATCH | DOC trap | Writer predicted every node has `cssId`; truth is root has none. |
| S14 | MATCH | - | Verified `nodeId` mapping for `counter`. |
| S15 | MATCH | - | Verified `census.inTree === 23` for cycle12. |
| S16 | MISMATCH | DOC-COMPLETENESS | Writer predicted 4095 for both DOM and SSR; truth is DOM=4096 (root+4095) / SSR=4095. |
| S17 | MATCH | - | Verified `inTree === 7` for cycle(4). |
| S18 | MATCH | - | Verified `>7<` render for command load. |
| S19 | MATCH | - | Verified empty command array is a no-op. |
| S20 | MATCH | - | Verified throw `/unknown load kind/` for bogus load. |
| S21 | MATCH | - | Verified `>9<` render for state-slice op. |
| S22 | MATCH | - | Verified throw `/not an array/` for root.hooks create. |
| S23 | MATCH | - | Verified throw `/out of range/` for root.hooks delete. |
| S24 | MATCH | - | Verified `{valid:false}` for garbage content validation. |
| S25 | MATCH | - | Verified throw `/no envelope/` for codeSet after doc load. |
| S26 | MATCH | - | Verified `themeName="light"` attribute. |
| S27 | MATCH | - | Verified probe error codes and seam-exempt status. |
| S28 | MISMATCH | DOC trap | Writer predicted `not.toContain('dropdown-menu')`; truth is it is present via def node. |
| S29 | MATCH | - | Verified `Log out` persists in DOM after logout. |
| S30 | MATCH | - | Verified debug panel status text format. |
| S31 | MATCH | - | Verified SSR preview truncation (~125 chars). |
| S32 | MISMATCH | CODE-CONSISTENCY | Writer predicted `N >= 10` based on `ci-divergence-leg.md` §4; truth is 9. |
| Edge: dispatch(nope) | MATCH | - | Verified throw `/unresolved target/`. |
| Edge: dispatch(inc, nope) | MATCH | - | Verified silent no-op (empty results). |
| Edge: op(bogus, node) | MISMATCH | DOC-CLARITY | Writer predicted `rejected`; truth is `no-usable-state`. |
| Edge: loadEnvelope(null) | MATCH | - | Verified mismatch throw. |
| Edge: loadEnvelope(twice) | MATCH | - | Verified full replace (census 12/12). |
| Edge: cycle-export | MATCH | - | Verified censusMatch: true for cycle round-trip. |
| Edge: serialized-sig | MATCH | - | Verified treeSigMatch: false. |
