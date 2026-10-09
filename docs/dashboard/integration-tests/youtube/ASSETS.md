# Group 1 asset checklist test

## Group 1 read-only checklist slice — 9 October 2026

Implemented and privately deployed at https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/checklist. Group 2 source/auth/capture remains on the original page. Group 1.1 buffer is not connected by this slice. The canonical previews remain reference files; the new page reuses the accepted Group 1 material/layout with current asset labels.

The scanner lists the explicitly supplied project folder and designated PROJECT/AUDIO/STEMS/ARTWORK/SHORTS subfolders, case-insensitively; uses role markers and compatible extensions/MIME types rather than exact titles; preserves BPM/key/collaborator naming; excludes literal (WIP) regardless of case and zero-size files; accepts ZIP/7z stems. A unique marked candidate qualifies automatically. Generic/unmarked candidates or competing marked candidates require explicit association; confirmed Drive IDs survive renames but are revalidated for type/location/access/WIP on scans. Six uniquely numbered Short 01–06 files qualify; ambiguous/unlabelled clips require choosing six distinct IDs in Tuesday–Sunday order. Duplicate designated folders require resolving the folder structure. Role aliases are bounded first-test implementation rules, not an exhaustive naming parser.

Per-owner D1 state stores one selected project folder, confirmed associations, last successful scan and timestamp in drive_asset_state (lazy idempotent creation). A new project replaces this test selection; this is not a complete release catalogue. Scans/confirmations are same-origin authenticated POSTs with bounded inputs, fixed Drive GET endpoints, capped pagination (four 100-file pages per folder), explicit incomplete-list failure and per-owner isolation. Client-provided file IDs must qualify in a fresh server scan before association. Error/no-access/over-limit responses preserve the last successful result with stale labels; no failed scan yields Missing. Saved results restore with Not refreshed wording. Metadata does not validate creative correctness, true file contents or archive completeness. No Drive write, upload, scheduling or publication operation exists in this slice; the automation readiness gate remains a requirement for the later publisher.

### Google access and user test

Reuse the existing encrypted saved Google connection, client and callback. Add Drive with the explicit Add read-only Drive access button: requests the existing two YouTube scopes plus https://www.googleapis.com/auth/drive.metadata.readonly, returns to /checklist and stores actually granted scopes. Existing YouTube-only sessions remain valid. Later Connect YouTube preserves an already saved Drive grant. No credentials are requested or embedded in page/source. Enable Google Drive API in the existing Cloud project; authorise Drive metadata access once with the account containing the synced folder. The metadata scope cannot download or inspect archive bytes; archive verification would require a separate decision/permission.

1. Open /checklist; grant read-only Drive access once.
2. Paste the supplied Gelato 41 folder link; press Sync.
3. Expect Remix WAV, Stems archive and Project ZIP to qualify for the observed sample (3/7), with MP3, thumbnail, video and six Shorts missing. No renaming is needed. Do not reproduce private folder/file IDs in the public repository.
4. Test a real ambiguous candidate association and refresh restoration when suitable files are available. First successful hosted Drive scan/association and Android appearance remain unverified.

### Verification and deployment

Passed verify-assets.mjs (flexible names, metadata, ZIP/7z, WIP, renamed-ID revalidation, MIME mismatch, Shorts completeness/duplicates, folder ambiguity, pagination, owner isolation, cross-origin rejection, foreign candidate rejection, failed-scan preservation and Drive-scope requirement). Existing verify-backend.mjs, verify-capture.mjs and verify-state.cjs pass; OAuth tests additionally cover Drive scope, callback return, stored grants and preserving Drive on subsequent YouTube Connect. Production build passes and includes /checklist and /checklist.js. Supported browser QA was unavailable: no rendered Android/desktop, enlarged-font or real OAuth/Drive scan result is claimed. Assistant Drive connector reads succeeded separately in this chat.

Sites source SHA: f838b625ea6a7f62aface55154c175f1b7fe2989. Successful saved/deployed version: appgprj_6ac84c21e1fc819198906084958537b0~appgver_836367bd8f808191a6fa74a8be2021d9. Owner-private audience and existing runtime secrets retained.
