# Music-release discovery and preparation

Updated 10 October 2026. Current private `/checklist` contract, replacing accumulated contradictory checkpoint notes. [Assets](ASSETS.md), [visual specification](../../group-1/SPECIFICATION.md), [Group 2 status](STATUS.md).

## Setup and normal flow

Keep the synced yearly area such as 2027, with sibling In Production, Release Queue, Released folders. Put each release directly inside a stage, retaining PROJECT/AUDIO/STEMS/ARTWORK/SHORTS. Connect stage URLs in Music release folders. In Production required; Queue needed for automatic moves; Released optional. IDs identify stages, so renames need no reconnect. Parent-only discovery and shortcuts are not supported.

Choose a release → Sync → inspect/resolve files → Prepare release → edit metadata/review Shorts → Save review → Confirm ready. Each step is explicit; nothing confirms or moves from a calendar date. Existing queue projects are reviewed without a second move. No extra renaming or new folders are required for the current test.

## Google permission

Existing drive.metadata.readonly continues to scan. Enable folder moves requests drive.metadata in the same saved Google connection, preserving YouTube read scopes and returning to `/checklist`. This can manage metadata across Drive, not just configured folders; application code limits the only write to the confirmed release root's parent change. No content/download/full-drive scope is requested. Declare https://www.googleapis.com/auth/drive.metadata in the existing Google Cloud OAuth consent configuration and grant it through the app before a production-folder move. No new client or secret.

Google documents [metadata scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth), [files.update scopes](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/update) and [parent moves](https://developers.google.com/workspace/drive/api/guides/folder). This private test remains subject to the existing OAuth testing/renewal constraints. Cancelling consent never triggers a move.

## Data and APIs

D1 identity is owner + Drive folder ID. Existing lazy migration preserves the previous one-project scan without overwriting newer state.

| Store | Purpose |
|---|---|
| drive_release_projects | Name/stage, per-project mappings and successful scan/timestamp |
| drive_release_settings | Three stage IDs, selected project, complete catalogue and discovery time |
| drive_release_reviews | User-edited metadata, reviewed snapshot signature and review time |
| drive_release_moves | Explicit confirmation/move source/target, pending/completed and timestamps |
| drive_asset_state | Retained read-only legacy migration source |

| Route | Behaviour |
|---|---|
| GET drive-status | Scopes, folders, project reviews/preparation status, selected saved result |
| POST drive-folders / drive-discover | Validate all roots, enumerate direct ordinary folders and publish complete catalogue atomically |
| POST drive-select | Choose only an existing owner project; no asset scan or other-card request |
| POST drive-scan / drive-confirm | Scan eight categories / validate fresh candidate association |
| POST drive-review | Validate metadata, rescan displayed snapshot, record explicit Shorts-order review |
| POST drive-ready | Recheck saved review version/snapshot and 8/8; approve queued project or move production project |
| POST start-drive-move | Google consent URL requesting metadata-edit permission, not a move |

Metadata: artist/title required, each max160; optional whole BPM30–300, key max24 (`B#m`, `F#`, `Cmaj`, etc.), credits max240. Inputs cannot contain control characters. Initial filename/folder inference stays editable; original names are not renamed. Saved metadata takes precedence for card/picker display. Authoritative publishing metadata integration remains future work.

## Discovery and switching

200 retained/discovered projects per owner; four ×100 pages per folder. Validate distinct nontrashed roots, reject nested stages/cross-stage duplicates/incomplete lists; skip files/shortcuts. Read all configured stages before a single D1 catalogue batch. Renames/moves update name/stage by ID without losing mappings/reviews. Unavailable projects keep saved checks separately.

Open-page/manual refresh only, no watcher. Selecting clears old results immediately and restores only the chosen cache. Failed selection restores prior saved selection where possible; failed discovery retains last complete catalogue. Sync updates the selected project. Other cards remain independent: buffer overall schedule; analytics overall activity with current sample limitation; leaderboard separate release/batch.

## Confirmation and move safeguards

Review save rechecks before recording the displayed snapshot; changed files update the scan and require renewed review. Incomplete drafts can save metadata but cannot confirm. Passed Shorts need explicit ordered review. Signature includes project name and category states plus connected IDs/names/modification times/sizes/order. A fresh server scan and matching review version/signature are required at confirmation; browser count is never authority.

Moves support ordinary My Drive folders only. Validate actual direct production/queue parent, connected nontrashed destination, canMoveItemWithinDrive/canAddChildren and metadata-edit permission. Recheck parent immediately before claiming operation. Record pending once; exactly one fixed-origin metadata PATCH with addParents=Queue/removeParents=Production and empty body. Verify actual parent before completed status. No arbitrary path/write/delete/content/sharing API.

D1 and Drive are not one transaction. Uncertain response stays pending and no automatic retry runs. Repeat confirmation reconciles a folder now in Queue without another PATCH. If still in production, check Drive and manually resolve the move before confirming; changing configured Queue while pending is blocked. Concurrent manual/local changes are not fully atomic with a scan. A completed operation is audit history, not a perpetual readiness guarantee or scheduling record; changed files block reconfirmation. Queue placement alone does not imply approval.

## Evidence and next verification

Controlled backend tests exercise metadata validation, owner/origin isolation, incomplete/changed snapshots, explicit Shorts review, permission/capability/shared-drive guards, exact parent update, uncertain-write reconciliation and repeat confirmation. Existing project/asset/UI/title/layout/backend/capture/state regressions and build are required. Source tests do not prove rendered layout or a real Google move.

CJ supplied saved stage connections and Gelato41 4/8 scan screenshots, and reports previous links working. Next: add a second old project with different files, Refresh list/Sync/switch/reload; use a complete 8/8 old project to test metadata review, consent, queue move and computer sync. Check phone long dialog/Close/focus/large text. Scheduling source, confirmed buffer calculation, publication and Released-folder moves remain unimplemented.

## Current deployment

Preparation slice deployment identifiers are recorded in HANDOFF after publication. Previous deployments are in Git history and archives/dashboard/2026-10-10/pre-prepare-release, not active instructions.
