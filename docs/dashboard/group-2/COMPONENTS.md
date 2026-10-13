# Group 2 component contracts

## Current grouping — 13 October 2026

CJ approved moving Email List from Group3 to Group2 and Subscription Costs from Group4 to Group3, with destination size/colour rules. Group2 is **Audience & Performance**:2.1 Short-form performance,2.2 24-hour Shorts ranking,2.3 Email List; all purple Large920px. Group3 is **Finance**:3.1 Payhip,3.2 YouTube earnings,3.3 YouTube payouts,3.4 Subscription Costs; all green Compact454px. Finance is a2×2 desktop grid with12px vertical/20px horizontal gaps. No new standalone group. Former Group5 cadence/automation becomes future Group4; it has no live page yet.

Email keeps its independent Mailchimp settings/reporting/member popup on /. Subscription costs keep manual saved histories/top-ups/logos/management on /commerce. API/storage/scopes unchanged. /costs is an authenticated303 redirect to /commerce. Historical IDs/colours below are superseded by this grouping; original mocks remain provenance.


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


## Group2 Large/footer update — 12 October2026

CJ authorised after accepting Group1 Large/even checklist rows. Group2 current normal card height920px replaces earlier880px geometry. Both cards retain174px shared headers,575/583px recess,360px leaderboard viewport and72px rows. Restore footer margin-top:auto to anchor controls at bottom;20px inner top padding and min64px footer reservation provide breathing room without moving the recess. Shared rule applies to both cards; metrics/range/platform/scopes/capture/sync behaviour unchanged. Earlier880px rendered checks are historical, not proof of current920 rendering.

YouTube state/cache/selection and dashboard-shell regressions plus production build/compiled200/401 checks pass. Refreshed phone/desktop, long status/enlarged text still need acceptance; no supported browser QA available. Group1 user accepted latest rows; Group3 accepted prior spacing. No new permission, scheduler or publication logic.
