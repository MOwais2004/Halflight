// halflight — site.js (shared by every page; vanilla JS, only external script is Lenis for smooth scroll)

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad2 = n => String(n).padStart(2, '0');
const M = f => `media/${f}.webp`;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const PAGE = document.body.dataset.page;
let W = innerWidth, H = innerHeight;

/* =========================================================
   Content
   ========================================================= */
const CAT = { web: 'Web design', dev: 'Development', brand: 'Brand', marketing: 'Marketing' };
const PROJECTS = [
  { slug: 'northwake', name: 'Northwake', client: 'Northwake Outdoor Co.', sector: 'Retail', year: 2026, date: '06.2026', isNew: true, featured: true,
    cats: ['web', 'dev'], services: ['Web design', 'Shopify development', 'Art direction'], ratio: '4/5',
    line: 'a storefront as quiet as the fjords its jackets are made for.',
    brief: 'A Norwegian outerwear label outgrowing its template store. Beautiful product, a shop that felt like every other.',
    response: 'We replaced product grids with product stories: slow, editorial pages, one garment at a time, and a checkout that loads before you blink.',
    results: [['+212%', 'Online revenue, year on year'], ['0.9s', 'Largest contentful paint'], ['SOTD', 'Awwwards Site of the Day']],
    quote: ['They care about the details nobody asked for — and our customers notice.', 'Lea Brandt, Founder'] },
  { slug: 'duneform', name: 'Duneform', client: 'Duneform Architects', sector: 'Architecture', year: 2025, date: '11.2025', featured: true,
    cats: ['brand', 'web'], services: ['Brand identity', 'Website', 'Print'], ratio: '5/4',
    line: 'an identity drawn from floor plans for a practice that builds with earth.',
    brief: 'A desert-architecture practice with a body of work that deserved a monograph, not a portfolio template.',
    response: 'A typographic system built on the grid of their drawings, letterpress stationery, and project pages that read like printed books.',
    results: [['3×', 'Inbound enquiries'], ['14', 'Countries reached'], ['FWA', 'FWA of the Day']],
    quote: ['It finally looks the way our buildings feel.', 'Samir Haddad, Partner'] },
  { slug: 'lowtide', name: 'Lowtide', client: 'Lowtide Surf School', sector: 'Leisure', year: 2025, date: '08.2025',
    cats: ['marketing', 'brand'], services: ['Brand refresh', 'Campaigns', 'SEO'], ratio: '3/4',
    line: 'from page four to the first result — and a waiting list every summer.',
    brief: 'A much-loved surf school in Lisbon that nobody could find online.',
    response: 'A hand-painted identity refresh, a year-round content engine for social, and technical SEO that finally matched the reputation.',
    results: [['#1', '“Surf lessons Lisbon”'], ['+168%', 'In-season bookings'], ['41k', 'New followers']],
    quote: ['We stopped worrying about winter.', 'Rita Sousa, Owner'] },
  { slug: 'kotawa', name: 'Kotawa', client: 'Kotawa Finance', sector: 'Fintech', year: 2025, date: '05.2025', isNew: true, featured: true,
    cats: ['web', 'dev'], services: ['Product design', 'Design system', 'Development'], ratio: '1/1',
    line: 'calm, legible money tools for freelancers across Southeast Asia.',
    brief: 'A fintech whose onboarding lost half of its users before they saw the product.',
    response: 'A design system, a marketing site and a four-step onboarding written in plain language, shipped in six languages.',
    results: [['−38%', 'Onboarding drop-off'], ['6', 'Languages shipped'], ['100', 'Lighthouse accessibility']],
    quote: ['The only studio where designers and developers actually sit at the same table.', 'Aiko Tanaka, Chief Product Officer'] },
  { slug: 'tempo', name: 'Tempo', client: 'Tempo Watch Co.', sector: 'Lifestyle', year: 2025, date: '02.2025',
    cats: ['brand', 'marketing'], services: ['Naming', 'Identity', 'Launch campaign'], ratio: '4/5',
    line: 'named, drawn and launched — the first drop sold out in 41 hours.',
    brief: 'A direct-to-consumer watchmaker with a great movement and no name.',
    response: 'Naming, a restrained identity, and a launch campaign built around one idea: time you notice.',
    results: [['41h', 'First drop sold out'], ['6.2×', 'Return on ad spend'], ['D&AD', 'Wood Pencil']],
    quote: ['They gave us a name we’d be proud to engrave.', 'Jonas Weber, Co-founder'] },
  { slug: 'pale-orchard', name: 'Pale Orchard', client: 'Pale Orchard Cider', sector: 'Food & drink', year: 2024, date: '10.2024',
    cats: ['brand', 'web'], services: ['Packaging', 'Identity', 'E-commerce'], ratio: '4/3',
    line: 'from farmhouse to shelf, with a subscription that became half the business.',
    brief: 'A family cider farm ready to move from the farmers’ market to national shelves.',
    response: 'Labels with a quiet serif, an identity that works on a crate and a bottle, and a subscription shop.',
    results: [['52%', 'Revenue via subscription'], ['9', 'Retail listings won'], ['Gold', 'Pentawards']],
    quote: ['They heard what we meant, not what we said — and built it better than we dreamed.', 'Marta Silva, Founder'] },
  { slug: 'vessel-air', name: 'Vessel Air', client: 'Vessel Air', sector: 'Aviation', year: 2024, date: '04.2024', featured: true,
    cats: ['web', 'dev', 'marketing'], services: ['Website', 'WebGL', 'Launch campaign'], ratio: '3/4',
    line: 'an electric airline that launched on a billboard and a real-time aircraft.',
    brief: 'An electric regional airline needed to be believed before its first flight.',
    response: 'A launch site with a real-time WebGL aircraft and a route planner, and an out-of-home campaign: Fly quietly.',
    results: [['1.2M', 'Launch-week visits'], ['18k', 'Waitlist sign-ups'], ['CSSDA', 'Website of the Year']],
    quote: ['Launch week broke our servers. A very good problem to have.', 'Henrik Olsen, CEO'] },
  { slug: 'oblong-records', name: 'Oblong Records', client: 'Oblong Records', sector: 'Music', year: 2023, date: '09.2023',
    cats: ['web', 'brand'], services: ['Identity', 'Website', 'Merch'], ratio: '4/5',
    line: 'an independent label’s catalogue as a website you can listen to.',
    brief: 'A label with thirty years of records and a website that hid all of them.',
    response: 'A loud identity for the sleeves, and a site where every release gets its own listening room and merch drop.',
    results: [['6m 40s', 'Average session'], ['+74%', 'Merch revenue'], ['Webby', 'Honoree']],
    quote: ['People stay for the whole album now.', 'Kofi Mensah, Label head'] },
  { slug: 'fernhall', name: 'Fernhall', client: 'Fernhall Hotel & Gardens', sector: 'Hospitality', year: 2023, date: '03.2023',
    cats: ['web', 'marketing'], services: ['Website', 'Booking engine', 'Paid search'], ratio: '5/4',
    line: 'moving guests off the booking platforms, one season at a time.',
    brief: 'A boutique country hotel paying a fortune in platform commission.',
    response: 'A slower, more beautiful site, a direct booking engine and paid search that pays for itself every month.',
    results: [['+61%', 'Direct bookings'], ['−€84k', 'Commission per year'], ['4.2×', 'Return on ad spend']],
    quote: ['Direct bookings paid for the whole project in four months.', 'Tomás Duarte, General Manager'] },
];
const P = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
const fileKey = p => ({ 'pale-orchard': 'paleorchard', 'vessel-air': 'vesselair', 'oblong-records': 'oblong' })[p.slug] || p.slug;
const img1 = p => M(`${fileKey(p)}-1`), img2 = p => M(`${fileKey(p)}-2`);

