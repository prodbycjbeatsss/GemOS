# Music-release discovery and project selection

Current private integration slice · 10 October 2026. CJ approved the reviewed plan and implementation. Read AGENTS.md, dashboard/HANDOFF.md and Group 1 usage/specification before extending it.

## Implemented boundary

The checklist discovers release folders, lets CJ target one project and saves scans/associations separately for each project. Existing read-only Google Drive metadata access is reused. No new provider, permission, secret or scheduled discovery job is added. Approval, folder writes, scheduling, publication and confirmed buffer calculations remain later slices. The 1.1 card still contains explicit examples; a folder's presence never establishes scheduled coverage.

## Folder setup

Keep the existing mixed Projects area. Create a dedicated Music Releases area within the location intended to sync with the computer. Create these separate sibling stage folders, then connect their Google Drive links in the page's Music release folders menu:

| Folder | This slice |
|---|---|
| Music Releases / In Production | Required discovery connection; unfinished releases live here. |
| Music Releases / Release Queue | Optional connection now; future approval destination. No automatic move exists. |
| Music Releases / Released | Optional connection now; future archive destination after confirmed publications. |

Place each complete release folder (e.g. Potter Payper - Teeth & Claws) directly inside a stage folder. Keep its PROJECT/AUDIO/STEMS/ARTWORK/SHORTS structure intact. Connect the stage folders, not the Music Releases parent and not an individual release. Folder names are suggestions; configured Drive IDs are authority for identifying stage connections. Renaming a stage does not require a new connection. Shortcuts are skipped. Do not assume cloud-side moves preserve every local sync path; test a synced release before enabling future moves.

## UI scope and states

