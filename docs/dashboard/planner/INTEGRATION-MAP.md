# Calendar integration map and build sequence

Code-reviewed16October2026 against Site source dc826293ef091983d36ee61d326c922bdd5cb4b8 / GemOS d2df34a0773b1924d22902718eeb184d655340fe. This document is an implementation plan, not a claim that pending links exist.

## Current position

/planner defaults to GET /api/youtube/schedule, the same saved owner/channel report as Release Buffer. Four destination filters, source freshness, read-only statuses and isolated fictional examples are implemented. No durable publishing defaults, saved release/post plans, project association, upload job or platform write exists.

CJ confirmed a main Settings → Publishing page, Europe/London timezone, separate main YouTube/Shorts/TikTok/Reels default post times, per-post planned-time overrides and shared records across relevant dashboard/calendar/scheduler views. Defaults affect new plans; applying them to existing editable plans is explicit. Already scheduled platform posts require a separately confirmed rescheduling action and platform success. No actual default clock times have been agreed; the example times must not be silently promoted into saved settings.

## Complete connection map

| Source / owner | Existing code and data | Calendar connection | Delivery / priority |
|---|---|---|---|
| Main Settings → Publishing | No publishing-settings route/table currently | Owner timezone, four destination default times, new-plan defaults, explicit apply-to-existing preview | Foundation: build first |
| Release/post plans | ui/planner.html only has in-memory examples | Stable release/post IDs, Monday week,19 intended posts, working title, dates/times, overrides, change revisions | Foundation: durable storage missing |
| Project identity / metadata | server/assets.mjs: drive_release_projects, drive_release_reviews; server/project-name.mjs | Explicit owner/project folder ID, reviewed artist/title/BPM/key/credits, production/queue/released location and availability | Direct link after plan identity |
|1.2 Release Readiness | server/assets.mjs: result_json, checked_at, reviewed signature, drive_release_moves | Read each linked project's assets/readiness/review/queue evidence; detail links to existing preparation workflow | Direct link; no copied status enum |
| Artwork and media files | assets thumbnail/video/shorts roles and confirmed IDs/order | Shared artwork reference, main MP4, six ordered source clips reused across Shorts/TikTok/Reels; file changes invalidate stale evidence | Direct link; private image/media delivery still needed |
|1.1 Release Buffer | server/youtube-schedule.mjs; saved youtube-schedule-report via server/sync-targets.mjs | Actual YouTube future dates/times/IDs/format/processing/freshness | Existing read-only connection; preserve7-upload coverage |
|2.1 Short-form Performance | server/channel-shorts.mjs; analytics_sync_cache, channel/range target | Relevant post details can link to existing channel report/top-video IDs; optional range navigation with compatible ranges | Later; channel-wide totals are not per-release metrics or calendar events |
|2.2 Weekly Shorts /24h evidence | server/weekly-shorts.mjs, server/capture.mjs; per-channel/week saved report and youtube_view_snapshots | By exact channel/video ID: actual publication date, current views, rank and qualifying immutable24h result in post details; actual published posts provide history after they leave future schedule | Later after explicit upload identities |
|2.3 Email List | server/mailchimp.mjs; monthly activity/latest campaign summary | A newsletter can have a separate calendar type if needed; use actual sent time or explicit planned date only | Optional later layer; campaignSummary currently falls back to Created date and does not preserve a scheduling timestamp. Subscriber counts are not events. No email scheduling/sending implemented |
|3.1 Payhip Sales | server/payhip.mjs, server/payhip-report.mjs; transaction events and option→licence-tier mappings | Optional historical sale/refund markers/details; product-to-release association would need stable product IDs | Optional, parked: no existing product→release model, no per-release revenue inference |
|3.2 YouTube Earnings | server/earnings.mjs; provider channel/day and video-ID ranking reports | Linked post can navigate to compatible period/video revenue reporting | Optional context; estimated period revenue is not a publication event and calendar UK dates cannot silently replace Pacific reporting days |
|3.3 YouTube Payouts | server/payouts.mjs, server/studio.mjs | Optional recorded-payment date layer, preserving provider credited-date meaning | Optional; no invented payment deadline, bank-arrival claim or conversion of conditional windows into scheduled events |
|3.4 Subscription Costs | server/subscriptions.mjs; subscription_costs state/revision; ui/subscription-model.mjs | Optional renewal/due-date layer using the same recurrence/history calculation; edits remain in Costs workflow | Later layer; projected due date is not a verified bank debit; topups are historical dated records |
|4 Automation Performance | server/automation-registry.mjs, automation-runs.mjs, sync-monitor.mjs, card-sync.mjs | Relevant job/source outcome and freshness in post details, linked by stable context IDs; future upload/reschedule attempts visible here | Existing monitor reusable, but uploads are not registered or implemented |
| Future upload scheduler | No uploader/job queue/platform-write adapter currently | Read exact saved post revision, media IDs, destination account, intended publication instant; save platform IDs and confirmed evidence; reconcile uncertainty | Build after planning/readiness associations, provider capabilities and permissions |
| Source connections / accounts | server/youtube.mjs, sync-targets.mjs; owner/channel/revision guards | Explicit destination account/channel selection, connection state, source time and stale/error handling | Reuse existing ownership/auth boundaries; TikTok/Reels connections absent |

