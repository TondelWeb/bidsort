// BidSort clickable demo. Runs entirely in memory: reload or "Restart demo" puts every
// screen back to the same starting state, so each recording take is identical.
import { BIDS, SOURCES, TRADES, matches, tradesOf, type Bid, type TradeKey } from '../data/sample-bids';

type Step = 'welcome' | 'scanning' | 'feed' | 'detail' | 'alert' | 'done';
type Channel = 'text' | 'email';
type Freq = 'daily' | 'instant';

interface State {
  step: Step;
  trade: TradeKey | null;
  radius: number;
  tab: 'mine' | 'all';
  bidId: string | null;
  channel: Channel | null;
  freq: Freq | null;
  error: string | null;
}

const START: State = {
  step: 'welcome',
  trade: null,
  radius: 60,
  tab: 'mine',
  bidId: null,
  channel: null,
  freq: null,
  error: null,
};

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2).replace(/0$/, '')}M` : `$${Math.round(n / 1000)}k`;

const dateIn = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
const shortDateIn = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
const daysLeft = (n: number) => (n === 1 ? '1 day left' : `${n} days left`);

const tradeLabel = (k: TradeKey) => TRADES.find((t) => t.key === k)!.label;
const byDue = (a: Bid, b: Bid) => a.dueInDays - b.dueInDays;

const icon = {
  restart:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/></svg>',
  ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
};

export function mountDemo(root: HTMLElement) {
  const view = root.querySelector<HTMLElement>('[data-view]')!;
  const standalone = root.dataset.standalone === 'true';
  const formHref = root.dataset.formHref ?? '#tell-us';
  // Heading levels: h2/h3 on the full-screen /demo page, h3/h4 inside the landing page section.
  const H = standalone ? 'h2' : 'h3';
  const H4 = standalone ? 'h3' : 'h4';
  let state: State = { ...START };
  let timers: number[] = [];

  const set = (patch: Partial<State>, moveFocus = true) => {
    state = { ...state, ...patch };
    render(moveFocus);
  };

  const restart = () => {
    timers.forEach(clearTimeout);
    timers = [];
    set({ ...START });
  };

  const mine = () => (state.trade ? BIDS.filter((b) => matches(b, state.trade!, state.radius)).sort(byDue) : []);

  // ---------- screens ----------
  const welcome = () => `
    <div class="bsd-pad">
      <${H} class="bsd-h" tabindex="-1" data-focus>What trade do you bid?</${H}>
      <p class="bsd-sub">Pick one. BidSort checks ${SOURCES.length} NC bid sites for this week's new public jobs and keeps only yours.</p>
      <div class="bsd-chips" role="group" aria-label="Your trade">
        ${TRADES.map(
          (t) => `<button type="button" class="bsd-chip" data-trade="${t.key}" aria-pressed="${state.trade === t.key}">${t.label}</button>`,
        ).join('')}
      </div>
      <div class="bsd-area">
        <span class="bsd-area-label">${icon.pin} Area</span>
        <label class="bsd-select">
          <span class="bsd-vh">Distance</span>
          <select data-radius>
            ${[30, 60, 100].map((r) => `<option value="${r}" ${state.radius === r ? 'selected' : ''}>Within ${r} mi</option>`).join('')}
          </select>
        </label>
        <span>of Raleigh, NC</span>
      </div>
      ${state.error ? `<p class="bsd-error" role="alert">${state.error}</p>` : ''}
      <button type="button" class="bsd-go" data-show>Show my bids</button>
    </div>`;

  const scanning = (done: number) => `
    <div class="bsd-pad">
      <${H} class="bsd-h" tabindex="-1" data-focus>Checking ${SOURCES.length} bid sites…</${H}>
      <ul class="bsd-scan" aria-live="polite">
        ${SOURCES.map(
          (src, i) => `<li class="${i < done ? 'is-done' : ''}">${i < done ? icon.check : '<span class="bsd-dot"></span>'} ${src}</li>`,
        ).join('')}
      </ul>
    </div>`;

  const matchedSpec = (b: Bid) => (state.trade ? b.specs.find((s) => s.trade === state.trade) : undefined);

  const card = (b: Bid) => {
    const m = matchedSpec(b);
    return `
    <li>
      <button type="button" class="bsd-card is-match" data-bid="${b.id}">
        <span class="bsd-card-top">
          <span class="bsd-card-title">${b.title}</span>
          <span class="bsd-due tabular">${daysLeft(b.dueInDays)}</span>
        </span>
        <span class="bsd-card-meta">${b.agency}${b.agency.includes(b.place) ? '' : `, ${b.place}`} <span class="bsd-muted">(${b.milesFromRaleigh} mi)</span></span>
        <span class="bsd-card-foot">
          <span class="bsd-tag">Matched: ${m ? `${m.code} ${m.name}` : tradeLabel(state.trade!)}</span>
          <span class="bsd-muted tabular">Due ${shortDateIn(b.dueInDays)}<span aria-hidden="true">, </span>est. ${money(b.value)}</span>
          <span class="bsd-src">From ${b.source}</span>
        </span>
      </button>
    </li>`;
  };

  const row = (b: Bid) => {
    const isMatch = state.trade ? matches(b, state.trade, state.radius) : false;
    return `
    <li>
      <button type="button" class="bsd-row ${isMatch ? 'is-match' : ''}" data-bid="${b.id}">
        <span class="bsd-row-title">${b.title}${isMatch ? ' <span class="bsd-vh">(matches your trade)</span>' : ''}</span>
        <span class="bsd-row-meta">${b.agency} <span class="bsd-muted">${b.source}</span></span>
        <span class="bsd-row-due tabular">Due ${shortDateIn(b.dueInDays)}</span>
      </button>
    </li>`;
  };

  const feed = () => {
    const list = mine();
    const all = [...BIDS].sort(byDue);
    const t = tradeLabel(state.trade!);
    const body =
      state.tab === 'mine'
        ? list.length
          ? `<ul class="bsd-cards">${list.map(card).join('')}</ul>`
          : `<div class="bsd-empty"><p>No new ${t.toLowerCase()} bids within ${state.radius} mi this week.</p>
             <button type="button" class="bsd-link" data-widen>Show bids within 100 mi</button></div>`
        : `<ul class="bsd-rows">${all.map(row).join('')}</ul>`;
    return `
      <div class="bsd-pad bsd-pad-tight">
        <${H} class="bsd-h bsd-h-sm" tabindex="-1" data-focus>
          <span class="tabular">${BIDS.length}</span> new public bids this week. <span class="bsd-flagtext"><span class="tabular">${list.length}</span> match ${t} within ${state.radius} mi.</span>
        </${H}>
        <div class="bsd-tabs" role="tablist" aria-label="Which bids to show">
          <button type="button" role="tab" id="bsd-tab-mine" aria-controls="bsd-panel" aria-selected="${state.tab === 'mine'}" data-tab="mine">My trade (${list.length})</button>
          <button type="button" role="tab" id="bsd-tab-all" aria-controls="bsd-panel" aria-selected="${state.tab === 'all'}" data-tab="all">All bids (${BIDS.length})</button>
        </div>
      </div>
      <div class="bsd-scroll" id="bsd-panel" role="tabpanel" aria-labelledby="bsd-tab-${state.tab}" tabindex="0">${body}</div>`;
  };

  const detail = () => {
    const b = BIDS.find((x) => x.id === state.bidId)!;
    const mineTrade = state.trade!;
    return `
      <div class="bsd-pad">
        <button type="button" class="bsd-back" data-goto="feed">${icon.back} Back to my bids</button>
        <p class="bsd-kicker">${b.agency}<span aria-hidden="true">, </span>${b.number}</p>
        <${H} class="bsd-h" tabindex="-1" data-focus>${b.title}</${H}>
        <dl class="bsd-facts">
          <div><dt>Bid due</dt><dd class="tabular">${dateIn(b.dueInDays)} <span class="bsd-due">${daysLeft(b.dueInDays)}</span></dd></div>
          <div><dt>Pre-bid meeting</dt><dd>${
            b.prebid
              ? `${dateIn(b.prebid.inDays)}, ${b.prebid.where}${b.prebid.mandatory ? ' <strong>(mandatory)</strong>' : ''}`
              : 'None scheduled'
          }</dd></div>
          <div><dt>Estimated value</dt><dd class="tabular">${money(b.value)}</dd></div>
          <div><dt>Location</dt><dd>${b.place}, ${b.milesFromRaleigh} mi from Raleigh</dd></div>
          <div><dt>Planholders</dt><dd>${b.planholders} companies so far</dd></div>
          <div><dt>Found on</dt><dd>${b.source}</dd></div>
        </dl>
        <${H4} class="bsd-h4">Scope</${H4}>
        <p class="bsd-scope">${b.scope}</p>
        <${H4} class="bsd-h4">Spec sections</${H4}>
        <ul class="bsd-specs">
          ${b.specs
            .map(
              (s) =>
                `<li class="${s.trade === mineTrade ? 'is-match' : ''}"><span class="tabular">${s.code}</span> ${s.name}${
                  s.trade === mineTrade ? ' <span class="bsd-tag">Your trade</span>' : ''
                }</li>`,
            )
            .join('')}
        </ul>
        <div class="bsd-actions">
          <button type="button" class="bsd-go" data-goto="alert">${icon.bell} Alert me about jobs like this</button>
          <button type="button" class="bsd-ghost" disabled>${icon.ext} Open on ${b.source} (not in demo)</button>
        </div>
      </div>`;
  };

  const radio = (name: string, value: string, label: string, hint: string, checked: boolean) => `
    <label class="bsd-radio">
      <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''} />
      <span><strong>${label}</strong><span class="bsd-muted">${hint}</span></span>
    </label>`;

  const alertSetup = () => {
    const t = tradeLabel(state.trade!);
    return `
      <div class="bsd-pad">
        <button type="button" class="bsd-back" data-goto="${state.bidId ? 'detail' : 'feed'}">${icon.back} Back</button>
        <${H} class="bsd-h" tabindex="-1" data-focus>Get alerts for jobs like this</${H}>
        <p class="bsd-sub">New <strong>${t.toLowerCase()}</strong> bids within <strong>${state.radius} mi of Raleigh</strong>. Nothing else.</p>
        <fieldset class="bsd-field">
          <legend>Send alerts by</legend>
          ${radio('bsd-channel', 'text', 'Text message', 'To your phone', state.channel === 'text')}
          ${radio('bsd-channel', 'email', 'Email', 'To your inbox', state.channel === 'email')}
        </fieldset>
        <fieldset class="bsd-field">
          <legend>How often</legend>
          ${radio('bsd-freq', 'daily', 'Every morning at 6 AM', 'One summary of new bids', state.freq === 'daily')}
          ${radio('bsd-freq', 'instant', 'As soon as a bid posts', 'One alert per bid', state.freq === 'instant')}
        </fieldset>
        ${state.error ? `<p class="bsd-error" role="alert">${state.error}</p>` : ''}
        <button type="button" class="bsd-go" data-alert-on>Turn on alert</button>
      </div>`;
  };

  const done = () => {
    const t = tradeLabel(state.trade!).toLowerCase();
    const list = mine();
    const picks = (state.freq === 'instant' ? list.slice(0, 1) : list.slice(0, 2)).map(
      (b) => `${b.agency.replace('Public School System', 'Schools')}: ${b.title}, due ${shortDateIn(b.dueInDays)}`,
    );
    const head =
      state.freq === 'instant'
        ? `New ${t} bid near Raleigh`
        : `${picks.length} new ${t} bid${picks.length === 1 ? '' : 's'} near Raleigh`;
    const when = state.freq === 'instant' ? 'When a bid posts' : 'Tomorrow, 6:00 AM';
    const preview =
      state.channel === 'email'
        ? `<div class="bsd-email" aria-label="Example alert email">
             <p class="bsd-muted">${when}</p>
             <p><strong>From:</strong> BidSort<br/><strong>Subject:</strong> ${head}</p>
             <ul>${picks.map((p) => `<li>${p}</li>`).join('')}</ul>
           </div>`
        : `<div class="bsd-phone" aria-label="Example alert text message">
             <p class="bsd-muted">${when}</p>
             <div class="bsd-bubble"><strong>BidSort:</strong> ${head}.<br/>${picks.map((p) => `• ${p}`).join('<br/>')}<br/>Tap to see the details.</div>
           </div>`;
    return `
      <div class="bsd-pad">
        <p class="bsd-ok">${icon.check} Alert is on</p>
        <${H} class="bsd-h" tabindex="-1" data-focus>Here's what you'd get</${H}>
        ${preview}
        <div class="bsd-end">
          <p><strong>That's BidSort.</strong> Would you use it?</p>
          <div class="bsd-actions">
            <a class="bsd-go" href="${formHref}" ${standalone ? '' : 'data-to-form'}>Answer 3 quick questions</a>
            <button type="button" class="bsd-ghost" data-restart>${icon.restart} Restart demo</button>
          </div>
        </div>
      </div>`;
  };

  // ---------- render ----------
  function render(moveFocus = true) {
    const html: Record<Step, () => string> = {
      welcome,
      scanning: () => scanning(0),
      feed,
      detail,
      alert: alertSetup,
      done,
    };
    view.innerHTML = html[state.step]();
    root.dataset.step = state.step;
    if (moveFocus) {
      view.querySelector<HTMLElement>('[data-focus]')?.focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top;
      if (top < 0) root.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
    }
  }

  function runScan() {
    set({ step: 'scanning', error: null });
    if (reduceMotion()) {
      set({ step: 'feed', tab: 'mine' });
      return;
    }
    // Tick each source off in turn. Only the list items change; the heading keeps focus.
    SOURCES.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          if (state.step !== 'scanning') return;
          const li = view.querySelectorAll('.bsd-scan li')[i];
          if (!li) return;
          li.classList.add('is-done');
          li.querySelector('.bsd-dot')?.insertAdjacentHTML('afterend', icon.check);
          li.querySelector('.bsd-dot')?.remove();
        }, 110 * (i + 1)),
      );
    });
    timers.push(window.setTimeout(() => state.step === 'scanning' && set({ step: 'feed', tab: 'mine' }), 110 * SOURCES.length + 350));
  }

  // ---------- events ----------
  root.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('button, a');
    if (!el || !root.contains(el)) return;
    const d = el.dataset;
    if (d.restart !== undefined) return restart();
    if (d.trade) {
      set({ trade: d.trade as TradeKey, error: null }, false);
      view.querySelector<HTMLElement>(`[data-trade="${d.trade}"]`)?.focus();
      return;
    }
    if (d.show !== undefined) {
      if (!state.trade) return set({ error: 'Pick a trade first.' }, false);
      return runScan();
    }
    if (d.tab) {
      set({ tab: d.tab as State['tab'] }, false);
      view.querySelector<HTMLElement>(`[data-tab="${d.tab}"]`)?.focus();
      return;
    }
    if (d.widen !== undefined) return set({ radius: 100 });
    if (d.bid) return set({ step: 'detail', bidId: d.bid });
    if (d.goto) return set({ step: d.goto as Step, error: null });
    if (d.alertOn !== undefined) {
      if (!state.channel) return set({ error: 'Choose text or email.' }, false);
      if (!state.freq) return set({ error: 'Choose how often you want alerts.' }, false);
      return set({ step: 'done', error: null });
    }
    if (d.toForm !== undefined) {
      const target = document.querySelector('#tell-us');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
        history.replaceState(null, '', '#tell-us');
        target.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      }
    }
  });

  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement | HTMLSelectElement;
    if (t.matches('[data-radius]')) state = { ...state, radius: Number(t.value) };
    if (t.name === 'bsd-channel') state = { ...state, channel: t.value as Channel, error: null };
    if (t.name === 'bsd-freq') state = { ...state, freq: t.value as Freq, error: null };
  });

  // Tab bar arrow keys (WAI-ARIA tabs pattern).
  root.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    if (t.getAttribute('role') !== 'tab' || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const next = state.tab === 'mine' ? 'all' : 'mine';
    set({ tab: next }, false);
    view.querySelector<HTMLElement>(`[data-tab="${next}"]`)?.focus();
  });

  // "R" restarts: anywhere on the standalone /demo page, or while focus is inside the demo.
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 'r' || e.ctrlKey || e.metaKey || e.altKey) return;
    const a = document.activeElement as HTMLElement | null;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
    if (!standalone && !(a && root.contains(a))) return;
    e.preventDefault();
    restart();
  });

  render(false);

  // Exposed for testing in the browser console.
  (root as HTMLElement & { bidsort?: unknown }).bidsort = { restart, state: () => state, tradesOf };
}
