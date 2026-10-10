# Music-release discovery and project selection

## Current release details presentation — 10 October 2026

CJ authorised replacing Suggested details / Original project folder name with a centred release header (artist - track), separate beat description, n/8 PASSED and relevant next action, Last checked timestamp, Project metadata (Artist, Track Name, combined BPM & Key, Credits) and a working Drive-folder link. Passing asset sections show category, PASS and connected filenames; nonpassing/ambiguous sections retain reasons and association controls. Remove redundant source-caption/stage and generic boundary copy from this popup. All asset file popups now include the same 58px/18px icon shell; connected files reuse their category SVG, absent files retain file-X. Centre metadata, asset/status/file sections and Close using existing blue/navy shell, fonts and insets. Missing data says Not available rather than inventing metadata; invalid/missing folder IDs omit the link. Drive URLs use a fixed Google origin and validated stored folder ID, opening in a new tab with noopener/noreferrer.

Display artist prefers an eligible connected remix filename; otherwise the folder artist is retained, except a Type Beat descriptor with spaced x uses its first named artist. The full Type Beat descriptor remains the separate beat subtitle. Credits strip only leading x before @. Stored metadata, original names and associations are unchanged; these display values do not approve publishing metadata. Gelato 42 in CJ's example is treated as a typo: retain the source Gelato 41 title. Native dialog accessible name matches full artist/title, with no duplicate visible heading. Existing picker, readiness and Group 2 scopes remain.

Controlled title/metadata tests cover connected remix precedence, Type Beat fallback, ambiguous-remix exclusion, collaborator preservation, unknown artist and unchanged raw metadata. UI tests verify working Drive URL/target/rel, connected icon/PASS, popup states and project switching; existing geometry checks and production build pass. Supplied screenshots prove the pre-update connected-file popup and details rendered; new styling and complete real two-project switching remain unverified.


## Current empty-state refinement — 10 October 2026

CJ's Android screenshots show the new picker/file popup and empty buffer rendered, with the empty message near the top, a redundant count dash, left-aligned file popup and overly instructional buffer details. CJ authorised centring the buffer content within its matched recess with a calendar icon, removing the dash, centring file-popup content with a missing-file icon, and making buffer details a breakdown of actual buffered projects. Implemented the centred states using existing Group 1 materials, 58px/18px supporting icon shell, type/insets and modal controls. Buffer details currently shows only a compact centred empty state plus Scheduling not connected; removed FAQ/rules blocks and unrelated currently selected Drive check. Populated project breakdown awaits an authoritative confirmed scheduling source; no queue folder or file-ready project is inferred scheduled. Eligibility, picker persistence and paired sizing remain unchanged. Controlled UI/geometry checks and production build pass; updated phone/desktop centring remains unverified. Earlier FAQ instructions are superseded; screenshots do not prove real second-project switching.


## Current picker, file popups and empty buffer — 10 October 2026

CJ confirmed stage-folder setup and supplied Android screenshots showing saved connections, a saved discovery timestamp and a fresh Gelato 41 scan. This is evidence of that setup/read/display, not complete catalogue, switching, archive contents or scheduling verification. The parent may be a yearly folder such as 2027; connect its three stage folders separately. Gelato 41 is the current test project; Teeth & Claws remains incomplete.

CJ authorised replacing Android's native release select popup with an app-styled chooser and making each checklist tile open its connected filenames. The chooser uses the shared blue/navy dialog shell, stage headings, short track title plus artist, a selected tick and full original name as title. It retains the existing per-project selection/save contract; no new API, Drive permission or other-card selection changes. Native dialog supports modal focus and Escape; Close returns focus. All eight tiles are native buttons with the existing four-row anatomy and geometry. Their small popup shows saved connected filename(s), or “No file connected”; Shorts lists every connected file. Unchecked prompts Sync; Needs attention directs association review to Release details. Candidates are not labelled connected files. Switching clears previous checks and closes any old file popup.

The live 1.1 card no longer shows example projects/dates or invented coverage. It shows “No schedule yet”, “Scheduling not connected” and “No releases to show”. This is an unconnected empty state, not a verified zero-week calculation. Queue folders and 8/8 readiness do not establish confirmed scheduling. Buffer details retains the 19-upload/consecutive-week rules and source limitation. The canonical reference examples remain historical visual material.

Controlled UI checks cover chooser selection and focus return, connected/multiple/absent/unchecked/attention file popup content, popup closure on project switch, independent saved results, failed-selection restoration, empty buffer and shared desktop row. Existing project, asset, title and geometry checks pass; production build passes. These are controlled DOM/source checks, not rendered browser or native Android proof. User next: add a second direct child release under a connected stage, Refresh list, select/Sync each, switch back and refresh the page to verify independent results and remembered selection. A new incomplete project should show Not checked until Sync, then its own missing files, without borrowing Gelato 41 checks.


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


Current private popup/empty-buffer deployment — 10 October 2026: source `8fc844e184e2d657741b1b3694d120f5d9ca67d5`, version `appgprj_6ac84c21e1fc819198906084958537b0~appgver_01d3a713b0b081919ac38b5358156a91`, deployment `appgdep_6aca4aeb84248191836bd982fae1c303` succeeded. Google configuration/environment revision 4 retained. Refreshed chooser/file-popup Android appearance and independent real second-project checks remain unverified.


Current empty-state deployment — 10 October 2026: source `831466bbc4b6287c9068e1d91d0bf6d7dee2e061`, version `appgprj_6ac84c21e1fc819198906084958537b0~appgver_260036a91a508191b8b97ac1b4ca6e8e`, deployment `appgdep_6aca4d3736fc8191becade162ba3cd7d` succeeded. Environment revision 4 retained. Updated icon/centring phone review remains pending.


Current metadata/file-icon deployment — 10 October 2026: source `913b066c5f2a7f8c9f1863fe73d12041863d98b3`, version `appgprj_6ac84c21e1fc819198906084958537b0~appgver_5ddf4b62134081918f9fb8c5fc4681e6`, deployment `appgdep_6aca6c9e8704819196bfae92224838f4` succeeded. Google environment revision 4 retained. New centred metadata/file-icon phone appearance remains unverified.
