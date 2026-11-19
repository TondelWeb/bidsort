# BidSort idea-validation site

A one-page site for BidSort, a public-bid feed for NC subcontractors sorted by trade. Visitors read the idea, watch a short video, click through a demo with sample data, and answer 3 questions. See PRODUCT.md and DESIGN.md.

## Run it on your computer
```powershell
npm install
npm run dev
```
- Landing page: http://localhost:4321/
- Full-screen demo for recording: http://localhost:4321/demo (press R to restart)

## The two things you fill in: `src/config.ts`
| Setting | What to paste | Until then the page shows |
|---|---|---|
| `VIDEO_ID` | The YouTube ID, e.g. `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ` | "The 90-second video is coming soon" |
| `TALLY_FORM_ID` | The ID from your Tally share link, e.g. `wMdXyz` from `tally.so/r/wMdXyz` | A preview of the questions |

Save the file and push. The site redeploys by itself.

## Make the Tally form (about 15 minutes)
1. Go to tally.so, sign up free, and click **Create form**. Title it "BidSort".
2. Add these blocks:
   - **Multiple choice:** *How many hours a week do you spend finding public jobs to bid?* Options: Under 1 hour / 1–3 hours / 3–5 hours / More than 5 hours / I don't bid public jobs.
   - **Dropdown:** *What trade do you bid?* Options: Concrete, Electrical, Plumbing, HVAC, Roofing, Sitework, Painting, Masonry, General contractor, Other.
   - **Short answer:** *Where in NC do you usually bid?* (e.g. "Triangle", "Charlotte area")
   - **Multiple choice:** *If BidSort covered your trade and area, what would you do?* Options: Pay about $29/month for it / Use it only if it's free / Try it once / Not for me.
   - **Long answer (optional):** *Why?*
   - **Email (optional):** *Want updates or a spot in the pilot? Leave your email.*
   - **Hidden field** named `source`. The site fills it from the link, e.g. `?src=calls`.
3. **Publish**, copy the share link, and put the ID in `TALLY_FORM_ID`.
4. **Integrations → Google Sheets:** connect it so every answer lands in a sheet. Under **Settings**, turn on email notifications.
5. Submit one test answer from the live site and check it appears in the sheet.

**Reviewing answers:** once a week, sort the sheet by the "what would you do" column. Suggested signal to keep going: at least 10 answers from real subs, with at least 30% choosing "pay" or "use if free". Call everyone who chose "pay" and left an email.

**Track where answers come from:** share links like `.../bidsort/?src=calls`, `?src=class`, `?src=linkedin`.

## Record the video
See [VIDEO-SCRIPT.md](VIDEO-SCRIPT.md).

## Publish (GitHub Pages)
The repo has a workflow (`.github/workflows/deploy.yml`) that builds and publishes on every push to `main`. GitHub Pages needs the repo to be **public** on a free account. To turn it on: repo **Settings → Pages → Source: GitHub Actions**. The site lands at `https://<account>.github.io/bidsort/`.

## Checks before sharing
- `npm run build` passes.
- Screenshots at 375, 768 and 1440 px, axe, and demo walk-through: run `node .lh/check.mjs` against `npm run preview -- --port 4399`. It needs `PW` set to Playwright's path.
- Lighthouse on `/` and `/demo`.
- Open the live link on your phone.
