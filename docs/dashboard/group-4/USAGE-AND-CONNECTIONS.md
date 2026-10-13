# Group 4 — future publishing and automation

See [SPECIFICATION](SPECIFICATION.md). No current live implementation. The former manual Costs contracts have moved to [Group3](../group-3/SUBSCRIPTIONS.md); their pre-regrouping copies are archived. Next work is a design/data review of Publishing Cadence and Automation Performance, not a second cost card.

## Automation Performance — confirmed scope, 13 October 2026

CJ confirmed coverage of all GemOS automations. The headline counts unresolved failed or unconfirmed runs: “1 automation needs attention”, “No automations need attention” only after recorded runs with no unresolved issues, and “No automation runs yet” before any records. Needs-attention runs precede recent runs; the footer opens full history and filtering by automation.

A successful retry resolves only the issue linked to that retry's original run, after confirmed completion. Manual dismissal requires a recorded reason and retains the original failure in history. Retry is available only where duplicate external actions can be prevented and the specific operation is eligible; uncertain writes require reconciliation/details rather than blindly repeating them. Monitoring approval does not authorise new publication, purchase, notification or unattended folder moves.

Runtime/card implementation has not started. Publishing Cadence overlaps Group1 planning; no cadence-grid implementation is authorised by this discussion. Retain provisional numbering4.2 for Automation Performance until placement/design is settled.

## Repository-grounded first integration

Inspection against GitHub main fd3f13253d1e77023c6e96bd063c1e25676cece2 and matching deployed source0290a28c7d2b91daac3b6a00fe3a13c5d49bd388:

| Workflow | Existing evidence | Monitoring gap |
|---|---|---|
| YouTube snapshot checker | server/capture.mjs records UUID, started_at, finished_at, captured count and outcome in youtube_capture_runs; CAPTURE.md records prior verified scheduled endpoint calls | Row written only after completion; early failures/crashes can be absent. Outcomes conflate trigger and success; failures have no retained per-run detail, owner or linked retry. Logs expire after30days. No new live run tested here. |
| Drive preparation / Queue move | server/assets.mjs stores owner/project-scoped pending/completed move, start/completion times; checks actual folder parents before confirming | State is one row per project rather than complete attempt history. Pending uncertain writes must reconcile; do not enable blind retry. Checks retain latest result, not run history. |
| Payhip ingestion | server/payhip.mjs deduplicates stored paid/refunded events with receipt timestamps | Sales events are not automation attempt records; rejected/failed ingestion lacks complete run history. Public receiver would need separate instrumentation. |
| Analytics / finance / Mailchimp refresh | Existing private handlers return reports/errors | No common durable run history; add instrumentation later and distinguish interactive refresh from background work. |
| Uploads / memory imports | Future workflows | Not connected operational automations; do not seed fictional runs. |

Recommendation: instrument the existing YouTube checker first. A successful checker with zero eligible snapshots is a successful no-op, not failure. Missing/late capture-window coverage is a separate result; no retries can recreate a missed historical window.

Implementation sequence (proposed, not built):
1. Add owner-scoped durable run records with separate trigger, start, terminal status, safe error code/summary, result counts, parent retry and issue/dismissal audit. Save start before work; recover stale unfinished runs as unconfirmed without assuming an external action failed.
2. Instrument checker per owner, preserving frozen snapshot eligibility, service authentication, current scheduler and connection permissions. A scheduled header alone is not proof the schedule remains enabled.
3. Add private read/details/dismiss interfaces, bounded pagination and a supported safe checker retry. Authenticate owner and same-origin writes; reject retries of ineligible operations and concurrent duplicates. Decide retry granularity before implementation: one owner's checker versus scheduler batch.
4. Build card/history using shared design tokens after confirming destination colour/height. Separate monitoring data freshness from “no unresolved issues”; never imply complete all-workflow coverage until adapters exist.
5. Expand to read-only Drive checks, then guarded move reconciliation, provider refreshes and future uploads/memory imports.

Checks required: persisted start survives forced interruption; partial owner failure remains isolated; explicit no-op success; missed-window reporting; owner isolation and service auth; redacted errors without secrets/personal payloads; attention count/order; dismissal reason; linked verified retry resolution; duplicate/concurrent retry prevention; original history retained; bounded pagination; regression of snapshot window/frozen count. Confirm a real scheduled start/end record separately from controlled tests. A complete adapter inventory and expected-frequency monitoring are needed before claiming all GemOS automation health.

Recovery: additive migration and feature flag/adapter removal; preserve existing provider state and snapshots; revert UI/source without deleting run history. No new provider permissions needed for the first checker adapter.
