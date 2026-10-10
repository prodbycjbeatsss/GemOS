# Group 1 — purpose, data and connections

Updated 10 October 2026. Current authority for the connected implementation. [Asset contract](../integration-tests/youtube/ASSETS.md) and [project/preparation contract](../integration-tests/youtube/PROJECTS.md) define technical details. Historical source files and archived decisions do not override this page.

## Separate readiness from scheduling

1.2 checks one selected project. Eight required categories: exported Project ZIP, stems ZIP or 7z, Beat WAV, Beat MP3, Remix WAV, thumbnail image, main YouTube MP4 and six distinct Shorts MP4. FLP is stored in PROJECT but outside the denominator. Beat WAV and MP3 are both required; beat/remix WAV IDs must differ. Stems tile says ZIP but accepts 7z; thumbnail tile says PNG but accepts JPG/JPEG/PNG/WebP.

Flexible filenames preserve prefixes, BPM, key, artist pairings and credits. No exact-title match or compulsory rename. Eligible files must be in the designated case-insensitive subfolder, nonempty, nontrashed, have compatible extension/MIME and no literal (WIP), case-insensitively. One clear role-marked file passes automatically. Unmarked/competing files require a confirmed Drive-ID association, revalidated on every scan. Six uniquely numbered Short 01–06 files establish Tuesday–Sunday order; ambiguous clips need six distinct ordered associations. Missing, Needs attention, Not checked, no access, scan error and stale results are distinct. Metadata does not prove creative quality or archive contents.

## Folders and target selection

A yearly parent such as 2027 is valid. Its sibling stages are In Production, Release Queue and Released; projects are direct children with PROJECT/AUDIO/STEMS/ARTWORK/SHORTS inside. Connect each stage by Drive ID. In Production is required for discovery; Queue is required to move a production project. Released remains optional. Parent auto-detection is not implemented. Renames preserve IDs; moves retain associations but require fresh location/access checks. Computer-to-Drive sync behaviour must be tested with a complete old project.

The checklist-local selector clears previous readiness and restores only the selected project's saved state. Refresh list discovers projects, Sync checks assets. The list refreshes on page opening and manually; there is no continuous watcher. Other cards keep their own scope: 1.1 overall scheduling, 2.1 overall selected-platform activity (sample selection still limits its test), 2.2 its separate release/batch picker.

## Prepare release and approval

Prepare release replaces the redundant Release details list. Metadata initially derives from filenames/folder; user edits are saved per owner/project as an explicit review. Artist/title required; optional BPM 30–300 integer, musical key and credits. Saving review rechecks the displayed snapshot. If files changed, update the check and ask for a new review. Passed Shorts require explicit Tuesday–Sunday review. Draft metadata can be saved with incomplete assets, but confirmation cannot pass.

Confirm ready requires the saved review version, a fresh server 8/8 check and unchanged reviewed project name, file IDs/names/modification times/sizes/order. For production projects, recorded explicit confirmation moves the root folder to connected Queue using metadata-edit permission. Already queued projects can be confirmed without a move. Only My Drive moves are supported in this slice. No operation uploads, publishes, changes sharing, schedules or archives a release.

A move is not a distributed transaction with Drive: concurrent local/manual changes still need care. Record pending before one PATCH; verify its actual parent after. An uncertain response is never automatically retried. A repeat confirmation can reconcile a folder now in Queue; if still in production, inspect Drive and resolve manually before further approval. Stored reviews remain separate from approved schedule records. Any changed snapshot blocks renewed confirmation.

## 1.1 Release Buffer

Coverage counts consecutive fully confirmed weeks in Europe/London, stopping at the first gap. A covered week needs 19 platform uploads: Monday main YouTube video plus six Tuesday–Sunday clips on each of YouTube Shorts, TikTok and Reels. One source clip reused on three platforms is three destination confirmations. Unaccepted requests, planned dates, reminders, ready files and queue placement do not establish coverage. Prior scheduled jobs are not automatically cancelled by a later file check.

Scheduling records/source, real platform confirmations and archive-after-publication remain unconnected. Current buffer is No schedule yet, not a computed zero. Future Buffer details will give a project/platform/date breakdown.

## Verification limits

Hosted screenshots verify one Gelato 41 scan/read/display at 4/8; CJ reports prior file links working. Controlled tests cover matching, persistence, switching, review and move guards. Real two-project switching, new consent/move, desktop/phone focus/contrast/enlarged text, archive contents and computer sync are not yet independently verified. No new folder structure is required for this UI change.