All nine source cards and Automation Performance have a role in this map. Not every card becomes a dated block. Core post cards stay focused on release identity, artwork, timing and truthful readiness/platform evidence. Reporting belongs in linked details; dated finance/newsletter information can be separate optional layers rather than mixed into release coverage.

## Important code constraints

1. db/schema.ts's youtube_release_selections is a selected-video analytics/capture record keyed by owner/channel, not a general release catalogue. Do not repurpose it for many saved release weeks or overwrite historical captures.
2. drive_release_projects uses (owner,folder ID). drive_release_reviews holds explicitly reviewed metadata. Project names currently derive from folders in some responses, while reviewed artist/title is separate. Define a shared presentation adapter, using reviewed values where present and explicit working-title fallback before association; preserve review/signature invalidation.
3. GET /api/youtube/drive-status returns catalogue/reviews/moves for all projects but result only for selected_id. Calendar must not POST drive-select while rendering, since that changes the dashboard selection. Add an owner-checked project-specific saved-result read/adapter.
4. Existing Drive scan fetches metadata fields (id/name/mimeType/size/modifiedTime/parents/trashed). It does not fetch artwork bytes or thumbnail URLs. Existing links open Drive. Implement authenticated artwork delivery using verified permission/capability; never expose tokens or make private files public. Media bytes for uploading need the same deliberate capability work.
5. Schedule reports cover12 future UK weeks, starting next Monday (today on Monday); public uploads leave this schedule. Historical post states must come from actual owned public-video metadata/history, not an elapsed publishAt or an assumption that a queued job completed.
6. Channel-wide Shorts uses Pacific reporting dates, Weekly Shorts uses UK publication weeks, earnings uses Pacific days, payout records have Pacific credited dates, Costs is a date/recurrence model. Preserve each meaning rather than forcing all dates into a publication timestamp.
7. Runtime-created Drive/Costs tables exist outside db/schema.ts. New persistence needs an explicit, additive schema/migration strategy consistent with deployed D1; preserve legacy data and do not duplicate these domains.
8. No automatic uploader or real default publication times exist. The five-minute scheduled process is a statistics checker. No upload capabilities or confirmations may be inferred from that checker.

## Proposed shared model

Keep current Workers/D1 stack, authenticated APIs and native HTML design components. No new database, frontend framework or message bus is required for the first slices.

