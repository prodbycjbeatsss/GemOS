# Group 2 — visual and interaction specification

## 9 October 2026 — current integration checkpoint

The separate integration test now includes 2.1 finalised test interactions and 2.2 saved releases and qualifying snapshots. See [current test authority](../integration-tests/youtube/STATUS.md). 2.2 accepts 1–6 actual same-release Shorts, including a three-Short batch; shows actual titles, publication metadata, availability and full row details; leaves every row unranked until a qualifying snapshot exists. Uses the existing platform pills and purple/glass material, normal 575/583px recess and 360px list region. Canonical preview.html remains unchanged; saved qualifying capture/ranking is implemented in the test; automatic schedule, real first-window capture and rendered fit remain unverified.

Updated 9 October 2026. Latest reviewed reference: [preview.html](preview.html). Read [master design system](../../DESIGN_SYSTEM.md) and [USAGE-AND-CONNECTIONS.md](USAGE-AND-CONNECTIONS.md). Integration/metric choices are defined there; this document governs presentation. The split itself authorised no code changes. CJ subsequently approved the reference changes listed in [HANDOFF.md](../HANDOFF.md); these are now implemented.

## Group geometry and palette

- Centred group capped at 960px, 20px gap; one column below 840px, two equal columns from 840px.
- Equal fixed 880px card slots at normal viewing widths; these are current implementation values, not universal tokens for other groups.
- Insets 20px below 640px, 24px from 640px; 32px outer corners, 22px recess corners, 12px tile/chip corners. Shared 58px glyph and 12px gap to label.
- Headers reserve at least 174px to align recessed panel tops. Panels: 575px below 640px, 583px from 640px, with shared 12/16px inner padding. Preserve each card's content layout.
- Both cards use exactly the same purple: 155°, #4338ca 0%, #312e81 45%, #0f172a 100%. Retain the shared card/glyph/recess materials and indigo beam. The lighter numerical blue/purple match was rejected.
- Inter body and Poppins main answers. Current 24px mobile/30px desktop title scale retained.

## Platform chips, reused by both cards

- All / Shorts / TikTok / Reels fully visible on one row. All grid icon; other chips use coloured brand glyphs and full accessible platform names. Exactly one selection.
- Visible height 36px, corner 12px, invisible 4px hit extension above/below for 44px tap height. No hit-area overlap between neighbours.
- Selected fill #ffffff1a, fine lavender inset border, white text; inactive quiet glass fill/border. Icons remain centred in responsive 12/14/16px boxes.
- Horizontal padding: 4px below 360px; 7px at 360–389px; 9px at 390–639px; 12px above, reduced to 10px at 840–899px.
- Gaps: 3px below 360px; 5px at 360–389px; 6px at 390–399px; 8px from 400px. Selector uses 8px of the panel inset on either side without crossing its boundaries or changing outer card padding.
- Radio-group semantics; arrow keys, Home/End and visible focus. No enclosing selector bar, wrapping or horizontal swipe requirement at tested normal widths.

## 2.1 presentation

Main figure shows views once with unit and growth. Reporting period and data-through label sit below. Four centred tiles retain fixed rows: 136px below 360px, 112px at 360–639px, 104px from 640px. Reserve equal label/value/note slots; platform changes do not resize tiles or panel.

Target section reserves 128px. Show actual count, target and percentage; below-target/zero/missing neutral lavender, target met or positive growth restrained green, negative growth rose. Signed growth text remains. Hide comparison when missing. No speculative status or countdown.

Target bar uses 90°, #818cf8 → #38bdf8 → #34d399. Detail overlay contains periods, definitions and target editing; local/session persistence is preview behaviour, not a server record. Extra panel space remains empty. Partial-data reasons use the existing target note, with an accessible live-region announcement that does not expand the fixed header.

## 2.2 presentation

Implemented header: Shorts Views (24hrs), followed by Snapshot taken at 24h · up to 15 min later, then the selected batch dates with year (6–11 October 2026 for the first example). Supporting snapshot text is 11px/1.4, or 10px below 360px; the compact headline uses 22px below 360px to retain 174px headers and 880px slots.

Compact artist/track batch picker and chips stay outside the scrolling list. List viewport 360px: five fixed 72px row spaces, manual vertical scrolling and a subtle bottom fade only if content is below. No automatic scroll. Empty/shorter lists retain panel size.

Rows show rank, clip title, platform and captured-value slot. Preserve podium rings; no rank-change arrows. Unranked rows remain muted but readable beneath completed rows. Relative bars use the exact 2.1 gradient, leader full width, others divided by selected leader's captured views. No unranked bar.

Interactive rows open labelled clip details; never manufacture Watch clip URLs. Comparison definitions and data status belong in details. Frozen mock snapshots include capture time and age; only the inclusive provisional 24:00–24:15 window qualifies.

## Footer and overlays

One footer per card: icon-plus-text Sync and status left; white Analytics details → / Ranking details → right. No circular Sync background. Group 1 action weight 600 and 5px arrow gap reused. Old comparison label is removed; periods remain in details. Placeholder sync starts Not synced and reports Not connected when pressed.

Dialogs support keyboard entry, close, Escape, backdrop dismissal and focus return. Actual Android Back and font scaling remain unverified. Normal fixed geometry must not justify clipping content at enlarged text; browser review findings are recorded separately. Animation planning remains deferred.

