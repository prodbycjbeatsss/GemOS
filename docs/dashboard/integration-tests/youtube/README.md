# YouTube manual import test

9 October 2026. CJ approved a browser-only OAuth test after comparing simpler alternatives. This is an isolated integration experiment, not the final dashboard, app stack or unattended capture service. Canonical Group 1/2 previews remain unchanged.

Private test: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site

## Google setup

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create or select your own project. Enable **YouTube Data API v3** and **YouTube Analytics API** in its API Library.
2. Configure Google Auth Platform branding with the name **GemOS YouTube test** and your own support/contact email. Keep the external app in **Testing** and add the Google account that owns your YouTube channel under Audience → Test users. Configure these read-only scopes under Data Access:
   - `https://www.googleapis.com/auth/yt-analytics.readonly`
   - `https://www.googleapis.com/auth/youtube.readonly`
3. Under Clients, create a **Web application** OAuth client. Add this exact **Authorised JavaScript origin**, with no trailing slash or path:

   `https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site`

4. Paste only the **public client ID** ending in `.apps.googleusercontent.com` into the test page. This implementation does not use a client secret, API key, redirect callback or refresh token. Do not paste secrets into the page or chat. Open the page directly in your browser rather than inside an iframe. Press Connect YouTube, choose the owning account/channel and grant both read permissions.
5. Select 1–5 existing Shorts, tick the Studio classification confirmation, choose a requested end date before today and a 7/28/90/365-day range (28 days by default), then press Sync. Open Analytics details for exact dates, video IDs, metrics and import time. Compare the **same selected videos and dates** in Studio Advanced Mode. Record differences before treating this as verified live integration.

CJ reports creating the Google project/client, granting the two read permissions, seeing Connected read-only, and importing one older Short with period data. A second, three-year-old video triggered the local validator. No Studio comparison or direct inspection of CJ’s raw API response has been completed by the agent. Google may show a testing warning; check the project/client is yours. Origin mismatch: check the exact origin and Web application client type. Access denied: check enabled APIs, test-user account, scopes and channel ownership. Account/Brand Account and phone popup behaviour must be checked with CJ. Do not widen scopes as a workaround.

## Data contract and deliberate limits

- The test reports **selected-period activity for a user-confirmed Shorts sample**, not all channel Shorts, lifetime counts or the leaderboard’s frozen 24-hour snapshots. Video ownership is checked with the Data API; the Data API does not establish Shorts classification here.
- Analytics queries filter on the same selected video IDs. A daily probe requests all five metrics together, sorted newest first with a one-row limit, to identify the latest observed returned day. The lookup spans at least 84 days, extended to the selected range for longer windows; server-side descending sorting avoids truncating newer rows in long reports. Current aggregate: that day and the preceding N−1 days for the selected 7/28/90/365-day range. Previous aggregate: the immediately preceding non-overlapping N days. Dates are YouTube reporting days (`America/Los_Angeles`), not UK calendar boundaries.
- Values: `views`, `averageViewPercentage`, `likes`, `subscribersGained`, `shares`. Percentage is Google’s aggregate response; daily percentages are never averaged. Subscribers gained are content-attributed, not account-wide net growth. Metric definitions and Shorts view counting still need the real Studio comparison.
- The latest daily row establishes an **observed day**, not proof that every preceding day is complete. Missing rows are not zero. An empty aggregate remains unavailable; unexpected aggregate metric values/absent columns become individually unavailable, with metric/period/type diagnostics in details; numeric strings are parsed strictly and counts must remain safe whole numbers. Null, blank, boolean and fractional count values are not silently coerced to zero. Signed whole-number Likes are preserved after Studio export evidence; negative values for other nonnegative metrics remain unavailable. Malformed report structure still stops the import. Comparison and targets stay hidden pending coverage validation. Previous values are visible in report details only.
- TikTok, Reels and All are disabled, clearly not connected. No example values are loaded by the application. The screenshot below is explicitly from controlled test fixtures.
- Import replaces results only after ownership and all queries succeed. Failed retries preserve the previous successful sample and report the failure; selection changes clear results. Requests cancelled by disconnect cannot overwrite state.
- After CJ requested refresh persistence, the public client ID and short-lived access token/expiry/selected channel are held in same-origin **sessionStorage for the current tab**. Valid saved tokens are checked by fetching owned channels after reload. Expired/revoked tokens are cleared. Reports remain in memory; no localStorage tokens, refresh tokens, application cookies, URL tokens, telemetry, backend proxy or token export. Browser storage is readable by same-origin JavaScript, so this is limited tab-session persistence, not a secure server session. Google itself retains the consent grant. Disconnect clears the page and requests revocation; closing a page discards report memory; browsers control tab-session storage lifetime and may restore it, but expiry is checked before use. Expiry requires interactive reconnection. This cannot run unattended scheduled captures.
- Private Sites deployment is for this test only. Final GemOS hosting/backend remain undecided. Hosted Google script loading, popup/CORS behaviour and real authentication remain unverified until setup. Do not claim that deployment success proves Google integration.

## Verification

