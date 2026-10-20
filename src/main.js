import Lenis from 'lenis';
import '@fontsource-variable/inter';
import './styles/base.css';
import './styles/sections.css';
import { renderAll } from './render.js';
import { startSwarm } from './swarm.js';
import { initFilters } from './filters.js';
import { initCarousel } from './carousel.js';
import { initAnimations, initChrome, gsap, ScrollTrigger } from './animations.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

renderAll();
startSwarm(document.querySelector('#swarm'), { reduced });

let lenis = null;
if (!reduced) {
  // Smooth inertial scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.fonts.ready.then(initAnimations);
} else {
  initChrome();
}
const $ = (sel) => document.querySelector(sel);
const projectsStrip = initCarousel({ viewport: $('.projects__viewport'), prev: $('#projects-prev'), next: $('#projects-next'), bar: $('#projects-bar') });
initCarousel({ viewport: $('.certs__viewport'), prev: $('#certs-prev'), next: $('#certs-next'), bar: $('#certs-bar') });
initFilters({ animate: !reduced, onChange: projectsStrip.reset });

// Anchor links: smooth-scroll via Lenis, close the mobile menu.
const nav = document.querySelector('#nav');
const toggle = document.querySelector('#nav-toggle');
const setMenu = (open) => {
  nav.classList.toggle('nav--open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  open ? lenis?.stop() : lenis?.start();
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('nav--open')));

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  setMenu(false);
  if (lenis) lenis.scrollTo(target, { offset: a.getAttribute('href') === '#top' ? 0 : -60 });
  else target.scrollIntoView();
});

// Lazy video: load when near the viewport, play only while visible.
const vio = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
  if (isIntersecting) {
    if (!v.src) v.src = v.dataset.src;
    if (!reduced) v.play().catch(() => {});
  } else v.pause();
}), { rootMargin: '200px' });
document.querySelectorAll('video[data-src]').forEach((v) => vio.observe(v));

// Start the line-drawing on generated project art once each card is on screen.
const artIo = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
  if (isIntersecting) { target.classList.add('in-view'); artIo.unobserve(target); }
}), { threshold: 0.4 });
document.querySelectorAll('.pcard').forEach((c) => artIo.observe(c));

// Certificate lightbox — focus moves into it, stays there, and returns to the opener.
const lb = document.querySelector('#lightbox');
const lbImg = lb.querySelector('img');
const lbClose = lb.querySelector('.lightbox__close');
let opener = null;
const closeLb = () => { lb.hidden = true; lenis?.start(); opener?.focus(); };
document.querySelector('#certs').addEventListener('click', (e) => {
  const btn = e.target.closest('.cert__open');
  if (!btn) return;
  opener = btn;
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.getAttribute('aria-label');
  lb.hidden = false;
  lenis?.stop();
  lbClose.focus();
  if (!reduced) gsap.fromTo(lbImg, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' });
});
lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });

document.addEventListener('keydown', (e) => {
  if (!lb.hidden) {
    if (e.key === 'Escape') closeLb();
    if (e.key === 'Tab') { e.preventDefault(); lbClose.focus(); }
    return;
  }
  if (e.key === 'Escape' && nav.classList.contains('nav--open')) { setMenu(false); toggle.focus(); }
});
