# GemOs dashboard — next-session handoff

8 October 2026 · Repository: [prodbycjbeatsss/GemOS](https://github.com/prodbycjbeatsss/GemOS) · Branch: main.

## What GemOs is building towards

GemOs is CJ’s personal, dashboard-led operating system for the @prodbycjbeatsss music-production and content-release workflow. It should bring planning, release preparation, publishing records, useful analytics and automation status into one understandable command centre. The aim is to reduce repetitive work, maintain a consistent release cadence and help turn an audience into music/beat customers. It is a personal workflow tool, not a general social-media analytics service.

The intended workflow is: prepare a track/remix and its assets → check release readiness → prepare/schedule the main release and short clips → verify publication → review overall performance and the release batch → use those results to plan the next release. Existing tools such as the music-production setup, SPLIT, storage and metadata/catalogue records are integration context, not services already wired into GemOs. The current card references use one main release with six Tuesday–Sunday short clips; required publishing platforms are now confirmed below; future scheduling records and actual support remain untested.

The original dashboard concepts cover five groups:

| Group | Intended job | Current maturity |
|---|---|---|
| 1 | Release buffer, upcoming projects and asset readiness | Reviewed visual reference; connections and approved accessibility fixes pending. |
| 2 | Overall short-form performance and a release-batch leaderboard | Reviewed layout; latest decisions queued; real imports untested. |
| 3 | Store revenue, email-list growth and YouTube revenue | Original concepts plus feasibility research; detailed review still ahead. |
| 4 | AI costs and studio subscriptions | Original concepts; real billing definitions/sources still to settle. |
| 5 | Publishing cadence and automation performance | Original concepts; require verified publications and instrumented jobs. |

Longer-term direction: connect selected tools and AI assistance to the workflow, with durable knowledge/decision records and human control over consequential actions. Keep useful deterministic workflows ahead of unnecessary agent complexity. This is direction, not approval to build a full autonomous platform, send messages, publish releases or purchase services.

Current work is the **design-reference and data-definition stage**. The repository contains operating instructions and reference HTML, not a finished Android app or live dashboard. CJ works primarily on a phone, so mobile usability matters, alongside the agreed desktop card groups. Final app stack, Android implementation, backend, authentication, hosting and automation engine are not settled; do not treat Kotlin or the current standalone HTML as a locked architecture. Animation planning is deferred until the app works.

Success means the cards accurately answer what is ready, what is scheduled/published, how the content performed and what needs attention—using honest source/period/freshness labels rather than attractive mock claims. Follow the accepted design system, preserve group-specific layouts and seek confirmation for new product decisions. [Operator context](../../context/profile.md) and [priorities](../../context/priorities.md) provide wider background; older CJ-OS naming or platform lists do not override current GemOs card decisions (Group 2 covers Shorts, TikTok and Reels).

## Initial project instructions

Continue the existing reference-card review; do not restart the project or redesign approved cards. Inspect the repository tree and current branch state first, then read in this order:

1. [AGENTS.md](../../AGENTS.md): standing permissions, workflow and document routes. [CLAUDE.md](../../CLAUDE.md) mirrors the standing guidance.
2. [Session guidance](../../references/agent-session-guidance.md): context continuity and token-efficient working.
3. [Dashboard index](README.md) and [master design system](../DESIGN_SYSTEM.md): authority and shared materials/geometry.
4. [Current plan](PLAN.md): ordered next steps and what is still unsettled.
5. Each affected group’s documents: [Group 1 specification](group-1/SPECIFICATION.md), [usage/connections](group-1/USAGE-AND-CONNECTIONS.md); [Group 2 specification](group-2/SPECIFICATION.md), [usage/connections](group-2/USAGE-AND-CONNECTIONS.md).
6. [Review ledger](REPOSITORY-REVIEW.md) for reproduction/evidence, and the latest relevant entries in [decision log](../../decisions/log.md). Read [API feasibility](ANALYTICS-FEASIBILITY.md) when discussing imports; its earlier metric tables are historical and later updates/current usage notes supersede them.
7. Inspect the affected code ranges in [Group 1 preview](group-1/preview.html) and [Group 2 preview](group-2/preview.html). Original all-card HTML and audit were supplied in chat; current isolated previews are authoritative and avoid reading the entire original file.

Completion: distinguish implemented reference behaviour, approved queued changes, deferred product choices and untested API claims before proposing the next action. If live files disagree with this checkpoint, inspect history and later confirmed decisions; ask about a real unresolved conflict rather than guessing.

## Latest decision

CJ chose A for release-buffer eligibility: A covered release week requires confirmed scheduling for one main YouTube video plus six Tuesday–Sunday source shorts on each of YouTube Shorts, TikTok and Instagram Reels: 19 platform uploads in total. All required destinations must qualify before the week counts towards the release buffer. Planned uploads, reminder-only tasks and submitted scheduling requests without acceptance confirmation do not qualify. One source short reused across platforms is three platform uploads. Real scheduling support and confirmation records remain untested; this decision defines the requirement, not a working connection.

CJ chose A for All-tab reporting: The All tab uses one shared rolling 28-day date range, ending on the latest date with complete, compatible imported data across the required platforms (Shorts, TikTok and Reels). Compare with the immediately preceding non-overlapping 28 days using matching coverage. Individual platform tabs may show their own latest complete window and must label it. Validate source day boundaries before claiming compatibility; matching date labels alone do not establish equivalent coverage. Missing sources remain explicitly identified under the existing partial-data rules; hide combined growth and target status until required coverage is complete. A missing source does not become zero.

CJ chose partial Monday batch review: once Sunday’s last clip reaches 24 hours, notify even if some snapshots are missing. Rank usable snapshots and show unranked clips with reasons. Incomplete results are called Batch review, not Final leaderboard. A missing capture does not postpone the review indefinitely or permit a later lifetime count under a 24-hour label. Delivery time, channel and retry/update mechanics are deferred until integration work.

## Approvals and pending implementation

CJ approved all proposed review fixes, then asked to settle open decisions one at a time before applying the changes together. R04–R07 documentation fixes were already completed. The following reference-code work is authorised but **not yet implemented**:

| Item | Approved change |
|---|---|
| R01 | Make Group 1’s third project date visible with fallback fonts at mobile widths and the 840px breakpoint, keeping normal fixed card geometry. |
| R02 | Preserve access to enlarged text with the design system’s accessibility reflow exception; keep the normal accepted layout. Exact implementation is the agent’s job; clarify a material new design tradeoff if needed. |
| R03 | Prevent Group 1’s unguarded Tailwind configuration error when the CDN is unavailable; check dependencies before removal/guarding. |
| R10 | Correct the comment that says count beyond gaps; existing buffer logic correctly stops at the first gap and should stay unchanged. |
| 2.1 | Replace Shorts Stayed to watch with Likes. Retain subscribers gained for Shorts and followers gained for TikTok/Reels. The earlier TikTok Comments replacement is superseded. No automatic metric substitution. |
| 2.2 | Keep Shorts Views (24hrs), add Snapshot taken at 24h · up to 15 min later, then selected batch dates including year (6–11 October 2026 / 13–18 October 2026 examples). Actual capture age stays in details. |

The previews still contain the older metric/secondary-header wording. They are mock references with placeholder Sync; no API, scheduler or notification was built. Product decisions authorise these reference edits, not undisclosed account setup, live publishing or a full app build.

## Confirmed decisions to preserve

- Release-buffer coverage requires all 19 uploads described above; a missing destination blocks that week. Reminder-only tasks do not count as confirmed scheduling.
- All uses the shared rolling window described above; preserve missing-source rules and validate real source day boundaries before claiming comparable coverage.
- 2.1 is overall activity during the rolling last 28 days, compared with the preceding non-overlapping 28 days. It is not a calendar month or lifetime totals for posts published in the period. 2.2 covers one Tuesday–Sunday release batch.
- Four platform tiles are listed in Group 2 usage notes. Audience-growth attribution is to the selected short-form content; API support and period remain to test. Missing is unavailable, not zero.
- 2.2 ranks frozen usable snapshots only after 24 hours. Provisional capture window: 24:00–24:15 inclusive, aim at 24:00. Test before locking it; discuss widening if too many captures fail. Record actual capture time; fetch timing cannot guarantee fresh platform counters. Missed/new uploads stay unranked below valid results.
- Preserve accepted purple material, coloured brand icons, single-select one-row chips, fixed normal group slots, matched Group 2 panels, gradient bars and footer Sync/details. Shared rules do not force Group 1’s content layout onto Group 2.
- Direct APIs first; TikTok Business and Instagram Creator/Business are provisional. Activepieces is optional, selected only if it saves work. No scheduler/hosting choice yet. Defer animations until the app works.

## Next steps and completion checks

1. Read the sources above and briefly tell CJ the next unresolved item. The All-tab shared-window convention is now confirmed; source boundary compatibility remains an API-test question. Group 1’s required publishing-platform set is also confirmed. The next product item is the WIP/final-asset eligibility rule; defer scanner implementation and freshness thresholds until integration evidence exists. Preserve existing partial-data rules; explain source limitations plainly. Discuss other relevant open items in PLAN.md individually; defer integration-only choices until evidence exists. Leave extra panel space untouched if no useful content is approved.
2. Once relevant decisions are settled, apply the authorised fixes/changes in a focused code pass. Update affected specifications, usage notes, plan and review resolutions together. Do not request the same approval again.
3. Reproduce the original bugs and verify the resulting fix: widths 320, 390, 840 and 1280px, intended/fallback fonts, three project dates, enlarged text, no clipping or page overflow, equal normal group card sizes, all platform/batch states, keyboard chips, dialogs/Escape/focus return and honest Sync placeholders. Add relevant widths if a breakpoint changes. Actual Android font scaling/Back and full measured contrast remain unverified; do not claim these passed from browser probes.
4. Commit code, documents and evidence summary to GemOS; verify the remote branch and linked paths. Retain old report evidence as history and state which findings are fixed with new evidence.
5. Present a scoped real YouTube import test for CJ’s approval, then validate TikTok/Reels fields, attribution and reporting windows. Do not replace follower metrics merely because Studio and API access differ. A supplied TikTok screenshot shows per-video New followers; it proves display, not import support.
6. After imports prove useful, choose scheduler/hosting and Monday notification implementation. Continue Groups 3–5 card by card later. Do not invent final group specifications, legal contracts or onboarding answers.

## Existing evidence and limits

The dated [HTML report](REVIEW.html) contains 11 findings and screenshots; it is a review snapshot, not current implementation status. The ledger now points here for subsequent approvals. Baseline review read 68 text/source files across 167 tree entries. Group 1 had 48 normal-state combinations and a controlled enlarged-text probe; Group 2 had 32 batch/platform/width combinations. Group 1 fallback-font clipping and enlarged-text loss were confirmed; tested Group 2 layouts passed. Syntax checks covered 10 canonical JS/MJS files, the shell script and package JSON; read skill Markdown mirrors matched. No live imports, full bundled 3D-brain build/security audit, native Android checks or full WCAG conformance were established.

Temporary browser scripts/captures from the previous workspace may disappear. Recreate meaningful verification from the committed previews and reproduction details rather than relying on scratch paths. Keep replies concise and plain, read the design rules before edits, ask one unsettled question at a time, and follow session guidance for checkpointing. The agent can report an explicit compaction signal or known context loss; it cannot reliably predict chat compression or guarantee an early warning.
