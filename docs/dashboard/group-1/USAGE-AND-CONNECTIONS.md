# Group 1 — release buffer and readiness

## Current project discovery slice — 10 October 2026

CJ approved implementing read-only release discovery, a checklist-local selector and per-project saved checks before approval/moves. Music Releases uses In Production, Release Queue and Released stage connections; only In Production is required now. Existing Drive metadata scope is sufficient. The project list refreshes on page opening and manually, with cached-list failure handling. Current D1 storage is per owner + project folder ID and preserves the old scan/associations through lazy migration. Folder metadata is explicitly suggested, not publishing authority. The selector does not change 1.1 coverage, 2.1 analytics or 2.2 batch selection.

See [PROJECTS.md](../integration-tests/youtube/PROJECTS.md) for setup, boundaries, API, migration, tests and user verification. Approval, automatic moves, scheduling and publication remain unimplemented; no new Google write scope was requested. Eight-item readiness and centred symbol tiles remain. Controlled project/asset/frontend/backend/capture/state checks and production build pass; live stage discovery/migration and rendered phone/desktop appearance are unverified. User next: create/connect stage folders, then select and Sync one release.


## Current checklist contract — 10 October 2026, eight required categories

CJ confirmed Beat WAV is required alongside Beat MP3 for future automated beat sales. This supersedes every earlier seven-category/7-of-7 contract and statement that Beat WAV is informational. The eight checks are ordered in four equal two-column rows: Project ZIP | Stems ZIP; Beat WAV | Beat MP3; Remix WAV | Thumbnail PNG; YouTube video MP4 | Shorts ×6 MP4. Shorts no longer spans two columns. File type is separate muted 10px supporting text below the 12px file name. “7z” is removed from the tile label only: stems still accept ZIP or 7z. Thumbnail PNG is the requested tile label; existing JPG/JPEG/PNG/WebP compatibility is retained, not narrowed by this presentation change.

Readiness denominator is eight everywhere. Beat WAV uses AUDIO plus compatible nonempty WAV metadata, excludes WIP and automatically recognises clear beat markers while excluding remix markers. Unclear files require association confirmation, and beat/remix WAV must be distinct files. MP3 cannot substitute for WAV. FLP remains outside the readiness total. Saved seven-category results are normalised by role into the new order, retain their original check timestamp, and leave Beat WAV Not checked until Sync; they cannot qualify as 8/8 from the old scan. The UI binds by role rather than array position. No forced consent or renaming is needed.

Synthetic asset checks cover full 8/8, independent WAV/MP3 eligibility, WIP/MIME mismatches, distinct audio, legacy migration, existing scan/auth/persistence behaviour. Existing title/geometry checks, syntax and production build pass. Live new Beat WAV scan and refreshed mobile/desktop rendering remain unverified. Previous 3/7 screenshots and seven-category notes below describe historical evidence.


Updated 9 October 2026. Visual reference finalised by CJ for this review; the separate read-only scanner is implemented/deployed, with a successful hosted sample scan evidenced by CJ’s screenshot; the release buffer remains unconnected. Preserve the accepted normal visual layout. Shared design: [master design system](../../DESIGN_SYSTEM.md).

## 1.1 Release Buffer

**Purpose:** show how long the confirmed release schedule covers CJ, and which projects come next.

- Display up to three projects, with name, relevant dates and Next Up / Scheduled / In Progress. Show all opens the remaining projects without changing the card height.
- Scheduled requires the main YouTube video and all six source shorts scheduled on each of Shorts, TikTok and Reels (19 platform uploads). The six shorts run Tuesday–Sunday. Next Up is the first ready project; an unfinished first project remains In Progress. Ready statuses use restrained green; In Progress stays neutral.
- Count consecutive covered future calendar weeks in Europe/London. Stop at the first gap or unfinished week. Derive You're good until from the last confirmed scheduled publication in the covered stretch; account for current-week coverage where applicable. Later bookings beyond a gap must not imply uninterrupted cover.
- Empty: No upcoming projects. Footer route: Release management →.