const CREW = [
  ['Inês Marques', 'Founder, Creative Director'], ['Tomás Reis', 'Technical Director'], ['Amara Okafor', 'Head of Strategy'],
  ['Leo Brandt', 'Senior Designer'], ['Sofia Lindqvist', 'Brand Designer'], ['Kenji Watanabe', 'Creative Developer'],
  ['Maya Haddad', 'Growth Lead'], ['Daniel Costa', 'Motion Designer'], ['Clara Petit', 'Copywriter'],
  ['Hana Kim', 'Photographer'], ['Omar Diallo', 'Producer'], ['Elena Rossi', 'Studio Manager'],
].map(([name, role], i) => ({ name, role, img: M(`crew-${pad2(i + 1)}`) }));

const NEWS = [
  { date: 'September 18th, 2026', type: 'Award', title: 'Northwake is Awwwards Site of the Day', text: 'Our storefront for Northwake Outdoor Co. was recognised for its editorial product pages.', img: 'northwake-2' },
  { date: 'August 2nd, 2026', type: 'Event', title: 'Halflight Sessions #4', text: 'An evening of short talks at the studio on type, speed and saying no to carousels.', img: 'studio-1' },
  { date: 'June 21st, 2026', type: 'Interview', title: 'In conversation with It’s Nice That', text: 'Inês and Tomás on keeping design and engineering at one table.' },
  { date: 'April 9th, 2026', type: 'News', title: 'We’re hiring a senior designer', text: 'A permanent role in Lisbon for someone who loves typography as much as systems.' },
];