## Current verification

See [9 October evidence and captures](../verification/2026-10-09.md): 64 Group 2 normal combinations plus 32 additional availability states; normal 880px slots and matching panel offsets retained. Native Android and live integrations remain unverified.

## Historical verification

The matched-panel checks covered 32 batch/platform states at 320, 390, 840 and 1280px: equal slots, aligned panels, one-row chips, 360px viewport/72px rows, pending order, manual scroll, keyboard selection, dialogs/focus return and honest Sync placeholders. No script errors. Mobile/desktop captures were inspected. This evidence applies to the current reference, not live integrations or full contrast compliance.

Earlier detailed review history is retained in [archived Group 2 document](../../../archives/dashboard/2026-10-08/pre-group-folders/GROUP-2.md). Current source authority is this spec, usage notes and master design document.



## Separate integration experiment

The [YouTube test](../integration-tests/youtube/README.md) reuses 2.1 materials in a standalone working page. Its setup panel, sample-only heading and flexible accessibility layout do not amend this canonical group geometry. Real OAuth and metrics remain to verify.


## Approved analytics range control — 9 October 2026

CJ confirmed 7/28/90/365-day ranges, 28 default, and placement directly below platform pills within the analytics recess. Move metric tiles down to accommodate it without enlarging the normal card. The isolated importer implements a labelled native select with a 44px minimum height, existing lavender materials and a 16px gap to tiles. Controlled mobile/desktop tests preserve card height; enlarged text retains reflow. Canonical preview is unchanged; this records the approved direction and the experiment's implementation separately.


### Range-control refinement and status — 9 October 2026

CJ rejected the native dropdown. The isolated test now uses compact 7d/28d/90d/365d pills under the platforms, 44px tap rows with 28px selected surfaces and 4px to the metric grid. Match normal 2.2 recess dimensions (575px below 640px, 583px above); permit reflow for overflowing accessible content. Keep metrics near the top; a small lower status area provides the requested progress/completion feedback, with remaining space left clear. Sync rotates only during actual requests and respects reduced motion. Browser verification is pending; state checks passed. Canonical HTML remains unchanged.

CJ raised reusable card text roles. Proposed: scope label → main result → timing/freshness. Main results can be numbers, readiness or rankings; do not impose identical sentences or replace useful date/snapshot lines. Suggested final scope wording varies with selection: All your short-form videos / All your Shorts on 2.1; Selected release on 2.2. These final labels/template are proposals. The current sample test uses Selected Shorts only.


### Metric-row alignment — 9 October 2026

User Android evidence showed independent tile content centring misaligns values when label/note line counts differ. In the isolated test, reserve equal label and note rows (34px minimum) with a shared 24px value slot. Use Average viewed visibly, retain Average percentage viewed for accessible naming and its definition in details. Allow text reflow rather than clipping under enlarged text. Source metric and canonical preview are unchanged. State/syntax checks passed; revised rendered alignment remains to verify.


### Range switching without full-card refresh — 9 October 2026

Approved and implemented in the isolated test: keep platform controls, title list and metric nodes in place. During uncached range loading retain old figures with their exact dates and an explicit Updating/old-range label; replace values together on success. Cached range selection shows Saved range with original timestamp; Sync requests fresh data. Failure preserves clearly identified old results. Memory cache is cleared by changed selection/auth/lifecycle. State checks passed; rendered verification remains pending. Canonical preview is unchanged.


## Finalised 2.1 test checkpoint

CJ finalised the current importer design on 9 October; [STATUS.md](../integration-tests/youtube/STATUS.md) is the consolidated authority for its agreed controls/materials/labels/geometry. Outstanding browser/integration checks remain explicit. Canonical mock HTML is unchanged. 2.2's selected-release metadata/availability test is authorised alongside it, accepting three actual Shorts rather than inventing six records.


### 9 October — current integration capture slice

The separate private test now has server-saved selections, immutable qualifying view snapshots and competition rankings, using the shared Google connection. Zero is valid and missed windows remain unavailable. Five-minute Google Cloud Scheduler setup is prepared but not connected. No relative bars or wider platform integrations were added. See [current test status](../integration-tests/youtube/STATUS.md) and [capture contract](../integration-tests/youtube/CAPTURE.md). Earlier infrastructure statements describe the reference-stage proposal.


### 9 October — accepted test completion checkpoint

CJ accepts 2.2 implementation complete, with real first-release capture/display unverified. The Google job and persisted scheduled classification are verified. In the private integration test, vertical leaderboard swipes chain to the page when rows fit or either end is reached; internal overflow scrolling and fixed dimensions remain. Android gesture verification is pending. No canonical reference HTML changes or historical reporting mode were added. STATUS.md holds the first-release checklist.


### 9 October — shared integration design contract

CJ authorised repairing inconsistencies between the two test cards. Shared Group 2 tokens now govern gradient/materials, matching 12/16px recess insets, 174px header minimum, 58px icons with 12px gap, and common 24/30px headings (22px below 360px). Both use the same header anatomy and sync-status treatment; Inter/Poppins loading is explicit. Metrics and leaderboard content remain distinct. See DESIGN_TOKENS.md, group-2/COMPONENTS.md and the current integration STATUS. Source/state checks and build are separate from pending rendered Android/desktop verification. Canonical previews are unchanged; real first-release capture remains unverified.
