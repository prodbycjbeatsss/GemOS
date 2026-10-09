# Group 2 component contracts

Updated 9 October 2026. This records the shared anatomy used by the private integration test, not a new layout for other groups.

## Spotlight card

Both `.card.analytics` (2.1) and `.card.leaderboard` (2.2) use the same purple surface, beam, border, shadow, outer inset and minimum height. Decorative icons differ by purpose; their containers and 28px symbol slots match. The play and trophy shapes are not expected to occupy identical painted pixels.

Header order: **icon → scope label → main result/title → context → freshness/date**. Both use `.identity`, `.glyph`, `.label`, `.headline-line`, `.headline`, `.scope` and `.freshness`. Shared header spacing and font sizes come from the Group 2 tokens. 2.1 shows selected-period views and returned report dates; 2.2 shows the 24-hour view purpose, capture window and release dates. Keep the source scope truthful. A normal 174px minimum aligns recesses; enlarged text can reflow.

## Recess and platform selector

`.dock` uses one fill, border, blur, shadow, radius, responsive inset and normal height. All / Shorts / TikTok / Reels pills reuse the same `.platforms` styles and selected state. Preserve 36px visible / 44px touch height, real radio semantics, visible keyboard focus and truthful disabled states.

The contents deliberately differ: 2.1 has range pills and aligned metric tiles; 2.2 has the release name and scrolling rows. Keep the 360px list viewport and 72px normal rows. Vertical scroll chains to the page at either list edge; horizontal platform handling must not swallow vertical page movement.

## Status and footer

Both cards use `.sync-info` with 12px top inset, a heading and supporting paragraph. 2.1 additionally shows last import time. Both footers use `.sync-footer`, `.sync-control` and `.sync-status`, with the detail action at the right. Scope status rules to the named class, never broad `span:last-child` selectors. Sync icons rotate during requests, respect reduced motion, and accompany text describing progress, success or failure.

## State and verification contract

Loading must preserve correctly labelled previous values until replacement. Unavailable data must not become zero; missing snapshots must not become fabricated rankings. Empty, partial, error, cached and successful states retain the shared shell. Text enlargement/overflow can trigger recess reflow after updates, resize and font loading.

Before accepting a visual change, compare both cards at 320, 390, 640, 840 and 1280px; check normal and enlarged text, long titles/statuses, padding, header positions, footer alignment, page/list swipes and focus. `verify.cjs` contains paired rendered-style/geometry assertions, but these were not run in the current environment. Source/state checks and a production build do not prove rendered appearance or contrast compliance.
