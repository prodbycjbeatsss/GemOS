# Group 4 — manual subscription costs

Confirmed with CJ, 13 October 2026. Status: design/data rules agreed; not implemented or deployed. This replaces the initial separate AI-spend/studio-subscriptions proposal with one card containing Subscriptions and API top-ups views. Existing Groups 1–3 remain unchanged.

## Card

- Subscription icon; title **Subscription Costs**; amount; caption **Breakdown of monthly subscription costs.**
- Selectable active month using previous/next arrows.
- Subscriptions / API top-ups switch, with separate meanings/totals. Never add purchases to monthly equivalent subscription costs.
- Subscription category tabs: All / AI / Music / Other. Headline totals the selected category for the active month.
- Recess lists all qualifying subscriptions, not just upcoming payments. Internal scrolling retains the shared Compact 454px slot.
- Subscription rows: bundled brand logo in uniform containers/sizing, name, GBP monthly equivalent and next payment date. Initials fallback for unrecognised custom names; no automatic website-icon fetching.
- Footer: **Manage subscriptions**, opening a popup with list and Add/Edit forms. Reuse shared modal dismissal/focus behaviour and Group 4's existing design direction if a reference exists; colour is not yet confirmed. Reuse 12px vertical/20px desktop column gaps and shared card materials/typography.

## Subscription records and calculations

- Names may be typed or selected from suggestions. Categories AI / Music / Other; GBP only.
- Billing frequencies: weekly, monthly, quarterly, yearly.
- Monthly equivalent costs, not actual charges due in the month. Example: £120 annually contributes £10/month; actual annual charge remains available in management.
- Show next payment date even outside selected month. Past months use the next date from that historical month's perspective rather than today's date.
- Preserve effective-dated price/cancellation history. Earlier months keep earlier values.
- A subscription active at any point in a month contributes its full monthly equivalent, without daily proration.
- Where price changes within a month, use the latest price effective in that month, once.
- Preserve recurring day anchors: dates on the 31st clamp to last valid day in shorter months and return to the 31st later. Annual 29 February clamps to 28 February in non-leap years and returns in leap years.
- Payment dates describe expected schedules, not confirmed bank charges. No bank connection or provider API is part of this manual slice.

Entry fields discussed: name, category, GBP price, frequency, start/effective date and next payment date. Optional plan name, alternative available plans/prices, website and notes are requested/discussed. Trial/paused/auto-renew status fields were suggested but their full behaviour has not been approved; do not silently add product rules for them.

## API credit top-ups

Purchases only: provider, purchase date, GBP amount, optional credits purchased and project (such as GemOS). Separate selected-month purchase total/list. No manually maintained remaining-balance feature in v1. Credits later consumed must not count the purchase cost twice. No model/provider for the future GemOS memory assistant has been selected.

## Deferred

Usage/token monitoring and evidence-based upgrade/downgrade recommendations. Subscription wishlist, target prices and verified offer notifications. No alerts or automations have been requested for creation now.

## Remaining clarification before dependent implementation

- Group 4 accent/material colour and precise placement of month/category/view controls.
- Exact historical payment-date reference point for past months (start/end/another selected day), and treatment of cancellation with no further renewal.
- Weekly-to-monthly conversion convention and how same-month cancellation/price histories interact.
- Management status/deletion/correction rules and whether alternate-plan details are structured rows or notes.

Only these unresolved behaviours require further choices; do not re-ask confirmed rules. Implementation and rendered QA remain pending. Use the canonical design system and repo instructions; keep additions bounded to Group 4.
