# GemOs analytics feasibility review

6 October 2026 · Documentation review · No live accounts connected

## What this review establishes

Most card concepts are feasible, but several example figures depend on permissions, account types, our own records or metrics that are not confirmed as available. This covers all 11 cards in the original index.html, plus the agreed changes to Group 2. It does not approve replacements or alter the displayed example figures.

**Available** means a documented source exists, not that a working GemOs integration has been tested. **Conditional** means account access, endpoint behaviour or the required time window must be checked. **Unverified** means the reviewed documentation did not establish a dependable source; it does not mean the metric can never be obtained.

## All groups

| Card | What we can obtain or calculate | What needs correction, verification or our own input |
|---|---|---|
| **1.1 Release Buffer** | GemOs can count fully prepared and scheduled releases against the agreed weekly cadence. YouTube exposes publication/scheduling status; other platforms require their own integrations or a scheduler’s records. | Requires an asset manifest and verified schedules across the required platforms. A scheduled release is not proof it published. The original “98% trend match” has no defined measurement or verified source; remove or define separately before live use. |
| **1.2 Asset checklist** | Drive can list files and metadata. GemOs can match required WAV, MP3, stems, artwork, main video and six Shorts to a release manifest. | File presence cannot establish final audio quality, correct edit or approval. Use explicit required assets and approval flags. Follow the corrected Group 1 checklist rather than the original misleading 5/5 count. |
| **2.1 Short-form performance** | Views and several engagement metrics have documented sources; detailed findings below. Targets and target progress are GemOs calculations. | Selected-period activity, weighted averages and follower attribution need validation. Original Profile clicks → Payhip CTR and combined audience growth were not supported by a defined tracking source. |
| **2.2 Shorts Views (24hrs)** | APIs can supply post IDs, publication times and view counts. GemOs can filter batches, rank captured results and calculate relative bars. | An exact first-24-hour total is not established across all three platforms. Later lifetime counts must not be presented as first-24-hour counts. Original algorithm explanations and shop-visit attribution were unsupported. |
| **3.1 Payhip revenue** | Paid/refund webhooks can feed an order ledger, including products, quantities and monetary values. GemOs can map product IDs to licence tiers and calculate totals/targets. | Set up historical reconciliation separately; webhooks alone do not establish a full historical backfill. Define gross/net, fees, refunds, tax and currency. The original £120 headline does not reconcile with £40 + £40 + £0 tier totals. |
| **3.2 Email list** | A provider such as Brevo exposes contacts, lists and campaign status/statistics. GemOs can count subscribers and changes from stored history. | Provider is not settled. Free-download versus kit source counts require source attributes captured at signup; do not infer them afterwards. Verify the welcome automation’s specific reporting endpoint. Reported opens are not proof someone read the message. |
| **3.3 YouTube ad revenue** | Authorised channel revenue reports can supply estimated ad revenue. Video classifications stored by GemOs can separate long videos and Shorts. AdSense has payment records, including YouTube-related payments. | Channel eligibility and revenue permissions are required. Estimates differ from final payments; remix monetisation cannot be assumed. Define RPM and its denominator before computing it. The original fixed payout window must not be a guaranteed countdown. |
| **4.1 AI spend** | Some providers expose API costs or subscription/usage data. Provider-specific findings below. | Consumer subscriptions and API billing are separate. Top-ups, credits consumed and actual monetary cost are different quantities. Masked keys or saved credentials are not proof an integration is active. |
| **4.2 Studio subscriptions** | GemOs can total entered recurring contracts and record invoice imports/renewals. | No general personal-billing API was established for Splice, SoundCloud, DistroKid or vidIQ in this review. Start with entered plans/invoices; do not show invented live billing. Distinguish active, planned, free and cancelled subscriptions; do not add annual and monthly amounts directly. |
| **5.1 Publishing cadence** | GemOs can build the week matrix and streak from verified publication records. | Count actual publications, not prepared files or scheduled jobs. Define planned breaks, failed posts, timezone and the required weekly set before calculating a streak. |
| **5.2 Automation performance** | GemOs can record job start/end times, stage durations, errors and actual check results. | Requires instrumentation. Original example times and Pass labels are mock records. Total elapsed time need not equal the sum of stage times when jobs overlap. |

