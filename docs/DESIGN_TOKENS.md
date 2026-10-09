# Dashboard design tokens

Updated 9 October 2026. These values implement the accepted Group 2 design; they introduce no new palette. The private YouTube test defines them once in `ui/index.html`. Both cards consume the same tokens. Group 1 retains its own reviewed palette and geometry.

| Role / CSS token | Value |
|---|---|
| Surface / `--g2-surface` | 155° gradient: #4338ca 0%, #312e81 45%, #0f172a 100% |
| Card / `--g2-card-radius`, `--g2-card-inset`, `--g2-card-height` | 32px; 20px mobile / 24px ≥640px; 880px normal minimum |
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
| Asset grid | Two columns; 64px minimum row; 6px gap; 10px tile inset; 22px outline icon in 24px slot; 12px tile radius; wrapped category/status text; eight checks in four equal rows |

These implement CJ’s approved integration alignment; they do not recolour Group 2. The new group measurement reserves identical header/recess/footer geometry rather than independently expanding cards. Measured contract tests are separate from pending rendered acceptance.

Checklist semantic roles: --g1-asset-fill white .045; --g1-asset-border white .10; --g1-state-ready #a7f3d0; --g1-state-missing #fecdd3; --g1-state-attention #fde68a; --g1-state-unchecked #cbd5e1. Status has wording and a symbol, never colour alone.

File-type caption: 10px / 1.4, weight 400, muted #bae6fd beneath the 12px category name. Stems label ZIP; thumbnail PNG; video and Shorts MP4.
