# Group 1 — purpose, data and connections

Updated 10 October 2026. Current authority for the connected implementation. [Asset contract](../integration-tests/youtube/ASSETS.md) and [project/preparation contract](../integration-tests/youtube/PROJECTS.md) define technical details. Historical source files and archived decisions do not override this page.

## Separate readiness from scheduling

1.2 checks one selected project. Eight required categories: exported Project ZIP, stems ZIP or 7z, Beat WAV, Beat MP3, Remix WAV, thumbnail image, main YouTube MP4 and six distinct Shorts MP4. FLP is stored in PROJECT but outside the denominator. Beat WAV and MP3 are both required; beat/remix WAV IDs must differ. Stems tile says ZIP but accepts 7z; thumbnail tile says PNG but accepts JPG/JPEG/PNG/WebP.

Flexible filenames preserve prefixes, BPM, key, artist pairings and credits. No exact-title match or compulsory rename. Eligible files must be in the designated case-insensitive subfolder, nonempty, nontrashed, have compatible extension/MIME and no literal (WIP), case-insensitively. One clear role-marked file passes automatically. Unmarked/competing files require a confirmed Drive-ID association, revalidated on every scan. Six uniquely numbered Short 01–06 files establish Tuesday–Sunday order; ambiguous clips need six distinct ordered associations. Missing, Needs attention, Not checked, no access, scan error and stale results are distinct. Metadata does not prove creative quality or archive contents.

## Folders and target selection

A yearly parent such as 2027 is valid. Its sibling stages are In Production, Release Queue and Released; projects are direct children with PROJECT/AUDIO/STEMS/ARTWORK/SHORTS inside. Connect each stage by Drive ID. In Production is required for discovery; Queue is required to move a production project. Released remains optional. Parent auto-detection is not implemented. Renames preserve IDs; moves retain associations but require fresh location/access checks. Computer-to-Drive sync behaviour must be tested with a complete old project.

The checklist-local selector clears previous readiness, restores only the selected project's saved state, then automatically scans that project with existing read access. Refresh list discovers projects; manual Sync rechecks later changes. The list refreshes on page opening and manually; there is no continuous watcher. Other cards keep their own scope: 1.1 overall scheduling, 2.1 channel-wide Shorts activity,2.2 its independent UK-week upload cohort.

## Prepare release and approval

Prepare release replaces the redundant Release details list. Metadata initially derives from filenames/folder; user edits are saved per owner/project as an explicit review. Artist/title required; optional BPM 30–300 integer, musical key and credits. Saving review rechecks the displayed snapshot. If files changed, update the check and ask for a new review. Passed Shorts require explicit Tuesday–Sunday review. Draft metadata can be saved with incomplete assets, but confirmation cannot pass.

Confirm ready requires the saved review version, a fresh server 8/8 check and unchanged reviewed project name, file IDs/names/modification times/sizes/order. For production projects, recorded explicit confirmation moves the root folder to connected Queue using metadata-edit permission. Already queued projects can be confirmed without a move. Only My Drive moves are supported in this slice. No operation uploads, publishes, changes sharing, schedules or archives a release.

A move is not a distributed transaction with Drive: concurrent local/manual changes still need care. Record pending before one PATCH; verify its actual parent after. An uncertain response is never automatically retried. A repeat confirmation can reconcile a folder now in Queue; if still in production, inspect Drive and resolve manually before further approval. Stored reviews remain separate from approved schedule records. Any changed snapshot blocks renewed confirmation.

## YouTube schedule connection —15October2026

Release Buffer now reads YouTube Studio. A complete UK week needs one main video Monday and one Short each day Tuesday–Sunday. This first YouTube-only connection supersedes the earlier19-platform proposal; TikTok/Reels are not claimed as scheduled. Check12 full weeks from next Monday (today if Monday), count consecutive complete weeks, stop at first gap. Later complete weeks remain visible but do not extend coverage.

Only future private status.publishAt is scheduling evidence. Owned duration/dimensions/rotation establish main/Short format, with succeeded processing; unknown format/processing stays unverified/partial. Titles do not establish remix affiliation. Wrong-day/duplicate uploads, planned dates and Drive readiness cannot fill missing slots. A successful empty scan can show zero; a provider failure retains saved data.

Source Sync and Automation1.1/Sync all use the same fixed GET-only provider import under existing permissions and tables. Cached GET restores owner/channel/revision/current-anchor reports without provider work or run creation. Headline shows Covered until <last complete Sunday> or No complete weeks; source states remain distinct. Recess shows nearby weeks and n/7/missing days. Native Buffer details shows all12 weeks and day-level actual uploads/times/links. Multiple owned channels require source selection. Shared timestamp sits below Sync. Material and paired920px geometry stay unchanged.

See [schedule contract](../integration-tests/youtube/SCHEDULE.md). New coverage/UI tests plus affected sync/checklist/analytics/capture/monitoring/Automation/shell/group/dialog/geometry/Drive regressions, production build and compiled200/401 checks pass. First live owner schedule comparison and rendered phone/accessibility checks remain pending. No upload, schedule-write or publication action is added.


## Verification limits

Hosted screenshots verify one Gelato 41 scan/read/display at 4/8; CJ reports prior file links working. Controlled tests cover matching, persistence, switching, review and move guards. Real two-project switching, new consent/move, desktop/phone focus/contrast/enlarged text, archive contents and computer sync are not yet independently verified. No new folder structure is required for this UI change.