`dist/index.html` and `dist/app.js` are the hosted source. `verify.cjs` uses Playwright with controlled Google responses; it contains only fake identifiers/token. Run `node verify.cjs` with Playwright and a browser installed; optionally set `GEMOS_CHROMIUM_PATH` to an existing Chromium executable. To run the page locally: `python -m http.server 8000 --directory dist`; authorise the local origin separately for real OAuth. Never open the HTML via `file://` for OAuth.

Passed in Chromium 153: empty/validation states, mocked consent and channel lookup, ownership rejection, mapping five metrics, sample filtering, adjacent 28-day windows and observed cutoff, hidden comparison/target, escaped external video titles, dialog Escape/focus return, widths 320/390/840/1280 with no page horizontal overflow, a controlled enlarged-text probe, 403 and empty-data preservation, 401 expiry, reconnect/disconnect, no browser storage and no script errors. WebMCP read-status tool registered and passed valid/invalid input checks with a simulated registry; native browser WebMCP is unverified. Syntax check passed. Mobile capture inspected before closing the blurred dialog; this Chromium build produced stale compositor layers in a later capture, so that later capture was not retained as evidence.

Not established: real OAuth/API response, Studio agreement, whole-channel Shorts enumeration, native Android/Back, complete accessibility/contrast audit, unattended scheduling or frozen snapshots.

![Controlled test sample, not real analytics](mock-mobile.png)

Primary references: [Google token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model), [client setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), [channel report combinations](https://developers.google.com/youtube/analytics/channel_reports), [report query/date availability](https://developers.google.com/youtube/analytics/reference/reports/query), [dimensions](https://developers.google.com/youtube/analytics/dimensions), [metrics](https://developers.google.com/youtube/analytics/metrics).

## Follow-up fix — 9 October 2026

The original aggregate validator aborted the entire import on any unexpected metric value, including supporting metrics from the previous period. CJ’s older-video report exposed this; its exact raw cause remains unknown. The update preserves valid values and identifies unavailable current/previous metrics in feedback and report details. Later Studio export evidence confirmed negative Likes values; the follow-up below supersedes rejecting signed Likes. Six views from the first import are period activity, not lifetime views. No video-age restriction was introduced.

Refresh restoration now reuses a still-valid tab-session token after an owned-channel API check; it does not open OAuth consent on reload. New/replacement tokens use a user-driven Connect action with default prompt rather than forcing repeated consent. A truly long-lived connection still requires a server-side refresh-token design; that remains undecided.

Additional controlled checks passed: nullable/negative supporting metrics, strictly numeric strings, fractional counts unavailable, valid-token reload without consent, clearing expired saved tokens, disconnected reload, retained public ID and no token in localStorage. User’s exact older-video response and live refresh behaviour need retry after deployment. The screenshot above is the original controlled fixture and predates updated connection text.

## Studio export evidence — 9 October 2026

CJ supplied API details and a Studio export confirming that period Likes can be negative. Private sample figures, titles and identifiers are omitted from this repository. The export and API periods differ, so exact-window agreement remains unverified. Preserve signed whole-number Likes with the note **Source-reported period value**; do not infer removals, corrections or net-likes semantics. Controlled regressions cover numeric/string signed Likes, partial missing metrics and fractional-count rejection.

## Included Shorts — 9 October 2026

CJ requested visible titles so the contributing videos are clear. An Included Shorts panel now sits immediately above the analytics card, showing the full imported title and video ID for each selected video after successful Sync. It identifies the videos in the currently displayed report, not a pending selection. Failed retries retain the last successful report/list; selection changes and disconnect clear both. Titles are rendered as text, so returned markup cannot become executable HTML. The canonical preview is unchanged.

Controlled browser checks passed for one and five videos, long titles at 320/390/840/1280px without page horizontal overflow, literal markup in titles, failed-import preservation, clearing after selection changes and refresh, plus existing import/auth regressions. No private user titles or figures were added to source or fixtures.


## Date-range selector — 9 October 2026

CJ confirmed 7, 28, 90 and 365 days with 28 as the default. The labelled native selector sits under the platform pills inside the recessed area; tiles move down with a 16px gap after the selector. Retain the existing outer minimum height/materials and accessibility reflow. This is implemented in the isolated importer; canonical previews remain unchanged.

Changing the range after a successful import clears the old report/list and automatically imports the new window. A failed changed-range request leaves no old figures under the new selection; retries with the same unchanged selection still retain successful results. Without a prior report, choose the range then Sync. Disable range changes during requests. Exact dates remain visible, `rangeDays` is included in details, and all five metrics share the same scope/window. Percentages still come directly from Google's aggregate, with no daily or per-video averaging. Range selection resets to 28 on refresh; authentication keeps its existing tab-session behaviour.

Verification: controlled browser tests cover all four adjacent windows, leap-day arithmetic, latest-day lookup over more than 200 daily rows, range-change imports, clearing on failure, placement below pills, a 44px-high selector and stable card height at 320/390/840/1280px. Existing metric, ownership, session and error checks also pass. Real 90/365-day reports and exact Studio agreement require user testing; latest observed day still does not establish complete coverage.
