# Group 1 — release buffer and readiness

Updated 9 October 2026. Visual reference finalised by CJ for this review; live connections are not implemented. Preserve the accepted normal visual layout. Shared design: [master design system](../../DESIGN_SYSTEM.md).

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
3. Stems archive (ZIP).
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

CJ chose automatic file checks: an asset earns Pass when the correct project file exists, matches the required type and contains no literal (WIP) marker anywhere in its filename, checked case-insensitively. No separate manual approval is required for an eligible exact match. The later confirmed ambiguity rule below requires candidate confirmation when the required filename does not match. A marker such as (wip) or (WiP) excludes that file. Required sets must be complete: the Shorts part needs all six eligible source files; the Stems archive part requires the expected ZIP. This supersedes the earlier loose-WAV-set requirement; archive-content verification remains open. These checks establish file eligibility, not creative quality. Project matching, exact format validation and manifest details still need specification during scanner implementation; failed/no-access scans must not masquerade as missing files or a successful check.

An FLP is not one of the seven visible parts and must not be assumed final just because saved. Do not silently add an eighth requirement. A scan must distinguish missing files from no access, scan failure and stale results. File format/quality validation beyond metadata remains to agree.

## Implementation boundary and open decisions

The existing standalone HTML is a design reference with examples, not a functioning release manager or Drive integration. The filename/folder convention and candidate-confirmation rules below are settled. Manifest storage, authoritative release store, stale-data threshold and upload failure handling remain to decide before live implementation.

Group 1's accepted visual layout does not need redesign to document these connections. Use [the plan](../PLAN.md) for review order and [API feasibility](../ANALYTICS-FEASIBILITY.md) for research limitations.


## Confirmed folder and filename convention — 9 October 2026

CJ confirmed the Group 1 file convention and ambiguity gate on 9 October 2026. Working projects are on his computer and sync as whole project folders to Google Drive; GemOS scans the synced Drive copy. Use PROJECT (FLP and exported project ZIP), AUDIO (Remix WAV, Type Beat WAV and Type Beat MP3), Stems (stems ZIP), Artwork (thumbnail and main YouTube video), and Shorts (01–06). No bracket prefixes or separate Tagged file. The seven required categories are Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and six Shorts. The exported FL Studio project ZIP is required for a finished release; FLP and Beat WAV are additional files outside the seven. Strict filename matching ignores capitalisation and checks designated project/folder/type plus the case-insensitive literal (WIP) exclusion. A likely typo does not automatically pass: show Needs confirmation; CJ may confirm the candidate or rename and rescan. A confirmed candidate is associated by Drive file ID so later renames retain the association, with type/WIP checks retained. If the unresolved candidate is the only candidate for a required asset, pause new scheduling/publication; an extra similar file does not block an eligible exact match. Do not automatically cancel previously confirmed scheduled uploads. Existing no-access/failed-scan/stale-result distinctions remain. This records requirements, not a working scanner or publisher. Manifest storage/UI, fuzzy-match threshold, archive-content verification, deeper file validation and policy for already-scheduled uploads remain open.

This is the agreed Teeth & Claws target structure, not evidence these files already exist:

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

Expected names belong to each project's manifest: the beat artist pairing may differ from the remix artist, and artwork/Shorts names omit the artist. Do not derive every filename from one universal artist/title string. The present stems are not exported and CJ has no laptop access; keep that category missing without blocking a read-only import test or inventing readiness. Metadata eligibility does not prove creative correctness or archive contents. Candidate matching must remain within the designated project and expected asset type; a confirmed file ID must still be accessible and pass the required location/type/WIP checks.
