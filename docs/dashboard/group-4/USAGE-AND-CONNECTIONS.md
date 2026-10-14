# Group4 — sync monitoring and run history

## 2.2 Weekly channel Shorts — 14 October 2026

CJ approved automatic Monday–Sunday upload batches in Europe/London because Shorts titles do not match remixes. Production2.2 defaults to current week with previous/next controls (52past weeks, no future); no remix affiliation is inferred. Owner uploads discovery replaces manual links/release name. Existing external5-minute checker now discovers current-week uploads plus2prior days for week-boundary captures, independent of the historical week being viewed. Sync all uses saved weekly channel/week; sole channel works without manual release setup. Cached page restoration reads without creating a new sync.

Owner duration+file dimensions/rotation identify format-eligible Shorts; Analytics classification is used when available, excludes non-Shorts and confirms unknown candidates. Unknown classification remains explicitly unranked. Public only; horizontal/long/live items excluded, bounded pagination and owned metadata enforced. Existing immutable24h–24h15m snapshots remain; no old lifetime-count backfill. Legacy selected releases retained as historical records, not production input. Full technical contract/limits: [Weekly Shorts](../integration-tests/youtube/WEEKLY-SHORTS.md) (handoff root uses integration-tests/youtube/WEEKLY-SHORTS.md). No schema/scope/audience/runtime changes. Source58aed6824184714e27f163faf4f5a09f2a75a54b; private appgdep_6acfec9321e88191ba465e675a2246b8 succeeded, runtime revision6.

Weekly SQLite/provider/UK+BST/DST/history/classification/snapshot/auth/cache-read tests; existing capture/card-sync/automation/monitor/source UI/group/layout/shell/timestamp checks; production build and compiled200/401 passed. Live upload discovery, actual fileDetails availability/classification and next24h scheduled capture still need owner verification. Browser screenshots unavailable in the signed-out session. User reports prior Sync all/timestamps pass and2.1 within10–15 views of Studio; cause of discrepancy unconfirmed. Next owner check: weekly Sync and Last week for a Sunday upload, then a fresh24h capture.

## Current2.1 adapter — 14 October 2026

The2.1 adapter now uses channel-wide Shorts and a saved owned channel/range, never selected test IDs or2.2's release list. Sync all advances to Pacific yesterday. A sole owned channel needs no sample setup; multiple channels require the source selector. Results save to2.1 cache and record one actual run. Missing values are partial data, not fake zeros. [Contract](../integration-tests/youtube/CHANNEL-SHORTS.md). Earlier selected-sample adapter notes are historical.

Updated14 October2026. All-GemOS monitoring remains the intended scope. CJ requested existing other-card syncs in the same Automation Performance card, then a per-card status grid. No additional card/group.

## Current sources and grid

server/automation-registry.mjs lists11 operation types mapped to nine Group1–3 cards. server/automation-runs.mjs aggregates each card's latest attempt, last successful completion, unresolved issue count and representative issue. Owner-scoped status/history reads do not start work.

|Card|Instrumented work / grid state|
|---|---|
|1.1 Schedule Overview|Not connected; no invented scheduling sync|
|1.2 Release Readiness|Drive file checks/associations, catalogue discovery, explicit guarded Release Queue approval|
|2.1 Short-form Performance|One logical server-backed analytics sync spanning ownership/probe/current/previous requests|
|2.2 24-hour Shorts Ranking|Release metadata import/refresh and existing background checker; Last successful check distinguishes no-op|
|2.3 Email List|Mailchimp report refresh; missing activity/campaign data is partial|
|3.1 Payhip Sales|Saved received-sales report refresh; no invented historical fetch or storefront fulfilment|
|3.2 YouTube Earnings|Revenue report and separately named ranking requests|
|3.3 YouTube Payouts|AdSense/payment summary with existing optional current-month estimate; incomplete figures partial|
|3.4 Subscription Costs|Manual records; owner-only last saved timestamp, no provider sync job|

New registry sources do not backfill older attempts. Public Payhip receiver/ingestion, newsletter sends, uploads and memory imports are not monitored jobs yet. Legacy direct-browser OAuth analytics requests bypass the private server and are outside this monitoring.

## API and execution

