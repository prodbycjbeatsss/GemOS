# Storefront & Licensing Specifications

- **Storefront Engine:** Payhip
- **Payment Processing:** PayPal
- **Currency:** GBP (£)
- **Model:** Zero monthly SaaS fees; transaction-fee fulfillment.

## Commercial Conversion Mechanics
- **Direct Funnel:** Dedicated Payhip product link placed above the fold in YouTube/video descriptions.
- **Pinned Comment:** Custom call-to-action on every release driving artists to the storefront.
- **Automated Fulfillment:** Customer completes payment via PayPal and receives instant download access to audio files plus their license PDF.

## Licensing Tiers & Deliverables
- **Standard Lease — £20:**
  - Format: Untagged 24-bit WAV file.
  - License Terms: Non-exclusive commercial license, stream/broadcast limits apply, producer credit required.
- **Premium Lease — £40:**
  - Format: Untagged 24-bit WAV file + Stems (trackout audio stems ZIP).
  - License Terms: Non-exclusive commercial license, higher stream caps, stem mixing permission, producer credit required.
- **Exclusive Rights — £150:**
  - Format: Untagged 24-bit WAV file + Stems (trackout audio stems ZIP).
  - License Terms: Full exclusive ownership transfer (beat removed from public storefront; no future leases sold).

## Promotional Engine & Incentives
- **Multi-Buy Deals (Payhip Cross-Selling):** Automated cart incentives (e.g. Buy 2 Leases, Get 1 Free) to raise average order value.
- **Discount Codes:** Promotional coupon codes configured for returning artists, flash sales, and lead-magnet email sign-ups.

## Contract Templates & Storage
- Custom licensing agreements drafted based on standard BeatStars contract structures.
- Canonical contract Markdown/PDF templates stored in `references/contracts/` for automated delivery attach
ment.

## Current setup and preview policy — 11 October 2026

CJ reports Payhip store created and the first beat listing uploaded: [Gelato 41](https://payhip.com/b/agNXl). Displayed variation names/prices are verified by CJ’s screenshot; variation identifiers remain unverified; licence PDFs are not attached yet. Begin with beats only; sample/drum kits deferred until release automation frees time. Retain Standard/Premium/Exclusive tiers above, with no separate paid MP3 tier. Offer a tagged embedded streaming preview; no free downloadable MP3 product in this launch. Streaming does not prevent recording or ripping. Notification ingestion is verified; actual payment and automatic file/licence delivery remain unverified.

The first listing is a test setup, not confirmed licensed fulfilment. CJ has configured the webhook by report; the first accepted £0 GBP test notification is verified11 October19:42UK. Provider product ID9630730 was captured. Variation mapping, payment processing and licence delivery remain pending. Licence templates must be prepared before paid launch. The URL key agNXl identifies this listing link; do not treat it as a verified numeric product ID or variant ID.

CJ’s19:39 screenshot confirms three visible options: Standard Lease£20, Premium Lease£40, Exclusive Rights£150. The19:42 coupon test returned a download page by user report and an accepted provider notification in D1. The initial event omitted variation metadata; new storage retains recognised variation fields. Actual identifiers require repeat coupon checkout and explicit licence mapping. Prospective reporting and test exclusions are implemented; product ID alone cannot distinguish these three options.
