// Screenshots at 375/768/1440, axe on every page and every demo screen, R-key restart check.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW);
const axeSrc = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const URL = 'http://localhost:4399';
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const b = await chromium.launch({ channel: 'chrome' });
let total = 0;
const axeRun = async (p, label) => {
  await p.evaluate(axeSrc);
  const r = await p.evaluate((t) => axe.run(document, { runOnly: { type: 'tag', values: t } }), tags);
  for (const v of r.violations) { total++; console.log('AXE', label, v.id, v.impact, v.nodes.length, v.nodes[0].target.join(' ')); }
};
for (const vp of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
  const ctx = await b.newContext({ viewport: vp });
  const p = await ctx.newPage();
  await p.goto(URL + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `screenshots/home-${vp.width}.png`, fullPage: true });
  await axeRun(p, `${vp.width} /`);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) console.log('OVERFLOW', vp.width, overflow);
  // Walk the demo on /demo and run axe on each screen.
  await p.goto(URL + '/demo', { waitUntil: 'networkidle' });
  const d = p.locator('[data-bsd]');
  await axeRun(p, `${vp.width} demo:welcome`);
  await d.getByRole('button', { name: 'Concrete' }).click();
  await d.getByRole('button', { name: 'Show my bids' }).click();
  await p.waitForFunction(() => document.querySelector('[data-bsd]').dataset.step === 'feed');
  await axeRun(p, `${vp.width} demo:feed`);
  await p.screenshot({ path: `screenshots/demo-feed-${vp.width}.png` });
  await d.getByRole('tab', { name: /All bids/ }).click();
  await axeRun(p, `${vp.width} demo:all`);
  await d.getByRole('tab', { name: /My trade/ }).click();
  await d.locator('.bsd-card').first().click();
  await axeRun(p, `${vp.width} demo:detail`);
  await d.getByRole('button', { name: /Alert me/ }).click();
  await d.getByLabel(/Text message/).check();
  await d.getByLabel(/Every morning/).check();
  await axeRun(p, `${vp.width} demo:alert`);
  await d.getByRole('button', { name: 'Turn on alert' }).click();
  await axeRun(p, `${vp.width} demo:done`);
  await p.screenshot({ path: `screenshots/demo-done-${vp.width}.png` });
  await p.keyboard.press('r');
  const step = await d.getAttribute('data-step');
  console.log(vp.width, 'after R:', step);
  await ctx.close();
}
await b.close();
console.log('axe violations:', total);
