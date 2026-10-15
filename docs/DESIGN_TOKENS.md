# Dashboard design tokens

## Shared sync and current source geometry — 15 October 2026

Production version74 uses one-line UK timestamps with seconds below source-card Sync and Automation-tile controls. ui/sync-times.js reads durable automation completion records; failure retains last success. Full date remains in the time element/accessible text. Manual subscriptions say Last saved. Normal timestamps use Inter10px/14px, white .82 and nowrap; footer track reserves60px, with Group1's72px exception. Action targets remain44px.

Group4 is920px Large, with three desktop/two phone columns,20px plain tile icons,12px names/11px state and dates,8px padding/12px gaps. Earlier Compact/glass/two-column tile notes are historical. All normal Large cards920px; Finance Compact454px with12px row/20px column gaps. Group1's12px row gap is now implemented. Original2.1 metric tiles are restored; period-specific Top3 Shorts and outside-tile copy cleanup remain.2.2 is Weekly Shorts/current cumulative views;24h snapshots remain details/checker evidence.

Version74 source corrections and verification limits: [design check](dashboard/integration-tests/youtube/DESIGN-SYSTEM-CHECK.md). The previous pending Sync-all/timestamps/functionality statements are superseded by CJ's later acceptance in [HANDOFF](dashboard/HANDOFF.md); measured rendered accessibility and real qualifying24h capture remain open.


## Current Large card and data sync — 14 October2026

CJ explicitly requests shared Large sizing, smaller centred tile icons/text/status icons, per-tile Sync and a top Sync all. Delivered920px cobalt card; no second card. Existing32px card/22px recess/58px top glyph/20–24px insets retained;174px header,44px top sync track, flexible scroll recess and44px bottom footer. Enlarged header text can grow the card.

Nine compact centred two-column tiles:8px padding/gaps,28px glass icon/18px monochrome mark,11px name/10px status/date, status symbol plus wording,44px Sync/details controls. Latest attempt/duration remains in details. Older unresolved issues remain visible after newer success. Manual Costs shows Last saved; unconnected Buffer shows Not connected, both Sync-disabled.2.2 uses Last successful check; other sources show Last synced.

Sync all refreshes available data cards sequentially, guards duplicates and continues after failures; completed/partial/skipped/failed are separate. Bottom Refresh status only reads records. Source choices reuse last successful saved selections/periods; absent period defaults to the source's current month. Missing/multiple required channel/account/sample choices require source setup. Analytics can initialise from the same tab's previously confirmed sample, never2.2's independent release sample. It does not move/approve/publish/send/purchase/spend or rewrite manual records.

Source 4c5a7387e7352fe82f5b14604317fff3cdf41bf2; private deployment appgdep_6aced96e768881918b0c3d6e9a829474; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_5f6fa7750d3c8191ba376254f10694db; succeeded; runtime revision6 unchanged.

Controlled card-sync/control/automation/cache/security/provider/Group1–3 checks, production build and compiled200/401 pass. Actual Drive bulk fixture used only GET provider calls. Rendered phone/desktop/enlarged-text and owner live Sync all remain pending.

This supersedes preceding Compact454px Group4 notes; other groups retain their established size/material.


## Current Group4 Automation Performance — 13 October 2026

/automations reuses the established cobalt gradient155deg #1e3a8a/#17255442%/#090d1a, #60a5fa beam .75/.18/transparent and #dbeafe supporting text. Compact454px,32px card/22px recess,58px/18px glyph,28px symbol,20/24px insets,174px centred header,44px bottom footer and12px row/20px column gaps. Half-width at840px; mobile stacked. Intentional recess scrolling stays fixed; enlarged header text grows the card. Native dialog max75dvh with plain Close footer. Existing Finance/Audience/Release palettes and dimensions unchanged. This supersedes statements that new Group4 has not been styled/built; former Costs details below remain historical.


## Current regrouping — 13 October2026