GET /api/automations returns owner-only totals, up to10 attention-first history runs, hasMore/offset, cards, registered automation filter options, updatedAt, coverage and lastScheduledStart. id detail remains owner-scoped. Registry keys validate the automation filter; offset is bounded/multiple of10. POST supports checker retry, reasoned dismissal and fixed read-only sync-card, with same-origin authenticated/bounded JSON validation.

server/sync-monitor.mjs wraps actual existing server report/check handlers. Generic outcomes come from HTTP response and safe partial-data flags, not client-reported completion. No credentials, request bodies, provider payloads, titles, email addresses or monetary figures enter telemetry. Errors remain fixed safe summaries; a source-card link exposes existing authorised error UI.

Private API route wrappers instrument only genuine report/check/approval calls. Auth/config/status/history/member reads and manual subscription GET/POST are not recorded jobs. Payout's internal earnings helper is not double-instrumented. Earnings ranking is separately named, including paginated requests; it is not mislabeled as a duplicate summary run.

Analytics UI tags its existing query requests with a unique X-GemOS-Sync-ID and one of ownership/probe/current/previous. No extra provider calls. The server owns run start/progress/completion, enforces order and rejects duplicate/out-of-order/finished traces. A range change reusing verified ownership can start at probe. No daily report is a failed usable-report check; missing totals/metric values are partial rather than fabricated zero. A browser interruption leaves a durable running record, later recovered as unconfirmed. This records server sync outcome; later browser rendering is not verified publication or display success.

The checker retains a per-owner single-operation lease and selection-bound retry. Analytics trace also serialises per owner. Other read-only reports get per-attempt leases, allowing existing fast period changes without blocking them. Five-minute expired leases recover owner runs as unconfirmed and are cleaned up. Atomic fenced completion prevents late workers overwriting recovered/newer outcomes. Existing uncertain Drive moves remain unconfirmed and non-retryable; wrapper clones the approved request before the underlying handler consumes it and checks pending move state without sending another PATCH.

Successful checker retries resolve only open issues in the matching chain. Later ordinary sync success does not silently clear historical failures. Non-checker runs offer source-card details/manual dismissal; no generic external write retry is added.

## Storage, design and verification

Uses existing registered automation_runs/automation_locks schema from drizzle/0006_automation_runs.sql. New registered schema-only migrations0007_sync_targets and0008_analytics_sync_cache add private selections/results; prior migrations are unchanged. No new credential/scope/scheduler permission or manual-record mutation.

Recess has a responsive two-column grid (one below360px), intentionally scrollable inside the established cobalt Large920px card. Last success remains visible after failure; tiles independently show latest attempt and older unresolved issues. Footer preserves read-only Refresh and filtered run history. Native details/dismissal/checker retry flow remains.

Checks: node verify-sync-monitor.mjs (repeated grid reads insert no rows; per-card owner isolation/latest status/retained last success; manual saved/not-connected state; one analytics trace; order/no-data/partial handling; concurrent period reports; consumed-body uncertain move safety), node verify-automations.mjs, node verify-automations-ui.cjs, node verify-capture.mjs, node verify-state.cjs, node verify-backend.mjs, node verify-prepare.mjs, node verify-projects.mjs, node verify-project-ui.mjs, node verify-email.mjs, node verify-earnings.mjs, node verify-payouts.mjs, node verify-commerce.cjs, node verify-subscriptions.mjs, node verify-dialogs.mjs, production build and node verify-compiled-pages.mjs. Supplemental controlled real UI check confirms one trace ID/four ordered stage headers and no extra requests.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained.

CJ reports two visible entries after initial monitoring deployment; exact live timestamps/triggers were not inspected. Source and repeated-read checks prove the monitoring page does not create run rows. Do not delete legitimate runs or invent a duplicate-run repair.

Next owner check: refresh the Site, open Automations and inspect the grid; run normal source-card Sync actions and confirm corresponding latest status/last success/history. Check scroll/phone/desktop/enlarged text. These newly instrumented live provider results and rendered layout remain unverified. Monitoring does not prove scheduler uptime or publication.

Recovery: redeploy preceding Site source while retaining existing run history/tables. Existing snapshot/provider data and prior applied migrations remain untouched.

## Current Large card and data sync — 14 October2026

