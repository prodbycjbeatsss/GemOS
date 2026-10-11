# Group 3 — sales

Confirmed 11 October 2026. CJ approved refining the supplied original-card-mock-up.html Payhip card and adding it as a new section. This slice implements 3.1 only; original 3.2 Email List and 3.3 YouTube AdSense still need review.

## 3.1 Payhip sales

Retain the green identity and existing revenue → period → recessed licence breakdown structure. Shared material, typography, glyph, inset and footer rules match Groups 1/2. Standard, Premium and Exclusive replace the original misleading MP3/WAV tiers. See context/storefront.md for commercial definitions.

Header: 58px glyph, Payhip sales, revenue result, previous-period comparison when sourced, quiet monthly target. Period: Month/Year with 44px previous/next controls; no future periods. Recess: three licence rows with revenue and sold quantity when connected. Footer: successful sync freshness and View sales. Current connection is unavailable: headline and row revenues are dashes, quantities explicitly say Sales unavailable and footer Not synced; never fabricate zero or comparison.

The initial recess centres a store icon, Add your first beat and minimal Open Payhip link. The documented £20/£40/£150 values are labelled licence prices, not recorded sales. This setup state reflects CJ's report that the store is created and has no products. Product discovery is not implemented, so it cannot automatically notice newly added products yet.

View sales opens a labelled green native dialog showing selected period, unavailable connection and current licence reference. Individual orders/refunds are future sourced content, not example records. Monthly target dialog accepts a positive whole GBP value up to £1,000,000; saved privately to the authenticated account on the server with honest save failure. No default target or progress is invented. Target is monthly even when Year is selected.

## Geometry and access

Single card occupies one equal-column slot at desktop ≥840px within the 960px group width; mobile full width. No filler second card. Minimum 590px slot grows for wrapping/enlarged text. Recess fills remaining space, footer remains at bottom. Group 3 full three-card alignment is not yet approved.

Native dialog max480px, viewport minus32px, max85dvh; static heading focus, Escape dismissal, modal focus containment, focus return and sticky Close/Cancel. Status has explicit text. Source tests/build do not prove rendered contrast, font delivery, enlarged-text or Android Back behaviour.

## Shared navigation and setup

All pages use top navigation: 1 Release (/checklist), 2 Performance (/), 3 Sales (/commerce). Native links support browser Back, keyboard and direct URLs; aria-current marks a visibly filled and bordered segment. The header stacks on compact phones, with three equal-width 48px links. Existing route URLs and separate card selections are retained.

Compact expandable setup replaces the large Group 2 header area. YouTube setup starts open when disconnected and closes after a saved connection successfully restores. Sample and release inputs have separate expandable panels; Drive's existing stage setup retains its open-if-unconfigured logic. Connection fields/status/help remain reachable; no permission or backend behaviour changes.

## Shared shell delivery fix — 11 October

CJ supplied a screenshot with unstyled navigation and reported a white Sales page. The prebuild step embeds the same source ui/dashboard.css into each HTML document, instead of depending on a second stylesheet fetch. Dark navy canvas, text and colour-scheme are explicit on all pages. Selector uses48px bordered segments with distinct active fill/border, separated number badges and compact-width stacking. Setup/included panels share fill/border/radius. Test generated route responses, not only source presence; native rendered appearance remains pending.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.

## Private Payhip setup — 11 October

Above the card, the compact native details panel contains a labelled password API-key field, Save connection, saved/pending/verified status and minimal store link. Starts open without a saved key; restored saved settings collapse it. Successful manual save keeps feedback visible and clears the input. Webhook URL is read-only; Copy is enabled once a key is saved and the receiver is activated. Receiver activation was approved and completed11 October. No key/signature value is rendered. Monthly target now saves to the account, replacing the browser-only setting. Connection verification does not enable unmapped totals. See usage/PAYHIP for source boundaries.