/* =========================================================
   Shared chrome: header, footer, cursor, page transition
   ========================================================= */
const LOGO = `<svg class="logo" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M1.4 14h25.2" stroke="currentColor" stroke-width="1.4"/><path class="logo__sun" d="M8.6 14a5.4 5.4 0 0 1 10.8 0z" fill="currentColor"/></svg>`;
const ICON = {
  arrow: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h11M9.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ur: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pin: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="7" r="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 14.5s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0c0 3.3 4.5 7.5 4.5 7.5z" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
};

function chrome() {
  const links = [['index.html', 'Home', 'home'], ['work.html', 'Work', 'work'], ['studio.html', 'Studio', 'studio'], ['contact.html', 'Contact', 'contact']];
  const here = PAGE === 'project' ? 'work' : PAGE;
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="pt" aria-hidden="true">${LOGO}</div>
    <div class="cursor" aria-hidden="true"><span></span></div>
    <header class="hd">
      <a class="hd__brand" href="index.html" aria-label="Halflight — home">${LOGO}<span class="hd__word">halflight</span></a>
      <nav class="hd__nav" aria-label="Main">${links.map(([h, t, k], i) =>
        `<a href="${h}"${k === here ? ' aria-current="page"' : ''}>${t}</a>${i < links.length - 1 ? '<span>,</span>' : ''}`).join('')}</nav>
    </header>`);
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="ft">
      <div class="ft__top">
        <div class="ft__col"><p class="sm mute">New business</p><a class="ft__mail ul" href="mailto:hello@halflight.studio">hello@halflight.studio</a><p class="sm">+351 21 000 0000</p></div>
        <div class="ft__col"><p class="sm ft__office">${ICON.pin}Lisbon studio</p><p class="sm mute">Rua das Flores 28, 2º<br>1200-195 Lisboa</p></div>
        <div class="ft__col"><p class="sm ft__office">${ICON.pin}London desk</p><p class="sm mute">Second Home, 68 Hanbury St<br>London E1 5JL</p></div>
        <div class="ft__col"><p class="sm mute">Follow</p><p class="sm ft__links"><a class="ul" href="#">Instagram</a><a class="ul" href="#">LinkedIn</a><a class="ul" href="#">Are.na</a></p></div>
        <div class="ft__col ft__news"><p class="sm mute">One letter a month</p>
          <form class="news" novalidate><input type="email" required placeholder="Email address" aria-label="Email address"><button type="submit" aria-label="Subscribe">${ICON.arrow}</button></form>
          <p class="news__msg sm mute" role="status" aria-live="polite"></p></div>
      </div>
      <div class="ft__word" aria-label="halflight">${[...'halflight'].map((c, i) => `<span style="--i:${i}" aria-hidden="true">${c}</span>`).join('')}</div>
      <div class="ft__bot sm"><span>© 2026 Halflight Studio, Lda.</span><span class="mute">Lisbon <span class="clock">--:--:--</span></span><a class="ul" href="#top">Back to top</a></div>
    </footer>`);
}
chrome();
document.body.id ||= 'top';

// Smooth, inertial scroll (Lenis). It drives the native scroll position, so sticky, scrollY and anchors keep working.
const lenis = window.Lenis && !reduced ? new Lenis({ lerp: .1, anchors: { offset: -80 } }) : null;
if (lenis) (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);

// Header condenses into a centred pill once you scroll (Antinomy)
const hd = $('.hd');
const onScrollHeader = () => hd.classList.toggle('is-pill', scrollY > 60);
addEventListener('scroll', onScrollHeader, { passive: true }); onScrollHeader();