- Check release lives immediately above 1.2. Desktop assigns both cards to the same second grid row, preserving their top/recess/footer alignment; mobile retains Buffer → selector → Checklist order. Connection settings use a collapsible menu; no unfinished-project list is always visible.
- The selector groups projects by In Production, Release Queue, Released, Individual folders and Not in connected folders. It remembers the last selected project per owner. Duplicate names in a stage get a short ID suffix.
- Selecting a project clears the previous readiness immediately, then restores only that project's saved result with Not refreshed wording. A project never scanned starts Not checked. Selection performs no asset scan, approval, scheduling or leaderboard request.
- Sync checks the selected project. Refresh list only refreshes discovery. Connected lists refresh once when the page opens after cached state is restored. There is no background watcher; changes while the page stays open need Refresh list.
- Failed discovery retains the last complete list and timestamp. Failed selection restores the prior saved selection where possible. A folder no longer discovered retains its scan/associations under Not in connected folders; this is not an asset Missing result. Failed file scans retain the selected project's last successful result with stale wording.
- Existing individual-folder testing remains in an expandable advanced section. The legacy saved sample is retained, and individually scanned folders appear in the selector. No mandatory relocation or renaming of that sample is needed.
- Release details shows folder-derived artist/title and recognised bracketed BPM/key/credit suggestions even before the first file check. Ambiguous/missing metadata stays unset. Suggestions are explicitly not approved publishing metadata; the original folder name is retained. Parser convention: spaced artist/title dash plus optional bracket tags such as [87BPM], [B#m], [x @collaborator]. This is not a mandatory naming convention.

## Card scope contract

| Card | Selection ownership |
|---|---|
| 1.1 Release Buffer | Overall confirmed schedule coverage. Unconnected examples in this slice. |
| 1.2 Checklist | Check release selector only. Eight required categories unchanged. |
| 2.1 Analytics | Overall performance, independent of project selection; current sample-test limitations remain. |
| 2.2 Leaderboard | Separate release/batch selection; preparing a new project must not replace the reviewed released batch. |
| Unreviewed cards | No new project filtering introduced. |

## Data and migration

The existing D1 backend stores a small project catalogue for this slice. It does not select a new external Notion catalogue integration or settle every future release-manifest field.

- drive_release_projects: composite (user_id, folder_id) identity; name, last discovered stage, mappings JSON, last successful result JSON and check timestamp.
- drive_release_settings: per-owner stage IDs, last selected folder ID, full discovery snapshot and discovery timestamp.
- Existing drive_asset_state is retained. Lazy idempotent migration copies its one saved result/associations into the project table once, and seeds the initial selection only if no new settings row exists. It never overwrites newer project scans or selection. Earlier seven-category results still require the new Beat WAV check.
- Discovery collects and validates every configured stage before publishing one atomic D1 batch. Project names/stages may change without replacing mappings or scans. Limits: 200 retained/discovered projects per owner and the existing four × 100-file page cap per folder. No incomplete listing becomes a successful empty catalogue.
- New readiness checks use per-project mappings; successful scan and selection save atomically. Confirmation still rescans eligible file candidates and rejects foreign/nonqualifying IDs. Root project moves do not remove file associations; new scans still revalidate file location/type/access/WIP.

## API and security

All API calls use the existing authenticated /api/youtube/[action] route. No credentials or private folder IDs belong in source/docs.

| Action | Contract |
|---|---|
| GET drive-status | Saved scope, folders, catalogue, selected ID and that project's cached result. |
| POST drive-folders | Validate stage folder links/IDs and discover; only save settings after every configured listing succeeds. |
| POST drive-discover | Refresh configured stage folders; preserve selected project. |
| POST drive-select | Select an existing per-owner project and return its saved result. |
| POST drive-scan / drive-confirm | Existing eight-category checks, now saved per project. |

Authenticated owner isolation, same-origin POSTs, bounded JSON inputs and fixed Google GET endpoints remain. Root connections must be distinct, nontrashed folders; directly nested stages and duplicate cross-stage discoveries are rejected. Ordinary files and shortcuts do not become projects. Nothing issues Drive PATCH/POST/DELETE requests. Future automatic moves require a separately implemented write permission/action, fresh 8/8 revalidation and recorded user approval; archive moves require confirmed publication of the required uploads, not arrival of a calendar date.

## Validation and outstanding evidence

Passed verify-projects.mjs: legacy migration, metadata suggestions, direct-folder enumeration, separate saved scans, association retention, selection restoration, ownership/origin checks, folder move/rename by stable ID, removed-project retention, incomplete/failed/oversized listing preservation and GET-only Google requests. Passed verify-project-ui.mjs: unique IDs, previous readiness cleared during loading, serialized controls, unchecked new projects, saved-result restoration, failed-selection rollback, details before a scan, no leaderboard calls and source-level paired desktop row contract. Existing asset/title/layout/backend/capture/state regressions and production build pass.

Fixtures and UI execution are controlled tests, not a real Drive discovery or rendered browser proof. User stage folders are not yet supplied/connected. Phone/desktop rendered acceptance, real migration and association restoration, real discovery/rename/move, and computer-sync behaviour remain unverified.

## Next steps

1. CJ creates/connects In Production (and optionally Queue/Released), puts one release directly inside it and chooses Connect folders.
2. Verify discovery, select a release, Sync, switch projects and refresh to confirm isolation/restoration. Review mobile layout.
3. Test one manual stage move/rename and list refresh with the real sync arrangement.
4. Next implementation: fresh-check approval record and safely retriable folder move; then real scheduling-confirmation records and publication monitoring. Store approval/schedule/job status separately from folder stage. No new platform connection is claimed available.


## Deployment checkpoint

Private deployment succeeded on 10 October 2026. Sites source SHA be0c5f9cc81b6dd2201895632519e7a3895eb504; saved version appgprj_6ac84c21e1fc819198906084958537b0~appgver_61a7d9d98d488191bbf45bab8112a9ca. Owner-private audience and existing environment revision 4 retained. Review route: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/checklist. No real stage folder links are configured by this coding task.
