# Group 4 — Automation Performance

Implemented 13 October 2026 after CJ approved all-GemOS scope and attention-first behaviour. Automation Performance retains provisional card number4.2; Publishing Cadence is not built and no empty placeholder is shown.

## Presentation and behaviour

- One Compact454px card at /automations, half-width on desktop≥840px and stacked on mobile. Reuses established cobalt material (#1e3a8a/#172554/#090d1a),58px glass glyph,32px card/22px recess,20/24px insets,174px centred header, bottom44px footer. Header grows for enlarged text; list scrolls within the recess.
- Headline counts distinct monitored automations with unresolved failed/unconfirmed runs, not repeated attempts. Caption supplies unresolved run count. States: “1 automation needs attention”, “No automations need attention”, “No automation runs yet”, loading and unavailable.
- Recess is now a two-column per-card status grid, one column below360px, scrolling inside the existing Compact card. Nine Group1–3 cards appear. Tiles show name/card number, latest status, last successful sync/check or manual save, latest attempt and unresolved issues. Attention cards appear first; older unresolved issues remain visible after newer successful runs. Tile details open the relevant unresolved issue or latest run.
- Footer Refresh reads recorded results only; View run history opens a native dialog with automation/attention filters and10 runs/page, Previous/Next. No fabricated total-page count.
- Successful retry resolves open issues linked to its original attempt chain. A reasoned dismissal changes issue state only; original failure and all attempts remain in history.
- Retry only for the read-only YouTube checker. Per-owner lease blocks concurrent attempts; selection fingerprint must match the failed run. Changed selection requires reviewing/dismissing the old issue. No move/upload/purchase retry adapters exist.
- Details show trigger, start/finish/duration, result/error, run ID and linked retry/resolution/dismissal reason. Errors contain bounded fixed safe summaries; reasons render as literal text.
- All datetimes display in Europe/London. Running/unconfirmed durations remain unconfirmed rather than invented.

## Coverage and evidence

All GemOS automations is the intended scope. Connected dashboard server-backed syncs and the scheduled checker are now instrumented: Drive checks/discovery/Queue approval, Shorts analytics, release metadata, Mailchimp, Payhip sales refresh, YouTube earnings/ranking and payouts. Scheduling and memory/uploads remain unconnected. Payhip public receiver processing is not instrumented. A visible coverage note and last recorded scheduled start prevent implying complete monitoring or continued scheduler availability. New executions only; legacy logs are retained without backfilling incomplete history.

Zero newly captured snapshots can be a successful no-op. Missed historical snapshot windows are separately reported and cannot be restored by retry. Schedule stopped/disabled outside GemOS is not automatically detected; this is run-result monitoring, not verified scheduler uptime.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained.

Controlled API/SQLite/real-script checks and compiled private200/401/production build pass. Signed-in live run read, first new scheduled record and rendered mobile/desktop/enlarged-text acceptance remain unverified. Private read using the Sites service credential returned401; no authenticated user identity was fabricated.

See [usage and implementation](USAGE-AND-CONNECTIONS.md) for contracts, checks and remaining adapters. Subscription Costs remains [3.4 Finance](../group-3/SUBSCRIPTIONS.md).

## Grid and other-card syncs — 14 October2026

CJ explicitly chose recording the other cards' syncs in the existing card, then requested a grid showing each card, sync status and last sync. No second card was added. Latest failed/unconfirmed attempts do not overwrite last-success timestamps. Partial provider data displays “Partial data”; it is not invented full coverage. Schedule Overview says Not connected, Subscription Costs says Manual records/Last saved.2.2 uses Last successful check because a successful checker may be a no-op. Other tiles use Last synced.

Monitoring page GET/Refresh reads do not create runs, proven with repeated API reads and unchanged row counts. CJ reports two entries visible on page load; their exact live trigger/timestamps were not inspected, so duplicates are not asserted or deleted. Data-fetching page loads elsewhere are genuine recorded card refreshes. Cached analytics range restores and status/settings/history reads are not new syncs.

Shorts analytics uses one trace across ownership/probe/current/previous queries, recording one logical sync. Finished server responses determine outcome; no browser-reported success endpoint exists. Direct legacy browser OAuth requests are outside server monitoring. An interrupted analytics trace becomes unconfirmed after five minutes. Existing snapshot eligibility, provider state, scopes and manual records unchanged.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained. Controlled checks/build pass; rendered grid and newly added live provider run records remain to verify.
