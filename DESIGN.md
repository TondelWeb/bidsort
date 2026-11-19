# BidSort: design

## Idea
A plan room and a survey flag. Public bids arrive as long, grey, same-looking lists, and BidSort marks the few that are yours in bright survey-flag orange. The one memorable thing is the **sort**: the hero shows a week's bid sheet where the rows that aren't yours fade out and your rows get flagged. Everything else stays quiet.

## Color
| Token | Hex | Use |
|---|---|---|
| vellum | `#E8EDF1` | page background (cool drafting paper, not cream) |
| sheet | `#FFFFFF` | app surface, form, cards that hold data |
| ink | `#13243B` | text, header, dark bands (blueprint navy) |
| slate | `#4E6178` | secondary text (5.4:1 on vellum) |
| rule | `#B5C3D1` | lines, borders, blueprint grid |
| flag | `#FF6B1A` | matched bids, primary button fill (ink text on it, 5.5:1) |
| flag-ink | `#B8400A` | orange text on light backgrounds (4.7:1 on vellum) |

## Type
- **Archivo Variable**, set condensed (`font-stretch: 72%`) and heavy (800) for headlines, like jobsite signage. It's also used at normal width for UI labels in the demo.
- **IBM Plex Sans Variable** for body copy. It's technical and readable.
- Numbers (due dates, values) use `font-variant-numeric: tabular-nums`, not a monospace font.
- Scale (1.25): 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 px. Body text is 17–18 px with 1.6 line height, and lines stay under 70 characters.

## Layout
- Left-aligned throughout. The page is 1200 px max with 16 px side gutters on mobile.
- Hero: copy on the left, the bid sheet on the right. On mobile the sheet stacks under the copy and is shortened.
- "How it works" is a real 3-step sequence, so it gets numbers, shown as a horizontal line on desktop and vertical on mobile.
- Demo and video sit side by side (60/40) on desktop. On mobile the video comes first.

## Principles
- Only matched bids are orange. Orange always means "this one's yours."
- Square-ish corners (4 px) on data surfaces, with no drop-shadow kit.
- Only one motion plays without user input: the hero sort, played once. Everything else moves only in response to a click. `prefers-reduced-motion` shows the end state.
- Plain copy, sentence case, no all-caps labels, no arrows tacked onto buttons.
- Icons are Lucide.
