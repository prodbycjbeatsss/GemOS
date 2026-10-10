# Eight-category Drive asset contract

Updated 10 October 2026. This page owns matching and scan behaviour. [PROJECTS](PROJECTS.md) owns discovery, reviews and moves; [Group 1 specification](../../group-1/SPECIFICATION.md) owns presentation.

| Role | Directory | Compatible files | Automatic role marker |
|---|---|---|---|
| Project | PROJECT | ZIP | [ZIP], project, release |
| Stems | STEMS | ZIP / 7z | stems / stem |
| Beat WAV | AUDIO | WAV | [BEAT], type beat, beat, tagged; excludes remix marker |
| Beat MP3 | AUDIO | MP3 | [BEAT], type beat, beat, tagged |
| Remix | AUDIO | WAV | [REMIX], remix |
| Thumbnail | ARTWORK | JPG / JPEG / PNG / WebP | thumbnail, artwork, cover |
| Main video | ARTWORK | MP4 | YouTube, main |
| Six Shorts | SHORTS | MP4 | Short 01–06 / Shorts 01–06 |

Directory names are case-insensitive. Exact filenames are not required; BPM/key/collaborator text and existing prefixes stay. Generic MIME does not prove format. Trashed, empty, incompatible extension/MIME and case-insensitive literal (WIP) files do not qualify. Duplicate designated subfolders require attention. Extra unrelated files do not defeat a unique eligible role match; ambiguous Shorts need explicit ordering. Role recognition is bounded, not an exhaustive metadata parser.

Clear unique marked candidates pass; otherwise select eligible IDs in the file popup. Confirmation rescans and validates IDs before saving. One file cannot satisfy Beat WAV and Remix WAV. Shorts require six unique clips; number slots sort 1–6, or explicit saved associations set Tuesday–Sunday order. Confirmed IDs survive renames while location/type/access/WIP remain revalidated.

Result stores category state/count, connected ID/name/modification time/size and candidate ID/name. Eight categories determine readiness; FLP is outside the total. Old seven-category results retain timestamp/associations but add Beat WAV Not checked and require Sync. No access/failed/incomplete scan does not become Missing; preserve successful saved checks with stale wording.

Drive metadata reads are fixed Google endpoints with at most four 100-file pages per folder. IncompleteSearch or excess pagination fails, rather than returning a false empty check. Inputs are bounded and owner-scoped; same-origin POSTs. Reads establish metadata eligibility, not creative correctness, file contents or archive completeness. Preparation rechecks snapshots; details are in PROJECTS.

Controlled verify-assets, verify-projects, verify-title, verify-layout and verify-project-ui cover eligibility/persistence/title/geometry/UI contracts. New verify-prepare covers fresh review and move guards. Historical 3/7 evidence was before Beat WAV became required; latest supplied Gelato screenshot was 4/8. Real ambiguous association restoration, full archive validation and newest mobile appearance remain pending.