Sources for this table: [Drive file search](https://developers.google.com/workspace/drive/api/guides/search-files), [YouTube video resource](https://developers.google.com/youtube/v3/docs/videos), [Payhip webhooks](https://help.payhip.com/article/115-webhooks), [Payhip public API](https://help.payhip.com/article/347-public-api), [Brevo list data](https://developers.brevo.com/reference/get-list), [Brevo contact attributes](https://developers.brevo.com/reference/get-attributes), [Brevo campaign reporting](https://developers.brevo.com/reference/get-email-campaign), [AdSense payment records](https://developers.google.com/adsense/management/reference/rest/v2/accounts.payments/list), [Splice billing guidance](https://support.splice.com/en/articles/8652607-how-does-billing-and-renewal-work).

## Card 2.1: the agreed metrics

| Selection | Current metric | Feasibility and exact limitation |
|---|---|---|
| All | Views by platform | Sources exist. However, TikTok/Instagram post lifetime totals are not automatically views occurring during the last 28 days. Verify a suitable activity report or build history with an explicit definition. |
| All | Combined shares | Conditional on compatible selected-period share totals from every included platform. Missing sources must produce partial/unavailable coverage rather than zero. |
| Shorts | Average % viewed | Documented YouTube Analytics metric. Use the source’s aggregate for the selected scope; do not average video percentages equally. |
| Shorts | Stayed to watch | No corresponding metric established in the standard YouTube Analytics metric list reviewed. Engaged views and viewer percentage do not establish this percentage. Candidate: replace with a documented metric after CJ decides, or retain only with a verified import. |
| Shorts | Subscribers gained | Documented. A video-filtered report has a narrower attribution scope than all channel subscription events; label the scope accurately. |
| Shorts | Shares | Documented, subject to authorised report scope and reporting delay. |
| TikTok | Average watch time | Not provided by the basic Display API. The official TikTok for Business video-list example documents average_time_watched; conditional on access and report scope. |
| TikTok | Full-watch rate | The same business endpoint documents full_video_watched_rate. Verify the denominator and period before using it. |
| TikTok | Followers gained | Clip-attributed follower gains were not established by the reviewed video endpoint. Account growth is a different metric and must not silently replace this. |
| TikTok | Shares | Basic video objects include share counts. Business reports also list shares. A lifetime count alone does not satisfy selected-window activity. |
| Reels | Average watch time | The official Meta SDK lists ig_reels_avg_watch_time. Validate supported account, media type, permissions, API version and aggregation in a real query. |
| Reels | Shares | Meta insight fields include shares; same access/scope validation required. |
| Reels | Follows from Reels | The SDK includes a follows field, but that does not prove this specific per-Reel attribution and time window. Keep unverified until an actual supported query confirms it. |
| Reels | Saves | Meta insight fields include saved. Validate the Reel and reporting scope. |

Sources: [YouTube Analytics metrics](https://developers.google.com/youtube/analytics/metrics), [channel reports](https://developers.google.com/youtube/analytics/channel_reports), [TikTok basic video object](https://developers.tiktok.com/docs/en/tiktok-api-v2-video-object), [TikTok Display API setup](https://developers.tiktok.com/docs/en/display-api-get-started), [official TikTok for Business video-list example](https://www.postman.com/tiktok/tiktok-api-for-business/request/7u65xdl/business-video-list), [TikTok Accounts API overview](https://business-api.tiktok.com/portal/docs/accounts-api-overview/v1.3), [official Meta insight SDK fields](https://github.com/facebook/facebook-python-business-sdk/blob/main/facebook_business/adobjects/insightsresult.py).

### The date-window issue

“Views during the last 28 days” and “lifetime views of videos published in the last 28 days” are different reports. Metricool’s Instagram and some TikTok post statistics use the latter. Its TikTok business activity reporting has different coverage from personal-account reporting. Its Instagram account views also include other content surfaces, so those cannot simply stand in for Reels views.

The current card needs the former definition. Importing the latter would make the comparison misleading. We must verify the available account/report combination before deciding whether to preserve that definition, change the label or simplify the card.

YouTube daily reporting uses Pacific-time date boundaries. Combining native date-based totals from different platforms requires an explicit boundary convention; the All tab should not imply exact UK-midnight alignment unless the source data supports it. Views also have different platform definitions; their sum is not unique people reached.

Sources: [Metricool TikTok metrics](https://help.metricool.com/tiktok-metrics-fe7io), [Metricool Instagram metrics](https://help.metricool.com/instagram-metrics-ght51), [YouTube dimensions](https://developers.google.com/youtube/analytics/dimensions).

## Card 2.2: the first-24-hour issue

The original design assumed a dependable total covering publication through exactly 24 hours later. The latest approved product direction instead uses around-24-hour snapshots, as recorded below; the current HTML examples still use the earlier title. That is stronger than a view count fetched after a video turns 24 hours old.

YouTube states that detailed Analytics reports can lag by 48–72 hours. Its daily date-based reports do not by themselves establish an arbitrary upload-to-upload-plus-24-hours window. Data API counts can provide a more current cumulative count, but a snapshot still depends on when we captured it and how current the platform counter was.

A backend could schedule captures near each upload’s 24-hour point. That would produce an **observed count captured around 24 hours**, not a guaranteed exact first-24-hour report. Store publication time, capture time, source and completeness. Missed captures must not be backfilled with later lifetime totals under the existing label. The same requirement needs testing on TikTok and Instagram.

**Decision update — 8 October:** CJ approved a clearly labelled snapshot approach around 24 hours, with capture timestamps and missed captures unranked. Exact timing tolerance and display wording remain to agree; no integration has been tested. Keep the current examples for design review. The Monday review notification must wait for both the age threshold and usable imported results; Monday may arrive before delayed data is ready.

Source: [YouTube Analytics data model and latency](https://developers.google.com/youtube/analytics/data_model).

## Can one service handle this?

Metricool is a candidate worth testing, not a confirmed solution. Its API is available on Advanced and Custom plans, rather than Free or Starter. It offers analytics/scheduling access, but a service cannot remove upstream metric, history, attribution or date-window limits. Validate a sample response against each card’s definition before purchasing or building around it.

A direct integration could combine YouTube Analytics/Data APIs, TikTok’s approved APIs and Meta Insights. That requires separate account authorisation, app access and account eligibility. Android can display these results, while dependable scheduled capture/import jobs would normally belong in a backend rather than depend on the phone staying awake.

Source: [Metricool API access](https://help.metricool.com/basic-guide-for-api-integration-r97af).

## Card 4.1: provider-by-provider cost sources

| Provider | Documented route | What it does not establish |
|---|---|---|
| OpenAI | Organisation API cost reporting; ChatGPT billing is separate. | API costs do not include the consumer ChatGPT subscription. Verify permissions and account ownership. |
| Google/Gemini | Gemini API billing through its billing setup; Cloud Billing exports can support cost analysis. | Consumer Google AI/Gemini subscription billing is separate. Exports need setup and do not promise immediate costs. |
| Anthropic | Usage and Cost API for eligible organisations with admin access. | Not available for individual accounts; does not establish personal Claude subscription costs. |
| Higgsfield | Official terms distinguish consumer credits from prepaid API units. | No dependable read-cost-history endpoint established here. A purchased top-up is not the amount consumed. |
| ElevenLabs | Subscription endpoint includes plan, limits, usage and billing-related fields. | Credits/characters alone are not cash spent. Reconcile actual price, overage and invoices. |

All example prices remain mock amounts. Store currency and billing period; convert currencies using a recorded convention rather than treating dollars as pounds. Choose whether this card reports accrued costs, billed charges or purchases before adding figures together.

Sources: [OpenAI subscription/API billing separation](https://help.openai.com/en/articles/9039756-managing-billing-settings-on-the-chatgpt-web-and-api-platform), [OpenAI organisation costs](https://platform.openai.com/docs/api-reference/usage/costs), [Gemini API billing](https://ai.google.dev/gemini-api/docs/billing), [Cloud Billing export](https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery), [Anthropic Usage and Cost API](https://platform.claude.com/docs/en/manage-claude/usage-cost-api), [Higgsfield terms](https://open.higgsfield.ai/terms-of-service), [ElevenLabs subscription endpoint](https://elevenlabs.io/docs/api-reference/user/subscription/get).

## Recommended next decisions

1. Confirm the connected account types and eligible API/service access, starting with Group 2.
2. Settle the last-28-days activity definition and first-24-hour capture definition before choosing replacement metrics.
3. Review YouTube Stayed to watch and per-clip follower attribution. Keep four metrics per platform only if four useful, dependable metrics are available.
4. Test a small real data import and compare it with the platform dashboard before wiring Sync.
5. Keep manual/entered data clearly identified for asset approvals and subscription contracts. Keep calculated targets, cadence and automation timing grounded in GemOs records.

The current HTML Sync controls intentionally show Not connected. A future successful sync should show the last successful import and data-through time; requesting a refresh must not imply the underlying platform data is live.

## Direction update — 8 October 2026

Direct APIs first. TikTok Business and Instagram Creator/Business remain provisional until verified. Activepieces may be evaluated if it saves work, but neither it nor a custom scheduler is selected. Follow PLAN.md. The API findings above remain documentation evidence rather than tested account access.

## Confirmed metric update — 8 October 2026

CJ approved Likes as the replacement for YouTube Stayed to watch. The table above preserves the reviewed original choices; current choices are in group-2/USAGE-AND-CONNECTIONS.md. The standard YouTube metric is documented; the authorised account report and selected Shorts scope still require validation. Preview update is queued after the remaining decision review.

CJ also approved Comments as the replacement for TikTok Followers gained. TikTok’s video object documents comment_count; a lifetime count does not by itself meet the last-28-days activity definition. Current decisions supersede the original-choice table above.
