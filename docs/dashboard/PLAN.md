# GemOs card review and integration plan

## Next priority — Group 1, approved 9 October 2026

CJ is moving to a new chat to review and connect Group 1 (1.1 Release Buffer / 1.2 Pre Release Checklist). Preserve the accepted reference layout; ground the first slice in the actual release/project store, asset manifest/source and scheduling-confirmation records. CJ confirmed on 9 October that the future system requires six source Shorts per release, Tuesday–Sunday. Three clips describe his past upload schedule and remain historical test data; retain the six-file checklist and 19-confirmed-upload buffer requirement. A read-only checklist scan is the recommended first slice if its source is available, not an already approved data-model decision.

Group 2 does not block this work: 2.1's current selected-Shorts test is finalised; 2.2 is implementation-complete with first-release real capture still unverified. Shared styling is deployed, with rendered phone/desktop acceptance still open. Keep these checks visible, without requesting more sample links or rebuilding authentication. The latest HANDOFF and integration STATUS supersede the historical browser-only/no-backend descriptions below.

## 9 October 2026 — current integration checkpoint

CJ accepted 2.2 implementation as complete, with real first-release view capture and displayed ranking unverified. Both cards share saved read-only Google access. The five-minute checker reaches the endpoint, persists runs, and its short job-name classification fix is verified by a scheduled record at 20:05 UK plus CJ's changed sync message. Release selections and qualifying snapshots persist. The leaderboard scrolling fix now lets gestures pass into the page when rows fit or the list reaches either end, preserving normal recess/list dimensions; Android swipe verification is pending. See [STATUS](integration-tests/youtube/STATUS.md) and [CAPTURE](integration-tests/youtube/CAPTURE.md). First-release verification remains open and does not block Group 1; no extra test upload is needed. 2.1 remains working, with automatic date advancement and historical release reporting separate proposals. Canonical previews remain unchanged.

Updated 9 October 2026. Start a new session with [HANDOFF.md](HANDOFF.md). This plan tracks the reference-card work and source validation; it is not a production app or deployment plan.

## Current status

Group folders, shared design rules and the review report are committed. Current previews contain mock figures and placeholder Sync actions. Approved R01–R03/R10 fixes and Group 2 changes are **implemented and browser-verified**; see [9 October evidence](verification/2026-10-09.md). The shared reporting window, required publishing-platform set and automatic asset-eligibility rule are now confirmed. Reference changes are complete; remaining source/scanner/infrastructure choices belong to integration work.

A separate browser-only [YouTube integration test](integration-tests/youtube/README.md) is now built and privately hosted. Controlled responses passed browser checks. It imports a selected Shorts sample, with no secret or refresh-token backend. This does not change the canonical previews, final app stack or unattended capture requirements. CJ reports real Google access and one sample import; partial-metric retry, refresh verification and Studio comparison are next.

## Confirmed direction

- Preserve the accepted layouts, materials, coloured brand icons, fixed normal group geometry and matched Group 2 panels. Use [shared design rules](../DESIGN_SYSTEM.md) and each group’s spec/usage notes.
- 2.1 remains overall activity during a rolling last 28 days versus the preceding 28 days; 2.2 follows one release batch. These are not calendar-month or post-publication-cohort reports.
- Shorts tiles: average percentage viewed, Likes, subscribers gained, shares. TikTok: average watch time, watched full video, followers gained, shares. Reels: average watch time, shares, followers gained, saves. The TikTok Comments replacement is superseded. Unsupported data is unavailable, not zero or a silent substitute.
- Asset Pass uses automatic project/type checks and a case-insensitive literal (WIP) filename exclusion, with no separate manual approval. Required sets must be complete; scanner matching/validation and freshness remain to implement/test.
- Release buffer coverage requires the main YouTube video plus six shorts on each of Shorts, TikTok and Reels (19 confirmed scheduled uploads per release week). Reminder-only tasks and unconfirmed requests do not qualify; real scheduling support still needs testing.
- All uses a shared rolling 28-day window ending on the latest complete, compatible date across the required platforms; compare the preceding matched 28 days. Individual platform tabs may use their latest complete window with explicit dates. Validate actual source day boundaries before claiming compatibility; preserve partial-data rules.
- 2.2 freezes observed view snapshots around 24 hours. Provisional qualifying window: 24:00–24:15; test before locking or widening it. Missed captures stay unranked.
- Header: Shorts Views (24hrs); subtitle: Snapshot taken at 24h · up to 15 min later; then selected batch dates including year. Actual capture age belongs in clip details.
- Monday: notify after Sunday’s last clip reaches 24 hours, even if incomplete; rank usable snapshots and explain unranked clips. Label partial results Batch review. Delivery/retry mechanics remain deferred.
- Direct APIs first. Activepieces is optional. Accounts, permissions and imports are unverified; no provider, scheduler or hosting is selected. Defer animation until the app works.

