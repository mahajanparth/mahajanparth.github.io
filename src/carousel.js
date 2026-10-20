// Horizontal card strip: sideways gestures move the strip, vertical gestures scroll the page.
// Used by Projects (desktop) and Certifications.

export function initCarousel({ viewport, prev, next, bar }) {
  const max = () => viewport.scrollWidth - viewport.clientWidth;

  const update = () => {
    const m = max();
    if (bar) bar.style.transform = `scaleX(${m > 0 ? viewport.scrollLeft / m : 1})`;
    if (prev) prev.disabled = viewport.scrollLeft <= 1;
    if (next) next.disabled = viewport.scrollLeft >= m - 1;
  };

  // Decide per wheel event: mostly-horizontal (or shift+wheel) scrolls the strip and is kept
  // from Lenis; mostly-vertical is left alone so Lenis scrolls the page as usual.
  viewport.addEventListener('wheel', (e) => {
    const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
    if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return;
    if (max() <= 0) return;
    e.preventDefault();
    e.stopPropagation();
    viewport.scrollLeft += dx;
  }, { passive: false });

  const page = (dir) => viewport.scrollBy({ left: dir * viewport.clientWidth * 0.8, behavior: 'smooth' });
  prev?.addEventListener('click', () => page(-1));
  next?.addEventListener('click', () => page(1));

  viewport.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
  return { update, reset: () => { viewport.scrollTo({ left: 0 }); update(); } };
}
