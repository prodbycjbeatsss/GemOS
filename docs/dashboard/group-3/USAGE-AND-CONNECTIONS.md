# Group 3 — usage and connection status

Updated 11 October 2026. 3.1 answers how much beat-licence revenue the selected period generated and which licence tiers sold. Initial catalogue is beats only; kits/sample packs deferred until automation frees time.

CJ reports the Payhip store created and first test listing uploaded: https://payhip.com/b/agNXl (Gelato 41). Licence PDFs are not attached; CJ’s19:39 screenshot verifies Standard Lease£20/Premium Lease£40/Exclusive Rights£150 names/prices. Exclusive assigned-file delivery was user-reported; real Standard/Premium option capture and mapping persistence are verified by screenshot/user confirmation12 October. Per-tier fulfilment still needs separate verification. Store URL supplied: https://payhip.com/prodbycjbeatsssbeatstore; minimal links use it. Owner-private connection settings and prospective notification ingestion are implemented. First accepted provider notification verified11 October19:42UK through a £0 GBP coupon test order; payment processing and paid revenue remain unverified. The separate webhook receiver is now public with CJ’s explicit approval; dashboard access stays private.

Use the existing documented Standard £20 (untagged 24-bit WAV), Premium £40 (WAV + stems ZIP), Exclusive £150 (WAV + stems ZIP, removed from future sale). No separate paid MP3 tier. Preview is tagged streaming audio via an embedded media host, not a free download product. Streaming cannot prevent recording/ripping. Do not count previews as downloads, orders or email subscriptions.

Current source: verified prospective Payhip paid/refunded notifications, explicit licence mapping and reversible test exclusions. GBP amounts as reported, before fees/refunds with no tax adjustment; Europe/London periods. Headline reconciles to mapped licence tiers plus visible unallocated orders. Free checkouts never inflate paid counts. Refunds are separate; unclear partial/multiple refunds require attention. Historical imports, exclusive removal and fulfilment remain outside this slice. See [PAYHIP](../integration-tests/youtube/PAYHIP.md) for accounting and evidence boundaries.

Top setup saves encrypted verification credential, target and observed-option mappings to the authenticated owner. The first old test event retains no variation; a new coupon checkout is needed for actual identity capture. New recognised fields are retained without guessing names/IDs from prices. Store product9630730 is verified by the received test; all three received licence options have now been explicitly mapped and confirmed persistent by CJ12 October. All settings/mappings/exclusions survive refresh/devices. 3.2/3.3 remain pending review.

## 3.2 Email List — review in progress, 11 October

CJ selected Mailchimp, starting with its Free plan, for approximately one newsletter per month. On11 October at23:14UK CJ reported account creation complete. Account creation is user-reported; audience, sender verification, Payhip connection and GemOS API access remain unverified. Signup source and final card content remain undecided; no implementation authorised yet. Original reference reviewed from supplied original-card-mock-up.html (Library file libfile_f96e4b5f1e7081918b02acce4e512709, lines998–1100); the handoff's upload/ path is not present in this repository.

Remove the outdated Free Tagged MP3 / Drum Kit acquisition split as requested. Proposed content remains active subscribers (current snapshot, independent of period), period new confirmed sign-ups/unsubscribes and latest broadcast subject/status/date, with clicks only if supported. Welcome open rate and invented newsletter cycle should not carry forward by default. Existing shared green materials/typography/footer rules remain; geometry awaits content confirmation.

Mailchimp selection supersedes the earlier shortlist (MailerLite, Kit, EmailOctopus and Brevo). Mailchimp has a documented native Payhip integration. Verify chosen-plan API reporting access with a real account before promising GemOS fields. Next: confirm the existing Mailchimp audience/sender, connect Payhip and test consented signup. No sending authorised.


## Verification update — 12 October 2026, 02:39 UK

CJ completed post-update £0 Standard and Premium coupon checkouts. Screenshot shows the received Standard Lease option; CJ selected Standard and confirmed it survived refresh. Premium Lease appeared after page refresh; CJ mapped Premium and confirmed persistence. Together with Exclusive, all three real option captures and saved mappings are verified by user evidence. These free checkouts remain separate from paid counts/revenue; genuine payment/refund tests and contracts remain pending.

CJ reports Mailchimp key created, Payhip mailing-list connection saved and Gelato41 linked to the audience. Earlier Mailchimp screenshot shows one subscribed contact. Standard checkout likely lacked newsletter consent and is not a signup failure test. Premium checkout was completed after explicit opt-in instructions; actual consent and subscriber arrival still need confirmation. Next: check Mailchimp for the Premium test email around02:47UK. No emails sent; GemOS Mailchimp API connection/card implementation remains pending.


## Approved Email List 3.2 content — 12 October 2026

CJ confirmed: current Active subscribers headline; selected-month New sign-ups and Unsubscribes; latest newsletter subject, Draft/Scheduled/Sent status and date; single Refresh / View details footer. Detailed engagement belongs in View details. Remove free-MP3/drum-kit acquisition rows. Retain existing green Group3 material/shared typography/components; final geometry follows legitimate states. Current active total is independent of selected-month activity. Provider Mailchimp Free, monthly newsletter cadence.

Next: inspect actual selected-audience API responses securely before wiring figures; verify subscribed-only count, monthly activity coverage and campaign dates/status (never label a draft creation date as a scheduled send). Empty No newsletter yet differs from unavailable. Missing fields stay unavailable, not zero. Documentation establishes candidate endpoints, not account access. Payhip opt-in test still awaits subscriber confirmation. No email sending or campaign scheduling is authorised by dashboard implementation.


## Mailchimp signup verified — 12 October 2026, 02:41 UK

CJ confirmed the new Premium-checkout test email appears as subscribed in Mailchimp. This verifies the user-observed Payhip → linked Mailchimp audience signup flow for this test. Supersedes earlier pending arrival wording. It does not establish GemOS API access, campaign sending, unsubscribe synchronisation or every consent scenario. Approved3.2 content is recorded above; next implementation slice is private Mailchimp connection and read-only audience/campaign reporting within the existing design system. Keep API keys out of chat/source/docs; no sending authorised.