## Ordered work

| Step | Status / completion criterion |
|---|---|
| 1. Resume open choices | Relevant pre-edit choices settled. Do not reopen confirmed choices; defer integration-only questions until evidence exists. |
| 2. Apply approved reference fixes | Completed and browser-verified. R01: Group 1 third-date clipping with fallback fonts. R02: enlarged-text access/reflow. R03: unavailable CDN error. R10: stale gap-count comment. Preserve accepted normal appearance; verify conditions in the review. |
| 3. Apply Group 2 changes | Completed and browser-verified. Replace Stayed to watch with Likes; retain audience-growth tiles; update Reels label as agreed; add confirmed snapshot subtitle/year dates. Preserve panel/header alignment and fixed sizing; test actual rendered fit. |
| 4. Verify and document | Completed; evidence linked above. Exercise relevant widths, states, enlarged text, keyboard/dialogs and no-overflow conditions. Record evidence and limits, update specs/report resolution notes and commit. |
| 5. Scope a small YouTube import | Present concrete test scope to CJ, verify authorised access and compare a sample’s source, period and definitions with Studio. CJ authorised a browser-only OAuth/manual test. [Source/setup/evidence](integration-tests/youtube/README.md) and private page are built; CJ reports completing Google setup/consent and a sample import; older-video retry and Studio verification remain pending. |
| 6. Validate TikTok/Reels | Check account eligibility, follower attribution, watch metrics, activity-window support and snapshot freshness. Revise feasibility evidence, not product choices silently. |
| 7. Choose automation | After useful imports work, agree scheduler/hosting, notification delivery and retries. Assess Activepieces only if it saves work. |
| 8. Review Groups 3–5 | Continue purpose/data/design decisions card by card using the all-card feasibility research. These groups have no approved final implementation. |
| 9. App and motion | Agree stack and broader implementation separately; animation planning remains deferred. |

## Unresolved items

- All-tab shared-window convention is confirmed. Source day boundaries, compatible aggregation and weighted watch reports still need API evidence. Existing rule: identify partial totals and hide combined growth/target status until required coverage is complete.
- Extra space in 2.1: leave it empty unless CJ approves useful content.
- Group 1’s required publishing-platform set is confirmed. The automatic WIP/eligibility rule is confirmed. Scanner project matching, validation and freshness thresholds remain open; scheduling support and confirmation records need integration evidence.
- Account types/access, follower period attribution and API limits: test rather than ask CJ to guess.
- Snapshot failure rate and platform-counter freshness: provisional window, review after evidence.
- Monday delivery time, notification channel and retry/update policy; scheduler/hosting: integration-stage decisions.
- Inherited intake and missing contract material: defer until their workflow is in scope; do not invent answers/templates.

## Working rules

Explain purpose, problems and recommendations plainly. Ask one consequential unsettled question at a time, using A/B choices where useful. Significant decisions go in [decisions/log.md](../../decisions/log.md). Record visual rules in each SPECIFICATION.md and data/source rules in USAGE-AND-CONNECTIONS.md; compare related documents before committing. Previously approved work does not need repeated permission. New product choices and unrelated code changes need CJ’s confirmation.

## Sources

[File index](README.md) · [Review findings](REPOSITORY-REVIEW.md) · [HTML report](REVIEW.html) · [API feasibility research](ANALYTICS-FEASIBILITY.md). Earlier source/audit material and decision history are provenance; current group documents and confirmed later decisions govern. Reviewed references belong in GemOS, experiments in telemetric-cards-test-suite. No live dashboard connections are implemented.


## 9 October import follow-up

CJ reports real consent/channel connection and one successful selected Short import. An older-video import failed the local metric validator; individual unavailable-metric handling and current/previous diagnostics are now implemented. CJ requested refresh persistence: retain only a short-lived token and config in tab-session storage, revalidate channel after reload, clear invalid sessions. Controlled checks passed; ask CJ to retry older video and refresh, then verify exact Studio dates. Long-lived server refresh remains a separate architecture decision.

Studio follow-up: supplied export confirms negative period Likes, so preserve signed integer Likes in the isolated test rather than showing unavailable. Its dates differ from the API period; exact-window metric/coverage verification is still pending. No replacement with lifetime Likes or inferred net-likes definition.


## Confirmed range controls — 9 October 2026

