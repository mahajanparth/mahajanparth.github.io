import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const DESKTOP = '(min-width: 1024px)';

function hero() {
  const split = SplitText.create('#hero-title', { type: 'chars, words', charsClass: 'char' });
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from(split.chars, { yPercent: 110, opacity: 0, rotateX: -60, stagger: 0.035, duration: 1.1 })
    .from('[data-hero-fade]', { y: 24, opacity: 0, stagger: 0.12, duration: 0.9 }, '-=0.6');

  // Scroll away: content recedes and fades like a product hero.
  gsap.to('.hero__inner', {
    scale: 0.86, opacity: 0, yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__canvas', {
    opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

function reveals() {
  gsap.set('.reveal', { opacity: 0, y: 40 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 95%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }),
  });

  gsap.fromTo('.reveal-clip', { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, ease: 'expo.out',
    scrollTrigger: { trigger: '.reveal-clip', start: 'top 80%' },
  });
  gsap.fromTo('#about-photo', { scale: 1.25 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

function counters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    // The markup holds the final value (so reduced-motion shows it); count up from 0.
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: Number(el.dataset.count), duration: 1.8, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function chips() {
  document.querySelectorAll('.skills__group').forEach((g) => {
    gsap.from(g.querySelectorAll('.chip'), {
      opacity: 0, y: 16, scale: 0.92, stagger: 0.04, duration: 0.6, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: g, start: 'top 88%' },
    });
  });
}

function timelineAnim() {
  gsap.fromTo('.tl__fill', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.tl-wrap', start: 'top 70%', end: 'bottom 60%', scrub: true },
  });
  // Side-slide only on the two-column layout; sideways offsets would widen the page on mobile.
  const twoCol = matchMedia('(min-width: 861px)').matches;
  document.querySelectorAll('.tl__item').forEach((item) => {
    const right = item.classList.contains('tl__item--r');
    const from = twoCol ? { x: right ? 60 : -60 } : { y: 40 };
    gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 78%' } })
      .from(item.querySelector('.tl__node'), { scale: 0, duration: 0.5, ease: 'back.out(3)' })
      .from(item.querySelector('.tl__card'), { opacity: 0, ...from, duration: 0.9, ease: 'power3.out' }, '<0.1');
  });
}

function experienceAnim() {
  gsap.from('.xp__card', {
    opacity: 0, y: 80, rotateX: 8, stagger: 0.15, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#xp', start: 'top 80%' },
  });

  // Gentle 3D tilt that follows the pointer.
  if (!matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.tilt').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3' });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

// Desktop: pinned horizontal strip. Mobile: plain grid with reveals.
// Mobile: projects are a plain grid with reveals (the desktop strip is set up in carousel.js).
function projectsAnim() {
  gsap.matchMedia().add('(max-width: 1023px)', () => {
    gsap.utils.toArray('.pcard').forEach((c) => gsap.from(c, {
      opacity: 0, y: 60, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 90%' },
    }));
  });
}

function parallax() {
  gsap.utils.toArray('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  gsap.from('.avo__item', {
    opacity: 0, y: 90, stagger: 0.12, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '#avo', start: 'top 82%' },
  });
}

function contactAnim() {
  gsap.fromTo('#contact-title', { scale: 0.82, opacity: 0.2 }, {
    scale: 1, opacity: 1, ease: 'none',
    scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 25%', scrub: true },
  });
}

export function initChrome() {
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  const nav = document.querySelector('#nav');
  ScrollTrigger.create({
    start: 'top -80',
    end: 'max',
    onToggle: (self) => nav.classList.toggle('nav--solid', self.isActive),
  });
}

export function initAnimations() {
  hero();
  reveals();
  counters();
  chips();
  timelineAnim();
  experienceAnim();
  projectsAnim();
  parallax();
  contactAnim();
  initChrome();
  // Triggers were created per-feature, not in page order; sort so pin spacing
  // from pinned sections is accounted for downstream.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