// Page transitions: a white sheet with the logo wipes in, the next page wipes it away
const pt = $('.pt');
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-in')));
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname === location.pathname || a.getAttribute('href').startsWith('#') || /^mailto:|^tel:/.test(a.getAttribute('href'))) return;
  if (reduced) return;
  e.preventDefault();
  document.body.classList.add('is-leaving');
  setTimeout(() => { location.href = a.href; }, 520);
});
addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('is-leaving'); });

// Cursor
if (fine && !reduced) {
  const c = $('.cursor'), label = $('span', c);
  let cx = W / 2, cy = H / 2, px = cx, py = cy;
  addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; c.classList.add('is-live'); }, { passive: true });
  document.addEventListener('mouseleave', () => c.classList.remove('is-live'));
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor]');
    c.classList.toggle('is-big', !!t);
    if (t) label.textContent = t.dataset.cursor;
  });
  (function move() {
    cx = lerp(cx, px, .2); cy = lerp(cy, py, .2);
    c.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    requestAnimationFrame(move);
  })();
}

// Footer: live clock, newsletter, heavier letters near the cursor
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const tick = () => $$('.clock').forEach(el => { el.textContent = fmt.format(new Date()); });
tick(); setInterval(tick, 1000);
$('.news').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', e.target), msg = $('.news__msg');
  if (!input.checkValidity()) { msg.textContent = 'That email doesn’t look right.'; input.focus(); return; }
  // ponytail: no backend — connect to your newsletter provider
  msg.textContent = 'Thank you — see you next month.';
  e.target.reset();
});
// Footer wordmark: letters thicken like a wave around the cursor (needs the variable Switzer, 100-900)
const word = $('.ft__word'), letters = $$('span', word);
if (fine && !reduced) {
  let mx = null, raf = 0;
  const paint = () => { raf = 0; letters.forEach(s => {
    const r = s.getBoundingClientRect(), d = Math.abs(mx - (r.left + r.width / 2)) / (W * .22);
    s.style.setProperty('--w', Math.round(200 + 550 * Math.cos(Math.min(d, 1) * Math.PI / 2) ** 2));
  }); };
  word.addEventListener('pointermove', e => { mx = e.clientX; raf ||= requestAnimationFrame(paint); });
  word.addEventListener('pointerleave', () => letters.forEach(s => s.style.removeProperty('--w')));
}

/* =========================================================
   Reveal system (shared)
   ========================================================= */
function splitWords(el) {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (!t.trim()) return frag.append(' ');
        const w = document.createElement('span'); w.className = 'w';
        const s = document.createElement('span'); s.textContent = t; s.style.setProperty('--i', i++);
        w.append(s); frag.append(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeName !== 'BR') walk(n);
  });
  walk(el);
}
function reveal(root = document) {
  $$('[data-words]:not(.is-split)', root).forEach(el => { splitWords(el); el.classList.add('is-split'); });
  $$('[data-words], .rv, .ri', root).forEach(el => io.observe(el));
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
}), { threshold: .12, rootMargin: '0px 0px -5% 0px' });

/* Shared renderers */
const tagChips = p => `<ul class="chips">${p.isNew ? '<li class="chip chip--new">New</li>' : ''}<li class="chip">${p.sector}</li></ul>`;
const cardHTML = (p, i) => `
  <a class="card rv" href="project.html?p=${p.slug}" style="--d:${(i % 4) * 90}" data-cats="${p.cats.join(' ')}" data-cursor="View">
    <div class="card__img ri" style="aspect-ratio:${p.ratio}"><img src="${img1(p)}" alt="${p.name} — ${p.services[0]}" loading="lazy"><img class="card__alt" src="${img2(p)}" alt="" loading="lazy"></div>
    <p class="card__t"><b>${p.name}</b> — ${p.line.charAt(0).toUpperCase() + p.line.slice(1)}</p>
    ${tagChips(p)}
    <ul class="card__svc">${p.services.map(s => `<li>${s}</li>`).join('')}</ul>
  </a>`;

