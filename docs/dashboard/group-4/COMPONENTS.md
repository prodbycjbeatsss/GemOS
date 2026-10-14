# Group4 — Large sync status grid

## Current Large card and data sync — 14 October2026

CJ explicitly requests shared Large sizing, smaller centred tile icons/text/status icons, per-tile Sync and a top Sync all. Delivered920px cobalt card; no second card. Existing32px card/22px recess/58px top glyph/20–24px insets retained;174px header,44px top sync track, flexible scroll recess and44px bottom footer. Enlarged header text can grow the card.

Nine compact centred two-column tiles:8px padding/gaps,28px glass icon/18px monochrome mark,11px name/10px status/date, status symbol plus wording,44px Sync/details controls. Latest attempt/duration remains in details. Older unresolved issues remain visible after newer success. Manual Costs shows Last saved; unconnected Buffer shows Not connected, both Sync-disabled.2.2 uses Last successful check; other sources show Last synced.

Sync all refreshes available data cards sequentially, guards duplicates and continues after failures; completed/partial/skipped/failed are separate. Bottom Refresh status only reads records. Source choices reuse last successful saved selections/periods; absent period defaults to the source's current month. Missing/multiple required channel/account/sample choices require source setup. Analytics can initialise from the same tab's previously confirmed sample, never2.2's independent release sample. It does not move/approve/publish/send/purchase/spend or rewrite manual records.

Source 4c5a7387e7352fe82f5b14604317fff3cdf41bf2; private deployment appgdep_6aced96e768881918b0c3d6e9a829474; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_5f6fa7750d3c8191ba376254f10694db; succeeded; runtime revision6 unchanged.

Controlled card-sync/control/automation/cache/security/provider/Group1–3 checks, production build and compiled200/401 pass. Actual Drive bulk fixture used only GET provider calls. Rendered phone/desktop/enlarged-text and owner live Sync all remain pending.

ui/automations.html/js owns Large grid/controls; server/card-sync.mjs fixes safe actions; sync-targets.mjs owns prior successful selections; analytics-cache.mjs owns real saved2.1 result. Existing native details/history/retry/dismissal remains. See USAGE-AND-CONNECTIONS.md for API/storage/recovery.
