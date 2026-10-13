# Group 4 — sources and implementation

## Confirmed scope

CJ chose all GemOS automations, attention-count headline, attention-first list, successful linked retry resolving issues, manual dismissal with recorded reason, retained original history and retries only where duplicate actions can be prevented. See SPECIFICATION.md for exact display states.

## Current integration

- app/automations/route.ts serves owner-authenticated /automations. app/api/automations/route.ts calls server/automations.mjs; ui/automations.html/js own the card and history/details dialog. Shared dialogs.js handles safe outside-click dismissal; Close restores focus.
- GET /api/automations returns owner-only totals, up to10 attention-first runs, hasMore, updatedAt, coverage and lastScheduledStart. offset is a bounded multiple of10; automation is blank or youtube-snapshot-checker; attention0/1. GET ?id reads only an owner-owned run. No records is distinct from request failure.
- POST supports only retry and dismiss, bounded JSON, allowed fields and same-origin authenticated requests. Dismiss requires1–500 non-whitespace characters. Unknown/ineligible/changed/resolved/concurrent actions are rejected.
- server/automation-runs.mjs provides durable start, timeout recovery, execution lease, fenced atomic completion/resolution and dismissal. server/capture.mjs instruments each owner's background checker without changing the existing snapshot window/immutable count/source authentication.
- db/schema.ts and generated drizzle/0006_automation_runs.sql/meta snapshot/journal append two new tables and indexes. This registered migration is distinct from the pre-existing standalone0006_manual_subscription_costs.sql. Existing migration entries/snapshots unchanged. New tables are migration-owned; request handlers do not create/alter them.
- automation_runs stores UUID, owner, automation, trigger, status, start/finish, safe error code, counts-only result, selection fingerprint, retry/root links and issue/dismissal audit. automation_locks is owner/automation scoped with a five-minute lease. Start is persisted before provider work; a stale unfinished run becomes unconfirmed on a later read/check. A late worker cannot overwrite recovered state or a newer lease.
- Completion and linked issue resolution use D1 batch. Original failures remain; only open failed/unconfirmed issues in the matching retry chain resolve. Automatic later scheduled successes do not silently dismiss historical issues.
- No new scopes/secrets, scheduler job changes, uploads, messages, purchases or unattended Drive moves. Legacy youtube_capture_runs/health remain for existing capture evidence and keep their existing30-day retention. New run history has no automatic deletion policy yet.

## Source inventory and expansion

| Workflow | Current monitoring |
|---|---|
| YouTube snapshot checker | Implemented per-owner start/end/result/error records; safe selection-bound retry. First new live scheduled run remains to verify. |
| Drive checks/preparation | Existing latest checks and pending/completed move records; complete attempt adapter not built. Uncertain moves must reconcile without a second PATCH. |
| Payhip ingestion | Existing deduplicated received paid/refunded events; rejected/failed processing attempt adapter not built. Public receiver needs separate instrumentation. |
| Analytics/finance/Mailchimp refresh | Report/error handlers exist; common run-history adapter not built. Distinguish interactive refresh from background automation. |
| Uploads and memory imports | Future workflows; no fictional runs. |

Next adapters: read-only Drive checks, then guarded move reconciliation, provider refreshes and future uploads/memory imports. Before claiming overall automation health, inventory all expected workflows and implement explicit source coverage/expected-frequency monitoring. Publishing Cadence overlaps Group1 planning and remains unimplemented.

## Verification and recovery

Run node verify-automations.mjs, node verify-automations-ui.cjs, node verify-capture.mjs, node verify-backend.mjs, node verify-prepare.mjs, node verify-projects.mjs, node verify-project-ui.mjs, node verify-group-migration.mjs, node verify-dashboard-shell.cjs, node verify-state.cjs and node verify-dialogs.mjs. After the supported production build, node verify-compiled-pages.mjs verifies actual private200/401 HTML handlers and preserved Costs redirect.

Checks cover persisted start, interruption/timeout/fencing, owner isolation, independent partial owner failure, safe redacted errors, zero-capture no-op, missed-window reporting, duplicate/concurrent/changed-selection retry rejection, linked resolution, dismissal history, attention ordering/counts, pagination, auth/origin/validation, literal reason rendering, stale UI responses and focus return. Fixtures do not prove a live scheduled capture or rendered geometry.

Source 8791d9c008663fbc88f7f254bcccdf0e1edd78f6; private deployment appgdep_6aceb52deacc8191adf1c1ba8cb3506a; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f651fa447a448191b69c242527dda3f6; succeeded. Runtime environment revision 6 preserved.

First owner check: open /automations signed in; after the scheduled checker executes, Refresh and inspect its scheduled start/finish/result. A failed run should retain the fixed safe error; a successful no-op is valid. Do not trigger an upload/move to test monitoring. Rendered phone/desktop/large-text and first real new scheduled record remain pending; Sites service-credential reads returned401 and cannot substitute for an owner session.

Recovery: redeploy the preceding Site version while retaining the additive tables and history. Never remove an applied migration or overwrite provider state/snapshots to roll back this UI.
