# Payhip connection — 11 October 2026

The /commerce setup panel is above the card, matching the other pages. Owner-authenticated GET/POST /api/payhip/settings persists settings in D1. Mutations require the page's exact Origin. Password input is cleared after save; no key or verification signature is returned. Targets are account-owned, whole GBP 1–1,000,000, server saved. Older browser-local targets are not silently imported; enter the desired target once in the new form.

## Secret and state contract

Payhip documents a static SHA256(API key) signature. GemOS retains only this verification value, encrypted with AES-GCM under the separate PAYHIP_TOKEN_KEY runtime secret, bound to the authenticated owner. The original API key is not retained. This enables webhook validation, not arbitrary Payhip API calls. A future API feature may need the key entered again. The signature itself is a credential, not a payload-specific HMAC; keep it secret. Payload validation and retry deduplication do not prove body integrity if that secret leaks.

No key → key saved / verification pending → verified notification received. Replacing a key resets verification. A saved key does not prove store access, product discovery, historical import or live sales reporting. The card remains explicitly unavailable until licence mapping and accounting are implemented. Store URL: https://payhip.com/prodbycjbeatsssbeatstore, supplied by CJ, not independently inspected.

## Receiver boundary

Separate Worker-only Site: appgprj_6acbbc2f41248191b75e25df0d4762c5, expected origin https://gemos-payhip-receiver.prodbycjbeatsss.chatgpt.site. CJ approved public receiver access on11 October; receiver is now public and PAYHIP_RECEIVER_ENABLED=true. Dashboard remains owner-private. Copy URL is enabled for saved connections; Payhip Developer webhook setup and real notification verification remain user steps.

POST /webhook/{connection_id} accepts bounded JSON, forwards only to the configured dashboard origin, adds its Sites service token and independent relay secret, follows no redirects, and never forwards caller identity headers. It exposes no dashboard, sales read endpoint or order data. Do not log payloads, signatures, credentials or full webhook URLs. Public traffic can trigger validation requests; traffic throttling/provider controls should be reviewed before public activation.

Private POST /api/payhip/ingest requires platform service access plus X-GemOS-Relay. X-GemOS-Connection resolves the stored owner; payload cannot choose an owner. Validate the stored encrypted signature, supported paid/refunded event, amounts, dates and item IDs. Atomic D1 batch stores a normalised event fingerprint with INSERT OR IGNORE and verification timestamp. Dedup is semantic over normalised fields, not raw JSON. Only transaction ID, currency, amounts in pennies, event dates and minimal product IDs/quantities are retained; no customer email/IP/payment secrets. Refund events are retained separately; no claimed revenue calculation yet. A conflicting or later refund requires reconciliation in the accounting slice. Unsupported currencies are retained without conversion; never add them to GBP totals.

Accepted persisted event returns200, failed validation/write/forwarding returns non200 so Payhip can retry. Payhip retries hourly for up to three hours. Subscribe only to paid/refunded in Settings → Developer. Historical sales are not backfilled.

## Runtime configuration (names only)

Dashboard: DB, PAYHIP_TOKEN_KEY (secret AES256 hex), PAYHIP_RELAY_SECRET (secret), PAYHIP_RECEIVER_URL (receiver origin), PAYHIP_RECEIVER_ENABLED (false until public activation).
Receiver: DASHBOARD_ORIGIN, DASHBOARD_SERVICE_TOKEN (secret, dashboard-specific OAI-Sites-Authorization bearer), PAYHIP_RELAY_SECRET (same shared secret).
Configure with native Sites environment tools; preserve Google values and owner-only dashboard access. Receiver uses Worker ESM starter and has no D1 binding.

## Next slice and evidence

Receiver is activated. CJ saves their key in Sales → Payhip connection & settings, copies the enabled URL to Payhip Developer settings and enables paid/refunded. Verify a real notification before marking connection verified. Then map real product/variation IDs to Standard/Premium/Exclusive, agree refund/fee/tax reporting and multi-item allocation. Do not infer licence tier from title/price. Official payload lacks per-item revenue in its example; avoid fabricated multi-item allocations.

Controlled verification: verify-payhip.mjs uses actual SQLite migration and D1 adapter for persistence, owner isolation, bounded bodies, CSRF, key replacement, signature/relay rejection and paid/refund retry dedup; verify-commerce.cjs covers saved settings, clear-key, reload, target failure and setup order; receiver verify-receiver.mjs covers fixed forwarding/auth, body bounds, protected response data and retry failures. Production build and verify-compiled-pages.mjs guard against prior CSS route wrapping. These are controlled tests, not a real Payhip event or rendered device proof.

Primary source: https://help.payhip.com/article/115-webhooks (checked11 October2026).

11 October activation: CJ approved public receiver access. Dashboard existing version redeployed with runtime revision6; sole-owner access retained. Live forwarding initially returned503 because the Worker runtime rejects redirect:error. Replaced it with redirect:manual, rejecting redirects without following or exposing the service credential; added controlled redirect rejection. Initial generic Python user-agent requests hit edge403/1010; Mozilla-agent HTTP checks reach the app. Real Payhip sender/event still needs verification.
