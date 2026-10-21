import {
  profile, stats, education, skills, timeline, experience,
  categories, projects, publications, blogs, certifications, avocations,
} from './data.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const icons = {
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  medium: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12ZM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z"/></svg>',
  scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.88 3.97A7 7 0 0 1 12 10a7 7 0 0 1 7.12 3.47L24 9.5 12 0Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M3 5.5h18v13H3z M3 6l9 7 9-7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/></svg>',
};

// Generated line-art illustrations for projects without footage.
const art = {
  diffusion: () => {
    let dots = '';
    for (let i = 0; i < 70; i++) {
      const t = i / 69, x = 30 + t * 340, y = 150 + Math.sin(t * Math.PI * 2) * 60;
      const n = (1 - Math.abs(t - 0.5) * 2) * 40;
      dots += `<circle cx="${(x + (Math.sin(i * 12.9) * n)).toFixed(1)}" cy="${(y + Math.cos(i * 7.3) * n).toFixed(1)}" r="2.2" class="a-dot"/>`;
    }
    return `<circle cx="200" cy="95" r="34" class="a-obs"/><circle cx="120" cy="210" r="26" class="a-obs"/><circle cx="300" cy="200" r="22" class="a-obs"/>
      <path class="a-path a-draw" d="M30 150 C 90 60, 150 60, 200 150 S 310 240, 370 150"/>${dots}`;
  },
  arm: () => `<rect x="60" y="210" width="110" height="50" rx="6" class="a-obs"/><rect x="240" y="215" width="100" height="45" rx="6" class="a-obs"/>
    <path class="a-line" d="M200 270 L200 230 L250 150 L320 130"/><circle cx="200" cy="230" r="9" class="a-joint"/><circle cx="250" cy="150" r="8" class="a-joint"/>
    <path class="a-line" d="M320 120 l14 -6 M320 140 l14 6"/><path class="a-path a-draw" d="M115 215 C 120 90, 280 60, 290 210"/>
    <rect x="98" y="196" width="22" height="16" rx="3" class="a-box"/>`,
  lidar: () => {
    let rays = '';
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2, r = 70 + ((i * 37) % 60);
      rays += `<line x1="200" y1="150" x2="${(200 + Math.cos(a) * r).toFixed(1)}" y2="${(150 + Math.sin(a) * r).toFixed(1)}" class="a-ray"/><circle cx="${(200 + Math.cos(a) * r).toFixed(1)}" cy="${(150 + Math.sin(a) * r).toFixed(1)}" r="2.4" class="a-dot"/>`;
    }
    return `${rays}<rect x="176" y="132" width="48" height="36" rx="8" class="a-joint"/><circle cx="200" cy="150" r="80" class="a-ring"/>`;
  },
  pso: () => {
    let p = '';
    for (let i = 0; i < 26; i++) {
      const x = 40 + ((i * 97) % 320), y = 40 + ((i * 61) % 220);
      const dx = (300 - x) * 0.12, dy = (90 - y) * 0.12;
      p += `<line x1="${x}" y1="${y}" x2="${(x + dx).toFixed(1)}" y2="${(y + dy).toFixed(1)}" class="a-ray"/><circle cx="${x}" cy="${y}" r="3" class="a-dot"/>`;
    }
    return `${p}<circle cx="300" cy="90" r="16" class="a-target"/><circle cx="300" cy="90" r="30" class="a-ring"/><circle cx="90" cy="220" r="12" class="a-target"/>`;
  },
  pursuit: () => `<path class="a-path a-draw" d="M20 250 C 120 250, 140 80, 250 80 S 380 140, 390 60"/>
    <circle cx="160" cy="175" r="70" class="a-ring"/><line x1="160" y1="175" x2="205" y2="122" class="a-line"/>
    <circle cx="205" cy="122" r="6" class="a-target"/><rect x="146" y="166" width="28" height="18" rx="4" class="a-joint"/>`,
  road: () => `<path d="M80 300 L180 20 M320 300 L220 20" class="a-line"/><path d="M200 300 L200 20" class="a-dash"/>
    <path class="a-path a-draw" d="M210 290 C 180 220, 240 150, 205 30"/><rect x="196" y="250" width="26" height="40" rx="6" class="a-joint"/>`,
  ellipse: () => {
    let e = '';
    const pts = [[40, 230], [100, 190], [160, 175], [220, 140], [280, 120], [340, 70]];
    pts.forEach(([x, y], i) => {
      e += `<ellipse cx="${x}" cy="${y}" rx="${10 + i * 5}" ry="${6 + i * 3}" transform="rotate(-25 ${x} ${y})" class="a-ring a-ring--solid"/><circle cx="${x}" cy="${y}" r="5" class="a-joint"/>`;
      if (i) e += `<line x1="${pts[i - 1][0]}" y1="${pts[i - 1][1]}" x2="${x}" y2="${y}" class="a-line"/>`;
    });
    return `${e}<path class="a-path a-draw" d="M40 250 C 120 230, 200 190, 360 60"/><text x="300" y="250" class="a-text">λmin ≥ 0 ✓</text>`;
  },
  slam: () => {
    let pts = '';
    for (let i = 0; i < 90; i++) pts += `<circle cx="${(30 + ((i * 53) % 340)).toFixed(0)}" cy="${(30 + ((i * 29) % 110) + (i % 3) * 8).toFixed(0)}" r="1.8" class="a-dot"/>`;
    let cams = '';
    for (let i = 0; i < 6; i++) {
      const x = 60 + i * 55, y = 240 - Math.sin(i / 1.6) * 40;
      cams += `<path d="M${x} ${y} l-14 -18 h28 z" class="a-frustum"/>`;
    }
    return `${pts}<path class="a-path a-draw" d="M60 240 C 140 230, 200 190, 335 215"/>${cams}`;
  },
  clip: () => {
    let rows = '';
    for (let i = 0; i < 5; i++) {
      rows += `<rect x="50" y="${40 + i * 46}" width="70" height="34" rx="6" class="a-cell a-cell--b"/><rect x="280" y="${40 + i * 46}" width="70" height="34" rx="6" class="a-cell a-cell--b"/>`;
      rows += `<line x1="122" y1="${57 + i * 46}" x2="278" y2="${57 + ((i * 3) % 5) * 46}" class="${i === 2 ? 'a-path' : 'a-ray'}"/>`;
    }
    return `${rows}<text x="64" y="30" class="a-text">image</text><text x="298" y="30" class="a-text">text</text>`;
  },
  dqn: () => {
    let grid = '';
    for (let x = 0; x < 8; x++) for (let y = 0; y < 5; y++) grid += `<rect x="${40 + x * 42}" y="${40 + y * 44}" width="36" height="38" rx="5" class="${(x * 7 + y * 3) % 9 === 0 ? 'a-obs' : 'a-cell'}"/>`;
    return `${grid}<path class="a-path a-draw" d="M58 238 H142 V150 H226 V62 H352"/><circle cx="58" cy="238" r="8" class="a-joint"/><circle cx="352" cy="62" r="9" class="a-target"/>`;
  },
};

