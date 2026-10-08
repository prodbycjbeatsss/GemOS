# GemOs card review and integration plan

Updated 8 October 2026. Scope: continue this dashboard-card review, resolve source limitations and validate a small integration before wiring live analytics. This is not a full app architecture or deployment plan.

## Working documents

- ../DESIGN_SYSTEM.md: shared agreed design rules; the original Group 1 specification is retained as a source reference.
- group-2/SPECIFICATION.md: current Group 2 design and behaviour decisions.
- ANALYTICS-FEASIBILITY.md: documentation research across all 11 original cards; not tested integrations.
- group-1/USAGE-AND-CONNECTIONS.md: finalised Group 1 visual behaviour, intended connections and open integration decisions.
- GemOs-Card-Audit.html: advisory source supplied in the review chat, not an authoritative current specification.
- group-2/preview.html: current isolated preview containing only Group 2; all figures illustrative.
- This document: review order, status, open decisions and next action.

## How we work

Explain purpose, problems and recommendations in plain language. Discuss one consequential decision at a time with CJ, using A/B/C options when useful. Read the current design rules before edits. Ask about unsettled choices rather than inventing them. Never change code without CJ’s confirmation. Keep confirmed decisions separate from proposals and feasibility assumptions. Update the specification and this plan when decisions change. Keep cards fixed within their group and check relevant mobile/desktop behaviour after layout changes. Defer animation planning until the app works.

## Confirmed direction

- Group 2 keeps the accepted purple material, chips, fixed group geometry and matched recessed panels. Both cards have left footer Sync controls; dashboard Sync all is planned, with no extra group Sync.
- Direct platform APIs first; no paid analytics provider selected.
- For 2.2 use frozen view snapshots captured around each upload’s 24-hour mark, recording the actual capture time. Missed captures stay unranked rather than using a later lifetime count.
- Activepieces is optional, to be adopted only if it saves work. A custom scheduler is also an option. Neither is committed.
- TikTok Business and Instagram Creator/Business are provisional, not verified account facts.
- Displayed example metrics have not been replaced following research; further code edits require confirmation.

## Sequence and completion criteria

| Step | Status | Work and completion criterion |
|---|---|---|
| 1. Review Group 1 and establish shared rules | Completed in this review | Agreed Group 1 reference and shared specification exist. |
| 2. Refine Group 2 layout and interactions | Implemented; reference preview | Original material retained, chips reviewed, panels matched, Sync controls added. Mobile/desktop checks passed; no live imports. |
| 3. Research data feasibility across original cards | Documentation review completed | Every original card covered; assumptions and source limits listed. Account access remains untested. |
| 4. Resolve 2.1 metrics and reporting scope | **Current** | Agree four useful metrics per platform, replacements for unsupported tiles, true selected-window scope and partial coverage behaviour. |
| 5. Finish 2.2 snapshot rules | Partly agreed | Agree timing tolerance, honest heading/detail wording, missed/late captures and final-review notification behaviour. |
| 6. Validate one real YouTube import | Not started | Verify authorised access; fetch a small sample and compare source, period and definitions against the dashboard. CJ must authorise any test code/account setup. |
| 7. Validate TikTok and Instagram coverage | Not started | Verify account types/access; test watch metrics, attribution, selected-period reports and post-count snapshots. Record unavailable fields explicitly. |
| 8. Choose scheduler and hosting | Deferred | Compare the concrete tested workflow with Activepieces versus a small custom scheduler. Select only after reviewing setup, maintenance, hosting and reuse. |
| 9. Update Group 2 preview | Awaiting metric decisions and code approval | Implement only agreed changes; update spec; verify fixed sizing, mobile/desktop, keyboard and loading/missing-data states as applicable. |
| 10. Review Groups 3–5 | Not started | Work card by card through purpose, data definition, feasible sources, design and confirmed edits. Use the existing all-card research. |
| 11. Plan app implementation and animations | Deferred | Confirm stack, broader app scope and build plan separately; plan motion after a working app exists. |

The minimal YouTube test can run before every cross-platform metric is settled if it helps resolve a decision. Do not build a complete automation system before this test establishes useful data.

## Current open decisions

- YouTube replacement for Stayed to watch: Likes approved; real report validation and preview implementation pending.
- TikTok and Instagram clip-attributed Followers gained are retained; verify imports and show unavailable if unsupported.
- Last-28-days activity reporting versus post-publication cohorts: these are different definitions, not interchangeable.
- Weighted watch aggregates, date boundaries and partial data in All.
- 24-hour capture tolerance; late/missed snapshots; precise label and review notification handling.
- API account permissions, hosting and workflow engine.
- Content to fill 2.1’s extra recessed space: unresolved; do not fill it arbitrarily.

## Next action

YouTube Likes replacement is approved. CJ retained audience-growth tiles for Shorts, TikTok and Reels, superseding the TikTok Comments choice. Review reporting scope next; follower-import capability remains to test. Implement agreed changes together after the decision review.

## Repository organisation — 8 October

CJ confirmed that reviewed/finished references belong in prodbycjbeatsss/GemOS, while telemetric-cards-test-suite is for experiments. Use docs/dashboard/README.md as the file index, docs/DESIGN_SYSTEM.md as the shared visual reference and docs/dashboard/group-1/ and group-2/ for current HTML sets. Existing repository material is preserved. Group 2 remains a reference with unresolved integration choices, not a finished live module.

## Per-group folders and review — 8 October

CJ approved a folder per reviewed group, containing preview.html, SPECIFICATION.md and USAGE-AND-CONNECTIONS.md. Older mixed documents are archived; shared design rules remain in docs/DESIGN_SYSTEM.md. A review using App Code Review and UI Verification checks document consistency, structure, known connections, skill mirror routing and browser behaviour. Open findings are in REPOSITORY-REVIEW.md. Review findings are not automatic permission for visual/product code changes.

## Review follow-up — 8 October

CJ approved the proposed existing-code fixes R01–R03 and R10. Settle open product decisions first, then implement approved fixes and newly agreed changes with relevant browser verification. Pending decisions remain pending; this approval does not establish working API connections.
