# GemOs card review and integration plan

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
