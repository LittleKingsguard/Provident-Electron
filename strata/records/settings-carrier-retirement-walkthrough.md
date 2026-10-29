# record — `settings-carrier-retirement` exit walkthrough (D-10; replaced on every run)

**Scenario set**: 1 what was retired and what replaced it · 2 where the imported rows live and why · 3 the
boot arms (present / absent / corrupt / unrepresentable) · 4 written versus seeded files · 5 what the
unit explicitly did not do. Seat: one fresh delegation, quarantined to the docs.

## Run 1 — `DOC-GAP` (not green)

All five steps resolved. Found and fixed in place: an unresolvable shorthand in
`docs/L3/settings-carrier-retirement/signatures.md` §5, a stale cross-document claim in
`docs/L2/settings-carrier-retirement/persistence.md` §8 charging L1 with a literal ban L1 had removed,
and `legacy:'recorded'` — the fourth boot arm L1 §4 did not name. The unit's state record was still at
`stage: design` with no artifacts against a committed L4-green tree; reconciled. A second run is owed.
