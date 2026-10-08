> Historical pre-folder document. Start at docs/dashboard/README.md for current files.

# Group 1 — release buffer and readiness

Updated 8 October 2026. Visual reference finalised by CJ for this review; live connections are not implemented. Preserve the accepted HTML. Shared design: [master design system](../../../../docs/DESIGN_SYSTEM.md).

## 1.1 Release Buffer

**Purpose:** show how long the confirmed release schedule covers CJ, and which projects come next.

- Display up to three projects, with name, relevant dates and Next Up / Scheduled / In Progress. Show all opens the remaining projects without changing the card height.
- Scheduled means the main video and six source shorts meet the scheduling requirement. The six shorts run Tuesday–Sunday. Next Up is the first ready project; an unfinished first project remains In Progress. Ready statuses use restrained green; In Progress stays neutral.
- Count consecutive covered future calendar weeks in Europe/London. Stop at the first gap or unfinished week. Derive You're good until from the last confirmed scheduled publication in the covered stretch; account for current-week coverage where applicable. Later bookings beyond a gap must not imply uninterrupted cover.
- Empty: No upcoming projects. Footer route: Release management →.

### Connection and data contract

| Needed information | Intended source | Status |
|---|---|---|
| Project ID, artist/title, release dates and required uploads | Release records/manifest | Data model and authoritative store not settled in this card review. |
| Scheduled times, destination, source clip and platform post IDs | Scheduling records backed by platform/scheduler confirmation | No integration tested. A requested schedule is not proof of acceptance or publication. |
| Buffer count, first ready project and coverage date | GemOs calculations from verified records | Agreed behaviour; example records only in HTML. |

The exact required platform set for a project to count as fully scheduled must be confirmed. One source short reused across platforms is not one platform upload. A failed refresh must preserve last-known records with visible freshness; stale-data trust thresholds remain unsettled. This preview does not publish anything.

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
| Whether an asset is final/eligible | Agreed unfinished marker and/or approval metadata | Needs exact detection rule. CJ described (WIP) as excluding unfinished files; filename/location matching, case rules and approval handling still need specification. |
| Seven-part count and missing labels | GemOs validation of the required manifest | Agreed presentation; cannot infer quality or approval from presence alone. |
| Last successful check and errors | Import/job records | No live freshness state yet. |

An FLP is not one of the seven visible parts and must not be assumed final just because saved. Do not silently add an eighth requirement. A scan must distinguish missing files from no access, scan failure and stale results. File format/quality validation beyond metadata remains to agree.

## Implementation boundary and open decisions

The existing standalone HTML is a design reference with examples, not a functioning release manager or Drive integration. Google Drive detection/matching, authoritative release store, required platform set, stale-data threshold and upload failure handling must be decided before live implementation.

Group 1's accepted visual layout does not need redesign to document these connections. Use [the plan](../../../../docs/dashboard/PLAN.md) for review order and [API feasibility](../../../../docs/dashboard/ANALYTICS-FEASIBILITY.md) for research limitations.
