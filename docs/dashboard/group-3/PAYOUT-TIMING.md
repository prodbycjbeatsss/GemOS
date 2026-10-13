# YouTube payouts: timing, earnings period and history

Current as of 13 October 2026. This supersedes earlier wording prohibiting all estimated payout timing.

The Compact payout card shows the current unpaid balance, estimated payout, earnings-period availability and last reported payment. View payments explains the estimate and monthly earnings cycle, shows the three latest payments and retains the full ten-per-page payment history.

For an explicitly recognised GBP balance below Google's standard £60 minimum, the estimate says Waiting for £60. At or above that minimum, it shows a conditional 21–26 monthly issue window, advancing to the next month after the 26th. This is guidance, not a scheduled payment: the actual account threshold must be reached by the 20th and holds cleared by then. A higher custom threshold may apply. Missing or ambiguous currency leaves the estimate unavailable. Original monetary strings remain unchanged.

AdSense does not supply the earnings period of the accumulated unpaid balance. The card labels that field Not supplied by AdSense. Details explain the usual prior-calendar-month earnings cycle and early-month finalisation, explicitly as calendar guidance. Rolled-over earnings cannot be assigned to one month or a paid transaction. All calendar calculations use Google's Pacific billing timezone.

Past payment amounts and credited dates are shown exactly as reported. These dates do not establish bank arrival. No payments reported only describes the available records. No Studio estimated revenue is added to the unpaid balance.

The existing 454px Compact geometry, material, header/footer tracks and read-only access are retained. Controlled payout handler/UI, GBP parsing, threshold, missing/zero, calendar boundary, stale response, account ownership, OAuth, safe error, history pagination and dialog-focus tests pass. Commerce/earnings/backdrop regressions, production build and compiled private-route checks pass. Rendered phone/desktop/enlarged-text fit and populated live paid history remain unverified.

Sources checked 13 October 2026:

- https://support.google.com/youtube/answer/14728151?hl=en-GB
- https://support.google.com/adsense/answer/1709871?ctx=as2&hl=en
- https://developers.google.com/adsense/management/reference/rest/v2/accounts.payments

Next: refresh Sales, Sync payouts, inspect the overview and View payments on phone. Existing Payhip paid/refund checks and broader dashboard spacing remain separate work.