// Row of drifting portraits (the "for your consideration" CTA)
function drifting(root) {
  const H2 = [1.35, .95, 1.2, .85, 1.45, 1.05];
  const rows = $$('.drift__row', root).map((row, r) => {
    const html = CREW.slice(r * 6, r * 6 + 6).map((m, i) => {
      const cap = `<p>${m.name}<span>${m.role}</span></p>`;
      const pic = `<div class="mate__img" style="aspect-ratio:1/${H2[(i + r * 2) % 6]}"><img src="${m.img}" alt="${m.name}, ${m.role}" loading="lazy"></div>`;
      return `<figure class="mate">${r ? pic + cap : cap + pic}</figure>`;
    }).join('');
    const tr = $('.drift__track', row);
    tr.innerHTML = html + html + html;
    $$('figure', tr).slice(6).forEach(f => f.setAttribute('aria-hidden', 'true'));
    const s = { tr, x: 0, v: .4, hover: false };
    tr.addEventListener('mouseenter', () => { s.hover = true; });
    tr.addEventListener('mouseleave', () => { s.hover = false; });
    return s;
  });
  let lastY = scrollY, vel = 0;
  (function f() {
    vel = lerp(vel, Math.abs(scrollY - lastY), .1); lastY = scrollY;
    const b = root.getBoundingClientRect();
    if (!reduced && b.bottom > 0 && b.top < H) rows.forEach((s, i) => {
      s.v = lerp(s.v, s.hover ? .06 : .35 + vel * .2, .08);
      const third = s.tr.scrollWidth / 3;
      s.x = (s.x + s.v) % third;
      s.tr.style.transform = `translate3d(${i ? s.x - third : -s.x}px,0,0)`;
    });
    requestAnimationFrame(f);
  })();
}

// Cursor-following preview for index lists
function peekList(list, getImg) {
  if (!fine) return;
  const peek = document.createElement('figure'); peek.className = 'peek'; peek.innerHTML = '<img alt="">';
  document.body.append(peek);
  const im = $('img', peek);
  let px = 0, py = 0, tx = 0, ty = 0, on = false;
  (function f() { px = lerp(px, tx, .15); py = lerp(py, ty, .15); peek.style.translate = `${px}px ${py}px`; requestAnimationFrame(f); })();
  list.addEventListener('pointermove', e => { tx = e.clientX + 30; ty = e.clientY - 120; if (!on) { px = tx; py = ty; on = true; } });
  list.addEventListener('pointerover', e => { const r = e.target.closest('[data-peek]'); if (r) { im.src = getImg(r); peek.classList.add('is-on'); } });
  list.addEventListener('pointerleave', () => { peek.classList.remove('is-on'); on = false; });
}

/* =========================================================
   Pages
   ========================================================= */
