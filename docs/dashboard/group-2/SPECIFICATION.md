# Group 2 — visual and interaction specification

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
