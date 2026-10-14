# Group4 — sync monitoring and run history

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

GET /api/automations returns owner-only totals, up to10 attention-first history runs, hasMore/offset, cards, registered automation filter options, updatedAt, coverage and lastScheduledStart. id detail remains owner-scoped. Registry keys validate the automation filter; offset is bounded/multiple of10. POST still supports checker retry and reasoned dismissal only, with same-origin authenticated/bounded JSON validation.

server/sync-monitor.mjs wraps actual existing server report/check handlers. Generic outcomes come from HTTP response and safe partial-data flags, not client-reported completion. No credentials, request bodies, provider payloads, titles, email addresses or monetary figures enter telemetry. Errors remain fixed safe summaries; a source-card link exposes existing authorised error UI.

Private API route wrappers instrument only genuine report/check/approval calls. Auth/config/status/history/member reads and manual subscription GET/POST are not recorded jobs. Payout's internal earnings helper is not double-instrumented. Earnings ranking is separately named, including paginated requests; it is not mislabeled as a duplicate summary run.

Analytics UI tags its existing query requests with a unique X-GemOS-Sync-ID and one of ownership/probe/current/previous. No extra provider calls. The server owns run start/progress/completion, enforces order and rejects duplicate/out-of-order/finished traces. A range change reusing verified ownership can start at probe. No daily report is a failed usable-report check; missing totals/metric values are partial rather than fabricated zero. A browser interruption leaves a durable running record, later recovered as unconfirmed. This records server sync outcome; later browser rendering is not verified publication or display success.

The checker retains a per-owner single-operation lease and selection-bound retry. Analytics trace also serialises per owner. Other read-only reports get per-attempt leases, allowing existing fast period changes without blocking them. Five-minute expired leases recover owner runs as unconfirmed and are cleaned up. Atomic fenced completion prevents late workers overwriting recovered/newer outcomes. Existing uncertain Drive moves remain unconfirmed and non-retryable; wrapper clones the approved request before the underlying handler consumes it and checks pending move state without sending another PATCH.

Successful checker retries resolve only open issues in the matching chain. Later ordinary sync success does not silently clear historical failures. Non-checker runs offer source-card details/manual dismissal; no generic external write retry is added.

## Storage, design and verification

Uses existing registered automation_runs/automation_locks schema from drizzle/0006_automation_runs.sql. No new migration, credential, scope, scheduler job, permission or manual-record mutation in this extension.

Recess has a responsive two-column grid (one below360px), intentionally scrollable inside the established cobalt Compact454px card. Last success remains visible after failure; tiles independently show latest attempt and older unresolved issues. Footer preserves read-only Refresh and filtered run history. Native details/dismissal/checker retry flow remains.

Checks: node verify-sync-monitor.mjs (repeated grid reads insert no rows; per-card owner isolation/latest status/retained last success; manual saved/not-connected state; one analytics trace; order/no-data/partial handling; concurrent period reports; consumed-body uncertain move safety), node verify-automations.mjs, node verify-automations-ui.cjs, node verify-capture.mjs, node verify-state.cjs, node verify-backend.mjs, node verify-prepare.mjs, node verify-projects.mjs, node verify-project-ui.mjs, node verify-email.mjs, node verify-earnings.mjs, node verify-payouts.mjs, node verify-commerce.cjs, node verify-subscriptions.mjs, node verify-dialogs.mjs, production build and node verify-compiled-pages.mjs. Supplemental controlled real UI check confirms one trace ID/four ordered stage headers and no extra requests.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained.

CJ reports two visible entries after initial monitoring deployment; exact live timestamps/triggers were not inspected. Source and repeated-read checks prove the monitoring page does not create run rows. Do not delete legitimate runs or invent a duplicate-run repair.

Next owner check: refresh the Site, open Automations and inspect the grid; run normal source-card Sync actions and confirm corresponding latest status/last success/history. Check scroll/phone/desktop/enlarged text. These newly instrumented live provider results and rendered layout remain unverified. Monitoring does not prove scheduler uptime or publication.

Recovery: redeploy preceding Site source while retaining existing run history/tables. Existing snapshot/provider data and prior applied migrations remain untouched.
