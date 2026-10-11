# GemOS dashboard — current handoff

Updated 11 October 2026. Start with AGENTS.md and [dashboard index](README.md). Current docs are consolidated; archived checkpoint notes and preview mocks are historical. Read [PROJECTS](integration-tests/youtube/PROJECTS.md), [ASSETS](integration-tests/youtube/ASSETS.md), Group 1 [specification](group-1/SPECIFICATION.md)/[usage](group-1/USAGE-AND-CONNECTIONS.md)/[components](group-1/COMPONENTS.md) and [design system](../DESIGN_SYSTEM.md) before extending the checklist.

## Current Group 1

Private page: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/checklist. Checklist has eight checks, four two-column rows, centred icon/name/muted type/symbol and clickable file popups with minimal per-file links and local association controls. Shared pair measurement keeps card/recess/footer alignment. Buffer is truthful No schedule yet; no examples or invented coverage. Buffer details remains empty until confirmed scheduling source exists.

Prepare release replaces Release details. Saved editable metadata, outstanding files only, explicit Tuesday–Sunday Shorts-order review and Save review. Confirm ready rechecks the reviewed 8/8 snapshot; production project moves to connected Queue with explicit user-triggered metadata-edit permission. Already queued projects confirm without moving. No upload/schedule/publication/automatic archive. My Drive only; uncertain writes stay pending and reconcile actual Queue parent without duplicate PATCH. See PROJECTS for recovery limits and Google consent setup.

Yearly 2027 above sibling In Production/Release Queue/Released is supported. Connect each stage ID; parent auto-detection remains future. Selection belongs only to 1.2; stable folder IDs retain independent scans/mappings/reviews. Old seven-check caches require Sync. Source parsing never demands exact filenames or drops BPM/key/credits.

## Current Group 2

Read [STATUS](integration-tests/youtube/STATUS.md) and [CAPTURE](integration-tests/youtube/CAPTURE.md). Shared saved Google connection and protected five-minute Cloud Scheduler endpoint calls are verified. 2.1 test remains selected Shorts; whole-channel/all-platform coverage is not complete. 2.2 persists its independent release batch and freezes first qualifying observed count at publication +24h to +24h15m. Real first-release capture/ranking and TikTok/Reels remain unverified. Do not alter those scopes through the checklist selector.

## Evidence and user next

CJ reports previous picker/links working; screenshots show stage setup and one Gelato 41 fresh 4/8 scan. Controlled checks cover matching, persistence, selection, preparation/move guards, UI logic and measured geometry. New live consent/move and fresh phone/desktop appearance are pending; no supported browser QA available. Contrast, Android Back/enlarged text, real two-project switching, archive contents and computer sync remain to verify. No universal alignment/WCAG compliance claim.

Next user test: select/Sync a second old project, switch back/reload, then use a complete 8/8 old project to Save review/Confirm ready. Enable folder moves via existing Google OAuth consent when testing a production move. No new Drive folders, OAuth client or secret needed. Follow [PLAN](PLAN.md) for remaining connections.

## Deployment checkpoint

Latest automatic-sync slice privately deployed 10 October 2026: source 5a39a88b11ba894700756b44304587208d52fcf1, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_04c304cd3e4c8191a74e9bd4b760af9c, deployment appgdep_6aca8955b71481918159d7e58b8fcd90 succeeded. Owner-only audience and environment revision 4 retained. Targeted UI/syntax checks and production build passed; real automatic switching/scan and phone appearance remain pending. Preparation move/consent verification remains pending separately.

## Automatic selection sync — 10 October 2026

CJ requested automatic scanning whenever the selected project changes. Implemented after successful selection; no new permission, background watcher or other-card scope change. Manual Sync remains. Selection failure does not scan; scan failure keeps that selected project and labels its saved result stale. Controlled UI tests cover these paths; build passed. Group 3.1 is now approved and implemented as a setup/layout slice; see Group 3 below.


## Group 3.1 and compact dashboard navigation — 11 October 2026

CJ supplied original-card-mock-up.html with Payhip, Email List and YouTube AdSense references. Approved refining 3.1, adding /commerce and compact shared 1 Release / 2 Performance / 3 Sales navigation. Existing licence documentation governs Standard £20, Premium £40, Exclusive £150. Beats only initially; tagged streaming preview replaces the proposed free downloadable MP3. Never promise ripping is commercially unusable.

CJ reports store created, products not added. Payhip data is not connected: current card uses unavailable revenues/quantities and an Add your first beat setup prompt. Functional period/target/sales-dialog controls; target is browser-local. Read group-3/SPECIFICATION.md, USAGE-AND-CONNECTIONS.md and COMPONENTS.md. Add one beat/product set and provide store URL before the sales-source slice. 3.2/3.3 are still pending review.

YouTube setup collapses after successful saved connection restore; sample/release inputs live in compact expandable panels. Drive retains its existing unconfigured-open behaviour. Existing saved connections, API scopes and independent selections are preserved. Controlled new controls/regressions/nesting and production build pass; fresh Android/desktop visual verification remains pending. Publication checkpoint is recorded below.


Latest sales/navigation slice privately deployed 11 October 2026: source d0a91d337d16c16733de6c65a63e017343966294, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_071a65d030c881918d42b983ece5b89b, deployment appgdep_6acb8f043abc81918597502c3bb138fc succeeded. Existing owner-only audience and environment revision 4 retained. Payhip sales are unconnected; live source and rendered device verification remain pending.

## Shared test-suite shell repair — 11 October

CJ's screenshot showed navigation styles absent; Sales background was reported white. Shared stylesheet is now embedded directly in each authenticated HTML response. All routes use dark navy, consistent compact panels and a clearly bordered/filled48px group selector. Authenticated generated-response checks, commerce/checklist/YouTube regressions and production build passed. Fresh Android/desktop rendering still needs checking; no supported browser QA. Deployed checkpoint is recorded below.


Latest shell repair deployed 11 October: source 80c2d93bef7ffdf7e194e49bc3fcb71b8bf0dc0f, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_9c92fcb62bc88191bd2f5927e017c95d, deployment appgdep_6acba29254948191b72b42612a0c1a6b succeeded; owner-only access and environment revision4 retained. Generated HTML checks verify shared CSS delivery; real phone rendering remains pending.

## Page-handler outage recovery — 11 October

The prior shell repair deployment produced500 on / and /checklist, confirmed by live worker logs and CJ report. Cause: CSS raw imports into route.ts triggered framework React wrapping of GET. Removed runtime CSS imports and unused /dashboard.css route; npm prebuild runs scripts/sync-dashboard-styles.mjs to embed the shared CSS into each HTML document. Existing style/navigation choices retained. Source-only handler checks did not cover this build transformation; verify-compiled-pages.mjs now exercises compiled checklist/commerce200/401 responses and rejects React wrapping on all three page handlers. Build passed and recovery deployed; fresh signed-in phone appearance remains pending. This supersedes the runtime-injection approach above.

Recovery deployment: source846ac66a1f70122df845b5e1e2c684ca32f7a477; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_86c4d7ce06b081918b886127cdd505d0; deployment appgdep_6acba4968e6481919d016bd942a81873 succeeded with environment revision4 and owner-only access retained.