CJ approved 7/28/90/365-day ranges with 28 as default, placed beneath platform pills inside the analytics recess, with tiles moved lower. Implemented in the isolated importer and checked with controlled API responses. Earlier 28-day-only wording describes the canonical preview/default; this decision authorises optional ranges, without claiming cross-platform support or changing the 24-hour leaderboard. Each selected range uses activity within N days, with the preceding N days in details. Source coverage remains unverified; growth/targets stay hidden. Next: user test longer ranges and exact Studio agreement, then scope whole-channel Shorts import.


### Latest controls and scope follow-up

The isolated importer replaces the disliked dropdown with compact range pills and adds import stages, spinner and completion/failure feedback. Normal recess is explicitly matched to 2.2 (575/583px); controlled state checks passed, revised browser fit remains unverified. Next: CJ phone review, supported browser verification, then scope whole-channel short-form import. 2.1 is overall selected-platform activity; 2.2 is release-specific. Proposed shared header roles: scope label, main result, timing/freshness; record confirmed wording before altering the canonical references.


### Alignment and reduced repeat setup — 9 October 2026

The Android screenshot showed first-row value misalignment; matching metric text rows and the short Average viewed label are now implemented in the isolated test. Selected links, confirmation, end date and range persist within the browser tab, separately from auth, without automatic queries/consent on reload. Controlled state/syntax checks passed; revised browser alignment remains unverified. Stop requesting new manual sample links. Next scope longer-lived login and automatic whole-channel Shorts imports; API coverage, TikTok/Reels and frozen snapshots remain unimplemented/unverified.


### Range-switch optimisation — 9 October 2026

Implemented CJ's approved analytics-only range refresh: retain explicitly labelled old data while loading, reuse verified video metadata, switch loaded ranges from memory without requests, and let manual Sync fetch fresh metadata/results and invalidate old caches. Controlled state/request checks passed; browser rendering remains unverified. Auth architecture, source scope and canonical previews are unchanged.


### 2.1 design checkpoint and 2.2 authorisation

The current 2.1 test is finalised by CJ; [STATUS.md](integration-tests/youtube/STATUS.md) consolidates accepted choices and remaining verification/integration limits. Next authorised slice is 2.2 on the same test page: 1–6 selected same-release Shorts, including CJ's existing three, title/publication metadata and honest unavailable/waiting states. No auto-capture or historical 24-hour backfill is authorised by this UI slice.


### 9 October — one saved connection for both cards

CJ authorised upgrading the existing Google connection. The private test now has a supported Worker/D1 backend, encrypted per-user token storage, offline OAuth callback, server refresh and a bounded read proxy used by both cards after configuration. The legacy browser connection remains active until setup is complete. Runtime encryption key and callback URI are configured; the existing Web client's ID/secret and authorised callback remain required before real saved access can be enabled. [Backend contract and setup](integration-tests/youtube/BACKEND.md) record exact steps. Synthetic backend/frontend checks and production build pass; live Google, hosted token writes/refresh and rendering are unverified. Google Testing mode limits refresh tokens to seven days. No capture scheduler or view rankings are connected by this upgrade.


Current scheduler follow-up: successful Google job runs reached the endpoint; the short job-name status check has been fixed and a post-fix scheduled run is verified. See STATUS.md.


### 9 October — shared integration design contract

CJ authorised repairing inconsistencies between the two test cards. Shared Group 2 tokens now govern gradient/materials, matching 12/16px recess insets, 174px header minimum, 58px icons with 12px gap, and common 24/30px headings (22px below 360px). Both use the same header anatomy and sync-status treatment; Inter/Poppins loading is explicit. Metrics and leaderboard content remain distinct. See DESIGN_TOKENS.md, group-2/COMPONENTS.md and the current integration STATUS. Source/state checks and build are separate from pending rendered Android/desktop verification. Canonical previews are unchanged; real first-release capture remains unverified.

## Group 1 file convention and ambiguity gate — confirmed 9 October

CJ confirmed flexible asset matching on 9 October 2026, superseding exact filenames, mandatory renaming and removal of bracket prefixes. Working projects sync from his computer to Google Drive. Use the selected project folder, case-insensitive subfolder names, compatible file type and role markers such as [REMIX], [BEAT], [ZIP], stems, thumbnail and YouTube Video to identify assets. Preserve BPM, key, artist pairings and collaborator credits in filenames; their presence or differences from a title template do not cause failure. Existing descriptive names without prefixes are also allowed when the role is clear. Stems accept .zip or .7z; the exported FL Studio project archive remains .zip and required. The seven checklist categories remain Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and six Shorts; FLP and Beat WAV are additional files. Beat WAV does not substitute for missing Beat MP3. A clear unique eligible candidate can pass automatically; confirm only unclear roles or competing eligible candidates. Remember confirmed files by Drive ID while retaining project/location/type/access and case-insensitive literal (WIP) checks. Unresolved required assets show Needs confirmation and pause new scheduling/publication; unrelated extras do not block a clear match. Previously confirmed scheduled uploads are not automatically cancelled. No access/failed scan is not Missing. Metadata does not prove creative correctness or archive contents. Detailed role recognition, persistence, archive verification and freshness implementation remain open; no live GemOS scanner is yet implemented.

