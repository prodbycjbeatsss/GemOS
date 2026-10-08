# Group 1 — release buffer and readiness

Updated 9 October 2026. Visual reference finalised by CJ for this review; live connections are not implemented. Preserve the accepted HTML. Shared design: [master design system](../../DESIGN_SYSTEM.md).

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

Required platform set confirmed by CJ on 8 October 2026: A covered release week requires confirmed scheduling for one main YouTube video plus six Tuesday–Sunday source shorts on each of YouTube Shorts, TikTok and Instagram Reels: 19 platform uploads in total. All required destinations must qualify before the week counts towards the release buffer. Planned uploads, reminder-only tasks and submitted scheduling requests without acceptance confirmation do not qualify. One source short reused across platforms is three platform uploads. Real scheduling support and confirmation records remain untested; this decision defines the requirement, not a working connection. A failed refresh must preserve last-known records with visible freshness; stale-data trust thresholds remain unsettled. This preview does not publish anything.

## 1.2 Pre Release Checklist

**Purpose:** show whether release assets are ready for the automater, separate from scheduled/published status.

Seven required parts:

1. Master WAV.
2. Tagged MP3.
3. WAV stems.
4. ZIP release archive.
5. Thumbnail/artwork.
6. Main video.
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

CJ chose automatic file checks: an asset earns Pass when the correct project file exists, matches the required type and contains no literal (WIP) marker anywhere in its filename, checked case-insensitively. No separate manual approval is required. A marker such as (wip) or (WiP) excludes that file. Required sets must be complete: the Shorts part needs all six eligible source files; the WAV-stems part needs the required set defined by the project manifest. These checks establish file eligibility, not creative quality. Project matching, exact format validation and manifest details still need specification during scanner implementation; failed/no-access scans must not masquerade as missing files or a successful check.

An FLP is not one of the seven visible parts and must not be assumed final just because saved. Do not silently add an eighth requirement. A scan must distinguish missing files from no access, scan failure and stale results. File format/quality validation beyond metadata remains to agree.

## Implementation boundary and open decisions

The existing standalone HTML is a design reference with examples, not a functioning release manager or Drive integration. Google Drive detection/matching, authoritative release store, stale-data threshold and upload failure handling must be decided before live implementation.

Group 1's accepted visual layout does not need redesign to document these connections. Use [the plan](../PLAN.md) for review order and [API feasibility](../ANALYTICS-FEASIBILITY.md) for research limitations.
