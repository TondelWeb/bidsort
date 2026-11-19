# BidSort explainer video: 30 seconds, screen + voice only

**Record from:** https://tondelweb.github.io/bidsort/demo
**Trade used:** Concrete, within 60 mi of Raleigh. This is the default distance, so you don't change it.
**Restart:** press **R** (or click **Restart demo**, top right) to go back to the same first screen every time. The "Sample data" label stays visible in the top bar the whole time.

## Script and timed clicks
### Voiceover (read straight through)
> Small subcontractors spend hours searching different websites for public construction bids, and many of the bids they find don't even match their trade.
>
> BidSort puts North Carolina public bids in one place.
>
> Pick your trade and area, and it filters out the rest, so you only see bids that match your work.
>
> Then it sends you an alert when a new bid matches, so you never miss one.

### Timed clicks
| Time | Part | Click | Say | What appears on screen |
|---|---|---|---|---|
| 0:00–0:09 | Problem | Nothing. Mouse still. | "Small subcontractors spend hours searching different websites for public construction bids, and many of the bids they find don't even match their trade." | "What trade do you bid?" with 8 trade buttons |
| 0:09–0:12 | Solution | Nothing yet. | "BidSort puts North Carolina public bids in one place." | Same screen |
| 0:12–0:20 | Pick a trade → matching bids | Click **Concrete** on "trade". Hover over **Within 60 mi** on "area". Click **Show my bids** on "filters out the rest". On "match your work", click the first card (**Sidewalk & ADA ramp replacement**). | "Pick your trade and area, and it filters out the rest, so you only see bids that match your work." | "Checking 8 bid sites…", then **"24 new public bids this week. 6 match Concrete within 60 mi."** and 6 orange-edged cards, then the bid's details |
| 0:20–0:28 | Alert preview | Click **Alert me about jobs like this**, then **Text message**, then **Every morning at 6 AM**, then **Turn on alert**. | "Then it sends you an alert when a new bid matches, so you never miss one." | Alert setup, then "Alert is on" with a text-message preview of 2 new concrete bids |
| 0:28–0:30 | End | Nothing. Hold still. | (silence) | The text preview |

About 65 words, so say it at a calm, steady pace. A second or two over 30 is fine; trim dead air at the start and end afterwards.

Why you click a bid card: the demo's alert button sits on the bid details screen. Click the card at the end of the "match your work" line without stopping, so the alert line starts right on that screen.

## Set up the screen (once)
1. Open Chrome and drag its window onto your **1920×1080 monitor** (the second screen, not the 2560 one).
2. Close any other Chrome windows. OBS grabs the Chrome window titled "BidSort demo", and with other Chrome windows open it can pick the wrong one.
3. Go to **https://tondelweb.github.io/bidsort/demo**.
4. Press **F11** for full screen. Then press **Ctrl** and **+** until the zoom shows **125%** (Ctrl+0 resets it). At this size every button fits on screen and you never need to scroll. I tested this.
5. Turn on **Do Not Disturb**: click the bell or clock at the bottom right of the taskbar.

## Record
1. Open **OBS**. In **Scenes** (bottom left) click **BidSort Recording**.
2. **Mic check:** say a few words. The **Mic/Aux** bar in the **Audio Mixer** (bottom middle) should jump into green or yellow. If it stays flat, see "Mic not moving" below.
3. Click once on the demo page, then press **R**. You're on "What trade do you bid?" with nothing selected.
4. Start recording: press **Ctrl+Alt+R** (your OBS hotkey; it works while Chrome is in front), or click **Start Recording** in OBS.
5. Wait one second, then follow the table above.
6. Stop: press **Ctrl+Alt+R** again (or **Stop Recording** in OBS).
7. Messed up? Press **R** in the demo and record another take. Every take starts identical.

**Where the file goes:** `C:\Users\Lucas.TONDEL\Videos\Presentation Recordings`, named like `Presentation 2026-11-19 16-05-12.mp4`. In OBS, **File → Show Recordings** opens that folder.

**Mic not moving:** OBS uses your Windows default microphone (currently the **Arctis Nova 7X**). Check that the headset is on and unmuted, then right-click the Mic/Aux bar → **Properties** → pick the right device.

## After recording
1. Play the file back and check the sound.
2. If needed, trim the start and end in **Clipchamp** (built into Windows): drag the file in, trim, then **Export → 1080p**.
3. Upload at **studio.youtube.com** → **Create → Upload videos**:
   - Title: "BidSort in 30 seconds".
   - Audience: "No, it's not made for kids".
   - Under **Show more**, leave **Allow embedding** checked so the video can play on the site.
   - Visibility: **Unlisted** → **Save**.
4. Copy the video link, e.g. `https://youtu.be/AbC123xYz_0`. The ID is the part after `youtu.be/` (or after `v=`).
5. Open `src/config.ts` and paste the ID between the quotes on line 5:
   ```ts
   export const VIDEO_ID = 'AbC123xYz_0';
   ```
6. Save, then commit and push (or ask Claude to). The live site updates in about a minute and the "coming soon" box becomes the video.