function media(p) {
  if (p.video) return `<video muted loop playsinline preload="none" data-src="${esc(p.video)}" poster="${esc(p.image || '')}"></video>`;
  if (p.image) return `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />`;
  return `<svg class="art art--${p.art}" viewBox="0 0 400 300" role="img" aria-label="${esc(p.title)} illustration">${art[p.art]?.() ?? ''}</svg>`;
}

export function renderAll() {
  // Statement — one span per word for the scrubbed reveal.

  // About
  $('#about-photo').src = profile.photo;
  $('#about-tagline').textContent = profile.tagline;
  $('#about-bio').innerHTML = profile.bio.map((p) => `<p class="reveal">${esc(p)}</p>`).join('');
  $('#about-motto').innerHTML = `<span class="about__motto-intro">${esc(profile.mottoIntro)}</span>“${esc(profile.motto)}”<cite>${esc(profile.mottoBy)}</cite>`;
  $('#about-ctas').innerHTML = `
    ${profile.resume ? `<a class="btn btn--primary" href="${profile.resume}" target="_blank" rel="noopener">Résumé</a>` : ''}
    <a class="btn btn--ghost" href="${profile.links.github}" target="_blank" rel="noopener">${icons.github} GitHub</a>
    <a class="btn btn--ghost" href="${profile.links.linkedin}" target="_blank" rel="noopener">${icons.linkedin} LinkedIn</a>
    <a class="btn btn--ghost" href="${profile.links.medium}" target="_blank" rel="noopener">${icons.medium} Medium</a>
    <a class="btn btn--ghost" href="mailto:${profile.email.user}@${profile.email.domain}">${icons.mail} Email</a>`;

  // Stats
  $('#stats').innerHTML = stats.map((s) => `
    <div class="stat reveal">
      <div class="stat__num">${esc(s.prefix || '')}<span data-count="${s.value}">${s.value.toLocaleString('en-US')}</span>${esc(s.suffix)}</div>
      <p class="stat__label">${esc(s.label)}</p>
    </div>`).join('');

  // Education
  $('#edu').innerHTML = education.map((e) => `
    <article class="edu__card card reveal">
      <div class="logo-badge">${esc(e.logo)}</div>
      <div>
        <h3>${esc(e.school)}</h3>
        ${e.degree ? `<p class="edu__deg">${esc(e.degree)}</p>` : ''}
        <p class="meta">${[e.place, e.period].filter(Boolean).map(esc).join(' · ')}</p>
        ${e.note ? `<p class="meta">${esc(e.note)}</p>` : ''}
      </div>
    </article>`).join('');

  // Skills
  $('#skills').innerHTML = skills.map((g) => `
    <div class="skills__group">
      <h3 class="skills__title reveal">${esc(g.group)}</h3>
      <ul class="chips">${g.items.map((i) => `<li class="chip">${esc(i)}</li>`).join('')}</ul>
    </div>`).join('');

  // Timeline
  $('#tl').innerHTML = timeline.map((t, i) => `
    <li class="tl__item ${i % 2 ? 'tl__item--r' : ''}">
      <span class="tl__node" aria-hidden="true"></span>
      <div class="tl__card card">
        ${t.period ? `<p class="meta">${esc(t.period)}</p>` : ''}
        <h3>${esc(t.title)}</h3>
        <p class="tl__sub">${esc(t.sub)}</p>
        <p>${esc(t.text)}</p>
      </div>
    </li>`).join('');

  // Experience
  $('#xp').innerHTML = experience.map((x) => `
    <article class="xp__card card tilt">
      <div class="xp__head">
        <div class="logo-badge">${esc(x.logo)}</div>
        <div>
          <h3>${x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.org)}</a>` : esc(x.org)}</h3>
          <p class="xp__role">${esc(x.role)}</p>
        </div>
      </div>
      <p class="xp__tech">${esc(x.tech)}</p>
      <ul class="xp__points">${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      ${x.place || x.period ? `<p class="meta">${[x.place, x.period].filter(Boolean).map(esc).join(' · ')}</p>` : ''}
    </article>`).join('');

  // Projects
  $('#filters').innerHTML = categories.map((c, i) =>
    `<button class="filter${i === 0 ? ' is-active' : ''}" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('');
  $('#projects-track').innerHTML = projects.map((p) => `
    <article class="pcard" data-tags="${esc(p.tags.join('|'))}" data-flip-id="${slug(p.title)}">
      <div class="pcard__media">${media(p)}${p.status ? `<span class="pcard__badge">${esc(p.status)}</span>` : ''}</div>
      <div class="pcard__body">
        <p class="pcard__org">${esc(p.org)}</p>
        <h3 class="pcard__title">${esc(p.title)}</h3>
        <p class="pcard__sub">${esc(p.sub)}</p>
        <p class="pcard__text">${esc(p.text)}</p>
        <div class="pcard__foot">
          <ul class="pcard__tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          ${p.repo ? `<a class="pcard__repo" href="${esc(p.repo)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} on GitHub">${icons.github}</a>` : ''}
          ${p.link ? `<a class="pcard__repo" href="${esc(p.link)}" target="_blank" rel="noopener" aria-label="${esc(p.title)} paper">${icons.arrow}</a>` : ''}
        </div>
      </div>
    </article>`).join('');

  // Publications
  $('#pubs').innerHTML = publications.map((p) => `
    <article class="pub card reveal">
      <p class="pub__venue">${esc(p.venue)} · ${p.year}</p>
      <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
      <p class="pub__authors">${p.authors.map((a, i) => {
        const name = esc(a) + (i < (p.equal || 0) ? '*' : '');
        return a === profile.name ? `<strong>${name}</strong>` : name;
      }).join(', ')}</p>
      ${p.equal ? '<p class="pub__note">* Equal contribution (co-first authors)</p>' : ''}
      <div class="pub__links">
        <a class="btn btn--primary" href="${esc(p.url)}" target="_blank" rel="noopener">Paper</a>
        ${p.arxiv ? `<a class="btn btn--ghost" href="${esc(p.arxiv)}" target="_blank" rel="noopener">arXiv</a>` : ''}
        ${p.code ? `<a class="btn btn--ghost" href="${esc(p.code)}" target="_blank" rel="noopener">${icons.github} Code</a>` : ''}
        ${p.video ? `<a class="btn btn--ghost" href="${esc(p.video)}" target="_blank" rel="noopener">Video</a>` : ''}
      </div>
    </article>`).join('') + `
    <a class="pubs__more reveal" href="${profile.links.scholar}" target="_blank" rel="noopener">All publications on Google Scholar ${icons.arrow}</a>`;

  // Blogs
  $('#blogs').innerHTML = blogs.map((b) => `
    <a class="blog card reveal" href="${esc(b.url)}" target="_blank" rel="noopener">
      <p class="blog__part">${esc(b.part)}</p>
      <h3>${esc(b.title)}</h3>
      <p class="muted">${esc(b.sub)}</p>
      <span class="blog__go">Read on Medium ${icons.arrow}</span>
    </a>`).join('') + `
    <a class="blog blog--more card reveal" href="${profile.links.medium}" target="_blank" rel="noopener">
      ${icons.medium}<h3>More on Medium</h3><span class="blog__go">Follow ${icons.arrow}</span>
    </a>`;

  // Certifications
  $('#certs').innerHTML = certifications.map((c) => `
    <div class="cert card reveal">
      <button class="cert__open" data-full="${esc(c.image)}" aria-label="View certificate: ${esc(c.title)}">
        <img src="${esc(c.image)}" alt="" loading="lazy" />
        <span class="cert__body"><strong>${esc(c.title)}</strong><span class="meta">${esc(c.issuer)} · ${esc(c.date)}</span></span>
      </button>
      ${c.verify ? `<a class="cert__verify" href="${esc(c.verify)}" target="_blank" rel="noopener">Verify on Coursera ${icons.arrow}</a>` : ''}
    </div>`).join('');

  // Avocations
  $('#avo').innerHTML = avocations.map((a, i) => `
    <figure class="avo__item avo__item--${i}">
      <div class="avo__img"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy" data-parallax /></div>
      <figcaption><strong>${esc(a.title)}</strong> ${esc(a.text)}</figcaption>
    </figure>`).join('');

  // Contact
  const addr = `${profile.email.user}@${profile.email.domain}`;
  const email = $('#contact-email');
  email.href = `mailto:${addr}`;
  email.innerHTML = `${icons.mail} ${esc(addr)}`;
  const socialNames = { github: 'GitHub', linkedin: 'LinkedIn', scholar: 'Google Scholar', medium: 'Medium' };
  $('#socials').innerHTML = Object.entries(socialNames).map(([k, label]) =>
    `<a href="${profile.links[k]}" target="_blank" rel="noopener" aria-label="${label}">${icons[k]}</a>`).join('');
  $('#contact-loc').textContent = profile.location;
  $('#year').textContent = new Date().getFullYear();
}
