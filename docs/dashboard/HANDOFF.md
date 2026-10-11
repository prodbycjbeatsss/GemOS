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

CJ reports store created, products not added. Payhip data is not connected: current card uses unavailable revenues/quantities and an Add your first beat setup prompt. Functional period/target/sales-dialog controls; target was browser-local in that earlier slice (superseded below). Read group-3/SPECIFICATION.md, USAGE-AND-CONNECTIONS.md and COMPONENTS.md. Store URL was subsequently supplied; products and real event verification remain pending. 3.2/3.3 are still pending review.

YouTube setup collapses after successful saved connection restore; sample/release inputs live in compact expandable panels. Drive retains its existing unconfigured-open behaviour. Existing saved connections, API scopes and independent selections are preserved. Controlled new controls/regressions/nesting and production build pass; fresh Android/desktop visual verification remains pending. Publication checkpoint is recorded below.


Latest sales/navigation slice privately deployed 11 October 2026: source d0a91d337d16c16733de6c65a63e017343966294, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_071a65d030c881918d42b983ece5b89b, deployment appgdep_6acb8f043abc81918597502c3bb138fc succeeded. Existing owner-only audience and environment revision 4 retained. Payhip sales are unconnected; live source and rendered device verification remain pending.

## Shared test-suite shell repair — 11 October

CJ's screenshot showed navigation styles absent; Sales background was reported white. Shared stylesheet is now embedded directly in each authenticated HTML response. All routes use dark navy, consistent compact panels and a clearly bordered/filled48px group selector. Authenticated generated-response checks, commerce/checklist/YouTube regressions and production build passed. Fresh Android/desktop rendering still needs checking; no supported browser QA. Deployed checkpoint is recorded below.


Latest shell repair deployed 11 October: source 80c2d93bef7ffdf7e194e49bc3fcb71b8bf0dc0f, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_9c92fcb62bc88191bd2f5927e017c95d, deployment appgdep_6acba29254948191b72b42612a0c1a6b succeeded; owner-only access and environment revision4 retained. Generated HTML checks verify shared CSS delivery; real phone rendering remains pending.

## Page-handler outage recovery — 11 October

The prior shell repair deployment produced500 on / and /checklist, confirmed by live worker logs and CJ report. Cause: CSS raw imports into route.ts triggered framework React wrapping of GET. Removed runtime CSS imports and unused /dashboard.css route; npm prebuild runs scripts/sync-dashboard-styles.mjs to embed the shared CSS into each HTML document. Existing style/navigation choices retained. Source-only handler checks did not cover this build transformation; verify-compiled-pages.mjs now exercises compiled checklist/commerce200/401 responses and rejects React wrapping on all three page handlers. Build passed and recovery deployed; fresh signed-in phone appearance remains pending. This supersedes the runtime-injection approach above.

Recovery deployment: source846ac66a1f70122df845b5e1e2c684ca32f7a477; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_86c4d7ce06b081918b886127cdd505d0; deployment appgdep_6acba4968e6481919d016bd942a81873 succeeded with environment revision4 and owner-only access retained.

## Payhip connection — 11 October 2026

CJ authorised API-key setup and requested the form at the top like the other pages. /commerce now places the compact Payhip connection & settings panel above the card. Private owner-authenticated settings save/reload in D1; monthly target is server-saved. Key input clears after success; no key/signature returned. Only encrypted SHA256(API key) verification value retained under separate PAYHIP_TOKEN_KEY, not the original key. Store link uses https://payhip.com/prodbycjbeatsssbeatstore supplied by CJ.

Dedicated Worker receiver appgprj_6acbbc2f41248191b75e25df0d4762c5 is PUBLIC following CJ’s explicit approval11 October; no dashboard/data read routes. Dashboard appgprj_6ac84c21e1fc819198906084958537b0 remains owner-private. Receiver forwarding uses dashboard-specific Sites service bearer + relay secret, fixed private origin, no caller identity forwarding. Dashboard resolves stored owner by opaque connection ID and validates encrypted static signature. Minimal paid/refunded events stored with semantic fingerprint/atomic dedup; no customer email/IP, no revenue calculations yet. See integration-tests/youtube/PAYHIP.md.