const pages = {
  home() {
    // Hero collage — the approved hero, now with the studio's own work
    const COLLAGE = [
      ['northwake-2', 1.2, 3, 14, 1.3, .5, 'back'], ['tempo-1', 19.5, 2, 16, 1.25, 1, 'front'], ['vesselair-1', 42.5, -2, 14, 1.33, .7, 'back'],
      ['lowtide-1', 55, 13, 13.5, 1.3, 1.3, 'front'], ['paleorchard-1', 75.5, 7, 22.5, .75, .6, 'back'], ['oblong-1', 5.5, 64, 15, 1.25, 1.1, 'front'],
      ['kotawa-1', 17, 84, 13, 1, 1.5, 'front'], ['duneform-2', 37.5, 50, 24, 1.1, 1.2, 'front'], ['fernhall-2', 71, 70, 13, 1.33, .8, 'back'],
      ['oblong-2', 83, 86, 14, 1.2, 1.4, 'front'],
    ];
    const proj = f => PROJECTS.find(p => f.startsWith(fileKey(p) + '-')) || PROJECTS[0];
    const collage = $('.collage'), line = $('.hero__line'), hero = $('.hero');
    line.innerHTML = [...$('.hero__text').getAttribute('aria-label')].map((ch, i) => `<span class="hc" style="--i:${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
    collage.innerHTML = COLLAGE.map(([f, x, y, w, a, d, z], i) => {
      const p = proj(f);
      return `<a class="ph ${z}" href="project.html?p=${p.slug}" style="left:${x}%;top:${y}%" data-cursor="View" aria-label="${p.name} case study">
        <span class="ph__in" style="--i:${i};--fr:${(i % 2 ? 1 : -1) * (6 + i * 2)}deg"><img src="${M(f)}" alt=""><img class="ph__alt" src="${M(f.endsWith('-1') ? f.slice(0, -1) + '2' : f.slice(0, -1) + '1')}" alt="" loading="lazy"></span>
        <span class="ph__cap">${p.name} — ${p.year}</span></a>`;
    }).join('');
    const phs = $$('.ph', collage);
    const size = () => phs.forEach((el, i) => {
      const [, x, y, w, a] = COLLAGE[i], k = W < 860 ? 1.9 : 1, pw = w * k * W / 100, ph = pw * a;
      el.style.width = pw + 'px'; el.style.height = ph + 'px';
      el.firstElementChild.style.setProperty('--fx', `${W / 2 - (x * W / 100 + pw / 2)}px`);
      el.firstElementChild.style.setProperty('--fy', `${H / 2 - (y * H / 100 + ph / 2)}px`);
    });
    size(); addEventListener('resize', size);
    let cur = 0, mx = .5, my = .5, sx = .5, sy = .5;
    addEventListener('pointermove', e => { mx = e.clientX / W; my = e.clientY / H; }, { passive: true });
    (function f() {
      if (scrollY < hero.offsetHeight + H) {
        const t = clamp((scrollY - hero.offsetTop) / Math.max(1, hero.offsetHeight - H));
        cur = reduced ? t : lerp(cur, t, .09); sx = lerp(sx, mx, .06); sy = lerp(sy, my, .06);
        line.style.transform = `translate3d(${-cur * (line.offsetWidth - W)}px,0,0)`;
        phs.forEach((el, i) => {
          const d = COLLAGE[i][5], px = reduced ? 0 : (sx - .5) * d * -44, py = reduced ? 0 : (sy - .5) * d * -28;
          el.style.transform = `translate3d(${px}px,${py - cur * d * H * .35}px,0)`;
        });
      }
      requestAnimationFrame(f);
    })();

    // Featured case studies (Antinomy rhythm: big image + one sentence, alternating sides)
    $('.featured').innerHTML = PROJECTS.filter(p => p.featured).map((p, i) => `
      <a class="feat feat--${i % 2 ? 'r' : 'l'}${i === 3 ? ' feat--wide' : ''}" href="project.html?p=${p.slug}" data-cursor="View">
        <div class="feat__img ri"><img src="${i === 3 ? img2(p) : img1(p)}" alt="${p.name}" loading="lazy"><img class="feat__alt" src="${i === 3 ? img1(p) : img2(p)}" alt="" loading="lazy"></div>
        <div class="feat__cap"><p class="sm mute">Case study — ${p.year}</p><p class="stmt" data-words>${p.name}, ${p.line}</p><span class="sm ul">View case ${ICON.arrow}</span></div>
      </a>`).join('');

    // More work (Parker grid)
    $('.more .grid').innerHTML = PROJECTS.filter(p => !p.featured).slice(0, 4).map(cardHTML).join('');
    // News (Antinomy)
    $('.news-grid').innerHTML = NEWS.map((n, i) => `
      <article class="nw rv" style="--d:${i * 90}">
        ${n.img ? `<div class="nw__img ri"><img src="${M(n.img)}" alt="" loading="lazy"></div>` : '<div class="nw__img nw__img--txt"><span>' + n.type + '</span></div>'}
        <p class="sm mute">${n.date}</p><p class="sm">${n.type}</p><h3 class="nw__t">${n.title}</h3><p class="sm mute">${n.text}</p>
      </article>`).join('');
    drifting($('.drift'));

    // About: faces row, and underlined phrases that fan out their photos beside the cursor
    $('.faces__row').innerHTML = CREW.slice(0, 7).map((m, i) => `<img src="${m.img}" alt="" style="--i:${i}" loading="lazy">`).join('');
    const fan = $('.fan');
    if (fine) {
      let fx = 0, fy = 0, tx = 0, ty = 0, on = null;
      (function f() { fx = lerp(fx, tx, .14); fy = lerp(fy, ty, .14); fan.style.transform = `translate3d(${fx}px,${fy}px,0)`; requestAnimationFrame(f); })();
      $$('.hov').forEach(h => {
        h.addEventListener('pointerenter', e => {
          const list = h.dataset.imgs.split(' '), n = list.length;
          fan.innerHTML = list.map((f, k) => `<img src="${M(f)}" alt="" style="--k:${k};--r:${(k - (n - 1) / 2) * 8}deg;--x:${(k - (n - 1) / 2) * 42}px">`).join('');
          if (!on) { fx = tx = e.clientX + 130; fy = ty = e.clientY - 150; }
          on = h; h.classList.add('is-on');
          requestAnimationFrame(() => fan.classList.add('is-on'));
        });
        h.addEventListener('pointermove', e => { tx = e.clientX + 130; ty = e.clientY - 150; });
        h.addEventListener('pointerleave', () => { h.classList.remove('is-on'); fan.classList.remove('is-on'); on = null; });
      });
    }
  },

  work() {
    const grid = $('.grid'), idx = $('.index');
    grid.innerHTML = PROJECTS.map(cardHTML).join('');
    idx.innerHTML = PROJECTS.map(p => `
      <li><a class="ix" href="project.html?p=${p.slug}" data-peek="${p.slug}" data-cats="${p.cats.join(' ')}">
        <span class="mute">${p.year}</span><span class="ix__n">${p.name}</span><span class="ix__l mute">${p.line}</span><span>${p.services.slice(0, 2).join(', ')}</span>${ICON.arrow}</a></li>`).join('');
    peekList(idx, r => img1(P[r.dataset.peek]));
    const counts = { all: PROJECTS.length };
    Object.keys(CAT).forEach(k => { counts[k] = PROJECTS.filter(p => p.cats.includes(k)).length; });
    $$('.filter').forEach(b => { $('sup', b).textContent = counts[b.dataset.f]; });
    const apply = f => {
      const run = () => {
        $$('.filter').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
        $$('[data-cats]').forEach(el => { el.closest('li, .card').hidden = !(f === 'all' || el.dataset.cats.includes(f)); });
      };
      if (document.startViewTransition && !reduced) { const vt = document.startViewTransition(run); vt.ready.catch(() => {}); vt.finished.catch(() => {}); vt.updateCallbackDone.catch(() => {}); } else run();
    };
    $('.filters').addEventListener('click', e => { const b = e.target.closest('.filter'); if (b) apply(b.dataset.f); });
    $('.views').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('.views button').forEach(x => x.setAttribute('aria-pressed', x === b));
      document.body.dataset.view = b.dataset.v;
    });
  },

  project() {
    const slug = new URLSearchParams(location.search).get('p');
    const p = P[slug] || PROJECTS[0], i = PROJECTS.indexOf(p), next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.name} — Halflight`;
    $('.cs').innerHTML = `
      <header class="cs__head">
        <p class="sm mute">Case study — ${p.date}</p>
        <h1 class="cs__name" data-words>${p.name}</h1>
        <p class="stmt cs__line" data-words>${p.line.charAt(0).toUpperCase() + p.line.slice(1)}</p>
      </header>
      <dl class="cs__meta rv">
        <div><dt>Client</dt><dd>${p.client}</dd></div>
        <div><dt>Year</dt><dd>${p.year}</dd></div>
        <div><dt>Sector</dt><dd>${p.sector}</dd></div>
        <div><dt>Services</dt><dd>${p.services.join('<br>')}</dd></div>
      </dl>
      <figure class="cs__hero ri"><img src="${img1(p)}" alt="${p.name}"></figure>
      <section class="cs__text">
        <div class="rv"><p class="sm mute">The brief</p><p class="lead">${p.brief}</p></div>
        <div class="rv" style="--d:120"><p class="sm mute">Our response</p><p class="lead">${p.response}</p></div>
      </section>
      <figure class="cs__second ri"><img src="${img2(p)}" alt="" loading="lazy"><figcaption class="sm mute">${p.name} — ${p.services[p.services.length - 1]}</figcaption></figure>
      <section class="cs__results">${p.results.map(([v, l], k) => `<div class="rv" style="--d:${k * 100}"><b>${v}</b><span class="sm mute">${l}</span></div>`).join('')}</section>
      <blockquote class="cs__quote"><p class="stmt stmt--xl" data-words>“${p.quote[0]}”</p><footer class="sm mute">${p.quote[1]}, ${p.client}</footer></blockquote>
      <a class="cs__next" href="project.html?p=${next.slug}" data-cursor="Next">
        <p class="sm mute">Next case study</p>
        <div class="cs__next-row"><span class="cs__next-name">${next.name}</span>${ICON.arrow}</div>
        <div class="cs__next-img ri"><img src="${img1(next)}" alt="" loading="lazy"></div>
      </a>`;
    // parallax on the hero image
    const hero = $('.cs__hero img');
    (function f() { const r = hero.parentNode.getBoundingClientRect(); if (r.bottom > 0 && r.top < H) hero.style.transform = `translate3d(0,${(r.top) * -.08}px,0) scale(1.08)`; requestAnimationFrame(f); })();
  },

  studio() {
    // A slow ring of the crew around the opening sentence (Rearc's ring, made of people)
    const ring = $('.ring');
    ring.innerHTML = CREW.map((m, i) => `<img src="${m.img}" alt="" style="--a:${i * 360 / CREW.length}deg" loading="lazy">`).join('');
    $('.crew-grid').innerHTML = CREW.map((m, i) => `
      <figure class="cm rv" style="--d:${(i % 6) * 70}"><div class="cm__img"><img src="${m.img}" alt="${m.name}" loading="lazy"></div><figcaption><b>${m.name}</b><span class="mute">${m.role}</span></figcaption></figure>`).join('');
    const svcImg = ['studio-4', 'kotawa-1', 'studio-6', 'duneform-1', 'studio-5'];
    peekList($('.svc-list'), r => M(svcImg[+r.dataset.peek]));
    peekList($('.aw-list'), r => img1(P[r.dataset.peek]));
    // TOC highlights the section in view
    const toc = $$('.toc a');
    const tio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) toc.forEach(a => a.classList.toggle('is-on', a.hash === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('.st-sec').forEach(s => tio.observe(s));
  },

  contact() {
    const form = $('.form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = $('.form__msg');
      let ok = true;
      $$('.field', form).forEach(f => {
        const input = $('input, textarea', f), bad = !input.checkValidity();
        f.classList.toggle('is-bad', bad);
        if (bad && ok) { input.focus(); ok = false; }
      });
      if (!ok) { msg.textContent = 'Please fill in the highlighted fields.'; return; }
      // ponytail: no backend — wire this to Formspree / Netlify Forms / your API when deploying
      form.classList.add('is-sent');
      msg.textContent = `Thank you, ${form.name.value.split(' ')[0]}. We’ll reply within one working day.`;
      form.reset();
    });
    form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('is-bad'));
  },
};
pages[PAGE]?.();
reveal();
addEventListener('resize', () => { W = innerWidth; H = innerHeight; });