CJ explicitly requests shared Large sizing, smaller centred tile icons/text/status icons, per-tile Sync and a top Sync all. Delivered920px cobalt card; no second card. Existing32px card/22px recess/58px top glyph/20–24px insets retained;174px header,44px top sync track, flexible scroll recess and44px bottom footer. Enlarged header text can grow the card.

Nine compact centred two-column tiles:8px padding/gaps,28px glass icon/18px monochrome mark,11px name/10px status/date, status symbol plus wording,44px Sync/details controls. Latest attempt/duration remains in details. Older unresolved issues remain visible after newer success. Manual Costs shows Last saved; unconnected Buffer shows Not connected, both Sync-disabled.2.2 uses Last successful check; other sources show Last synced.

Sync all refreshes available data cards sequentially, guards duplicates and continues after failures; completed/partial/skipped/failed are separate. Bottom Refresh status only reads records. Source choices reuse last successful saved selections/periods; absent period defaults to the source's current month. Missing/multiple required channel/account/sample choices require source setup. Analytics can initialise from the same tab's previously confirmed sample, never2.2's independent release sample. It does not move/approve/publish/send/purchase/spend or rewrite manual records.

Source 4c5a7387e7352fe82f5b14604317fff3cdf41bf2; private deployment appgdep_6aced96e768881918b0c3d6e9a829474; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_5f6fa7750d3c8191ba376254f10694db; succeeded; runtime revision6 unchanged.

Controlled card-sync/control/automation/cache/security/provider/Group1–3 checks, production build and compiled200/401 pass. Actual Drive bulk fixture used only GET provider calls. Rendered phone/desktop/enlarged-text and owner live Sync all remain pending.

### Explicit sync API and work

POST /api/automations {action:'sync-card',card:<known card>,selection?:confirmedAnalyticsSample} uses owner authentication, same-origin, bounded JSON/exact allowed fields. server/card-sync.mjs fixes every route/method/action; caller cannot provide an arbitrary URL or move instruction. Owner/card execution lease prevents concurrent duplicate requests.

|Card|Individual/main Sync work|
|---|---|
|1.2|Drive catalogue discovery then currently selected project scan. No Queue approval/move. Missing selected project reports partial guidance.|
|2.1|Validated owned confirmed sample; ownership/probe/current/previous form one run. Saved range/end date retained; never infer from2.2.|
|2.2|Current saved release metadata/eligible snapshot refresh. Frozen first counts remain immutable; no backfill.|
|2.3|Mailchimp report using saved/current month.|
|3.1|Received-sales report using saved/current London period; no historic Payhip import/fulfilment.|
|3.2|Earnings summary and first ranking page using saved period/channel or unique owned channel/current Pacific month.|
|3.3|Saved payout account/channel report; discover a unique account only if no choice saved. Multiple accounts require source choice.|

Generated0007_sync_targets.sql stores allowlisted owner source selections through server/sync-targets.mjs. No credentials/provider payloads. Request-start timestamp comparison prevents older in-flight responses replacing newer saved targets. Changes without a successful source sync do not replace the last successful target.

Generated0008_analytics_sync_cache.sql stores a bounded real2.1 report separately from telemetry. server/analytics-cache.mjs retains source dates/values and signed Likes; missing metrics are unavailable. Google status includes it only for the authenticated owner/currently owned channel. ui/app.js restores the matching cache as Saved analytics restored, preserving original fetchedAt/period/sample rather than claiming a new live request. Disconnect hides cache until compatible access is restored; no historic snapshot reconstruction.

New checks:node verify-card-sync.mjs, node verify-sync-controls-ui.cjs and updated verify-state.cjs. Actual server sample replay/target/cache ownership, missing-selection skip, duplicate lease, GET-only Drive, fixed routing/auth/origin, individual/bulk controls, failure continuation, partial/skipped/failed summary and cache restoration pass alongside existing regressions/build/compiled pages.

Latest deployment above supersedes earlier source/version checkpoints here. Next: refresh Automations, review Large/centred tiles/scroll, then use one Sync and Sync all and compare history/source cards. Owner-authenticated live execution and rendered QA were not performed. Recovery: redeploy preceding Site version, preserving additive tables/cache/history and immutable applied migrations.
