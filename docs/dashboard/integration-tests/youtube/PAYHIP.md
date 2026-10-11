# Payhip connection and received sales — 11 October 2026

## Current evidence

Public receiver is active with CJ's explicit approval; dashboard remains sole-owner private. First provider notification was accepted and persisted on11 October19:42UK: a £0 GBP coupon checkout for Gelato41/product9630730. This proves notification delivery, not payment processing, assigned-file delivery or licence PDFs. The old event discarded variation fields and cannot be retrospectively allocated. CJ's screenshot verifies Standard£20/Premium£40/Exclusive£150 displayed choices. Repeat coupon checkouts after this update to inspect actual provider variation identity; no ID is guessed.

## Owner APIs and persistence

GET/POST /api/payhip/settings saves encrypted verification credential and whole GBP monthly target1–1,000,000. GET /api/payhip/report?year=YYYY&month=M returns the selected month; omit month for a year. POST /api/payhip/mapping accepts observed optionKey and tier standard/premium/exclusive or null to remove. POST /api/payhip/exclude accepts a received transactionId and excluded boolean. All reads use the platform authenticated owner; mutations require exact page Origin, bounded JSON and validated fields. Mapping/test exclusions persist across refresh/devices and never alter Payhip. Drizzle migration0003 adds account-owned mapping and exclusion tables; no request-time schema writes. Existing migration0002 remains unchanged.

Password input clears after save. No key/signature is returned. Only static SHA256(API key) verification credential is retained, AES-GCM encrypted under PAYHIP_TOKEN_KEY and bound to owner. Original API key is not stored. This validates notifications, not arbitrary Payhip API calls. Signature is a credential, not a body-specific HMAC: leaked signature would undermine provenance despite validation/deduplication. Replacing key resets verification and preserves orders/target/mappings.

## Receiver boundary

Receiver appgprj_6acbbc2f41248191b75e25df0d4762c5 at https://gemos-payhip-receiver.prodbycjbeatsss.chatgpt.site exposes only bounded POST /webhook/{connection_id}. It forwards to a fixed private dashboard endpoint with a dashboard-specific Sites service token and independent relay secret; redirect:manual rejects3xx. No caller identity forwarding, data-read endpoint or dashboard. Never log credentials, payloads, signatures or full webhook URLs.

Private POST /api/payhip/ingest requires service access plus relay secret. Connection resolves stored owner; payload cannot select owner. Validate signature, paid/refunded type, integer pennies/dates and product IDs/quantities. Atomic D1 batch stores semantic fingerprint with INSERT OR IGNORE and verified timestamp. Stored item whitelist now includes has_variant, variant_id, variant_name and product_name when valid. Variant ID is preferred; exact variant name is fallback. Product-only mapping is allowed only when provider explicitly sends has_variant:false. Missing/old variation identity cannot be mapped; no inference from title/price. Names are displayed as text, never HTML. No customer email/IP, payment details, licence key or raw payload is retained. Actual variation field presence is still awaiting a new provider test.

Accepted persisted events return200; failed forwarding/validation/write returns non200 for Payhip retries (hourly, up to3hours). Subscribe paid/refunded in Settings→Developer. No historical backfill or product catalogue discovery.

## Reporting contract

Prospective received notifications only, GBP integer pennies, Europe/London month/year boundaries. Headline is received positive GBP order amount before fees and refunds, with no tax adjustment. This is not net profit or a complete historical store balance. Zero-cost checkouts are shown separately and never count as paid sales; explicitly excluded test orders and related refunds are omitted. No automatic inference that every free order is a test.

Headline equals mapped tier revenue plus visible unallocated GBP amount. Only a one-item order with a uniquely observed/mapped licence option allocates its order-level amount and quantity to a tier. Multi-item carts and unknown licence options stay unallocated; foreign currency and conflicting paid receipts need attention and are omitted from GBP totals. Duplicate paid financial receipts count once; contradictory financial/option identity is never silently allocated. No currency conversion or guessed per-item price.

Refunds are shown separately by refund-event period, without changing original-period gross revenue or sold count. A single GBP refund matching a received paid transaction's price/currency can contribute its reported amount. Orphans, mismatches and multiple distinct refund notifications need attention; incremental versus cumulative partial-refund semantics are not assumed. No automatic exclusive-product removal. More than10,000 owner event rows returns unavailable with a paging message rather than truncated totals; a scalable paged ledger is future work.

## Interface and verification

Top compact setup includes observed licence-option dropdowns and saved-state feedback. Card preserves green material and three tier rows. Loading/failure clears period totals; generation guard ignores responses for an earlier period. View sales shows coverage, amounts, unallocated orders, free checkouts, test exclusions and refunds, with a reversible Exclude test order control. Missing data is not zero; a verified feed with no received positive orders may truthfully show zero for received sales.

Controlled actual SQLite tests cover persistence/owner isolation, bounded JSON/Origin, cipher/no secrets, key replacement, signature/relay rejection, retries, observed-only mappings, test exclusion, currency/conflict/cart/refund cases and UK DST boundary. UI tests cover mapping/exclusion, pence display, period race/failure, key clearing/reload, target failure and focus return. Production build plus compiled page200/401 regression, shared shell and Group1/2 regressions pass. Fresh rendered Android/desktop review, actual variation capture, paid transaction and live refund remain unverified.

Dashboard environment names: DB, PAYHIP_TOKEN_KEY, PAYHIP_RELAY_SECRET, PAYHIP_RECEIVER_URL, PAYHIP_RECEIVER_ENABLED=true. Receiver: DASHBOARD_ORIGIN, DASHBOARD_SERVICE_TOKEN, PAYHIP_RELAY_SECRET. Preserve Google runtime values and private dashboard audience.

Primary references checked11 October2026: https://help.payhip.com/article/115-webhooks ; https://help.payhip.com/article/314-connect-to-printful-using-pabbly-connect ; https://payhip.com/api-reference . Webhook examples document order amounts and has_variant but not a complete variant payload. Repeat checkout is the evidence gate.