Next: scope read-only scanning against the supplied Gelato 41 folder using flexible role matching and existing filenames. Assistant Drive reads succeeded, distinct from GemOS runtime access. Keep the accepted layout; align legacy checklist labels with the seven current categories during implementation. Missing stems must remain visible and do not block an import test. Do not automatically resolve genuinely ambiguous roles or competing candidates or silently change scheduled uploads.

## Current Group 1 checklist implementation

Read-only slice built, tested and privately deployed; see [ASSETS.md](integration-tests/youtube/ASSETS.md). Next: Drive metadata consent and hosted Gelato 41 scan; expected sample 3/7. Browser/phone layout and live access unverified. Continue release-buffer source decisions after this test; no publishing is connected.

## Group 1 hosted scan and UI follow-up

CJ’s Android screenshot shows the expected 3/7 live scan. Track-only heading (48-grapheme display limit/two-line clamp) and Group 1-styled Release details are deployed; full metadata remains available. Next: phone review after refresh, then real candidate association/restoration checks when suitable data exists. No repeated consent is required for this UI update. See integration-tests/youtube/ASSETS.md.


## Group 1 pair comparison

CJ approved restoring the Group 1 pair on the private checklist page for comparing proportions. Card 1.1 uses the accepted reference anatomy/material with three illustrative projects/dates/statuses and a visible Example/Preview only label. It performs no live buffer calculation or scheduling query; its rows/footer open an explanatory preview dialog with Escape/close/focus-return behaviour. Card 1.2 continues using the existing Drive result. Desktop is two equal columns from 840px within 960px; mobile stacks 1.1 above 1.2. Normal fixed reference slots remain; when overflow activates the shared one-column asset reflow, both cards receive a shared minimum height calculated from the tallest natural card, including mobile. This is a comparison slice, not approval of a permanent one-column redesign or filler content. Syntax, title regression and production build pass; rendered matching height, enlarged-text behaviour and phone/dialog acceptance remain unverified. Next: CJ refreshes the same /checklist page and reviews both cards together. No new consent or sample link is required.


## Group 1 alignment and buffer-detail follow-up

CJ approved returning the asset grid to two columns, matching both recessed panels and preventing independent card alignment, plus a common simpler pop-up style based on 1.1 and useful buffer details. Implemented shared Group 1 header/recess/footer/slot geometry, measured from the largest natural content in either card. Geometry is group-owned: a changed title, error/status, font or viewport cannot independently size one card or move its recess/footer. The two-column asset grid reserves 78px minimum rows and wrapped labels/statuses, with Shorts spanning both columns. The group retains the 840px desktop breakpoint/960px cap/20px gap and accepted blue/glass material, 58px glyph, 12px label gap, 16px panel gap, 32px card and 22px recess corners, Inter/Poppins and responsive 20/24px card insets. Card height is at least the earlier 512/532px baseline but grows as a matched pair to accommodate the complete two-column checklist; this live integration contract supersedes independent recess sizing and overflow-triggered one-column switching. Font loading, resize and observed intrinsic content changes recalculate common dimensions.

Both details dialogs now use one blue/navy fill, border/shadow, typography/insets, informational row/status styles and 44px Close control. 1.2 retains full track/folder metadata, readiness/freshness, filenames and candidate association. 1.1 adds the selected or all example project dates/statuses, 19-upload coverage requirement, consecutive-week/first-gap rule, exclusions, current Drive readiness as a separate fact and the next real scheduling-confirmation source needed. Its examples remain explicitly illustrative; it does not claim live scheduled coverage.

verify-layout.mjs passes across 128 combinations of long header/panel/footer dimensions and insets, plus the narrow-screen minimum; verify-title.mjs and changed JS syntax pass; production build passes. These are geometry-contract/source checks, not rendered browser evidence. Refreshed Android/desktop, all real font/status combinations, modal interaction and actual enlarged-text fit remain unverified. No supported browser QA is available. Do not claim an absolute no-use-case visual guarantee from these checks. Next: refresh the same /checklist and check both recesses/footers and both dialogs; no new consent required.
