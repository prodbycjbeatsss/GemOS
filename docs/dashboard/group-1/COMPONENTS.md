# Group 1 component contracts

Current 10 October 2026. Reuse materials and behaviour; keep list/checklist content distinct.

| Component | Purpose and anatomy | States/content | Accessibility and responsive contract |
|---|---|---|---|
| Spotlight pair | Glyph, header, matched recess, one footer | Loading/empty/partial/populated reserve group geometry; no filler | Shared largest measured dimensions, mobile stack/desktop pair; both grow for text |
| Asset tile | Icon, name, muted type, symbol | Pass ✓, Missing ×, attention !, unchecked - | Native button, full category/status accessible; two columns, four rows; no inline links |
| Empty state | Quiet 58px icon shell, short headline, supporting copy | Truthful empty/unconnected; no fabricated zero | Centred in recess, readable wrapping; icon decorative when text conveys meaning |
| File dialog | Category icon, state, filenames, per-file text link, association controls when needed | Absent/unchecked/attention/pass; Shorts lists all files | Labelled native dialog, initial static-heading focus, Escape/Close/trigger return; 420px max, reachable sticky Close |
| Prepare release | Progress, metadata form, outstanding file actions, Shorts order, save/confirm | Incomplete drafts can save; confirmation checks fresh 8/8 and reviewed version | Labelled inputs, errors in status region, input limits; 560px max; 44px controls; no passed-file duplication |
| Release picker | Group headings, title/artist, selected tick | Busy disabled, failed selection restores prior saved state | Native buttons, selected aria-pressed, 44px targets; modal keyboard contract |
| Drive text link | Open folder/file with external arrow | Only valid stored IDs; missing IDs omit link | Fixed Google origin, descriptive aria-label, new tab noopener/noreferrer; 44px target, hover underline/focus outline |
| Footer | Sync/freshness left, contextual action right | Saved/stale/unchecked states explicit | No overlap; shared measured footer; actions may wrap |

Control states: default, focus, pressed (native feedback), disabled and busy. Do not use colour alone. Native dialog handles modal trapping; set initial static focus to avoid first-link scroll. Rendered contrast, focus/Android Back, text enlargement and hit-area separation still require device/browser checks. There is no new animation specification.