Email List is now2.3:Group2 purple #4338ca/#312e81/#0f172a and Large920px, shared174px header/575–583px recess/bottom footer. Subscription Costs is now3.4:Group3 green #065f46/#044e39/#022c22 and Compact454px. Finance uses four half-width cards,12px row/20px column gaps. Cards/dialogs consume destination material, dimensions and shared glyph/fonts/radii. Former cobalt Group4 Costs rules below are historical; earlier Group4 notes below are historical. Old /costs redirects to Finance. Narrow Finance cost controls scroll within one44px track; intentional list scrolling does not trigger paired growth.

Updated 10 October 2026. These values implement the accepted Group 2 design; they introduce no new palette. The private YouTube test defines them once in `ui/index.html`. Both cards consume the same tokens. Group 1 retains its own reviewed palette and geometry.

| Role / CSS token | Value |
|---|---|
| Surface / `--g2-surface` | 155° gradient: #4338ca 0%, #312e81 45%, #0f172a 100% |
| Card / `--g2-card-radius`, `--g2-card-inset`, `--g2-card-height` | 32px; 20px mobile / 24px ≥640px; 920px normal minimum |
| Card border / `--g2-card-border` | White 0.16 |
| Card shadow / `--g2-card-shadow` | Reviewed four-layer shadow in DESIGN_SYSTEM.md |
| Recess / `--g2-recess-fill`, `--g2-recess-border` | Black 0.28; white 0.12 |
| Recess / `--g2-recess-radius`, `--g2-recess-blur` | 22px; 16px |
| Recess / `--g2-recess-inset`, `--g2-recess-height` | 12px / 575px mobile; 16px / 583px ≥640px |
| Recess shadow / `--g2-recess-shadow` | Inset 0 2.5px 6px black 0.45; lower 0 1px white 0.12 |
| Header / `--g2-header-height`, `--g2-header-panel-gap` | 174px normal minimum; 16px |
| Icon / `--g2-glyph-size`, `--g2-glyph-radius`, `--g2-symbol-size`, `--g2-glyph-label-gap` | 58px; 18px; 28px; 12px |
| Icon material / `--g2-glyph-fill`, `--g2-glyph-border`, `--g2-glyph-shadow` | Reviewed 135° white 0.45→0.12 gradient, white 0.65 border and three-layer glyph shadow |
| Spotlight / `--g2-beam` | Indigo #818cf8, opacity 0.85 / 0.22 / transparent at 0% / 44% / 75%; shared 290×190px shape, top −36px, blur 18px |
| Heading / `--g2-heading-size` | Poppins 800: 24px mobile / 30px ≥640px; shared 22px exception below 360px |
| Supporting text / `--g2-meta-size`, `--g2-text-gap` | Inter 12px, line-height 1.5; 4px between text roles |
| Context / `--g2-meta` | #d5d8ed |
| Freshness / `--g2-freshness` | #d7dcef |
| Footer status / `--g2-footer-status` | White 0.82; Inter 400, 10px, line-height 1.4 |

Inter 400/600/700/800 and Poppins 700/800 are loaded through a Google Fonts stylesheet with `display=swap`. System sans-serif remains the network-failure fallback. Recheck overflow after fonts load. Font delivery and final appearance on Android still require rendered verification.

Change shared tokens or component rules rather than patching one card ID. Recess reflow may exceed the normal height for overflowing/enlarged text. Shared translucent materials can look different behind dense metric tiles and a mostly empty list; do not lighten one panel independently to compensate.

See [design system](DESIGN_SYSTEM.md) and [Group 2 components](dashboard/group-2/COMPONENTS.md).

## Group 1 integration tokens — 10 October 2026