### Connection and data contract

| Needed information | Intended source | Status |
|---|---|---|
| Project ID, artist/title, release dates and required uploads | Release records/manifest | Data model and authoritative store not settled in this card review. |
| Scheduled times, destination, source clip and platform post IDs | Scheduling records backed by platform/scheduler confirmation | No integration tested. A requested schedule is not proof of acceptance or publication. |
| Buffer count, first ready project and coverage date | GemOs calculations from verified records | Agreed behaviour; example records only in HTML. |

Required platform set confirmed by CJ on 8 October 2026: A covered release week requires confirmed scheduling for one main YouTube video plus six Tuesday–Sunday source shorts on each of YouTube Shorts, TikTok and Instagram Reels: 19 platform uploads in total. All required destinations must qualify before the week counts towards the release buffer. Planned uploads, reminder-only tasks and submitted scheduling requests without acceptance confirmation do not qualify. One source short reused across platforms is three platform uploads. Real scheduling support and confirmation records remain untested; this decision defines the requirement, not a working connection. A failed refresh must preserve last-known records with visible freshness; stale-data trust thresholds remain unsettled. The mock preview now uses 19 destination records and matching source IDs, including Monday main and Tuesday–Sunday shorts; its confirmation flags are illustrative. This preview does not publish anything.

## 1.2 Pre Release Checklist

**Purpose:** show whether release assets are ready for the automater, separate from scheduled/published status.

Seven required parts:

1. Remix WAV.
2. Beat MP3 (the Type Beat MP3; no separate Tagged file).
3. Stems archive (ZIP or 7z).
4. Exported FL Studio project ZIP.
5. Thumbnail.
6. Main YouTube video.
7. Six short source files, Tuesday–Sunday, reused across Shorts/Reels/TikTok.

All seven must pass for 7/7 Files Ready. Multiple missing parts can appear together. Rows are informational; Release details → explains them. Footer Sync/status sits left; the HTML starts Not synced and reports Drive not connected when pressed.

### Connection and data contract

| Needed information | Intended source | Status |
|---|---|---|
| Asset file IDs, project association, type and modification details | Google Drive folder/files plus a project manifest | Intended connection; no scan implemented or tested. |
| Whether an asset is eligible | Correct project/type match and case-insensitive filename (WIP) check | Automatic eligibility rule confirmed 9 October 2026; no separate manual approval. Scanner implementation untested. |
| Seven-part count and missing labels | GemOs validation of the required manifest | Agreed presentation; all required eligible files must exist. Does not infer creative quality. |
| Last successful check and errors | Import/job records | No live freshness state yet. |

### Automatic eligibility — confirmed 9 October 2026

CJ chose automatic file checks: an asset earns Pass when the correct project file exists, matches the required type and contains no literal (WIP) marker anywhere in its filename, checked case-insensitively. No separate manual approval is required for a clear unique eligible role match. Confirmation is required only for unclear roles or competing eligible candidates, not title differences. A marker such as (wip) or (WiP) excludes that file. Required sets must be complete: the Shorts part needs all six eligible source files; the Stems archive part requires an eligible ZIP or 7z archive. This supersedes the earlier loose-WAV-set requirement; archive-content verification remains open. These checks establish file eligibility, not creative quality. Project matching, exact format validation and manifest details still need specification during scanner implementation; failed/no-access scans must not masquerade as missing files or a successful check.

An FLP is not one of the seven visible parts and must not be assumed final just because saved. Do not silently add an eighth requirement. A scan must distinguish missing files from no access, scan failure and stale results. File format/quality validation beyond metadata remains to agree.

## Implementation boundary and open decisions

The existing standalone HTML is a design reference with examples, not a functioning release manager or Drive integration. The flexible folder/type/role matching and ambiguity rules below are settled. Manifest storage, authoritative release store, stale-data threshold and upload failure handling remain to decide before live implementation.

Group 1's accepted visual layout does not need redesign to document these connections. Use [the plan](../PLAN.md) for review order and [API feasibility](../ANALYTICS-FEASIBILITY.md) for research limitations.


