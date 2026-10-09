# GemOs dashboard card design system

Updated 9 October 2026. Master reference for this dashboard-card review, consolidated from the reviewed Groups 1 and 2. This does not lock the rest of the app's navigation or themes. Approved 9 October fixes are recorded in the group specs and verification report.

Read this first, then the relevant group specification. Confirmed group-specific choices take precedence over general proposals. The audit is advisory. Unreviewed groups must be discussed before implementation.

## Shared rules

- Fixed card slots within a group at normal text sizes. Loading, empty, partial and populated states must not resize the group. Different groups may use different heights.
- Phone: one column. Reviewed desktop groups: two equal columns from 840px, centred within 960px, with a 20px gap. Do not stretch a pair across the entire desktop.
- Outer inset: 20px below 640px, 24px from 640px. Spotlight card corner: 32px. Recessed panel corner: 22px. Reviewed inner rows/tiles/chips: 12px where used.
- One footer with a consistent bottom edge. Supporting action/freshness left; detail route right. Do not invent extra controls or facts to fill space.
- Inter for body, controls, labels and dates; Poppins for the main figure/name. Reviewed main scale: 24px mobile, 30px from 640px. Keep smaller reviewed role sizes group-specific; proposals to increase them are not silently adopted.
- Match icon, heading, panel and footer alignment within a group. Share the 58px glyph and 12px glyph-to-label gap. Retain 16px header-to-panel spacing where applied. Group 2 reserves a 174px header area to align its matching panels; Group 1 does not require the same reservation.
- Reuse materials and components, not identical internal layouts. Group 1 contains a list and checklist; Group 2 contains metrics and a scrolling leaderboard.
- Preserve readable content and controls under enlarged text with reflow/full-view exceptions rather than clipping a fixed slot.

## Material reference

Use the complete reviewed HTML rules as the visual reference; do not approximate the shine independently for each card.

| Component | Reviewed treatment |
|---|---|
| Card | Fine white border at 0.16 opacity; outer shadows 0 24px 48px -12px black 0.45 and 0 8px 20px -4px black 0.25; inset highlights 0 1.5px 1px white 0.35 and 0 -2px 4px black 0.25. |
| Glyph | 58px square, 18px corners; 135° white gradient 0.45 → 0.12; blur 18px; white border 0.65; outer and inset shadows from the reference. |
| Recess | Black fill 0.28; blur 16px; white border 0.12; inset 0 2.5px 6px black 0.45, lower highlight 0 1px 0 white 0.12. |
| Beam | Same centred shape: top -36px, 290 × 190px, blur 18px; stops 0/44/75%. Group 1 uses its reviewed state treatment; Group 2 uses indigo #818cf8 at 0.85/0.22/transparent. |

## Reviewed palette

| Surface/use | Values and scope |
|---|---|
| Group 1 healthy blue | #0284c7 / #0369a1 / #0f172a. |
| Group 1 attention amber | #d97706 / #b45309 / #1c1917. |
| Group 1 blocked rose | #e11d48 / #9f1239 / #0f172a. |
| Group 2 purple | 155°, #4338ca at 0%, #312e81 at 45%, #0f172a at 100%; identical on 2.1 and 2.2. |
| Group 2 fill bars | 90°, #818cf8 → #38bdf8 → #34d399. |

CJ rejected a lighter numerical purple match. Consistency comes from material, spacing and components; blue and purple are not required to have identical numerical lightness/chroma. Do not change the accepted gradients to enforce such a rule.

Status must be expressed in text. Group 1 uses restrained green for confirmed ready/scheduled items and neutral for in-progress items. Group 2 uses neutral lavender below target/zero/missing, green for positive growth or target met, and rose for negative growth. No unsupported On track prediction. Missing is not zero. Group 1 readiness is not publication or scheduling.

## Reusable interactions

- Sync: small icon plus label, no circular button background; visible result and freshness. Placeholder controls must not pretend an import succeeded. Dashboard Sync all is planned; no group-level Sync.
- Details: right footer action with arrow. Both Group 2 actions are white. Group 1 retains its reviewed treatment rather than being restyled by this consolidation.
- Group 2 platform selector: All / Shorts / TikTok / Reels, one row and one selection. Brand icons retained. Visible height 36px, radius 12px, extended 44px tap height, #ffffff1a selected fill. Responsive padding/gaps and keyboard rules are defined in dashboard/group-2/SPECIFICATION.md.
- Informational asset rows do not act as buttons. Interactive clip rows are real controls.
- Overlays: labelled, scrollable within the viewport, with close control, keyboard focus, Escape dismissal and focus return. Android Back requires native verification.

## Reviewed geometry

| Group | Normal card slot | Recess behaviour |
|---|---|---|
| 1 | 512px at widths ≥360px; 532px at 320–359px | Up to three projects versus all seven checklist parts; panel heights may differ. |
| 2 | Equal 880px slots, verified normal reference geometry | Matching panel heights: 575px below 640px, 583px from 640px; five 72px leaderboard row spaces within a 360px scroll viewport. |

For a new group, first settle its useful dashboard content, measure its tallest legitimate state, then agree the group height. Do not force it into either existing slot.

## Verification and unresolved items

Check relevant mobile/desktop widths, long text, platform/state changes, clipping, overlap, focus and footer alignment. Aim for 44px touch targets; visual chips can be smaller with correctly separated hit areas. Contrast acceptance targets remain 4.5:1 normal text, 3:1 large text and meaningful boundaries/focus. Full measured contrast and actual Android scaling/Back verification remain outstanding; this document does not claim compliance has been proved.

[9 October browser verification](dashboard/verification/2026-10-09.md) covers approved changes and explicit limits.

Animation planning is deferred until a working app. Existing reference CSS may contain transitions; those are not a newly approved native motion specification.

## Group 2 integration enforcement — 9 October

The private test now consumes shared semantic tokens for both cards' gradient, glass materials, header/icon geometry, responsive insets and typography. See [tokens](DESIGN_TOKENS.md) and [component contracts](dashboard/group-2/COMPONENTS.md). The shared heading exception below 360px is 22px on both cards. Inter/Poppins font delivery is explicit; system fonts are fallback only. The canonical visual references are unchanged. Source verification is distinct from rendered acceptance; current phone/desktop appearance remains to be checked.

## Supporting documents

- [Card index](dashboard/README.md)
- [Group 1 usage and connections](dashboard/group-1/USAGE-AND-CONNECTIONS.md)
- [Group 2 specification](dashboard/group-2/SPECIFICATION.md)
- [Review plan](dashboard/PLAN.md)
- [Original Group 1 specification](../references/dashboard/source/group-1-spec-2026-10-05.md): provenance; superseded where current specifications record later decisions. Its proposals remain proposals.

