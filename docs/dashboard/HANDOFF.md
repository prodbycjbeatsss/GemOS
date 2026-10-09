# GemOs dashboard — next-session handoff

## 9 October 2026 — current integration checkpoint

Current checkpoint: 2.1 test design and interaction choices are finalised and consolidated in [STATUS](integration-tests/youtube/STATUS.md). AGENTS.md was reread after saving that checkpoint. 2.2 now sits on the same private page: shared read-only connection, selected release name and 1–6 same-release Shorts (three valid), ownership-checked metadata, actual titles/count/publication states and unranked details. No historical first-24-hour figures, scheduler or durable snapshot store exists. Controlled state checks pass; current rendered verification remains pending. Next integration slice is capture/storage, after reviewing this first metadata slice.

Updated 9 October 2026 · Repository: [prodbycjbeatsss/GemOS](https://github.com/prodbycjbeatsss/GemOS) · Branch: main.

## What GemOs is building towards

GemOs is CJ’s personal, dashboard-led operating system for the @prodbycjbeatsss music-production and content-release workflow. It should bring planning, release preparation, publishing records, useful analytics and automation status into one understandable command centre. The aim is to reduce repetitive work, maintain a consistent release cadence and help turn an audience into music/beat customers. It is a personal workflow tool, not a general social-media analytics service.

The intended workflow is: prepare a track/remix and its assets → check release readiness → prepare/schedule the main release and short clips → verify publication → review overall performance and the release batch → use those results to plan the next release. Existing tools such as the music-production setup, SPLIT, storage and metadata/catalogue records are integration context, not services already wired into GemOs. The current card references use one main release with six Tuesday–Sunday short clips; required publishing platforms are now confirmed below; future scheduling records and actual support remain untested.

The original dashboard concepts cover five groups:

| Group | Intended job | Current maturity |
|---|---|---|
| 1 | Release buffer, upcoming projects and asset readiness | Reviewed visual reference; approved fixes verified, live connections pending. |
| 2 | Overall short-form performance and a release-batch leaderboard | Reviewed layout; latest reference changes implemented/verified; real imports untested. |
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

## YouTube test checkpoint — 9 October 2026

CJ approved the browser-only OAuth/manual import route after reviewing alternatives. The isolated [YouTube test and setup guide](integration-tests/youtube/README.md) now contains Connect, channel selection, 1–5 user-confirmed Shorts, manual Sync, the five requested Analytics metrics, source/period details and disconnect/expiry handling. Private test URL: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site. Controlled browser/API-fixture checks passed; CJ now reports successful read-only connection and one live successful import; agent has not inspected raw responses or verified Studio agreement. A second older video exposed the strict validator; updated handling marks only affected metrics unavailable and exposes diagnostics. Canonical previews are unchanged.

Use this test for the next step: CJ reports completing his Google Cloud project, two APIs, public Web OAuth client and read-only consent. Retry the updated older-video handling and tab refresh persistence, then compare with Studio. No client secret is used. Verify the same videos/period in Studio, then document actual access and metric definitions. This is a selected sample, not whole-channel Shorts. Latest returned day is an observed cutoff, not guaranteed complete coverage; growth/targets remain hidden. No backend or unattended snapshot scheduler was selected. CJ subsequently requested refresh persistence: the short-lived token/expiry/public client ID are now retained in tab sessionStorage, restored only after a channel check, cleared on expiry/revocation/disconnect; results stay in memory. Final app hosting/stack remain open; Sites hosts only the isolated experiment.

## Latest decision

9 October 2026: CJ chose automatic file checks: an asset earns Pass when the correct project file exists, matches the required type and contains no literal (WIP) marker anywhere in its filename, checked case-insensitively. No separate manual approval is required. A marker such as (wip) or (WiP) excludes that file. Required sets must be complete: the Shorts part needs all six eligible source files; the WAV-stems part needs the required set defined by the project manifest. These checks establish file eligibility, not creative quality. Project matching, exact format validation and manifest details still need specification during scanner implementation; failed/no-access scans must not masquerade as missing files or a successful check.

CJ chose A for release-buffer eligibility: A covered release week requires confirmed scheduling for one main YouTube video plus six Tuesday–Sunday source shorts on each of YouTube Shorts, TikTok and Instagram Reels: 19 platform uploads in total. All required destinations must qualify before the week counts towards the release buffer. Planned uploads, reminder-only tasks and submitted scheduling requests without acceptance confirmation do not qualify. One source short reused across platforms is three platform uploads. Real scheduling support and confirmation records remain untested; this decision defines the requirement, not a working connection.

CJ chose A for All-tab reporting: The All tab uses one shared rolling 28-day date range, ending on the latest date with complete, compatible imported data across the required platforms (Shorts, TikTok and Reels). Compare with the immediately preceding non-overlapping 28 days using matching coverage. Individual platform tabs may show their own latest complete window and must label it. Validate source day boundaries before claiming compatibility; matching date labels alone do not establish equivalent coverage. Missing sources remain explicitly identified under the existing partial-data rules; hide combined growth and target status until required coverage is complete. A missing source does not become zero.

CJ chose partial Monday batch review: once Sunday’s last clip reaches 24 hours, notify even if some snapshots are missing. Rank usable snapshots and show unranked clips with reasons. Incomplete results are called Batch review, not Final leaderboard. A missing capture does not postpone the review indefinitely or permit a later lifetime count under a 24-hour label. Delivery time, channel and retry/update mechanics are deferred until integration work.

## Completed approved reference changes

CJ approved all proposed review fixes, then asked to settle open decisions one at a time before applying the changes together. R04–R07 documentation fixes were already completed. The following approved reference work is **implemented and browser-verified on 9 October**; see [evidence and captures](verification/2026-10-09.md):

| Item | Completed change |
|---|---|
| R01 | Make Group 1’s third project date visible with fallback fonts at mobile widths and the 840px breakpoint, keeping normal fixed card geometry. |
| R02 | Preserve access to enlarged text with the design system’s accessibility reflow exception; keep the normal accepted layout. Exact implementation is the agent’s job; clarify a material new design tradeoff if needed. |
| R03 | Prevent Group 1’s unguarded Tailwind configuration error when the CDN is unavailable; check dependencies before removal/guarding. |
| R10 | Correct the comment that says count beyond gaps; existing buffer logic correctly stops at the first gap and should stay unchanged. |
| 2.1 | Replace Shorts Stayed to watch with Likes. Retain subscribers gained for Shorts and followers gained for TikTok/Reels. The earlier TikTok Comments replacement is superseded. No automatic metric substitution. |
| 2.2 | Keep Shorts Views (24hrs), add Snapshot taken at 24h · up to 15 min later, then selected batch dates including year (6–11 October 2026 / 13–18 October 2026 examples). Actual capture age stays in details. |

The previews now contain Likes/growth labels, snapshot subtitle and year dates. Clip details show capture age; mock eligibility enforces the inclusive 24:00–24:15 window. Group 1 examples use 19 uploads. They are mock references with placeholder Sync; no API, scheduler or notification was built. Product decisions authorise these reference edits, not undisclosed account setup, live publishing or a full app build.

## Confirmed decisions to preserve

- Asset readiness uses the automatic eligibility rule above; no extra manual approval step. Scanner connections are still unimplemented.
- Release-buffer coverage requires all 19 uploads described above; a missing destination blocks that week. Reminder-only tasks do not count as confirmed scheduling.
- All uses the shared rolling window described above; preserve missing-source rules and validate real source day boundaries before claiming comparable coverage.
- 2.1 is overall activity during the rolling last 28 days, compared with the preceding non-overlapping 28 days. It is not a calendar month or lifetime totals for posts published in the period. 2.2 covers one Tuesday–Sunday release batch.
- Four platform tiles are listed in Group 2 usage notes. Audience-growth attribution is to the selected short-form content; API support and period remain to test. Missing is unavailable, not zero.
- 2.2 ranks frozen usable snapshots only after 24 hours. Provisional capture window: 24:00–24:15 inclusive, aim at 24:00. Test before locking it; discuss widening if too many captures fail. Record actual capture time; fetch timing cannot guarantee fresh platform counters. Missed/new uploads stay unranked below valid results.
- Preserve accepted purple material, coloured brand icons, single-select one-row chips, fixed normal group slots, matched Group 2 panels, gradient bars and footer Sync/details. Shared rules do not force Group 1’s content layout onto Group 2.
- Direct APIs first; TikTok Business and Instagram Creator/Business are provisional. Activepieces is optional, selected only if it saves work. No scheduler/hosting choice yet. Defer animations until the app works.

## Next steps and completion checks

1. Read the sources above and briefly tell CJ the next unresolved item. The All-tab shared-window convention is now confirmed; source boundary compatibility remains an API-test question. Group 1’s required publishing-platform set is also confirmed. The automatic WIP/final-asset eligibility rule is also confirmed. Relevant pre-edit decisions are settled and the approved fixes are implemented/verified: next scope a small YouTube import test, while deferring scanner implementation, freshness thresholds and source compatibility choices until integration evidence exists. Preserve existing partial-data rules; explain source limitations plainly. Discuss other relevant open items in PLAN.md individually; defer integration-only choices until evidence exists. Leave extra panel space untouched if no useful content is approved.
2. Completed 9 October: authorised reference changes applied. Update affected specifications, usage notes, plan and review resolutions together. Do not request the same approval again.
3. Completed browser verification 9 October (evidence linked above): widths 320, 390, 840 and 1280px, intended/fallback fonts, three project dates, enlarged text, no clipping or page overflow, equal normal group card sizes, all platform/batch states, keyboard chips, dialogs/Escape/focus return and honest Sync placeholders. Add relevant widths if a breakpoint changes. Actual Android font scaling/Back and full measured contrast remain unverified; do not claim these passed from browser probes.
4. Commit code, documents and evidence summary to GemOS; verify the remote branch and linked paths. Retain old report evidence as history and state which findings are fixed with new evidence.
5. CJ approved the scoped browser-only YouTube test; source and private page are built. Complete Google setup/consent and Studio verification using the linked guide, then validate TikTok/Reels fields, attribution and reporting windows. Do not replace follower metrics merely because Studio and API access differ. A supplied TikTok screenshot shows per-video New followers; it proves display, not import support.
6. After imports prove useful, choose scheduler/hosting and Monday notification implementation. Continue Groups 3–5 card by card later. Do not invent final group specifications, legal contracts or onboarding answers.

## Existing evidence and limits

The dated [HTML report](REVIEW.html) contains 11 findings and screenshots; it is a review snapshot, not current implementation status. The ledger now points here for subsequent approvals. Baseline review read 68 text/source files across 167 tree entries. Group 1 had 48 normal-state combinations and a controlled enlarged-text probe; Group 2 had 32 batch/platform/width combinations. Group 1 fallback-font clipping and enlarged-text loss were confirmed; tested Group 2 layouts passed. Syntax checks covered 10 canonical JS/MJS files, the shell script and package JSON; read skill Markdown mirrors matched. No live imports, full bundled 3D-brain build/security audit, native Android checks or full WCAG conformance were established.

Current captures are committed under docs/dashboard/verification/2026-10-09/. Temporary browser scripts may disappear. Recreate meaningful verification from the committed previews and reproduction details rather than relying on scratch paths. Keep replies concise and plain, read the design rules before edits, ask one unsettled question at a time, and follow session guidance for checkpointing. The agent can report an explicit compaction signal or known context loss; it cannot reliably predict chat compression or guarantee an early warning.


## Latest Studio evidence — 9 October 2026

CJ supplied API details and a Studio export establishing that negative period Likes are displayed by Studio. Private sample figures and identifiers are omitted. The periods differ, so exact-window agreement remains unverified. The isolated test preserves signed whole-number Likes without inferring their cause. Next: retry signed Likes, verify refresh, then assess channel-wide import and coverage.

## Importer title visibility — 9 October 2026

CJ requested knowing which Shorts contribute to the imported analytics. The isolated test now displays an Included Shorts list above the card with imported titles/video IDs. It follows the successful report, retains that scope on failed retries and clears on selection changes/disconnect. Controlled five-video/long-title/mobile/security checks passed; canonical cards remain unchanged.


## Latest range decision and implementation — 9 October 2026

CJ confirmed 7/28/90/365-day ranges (28 default) and requested the date-range control below platform pills, moving the metric tiles lower within the recess. Implemented in the isolated YouTube importer; canonical previews remain unchanged. The current and previous aggregates use the selected equal-length adjacent windows; Google's percentage is displayed unchanged. Latest-day lookup is sorted descending with a one-row limit so long windows cannot omit their newest rows. Changed-range imports clear stale report/scope, then fetch automatically if a report was loaded; failed changed-range requests show no mismatched old data. Existing same-selection failure preservation and tab-session auth remain. See the test README for contract and controlled checks. Next user test: select 90 or 365 days, review exact dates and compare the same scope with Studio. Whole-channel Shorts discovery and complete coverage remain unverified.


## Latest compact controls and status — 9 October 2026

CJ rejected the range dropdown. The isolated test now has compact 7d/28d/90d/365d pills beneath platform pills, request-linked progress, a rotating Sync icon (reduced-motion-aware), final success/warning/failure status and last import time in the lower recess. Normal recess dimensions are explicitly 575/583px to match 2.2, with accessibility overflow reflow. State/syntax tests passed; revised browser rendering has not been verified because the supported control-browser skill is unavailable. The updated Playwright suite remains ready to run in a supported session. Ask CJ to review phone fit after refresh.

Scope clarification: 2.1 is intended to include all short-form content on selected connected platforms, not one project. The test still says Selected Shorts only and imports only 1–5 supplied videos. 2.2 covers the selected release's six clips across three platforms (up to 18 short uploads). CJ raised a shared card text template; proposed structure is scope label → main result → timing/freshness. Proposed final labels vary with platform (All your short-form videos / All your Shorts), while 2.2 identifies the selected release. These future wording/template choices are proposals, not implemented whole-channel support. Existing date/snapshot lines retain their jobs. Canonical previews are unchanged.


## Latest alignment/selection follow-up — 9 October 2026

CJ's Android screenshot exposed first-row metric misalignment. The isolated importer now uses shared label/value/note row sizes, a compact Average viewed label with the full accessible definition, and tab-session persistence of selected links, Shorts confirmation, requested end and range. Restore selection without OAuth or automatic queries; reports remain memory-only. Old unsaved inputs cannot be recovered retroactively. Existing token expiry still requires Connect; longer-lived login remains unimplemented. State/syntax checks passed; new rendered checks are prepared but unavailable in this session.

CJ is tired of repeated connections/link sampling. No more new samples are needed for current development. Next meaningful work is removing manual setup through durable auth and whole-channel Shorts importing, with architecture decisions still open. The current screenshot shows a successful longer-range display, not independent metric/coverage verification. Do not copy private screenshot figures/identifiers into source/docs. Final label template remains proposed; canonical previews are unchanged.


## Latest range-switch optimisation — 9 October 2026

CJ approved updating only range-dependent analytics. The importer keeps previous results/dates/titles visible with Updating and an explicit old-range message until the new report succeeds; failure preserves that clearly labelled report. It reuses same-connection verified metadata and fetches only the three Analytics reports for an uncached range. Loaded ranges switch instantly with Cached/Saved range labels and original timestamps. Manual Sync bypasses/invalidate caches and rechecks metadata. Cache is memory-only, keyed by channel/IDs/end/range and cleared on selection/auth/lifecycle changes. DOM nodes for tiles/unchanged titles remain stable. This supersedes clear-first range changes in earlier checkpoints. Controlled state/request checks and syntax passed; revised browser verification remains unavailable. No new user links needed; durable login and whole-channel import remain next major topics.


## 2.1 finalised; 2.2 authorised — 9 October 2026

CJ finalised the current 2.1 test and requested saving all choices before adding 2.2. [Current decisions/limits](integration-tests/youtube/STATUS.md) consolidates the approved material, geometry, labels, source semantics, range caching and persistence. Do not reopen those choices or claim outstanding production integrations are complete. CJ authorised 2.2 on the same page with his three same-release Shorts; six is a future planned size, not a required test count. Import metadata/availability only, without invented 24-hour snapshots. Reread AGENTS.md before implementation as CJ requested.


### 9 October — phone feedback: icon spacing and sync meaning

CJ confirmed release metadata displays on Android; the trophy lacked the 12px bottom gap used on 2.1 because a shared glyph rule reset its margin. A scoped 2.2 override restores that gap. Completion now says “Titles loaded · views not connected”; the footer says “Titles loaded” to distinguish this metadata import from view capture. No view counts or rankings have been implemented; first-24-hour capture remains pending. Screenshot evidence identifies the pre-fix spacing issue; the corrected rendering remains unverified in this environment.


### 9 October — one saved connection for both cards

CJ authorised upgrading the existing Google connection. The private test now has a supported Worker/D1 backend, encrypted per-user token storage, offline OAuth callback, server refresh and a bounded read proxy used by both cards after configuration. The legacy browser connection remains active until setup is complete. Runtime encryption key and callback URI are configured; the existing Web client's ID/secret and authorised callback remain required before real saved access can be enabled. [Backend contract and setup](integration-tests/youtube/BACKEND.md) record exact steps. Synthetic backend/frontend checks and production build pass; live Google, hosted token writes/refresh and rendering are unverified. Google Testing mode limits refresh tokens to seven days. No capture scheduler or view rankings are connected by this upgrade.