## Current flexible folder and role convention — 9 October 2026

CJ confirmed flexible asset matching on 9 October 2026, superseding exact filenames, mandatory renaming and removal of bracket prefixes. Working projects sync from his computer to Google Drive. Use the selected project folder, case-insensitive subfolder names, compatible file type and role markers such as [REMIX], [BEAT], [ZIP], stems, thumbnail and YouTube Video to identify assets. Preserve BPM, key, artist pairings and collaborator credits in filenames; their presence or differences from a title template do not cause failure. Existing descriptive names without prefixes are also allowed when the role is clear. Stems accept .zip or .7z; the exported FL Studio project archive remains .zip and required. The seven checklist categories remain Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and six Shorts; FLP and Beat WAV are additional files. Beat WAV does not substitute for missing Beat MP3. A clear unique eligible candidate can pass automatically; confirm only unclear roles or competing eligible candidates. Remember confirmed files by Drive ID while retaining project/location/type/access and case-insensitive literal (WIP) checks. Unresolved required assets show Needs confirmation and pause new scheduling/publication; unrelated extras do not block a clear match. Previously confirmed scheduled uploads are not automatically cancelled. No access/failed scan is not Missing. Metadata does not prove creative correctness or archive contents. Detailed role recognition, persistence, archive verification and freshness implementation remain open; a separate private scanner slice is now implemented/deployed; hosted Drive consent/scan and rendered appearance remain unverified.

This is an illustrative Teeth & Claws folder layout, not a mandatory filename template or evidence these files exist. Existing prefixes and BPM/key/collaborator metadata may be retained:

```text
Projects/
└── Potter Payper - Teeth & Claws/
    ├── PROJECT/
    │   ├── Potter Payper - Teeth & Claws.flp
    │   └── Potter Payper - Teeth & Claws.zip
    ├── AUDIO/
    │   ├── Potter Payper - Teeth & Claws - Remix.wav
    │   ├── Potter Payper x K Koke Type Beat - Teeth & Claws.wav
    │   └── Potter Payper x K Koke Type Beat - Teeth & Claws.mp3
    ├── Stems/
    │   └── prodbycjbeatsss - teeth & claws stems.zip
    ├── Artwork/
    │   ├── Teeth & Claws Thumbnail.jpg
    │   └── Potter Payper - Teeth & Claws YouTube Video.mp4
    └── Shorts/
        ├── Teeth & Claws - Short 01.mp4
        ├── Teeth & Claws - Short 02.mp4
        ├── Teeth & Claws - Short 03.mp4
        ├── Teeth & Claws - Short 04.mp4
        ├── Teeth & Claws - Short 05.mp4
        └── Teeth & Claws - Short 06.mp4
```

The manifest records asset roles, chosen Drive folder/file IDs and required sets rather than requiring exact title strings. The beat artist pairing may differ from the remix artist. Teeth & Claws stems are not exported and CJ has no laptop access; report missing assets honestly without blocking a read-only import test. Folder capitalisation differences (e.g. STEMS and Stems) are accepted. Short identity/order must be unambiguous for all six required clips; do not count duplicate candidate versions as separate planned clips.

## Current implementation evidence

See [ASSETS.md](../integration-tests/youtube/ASSETS.md). The scoped test stores one project selection/associations/check result per owner in existing D1; it does not settle a full release catalogue store. Eligible unique role matches, ZIP/7z, WIP exclusion, ambiguity review and six-clip checks are covered by controlled tests. Assistant Drive reads succeeded, but deployed Drive consent/scan, real association restoration and phone fit remain unverified. No publisher or scheduling connection exists.

### Latest hosted evidence — 9 October 2026

CJ supplied an Android screenshot showing saved Drive read permission, successful scan completion and 3/7 for the sample. This verifies that sample’s hosted read/display, not all file rules, archive contents, ambiguous association or refresh restoration. Title/details UI changes are deployed; refreshed rendered acceptance remains open. See ../integration-tests/youtube/ASSETS.md.
