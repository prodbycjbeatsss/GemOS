# Group 3 components

11 October 2026. Current implementation: integration-tests/youtube/ui/commerce.html and commerce.js; shared shell: ui/dashboard.css.

Payhip card: green spotlight shell, centred glyph/identity, quiet target control, period pager, recessed tier list, single footer. Unconnected state uses dashes/explicit unavailable wording and a centred setup prompt. Loaded/comparison/error/refund states depend on the future source integration; do not present them as completed.

Period pager: real buttons with dynamic Month/Year labels, 44px targets, future-next disabled. Target: private server-saved account setting, form validation, save/failure feedback. View sales: native dialog, static heading focus and focus return; filename/file-link patterns are unrelated to this order popup.

Group picker: shared semantic shell tokens, native route anchors, one aria-current selection, compact stacking. Setup panels: native details/summary; no manual ARIA accordion emulation. Fields retain labels and existing connection logic.

Validation: controlled commerce interactions, checklist/project UI and YouTube state regression checks, HTML section nesting and production build passed. Rendered phone/desktop review remains pending because supported browser capture is unavailable.

Shared shell styles are embedded in HTML at build time from one ui/dashboard.css source. This avoids the missing external styles shown in CJ's screenshot. verify-dashboard-shell.cjs checks full styles in all three successful authenticated responses, no external CSS dependency, unchanged unauthenticated401 and selected-nav semantics. Selector surfaces now have48px targets and explicit borders/active fill; all pages use dark navy.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.

Payhip connection panel sits above the card and shares compact shell details/summary, 14px fields/buttons, 12px help, 44px controls and explicit feedback. Password input clears after success; saved connection never reveals its credential. Webhook URL/status distinguish prepared from enabled. Connection and target errors retain the last successful state.
