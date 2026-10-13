# Group 4 — component contracts

| Component | Purpose and behaviour |
|---|---|
| Costs card | Compact454px cobalt material; headline/caption change with Subscriptions/API top-ups; fixed normal state slots and enlarged-text growth exception. |
| Month/category controls | Native44px controls with labels and aria-pressed; preserve category while top-ups hides those tabs; selected month supports2000–2099. |
| Recess list | All qualifying records, internal keyboard-focusable scroll, literal names and truthful empty/unavailable states; uniform30px logo containers/20px monochrome marks. |
| Footer | View switch left; single Manage subscriptions detail action right; no redundant Sync for manual records. |
| Management popup |85dvh native dialog; source list/Add/Edit forms, optional details, saved-version correction and archived-record restoration. Close/Escape/outside dismissal/focus return reuse shared behaviour. |
| Save state | Disabled controls during save, validated errors retained in form, owner-scoped persistence and409 stale-tab reload. |

Source:ui/costs.html,ui/costs.js,ui/subscription-model.mjs,server/subscriptions.mjs. Calculations and records follow [SPECIFICATION](SPECIFICATION.md).


### 13 October screenshot correction

Selected view surfaces are28px high inside44px targets, centred with12px corners and #ffffff1a fill on both card and manager. The hit target remains large while the fill clears the footer divider. Close-footer background is transparent, without a separate gradient/band or negative inset; matches accepted Sales-dialog footer treatment. Logo lookup recognises provider plan suffixes and Google AI Pro/Ultra. Existing uniform mark/container geometry remains. Refreshed rendered acceptance pending.