| Role | Current private test contract |
|---|---|
| Card/recess corners | --g1-card-radius: 32px; --g1-recess-radius: 22px |
| Group/panel gaps | --g1-group-gap: 20px; --g1-panel-gap: 16px |
| Card inset | --g1-card-inset: 20px / 24px from 640px |
| Recess inset | --g1-recess-inset: 12px / 14px from 640px |
| Dialog fill/border | --g1-modal-fill: 155deg #0369a1 to #0f172a; --g1-modal-border: white 0.16 |
| Shared group measurements | --g1-header-height, --g1-recess-height, --g1-footer-height, --g1-slot-height: largest required geometry across both cards; minimum 512px / 532px below 360px |
| Asset grid | Two columns; 88px minimum row; 6px gap; 8px vertical/10px horizontal tile inset; 22px outline icon in 24px slot; 12px tile radius; wrapped category/status text; eight checks in four equal rows |

These implement CJ’s approved integration alignment; they do not recolour Group 2. The new group measurement reserves identical header/recess/footer geometry rather than independently expanding cards. Measured contract tests are separate from pending rendered acceptance.

Checklist semantic roles: --g1-asset-fill white .045; --g1-asset-border white .10; --g1-state-ready #a7f3d0; --g1-state-missing #fb7185; --g1-state-attention #fde68a; --g1-state-unchecked #cbd5e1. Status has wording and a symbol, never colour alone.

File-type caption: 10px / 1.2, weight 400, muted #bae6fd beneath the 12px category name. Stems label ZIP; thumbnail PNG; video and Shorts MP4.

Current checklist alignment: centred icon/name/type/status stack; icon-to-copy 3px; name 12px/1.2, type 10px/1.2, symbol 15px in 20×16px box, 2px top gap. Symbol states ✓ / × / ! / - retain accessible wording.

Project selector: 12px-radius panel/control, panel inset 12px/16px, 8px control gap, 44px select/button targets, 12px label/select text and 11px status/refresh text; existing modal border, asset fill and sky supporting-text tokens.



## Group 1 dialog and form roles

| Token / contract | Value |
|---|---|
| --g1-body-text / --g1-muted-text / --g1-link-text | #e0f2fe / #cbd5e1 / #7dd3fc |
| --g1-field-fill / --g1-field-border | #0f172a / white .30 |
| --g1-section-fill / --g1-section-radius | white .04 /16px |
| --g1-control-radius / --g1-control-height |12px /44px minimum |
| Dialog bounds |420px file /560px preparation; viewport minus32px;85dvh max |
| Dialog focus/Close |static heading first; sticky Close footer with modal fill/border |
| Empty/connected category icon |58px/18px quiet glass shell;28px outline |
| External links |borderless supporting blue text;44px target; underline on hover; visible focus |
| Form fields |14px input text;12px labels;44px controls; left-aligned labels |

These extend the accepted palette and material. Group 2 tokens are unchanged. Current Group 1 forms and dialogs consume semantic roles; historical card geometry overrides remain. No direct links on tiles. Detailed component/state contracts live in dashboard/group-1/COMPONENTS.md.

## Group 3.1 / dashboard shell tokens — 11 October

--g3-gradient:155deg #065f46/#044e39 at42%/#022c22; --g3-muted:#d1fae5; --g3-card-radius:32px; --g3-recess-radius:22px; --g3-card-inset:20px/24px; --g3-recess-fill:black .28. Card/recess shadows retain shared reference materials.

--shell-bg:#0f172a; --shell-text:#f8fafc; --shell-muted:#cbd5e1; --shell-border:white .15; --shell-fill:white .03; --shell-selected:white .08; --shell-focus:#7dd3fc; --shell-radius:16px; --shell-control:44px. Source shared ui/dashboard.css is embedded into all three HTML documents by the prebuild script; handlers import HTML only.

Shell navigation target:48px; compact labels12px/desktop13px; active border white .32/fill white .12; navigation background #02061780. All pages use --shell-bg for canvas with an explicit body rule, independent of legacy card theme CSS.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.


## Group1 Large sizing — 12 October12:34UK