NEXT: receiver public access is approved and enabled; main PAYHIP_RECEIVER_ENABLED=true is deployed. CJ enters key in top panel, copies enabled webhook URL into Payhip Settings→Developer and enables paid/refunded. A real valid event establishes notification verification; saved key alone does not. Then map real licence product IDs and settle accounting before showing sales totals. No historical import or auto-product/exclusive removal is implemented. Existing Google runtime values/scopes/owner-private access preserved.

Controlled evidence: actual SQLite migration/persistence/owner isolation; bounded request and origin validation; cipher/no returned secrets; key replacement; relay/signature rejection; duplicate paid/refund retries; minimal event fields; UI key clearing/reload/target failures/setup position; receiver fixed forwarding/no private response leakage; Group1 project and Group2 state regressions; production build + compiled page200/401 regression. Real Payhip event and fresh rendered device QA pending. Receiver source4ea6b515991f486f2b0e6dc54aeac7ef5c9c21ec, private version appgprj_6acbbc2f41248191b75e25df0d4762c5~appgver_90ccd1fe65288191ae7065426832efc7, deployment appgdep_6acbbd7681e88191a86ab45d26ee7d2b succeeded, env revision1. Dashboard deployment checkpoint follows after publication.

Payhip settings dashboard deployment: source2dd8ca4a177c8a12d43652f39f995108585df58b, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f514ef64382481918d84daea61b476b8, deployment appgdep_6acbbe12f4e481918c31b01330d36424 succeeded at16:49:41UTC, runtime revision5. Shared Google revision4 values retained; new Payhip-only values added. Dashboard audience unchanged owner-private. Receiver public activation was subsequently approved and completed; see checkpoint below.

## Payhip receiver activation — 11 October

CJ explicitly approved receiver-only public access. Receiver is public; dashboard remains custom sole-owner (one viewer, no groups, zero external visitors). Existing dashboard version redeployed with env revision6/PAYHIP_RECEIVER_ENABLED=true, deployment appgdep_6acbc0fd56688191a9632fac04e93bc1 succeeded17:02UTC. Initial forwarding test reached receiver but503; production diagnostic identified Worker runtime rejecting redirect:error. Fixed to redirect:manual and reject redirects; credentials remain attached only to the fixed private endpoint. Controlled redirect test passes. Receiver deployment/live check checkpoint follows. No real Payhip event or revenue mapping verified yet.

Receiver fix deployment: source0b980f584ab995c9248fb17a1854b93ba80b4150, version appgprj_6acbbc2f41248191b75e25df0d4762c5~appgver_1a8378a2336c8191b3812f10eca5b3e8, deployment appgdep_6acbc24d7480819185920a0728d2e8eb succeeded17:07:38UTC. Live anonymous POST with an unknown connection now returns401 Not accepted rather than503 Unavailable; dashboard settings remain inaccessible anonymously (gateway401). Public ingress/rejection and private access boundary verified; real valid Payhip notification still pending. CJ can save key, copy URL and configure paid/refunded in Payhip now.

## First Payhip listing — 11 October,19:36UK

CJ reports a beat uploaded and provides https://payhip.com/b/agNXl for Gelato 41. No licence PDFs attached yet; prepare them before paid launch. Web reader could not inspect listing, so product content, variant names/prices/IDs and actual fulfilment remain unverified. CJ reports webhook configured. Public receiver works for rejection tests; no accepted real event observed as of the last notification check. Next: screenshot of variation setup to verify names/prices, then obtain actual event/product/variation identifiers and implement mapping/accounting. Do not infer IDs from link/price or call totals connected. Original short listing copy mentioned licence PDFs; actual attachment is still absent.