/* Home loader — once per session: the work flickers through a frame, then bursts into the collage */
(function loader() {
  const done = () => { document.body.classList.add('is-loaded'); lenis?.start(); };
  if (PAGE !== 'home' || reduced || sessionStorage.getItem('hl-seen')) return done();
  sessionStorage.setItem('hl-seen', '1');
  lenis?.stop(); scrollTo(0, 0);
  document.body.insertAdjacentHTML('afterbegin', `<div class="ld" aria-hidden="true"><div class="ld__frame"><img alt=""></div><div class="ld__row"><span class="ld__brand">${LOGO} halflight</span><span class="ld__n">0</span></div></div>`);
  const ld = $('.ld'), im = $('img', ld), n = $('.ld__n', ld);
  const pics = ['tempo-1', 'lowtide-1', 'oblong-1', 'paleorchard-1', 'vesselair-1', 'duneform-2', 'kotawa-1', 'northwake-1'];
  let k = 0; im.src = M(pics[0]);
  const flick = setInterval(() => { im.src = M(pics[++k % pics.length]); }, 130);
  const first = $$('.ph img').map(i => i.complete ? Promise.resolve() : new Promise(r => { i.onload = i.onerror = r; }));
  let ready = false;
  Promise.race([Promise.all([...first, document.fonts.ready]), new Promise(r => setTimeout(r, 2500))]).then(() => { ready = true; });
  let shown = 0, last = performance.now();
  requestAnimationFrame(function run(now) {
    const dt = (now - last) / 1000; last = now;
    shown = Math.min(shown + dt * (ready ? 150 : 65), ready ? 100 : 90);
    n.textContent = Math.floor(shown);
    if (shown < 100) return requestAnimationFrame(run);
    clearInterval(flick);
    setTimeout(() => { done(); ld.classList.add('is-out'); setTimeout(() => ld.remove(), 900); }, 120);
  });
})();
