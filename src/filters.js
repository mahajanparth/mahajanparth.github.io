import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Flip);

export function initFilters({ animate = true, onChange = () => {} } = {}) {
  const buttons = [...document.querySelectorAll('#filters .filter')];
  const cards = [...document.querySelectorAll('#projects-track .pcard')];
  const track = document.querySelector('#projects-track');

  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', b === btn); });

    onChange();

    const state = Flip.getState(cards);
    cards.forEach((c) => { c.hidden = f !== 'All' && !c.dataset.tags.split('|').includes(f); });

    if (!animate) { ScrollTrigger.refresh(); onChange(); return; }
    Flip.from(state, {
      duration: 0.7,
      ease: 'power3.inOut',
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
      onComplete: () => { ScrollTrigger.refresh(); onChange(); },
    });
  }));
}
