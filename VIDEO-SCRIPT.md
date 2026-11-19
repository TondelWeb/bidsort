# BidSort explainer video: script and recording guide (60–90 s)

## Script (about 80 seconds)
| Time | On screen | Say |
|---|---|---|
| 0–10 s | Welcome screen (or your face) | "If you're a subcontractor in North Carolina, finding public jobs probably means checking a dozen bid sites at night, and opening plan sets just to see if there's work in your trade." |
| 10–20 s | Welcome screen | "I talked to subs who spend three to five hours a week doing that. So I'm building BidSort." |
| 20–35 s | Click **Concrete**, then **Show my bids** | "You tell it your trade once. I'll pick concrete, within 60 miles of Raleigh." |
| 35–50 s | Click **All bids (24)**, scroll, click **My trade (6)** | "This week there were 24 new public bids across 8 sites. Here's all of them. And here's the 6 that are actually concrete work, with the due date and the spec section it matched." |
| 50–62 s | Click the top bid (Garner sidewalks) | "Open one and you get the scope, the pre-bid meeting and the due date, without digging through the plan set." |
| 62–75 s | **Alert me about jobs like this** → **Text message** → **Every morning at 6 AM** → **Turn on alert** | "Then turn on an alert. Every morning at 6 you get a text with only the new jobs in your trade." |
| 75–85 s | Text preview screen | "It's not built yet. Try the demo on this page, and if you'd use it, answer the three questions below." |

## Before you record
1. In PowerShell, in this folder: `npm run dev`. Then open **http://localhost:4321/demo** in Chrome. (Once the site is live you can use its /demo page instead.)
2. Make the Chrome window about 1440×900 and set zoom to 110% (Ctrl and +). Hide the bookmarks bar (Ctrl+Shift+B). Turn on Windows Do Not Disturb.
3. Install **OBS Studio** (free, obsproject.com). Add a source with **+ → Window Capture → Chrome** and check that your mic shows in the Audio Mixer. Under Settings → Video, use 1920×1080 at 30 fps.
4. Record a 5-second test and play it back to check the sound.

## Recording, click by click
1. Click once on the page, then press **R** to start clean.
2. Press **Start Recording** in OBS. Wait 1 second.
3. Say lines 1–2 on the welcome screen.
4. Click **Concrete**, pause one beat, then click **Show my bids**. The sites tick off for about a second.
5. Click **All bids (24)** and scroll slowly down once. Click **My trade (6)**.
6. Move the mouse over the orange "Matched: 03 30 00…" tag on the first card, then click that card.
7. Pause on the details for about 3 seconds while you say line 5.
8. Click **Alert me about jobs like this**, then **Text message**, then **Every morning at 6 AM**, then **Turn on alert**.
9. Hold on the text preview for 2 seconds and say the last line. Stop recording.
10. If you stumble, press **R** and do another take. The data is identical every time.

## After recording
1. Trim the start and end in **Clipchamp** (built into Windows). Keep it under 90 seconds.
2. Upload to YouTube. Set visibility to **Unlisted** and title it "BidSort in 90 seconds".
3. Copy the ID from the link (the part after `v=`), paste it into `VIDEO_ID` in `src/config.ts`, and push.
