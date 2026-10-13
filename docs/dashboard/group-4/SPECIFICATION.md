# Group 4 — Automation Performance

Implemented 13 October 2026 after CJ approved all-GemOS scope and attention-first behaviour. Automation Performance retains provisional card number4.2; Publishing Cadence is not built and no empty placeholder is shown.

## Presentation and behaviour

- One Compact454px card at /automations, half-width on desktop≥840px and stacked on mobile. Reuses established cobalt material (#1e3a8a/#172554/#090d1a),58px glass glyph,32px card/22px recess,20/24px insets,174px centred header, bottom44px footer. Header grows for enlarged text; list scrolls within the recess.
- Headline counts distinct monitored automations with unresolved failed/unconfirmed runs, not repeated attempts. Caption supplies unresolved run count. States: “1 automation needs attention”, “No automations need attention”, “No automation runs yet”, loading and unavailable.
- Needs-attention runs first, then recent runs. Each row has name, status, start date/time and confirmed duration; a row opens details.
- Footer Refresh reads recorded results only; View run history opens a native dialog with automation/attention filters and10 runs/page, Previous/Next. No fabricated total-page count.
- Successful retry resolves open issues linked to its original attempt chain. A reasoned dismissal changes issue state only; original failure and all attempts remain in history.
- Retry only for the read-only YouTube checker. Per-owner lease blocks concurrent attempts; selection fingerprint must match the failed run. Changed selection requires reviewing/dismissing the old issue. No move/upload/purchase retry adapters exist.
- Details show trigger, start/finish/duration, result/error, run ID and linked retry/resolution/dismissal reason. Errors contain bounded fixed safe summaries; reasons render as literal text.
- All datetimes display in Europe/London. Running/unconfirmed durations remain unconfirmed rather than invented.

## Coverage and evidence

All GemOS automations is the intended scope; only YouTube snapshot checker is instrumented now. A visible coverage note and last recorded scheduled start prevent implying complete monitoring or continued scheduler availability. New executions only; legacy logs are retained without backfilling incomplete history.

Zero newly captured snapshots can be a successful no-op. Missed historical snapshot windows are separately reported and cannot be restored by retry. Schedule stopped/disabled outside GemOS is not automatically detected; this is run-result monitoring, not verified scheduler uptime.

Source 8791d9c008663fbc88f7f254bcccdf0e1edd78f6; private deployment appgdep_6aceb52deacc8191adf1c1ba8cb3506a; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f651fa447a448191b69c242527dda3f6; succeeded. Runtime environment revision 6 preserved.

Controlled API/SQLite/real-script checks and compiled private200/401/production build pass. Signed-in live run read, first new scheduled record and rendered mobile/desktop/enlarged-text acceptance remain unverified. Private read using the Sites service credential returned401; no authenticated user identity was fabricated.

See [usage and implementation](USAGE-AND-CONNECTIONS.md) for contracts, checks and remaining adapters. Subscription Costs remains [3.4 Finance](../group-3/SUBSCRIPTIONS.md).