CJ authorised Group1 only. Both Release Buffer and Checklist now target920px Large; groupGeometry defaults to920 and uses shared largest header/recess/footer measurements, preserving two16px gaps and exact border-inclusive insets. Enlarged/long content can grow both together above920. CSS fallback slot920 and versioned checklist script; all eight centred checks and existing icon/title/material/footer/control/source rules retained. No fake Buffer content, new permissions or behaviour. Group2 source is unchanged in this slice; footer fix remains next.

Geometry contract now checks920 minimum and exact920 typical state. Project UI,asset eligibility and production build pass. Compiled-page test initially selected JS route by reused marker, falsely treating document.createElement as a React wrapper; restrict discovery to HTML document routes, then genuine200/401/no-wrapper checks pass. No CSS route imports added. Fresh phone/desktop and enlarged-text rendering remain pending; existing device evidence does not prove new920 fit. Earlier512/532 minima are superseded for current Group1 integration.


## Group2 Large/footer update — 12 October2026

CJ authorised after accepting Group1 Large/even checklist rows. Group2 current normal card height920px replaces earlier880px geometry. Both cards retain174px shared headers,575/583px recess,360px leaderboard viewport and72px rows. Restore footer margin-top:auto to anchor controls at bottom;20px inner top padding and min64px footer reservation provide breathing room without moving the recess. Shared rule applies to both cards; metrics/range/platform/scopes/capture/sync behaviour unchanged. Earlier880px rendered checks are historical, not proof of current920 rendering.

YouTube state/cache/selection and dashboard-shell regressions plus production build/compiled200/401 checks pass. Refreshed phone/desktop, long status/enlarged text still need acceptance; no supported browser QA available. Group1 user accepted latest rows; Group3 accepted prior spacing. No new permission, scheduler or publication logic.


## 12 October 21:27 UK — earnings repair and Compact spacing delivery

CJ confirms revenue connection succeeds and main figures load; Long/Shorts breakdown and top earner did not display. Production logs show /api/earnings/videos502 across selected months. Exact provider rejection body was unavailable; changing the video+creatorContentType ranking to the standard video-only estimatedRevenue report is a compatibility repair, not proof of the precise original rejection. Ranking now returns upload totals without guessing a content type; labels say Video until provider classification is available. Separate daily creatorContentType report still owns channel Long/Shorts breakdown. If all rows have unknown types, those category values stay unavailable rather than fabricated zero.

The earnings recess uses a block content container with auto-height breakdown and explicit hidden-state rules instead of nested100%-height flex content, to avoid clipping. Versioned script refreshed. No revenue amounts or classifications invented. Live ranking and rendered breakdown remain pending user recheck.

Locked geometry applied to Group3:Compact454px,12px row gap,20px column gap; Large920px unchanged. 454+12+454=920. Internal header/recess/footer geometry and20/24px insets unchanged. Group1/2 card slots remain920px; this checkpoint predates the later12px Group1 row-gap correction.

Controlled earnings/backend/commerce fixtures and compiled private200/401/shell checks pass; production build succeeds. No supported browser capture, no successful owner-authenticated direct live revenue read in this session, and live provider success is not claimed by fixtures. Private source76992f4c8d9f33b3d5a664276c4709482c7b1af7/deployment appgdep_6acd4280bc4c81918d9d684a92919835 succeeded20:26UTC, envrevision6 preserved. Next: refresh Sales and Sync, inspect Long/Shorts rows and top earner; screenshot if still missing, then compare completed-month total to Studio.


## Group 4 — implemented 13 October 2026

| Semantic role | Value |
|---|---|
| g4 gradient |155deg,#1e3a8a0%,#17255442%,#090d1a100% |
| g4 beam |#60a5fa,.75/.18/transparent; stops0/42/75% |
| g4 supporting text |#dbeafe |
| Compact |454px; existing enlarged-text exception |
| Logo container / mark |30px /20px; radius9px; monochrome |

Shared32px card/22px recess,58px glyph,20/24px insets,12px vertical/20px horizontal gaps and44px controls preserved. Runtime variables live in ui/costs.html; navigation rules in ui/dashboard.css.
