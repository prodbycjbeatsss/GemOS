# Group 4 — usage and saved records

Open Costs → Manage subscriptions → Add subscription. Enter the price actually billed in GBP, frequency, effective/start date and a known payment-date anchor. Optional plan, alternate plans/prices, website and notes are available. Save, refresh and check persistence. The card shows monthly equivalent costs; annual/quarterly prices are not displayed as monthly charges. Category/month controls operate on saved records.

Edit a subscription with a new effective date for price changes or cancellation. Earlier months retain their versions; Edit this saved change is for corrections. Archive/Restore is recoverable and removes/restores the entire entry from reports. Archive is not cancellation.

API top-ups → Manage subscriptions → Add API top-up records purchases only. GBP amount is what you paid, while optional credits can retain a provider currency/unit. No remaining balance or usage inference. View totals remain separate.

Sources are manual owner records only. No bank/API setup is required. Private server persistence uses the existing owner identity and DB, not browser-local storage. Simultaneous edits produce a reload message instead of silent overwriting. Expected payment dates are not payment receipts.

Verification:focused math/SQLite/private-access/validation/revision/actual-form tests and Groups1–3 regressions pass. Compiled route200/401 and production build pass. User refresh persistence and populated phone/desktop/enlarged-text/scroll/focus review remain pending. No browser capture was available. Future usage recommendations and wishlist/offer alerts are deferred.

Rules: [specification](SPECIFICATION.md).
