# Group 4 — Subscription Costs

Implemented and privately deployed 13 October 2026. CJ approved manual logging, the existing Group 4 cobalt colour, and implementation. Route: /costs. Source d22a6aa9d099d9d2d8c8c989137f5439fb7ec32c. Controlled checks pass; user/device acceptance remains pending.

## Card contract

- Centred subscription glyph, Subscription Costs title, GBP monthly-equivalent total and “Breakdown of monthly subscription costs.” caption.
- Previous/next month arrows; All / AI / Music / Other category tabs. All qualifying subscriptions in a scrollable recess, not just three upcoming payments.
- Rows show name, uniform logo/initials container, monthly equivalent and next expected payment date. No fabricated sample subscriptions.
- Subscriptions / API top-ups switch sits left in the footer; Manage subscriptions → opens the popup on the right. Top-up view changes the headline/caption/list to selected-month purchases and hides subscription categories, preserving their selection for return.
- One Compact454px card at normal text sizes; desktop half-width in the960px two-column grid, mobile single column. Month/category controls stack on narrow phones; list retains internal scrolling. Enlarged-text exception allows growth rather than clipping.
- Original cobalt gradient155° #1e3a8a / #172554 at42% / #090d1a; #60a5fa beam .75/.18/transparent. Shared58px glyph/12px identity gap,32px card/22px recess,20/24px insets, Inter/Poppins and glass shadows. Shared group spacing12px vertically/20px horizontally.

## Saved subscriptions

Required name, AI/Music/Other category, GBP billing price, weekly/monthly/quarterly/yearly frequency, effective date, payment-date anchor and Active/Cancelled status. Optional plan, alternative plans/prices as notes, https website and notes. Type a custom name or use suggestions. No bank connection, provider billing/API credentials, trial/paused/auto-renew feature or purchase execution.

Effective-dated versions preserve history. Ordinary Edit defaults a new change to today (or a future saved effective date); Edit this saved change explicitly corrects that existing version. The same effective date replaces that version, and different dates retain prior versions. Cancellation stops active intervals from its effective date.

Any active overlap with a selected month contributes a full monthly equivalent. No daily proration. Use the latest active price version overlapping that month once. Cancelled-only months contribute nothing; a partly active cancellation month retains its full cost. Monthly=purchase price; quarterly=price/3; yearly=price/12; weekly=price×52/12 (a budgeting convention). Round each row to pence and sum those rows, so displayed totals reconcile.

Current-month payment dates use today in Europe/London; past/future months use the first day of the selected month. Use the then-effective schedule and its next expected date, even outside the month. Do not show a renewal if a cancellation is effective before that occurrence. A cancelled entry with no further payment says No further payment. These dates are schedules, not confirmed paid transactions.

Month/year recurrence keeps the original date anchor:31st clamps to month-end, then returns to31st; yearly29 February uses28 February in non-leap years then returns in leap years. Weekly repeats every7days; quarterly every3months. Records/date controls support2000–2099.

Archive hides a mistaken record from all reports but preserves it for Restore; use dated cancellation to end a real subscription while retaining history. Archive requires a second in-popup click. No permanent deletion in this slice.

## API top-ups

Purchases only: provider, date and GBP amount; optional credits, project (such as GemOS) and notes. Management lists all entries; the card totals/lists the selected month. Edit/archive/restore supported. Never add top-up purchases to monthly subscription totals or count later credit consumption again. No remaining-balance/manual-usage tracking, automatic model selection, recommendations, wishlist or offer notification in v1.

## Logos

Bundled monochrome Simple Icons assets:OpenAI (ChatGPT),Google Gemini,Anthropic (Claude),ElevenLabs,SoundCloud,Spotify,Bandcamp. Same30px container/20px icon with initials fallback for names without a bundled asset or failed loading. No runtime logo fetch. Splice/Tracklib and other unbundled names currently use initials; do not substitute invented brand marks. Source/provenance:Simple Icons repository (CC0 icon package; brand trademarks remain their owners'). OpenAI/SoundCloud/Spotify/Bandcamp from14.0.0; other assets from develop as fetched13 October2026.

## State and access

Authenticated owner-scoped D1 subscription_costs stores validated JSON and revision. GET/POST /api/costs; same-origin JSON writes, bounded records/body/text/prices, https-only stored website and literal text rendering. Compare-and-swap revision rejects stale-tab overwrites with409; reload recovery is explicit. Schema initialises with CREATE TABLE IF NOT EXISTS; equivalent migration0006 included. No new runtime secret or banking data. Public script/logo assets contain no records.

See [usage](USAGE-AND-CONNECTIONS.md), [components](COMPONENTS.md) and [HANDOFF](../HANDOFF.md).
