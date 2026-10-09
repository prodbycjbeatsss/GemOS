# Shared YouTube connection — server upgrade

9 October 2026. CJ authorised upgrading the existing connection so 2.1 and 2.2 share saved Google access. The original project, client and private Site URL are retained. No capture scheduler is connected by this change.

## Current state

The private test has been migrated from static HTML to the supported Sites Vinext Worker starter with D1. The accepted card HTML/CSS/JS is retained in `ui/`. A server flag enables saved access only after all runtime credentials are configured; until then the existing browser-token connection continues to work. The page labels the incomplete setup explicitly. Canonical design previews remain unchanged.

Routes: `/api/youtube/status`, `/start`, `/callback`, `/query`, `/disconnect` under the same prefix. The callback is not the platform-reserved `/callback`. Sites still handles access to this private page. No second Google connection is added for 2.2.

## Google setup — credentials configured; live approval pending

On the **existing Web application OAuth client**, add this exact authorised redirect URI:

`https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/api/youtube/callback`

The existing authorised JavaScript origin stays unchanged. Server runtime needs `GOOGLE_CLIENT_ID` and secret `GOOGLE_CLIENT_SECRET` for that same client. Configure these through native Sites runtime environment tools; never commit client credential JSON, secrets, real token data or private reports. `GOOGLE_REDIRECT_URI` and secret `YOUTUBE_TOKEN_KEY` are already configured via the supported runtime tools. The encryption key must be retained; replacing it invalidates decryptability of stored connections. No credentials are in this repository.

The client ID and client secret were configured through native Sites runtime tools on 9 October and applied by redeploying the existing version. CJ reports adding the callback URI. The uploaded credential contents were not placed in repository files. Connect YouTube now requests Google's offline read-only authorisation once. A successful callback saves access and refresh tokens, after checking both scopes and owned channels. Both cards then use the same server connection. Existing browser tokens cannot be converted into refresh tokens.

Google external **Testing** mode expires refresh tokens after seven days for these scopes. Production consent status requires a separate explicit change; do not promise permanent login or silently change the consent status. Revocation/expiry shows Connect again. See [Google's server flow](https://developers.google.com/identity/protocols/oauth2/web-server) and [refresh-token expiry](https://developers.google.com/identity/protocols/oauth2#expiration).

## Storage and request contract

`youtube_connections` is keyed by Sites user ID; it stores client ID, encrypted tokens, expiry, exact read scopes, owned channel summaries, update time and a connection revision. Tokens use AES-GCM with per-record random IV and associated user/client identity. The encryption key and client secret remain server-only runtime secrets. Browser responses never contain Google tokens. Automatic refresh updates only the existing matching revision, so disconnect/reconnect cannot be overwritten by an older refresh.

`youtube_oauth_states` contains short-lived state hashes and user ownership. A Secure, HttpOnly, SameSite=Lax host cookie binds the OAuth return to the initiating browser. Callback state is checked, expires after ten minutes and is consumed once. Same-origin POST checks protect start, report queries and disconnect. Every route requires the Sites-authenticated user header; no other user's connection is accessible.

The proxy allows only the three existing read endpoints with bounded parameter allowlists, fixed Analytics metrics and an owned channel. It does not accept arbitrary URLs or credentials. Google errors are mapped to safe messages. Status refreshes an expired access token before reporting connected. Disconnect removes saved connection/state first and attempts Google revocation; failed revocation is reported clearly. Reports, metrics and release selections remain unchanged; no snapshot counts are invented.

## Validation and known limits

Passed: production Worker build, synthetic SQLite/D1 OAuth/refresh/encryption tests (`node verify-backend.mjs`), and existing plus shared-backend DOM/request regressions (`node verify-state.cjs`). The server tests cover identity, state replay/ownership, cookie, ciphertext binding, proxy rejection, refresh, revoked access and disconnect versus in-flight refresh. Browser tests remain prepared but are not run in the managed environment without supported browser control.

Not yet verified: actual Google callback/credentials, actual hosted D1 connection writes and refresh, current phone/desktop rendering. These need completed Google setup and one live approval. Automatic 24-hour capture, scheduler, durable view snapshots/rankings and persistence of release links across devices remain later work. The database currently stores connection credentials and pending authorisation only.

Source: `ui/`, `server/youtube.mjs`, `app/`, `db/schema.ts` and immutable generated `drizzle/` migrations. The retained Sites build/plugin scripts provide deployment and identity integration. Install/build through the Sites workflow. For local D1 previews follow the supported starter instructions; do not create tables inside requests. Never regenerate or edit an applied migration.