- Publishing settings: owner ID, IANA timezone (Europe/London initial supported choice), four optional default local times, revision/updatedAt. Missing settings are explicit, not example defaults.
- Release plan: owner/release ID, Monday week key (unique per owner under current one-release/week rule), working title, optional project folder ID, revision/createdAt/updatedAt. The project link must belong to the current owner's catalogue; unfinished/unlinked drafts remain valid.
- Post plan: owner/post ID, release ID, destination/type, clip slot, intended local date/time+timezone and resolved UTC instant, source of time (default/override), settings revision used and record revision. Six distinct clip slots are reused across three short-form destinations, yielding19 entries total.
- Associations: owner/post→confirmed Drive file ID(s); owner/post→provider/account/channel/post ID. Never join by title/date. Retain independent planned title/artwork intent and actual platform metadata where they differ.
- Job records (later): owner/post revision, operation, attempt/idempotency identity, provider response IDs, state, lease, reconciliation evidence and history. Reuse existing automation monitoring, extending it only when adapters exist.

This is a proposed implementation structure grounded in confirmed behaviour; exact table/API shapes can be refined during implementation without changing ownership or wording rules.

## Update and editing rules

Settings edits affect new plans only. An explicit apply-to-existing action previews eligible unscheduled plan changes. Calendar edits use revisions to reject stale concurrent writes. A planned-time edit never calls a platform API implicitly.

Project metadata/artwork references are resolved through shared project records; existing dashboard workflows remain their editing authority initially. A project update refreshes every relevant view after save/reload/focus; cross-tab freshness must be implemented and tested rather than claimed as instant push. Changed files/review metadata keep existing readiness revalidation guards. Existing scheduled content keeps provider metadata until an explicit supported update succeeds; a local title/artwork change must not claim the remote upload changed.

Provider-derived readiness, confirmed scheduling, actual publication and immutable24h snapshots remain read-only facts. Cache reads do not create jobs or provider writes. Disconnect clears inaccessible data; source errors preserve labelled last-known results where appropriate.

Resolve local date/time with DST-aware Europe/London conversion; reject nonexistent times and explicitly resolve ambiguous clock-change times. Keep date-only finance records as dates. Never display Planned as Scheduled, Stale as Published, or unavailable as zero.

## Build sequence and acceptance

###1. Settings → Publishing (first build)
Owner-private page and API with four labelled destination times/timezone, no fabricated defaults, optimistic concurrency, shared navigation/glossary. Save/reload persists; owner isolation, origin/input validation and GMT/BST behaviour checked. No scheduler or provider action.

###2. Saved plans and calendar editing
Persist release/post plans, generate19 slots from configured defaults, allow unfinished projects and explicit per-post overrides. Calendar reads saved plans independently of actual provider evidence; examples stay isolated. Validate unique week, revisions, default-change rules, no writes to platform schedules and reload/cross-tab refresh.

###3. Project/readiness/metadata/artwork
Link owned folders and explicit files; expose per-project saved checks without changing dashboard selected_id. Both views resolve the same reviewed metadata/artwork/file references and invalidate stale readiness appropriately. Verify two different projects, changed names/artwork/files, missing access and actual private image display. No complete project required to save an unfinished plan.

###4. Actual uploads, performance and automation context
Explicit owned provider IDs; combine planned/actual evidence without overwriting either. Add past publication history and per-video current/24h details where sources exist. Preserve Buffer and analytics scope. Monitor future jobs with stable post context; no fake upload adapter.

###5. Upload scheduler, one supported provider at a time
Verify provider upload/scheduling capability, permissions, large-media path and hosting/runtime limits. Start with YouTube only after validation; TikTok/Reels remain planned/unverified until real adapters exist. Readiness/review gates, duplicate prevention, retry safety, uncertainty reconciliation, cancellation and confirmed rescheduling required. Do not implement large binary transfers inside the existing small-request handlers without a suitable design.

###6. Optional dated layers
Subscription due dates first (existing recurrence logic), then actual newsletter/payment/sales dates if wanted. Park Payhip store/licence development as instructed. Do not delay core release planning for finance/social integration gaps.

No runtime changes or new links are claimed by this mapping checkpoint. The first implementation target is Settings → Publishing followed immediately by saved release/post plans, rather than more calendar decoration.
