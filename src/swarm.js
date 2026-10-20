// Hero background: a small boids swarm (separation / alignment / cohesion)
// that gently follows the pointer — a nod to the decentralized UAV work.
export function startSwarm(canvas, { reduced = false } = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, raf = 0, visible = true, frame = 0;
  // Low-end devices simulate every other frame.
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;
  const pointer = { x: null, y: null };
  const boids = [];

  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cap = w < 768 ? 50 : 120;
    const target = Math.round(Math.min(cap, (w * h) / 9000));
    while (boids.length < target) boids.push({ x: Math.random() * w, y: Math.random() * h, vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 });
    boids.length = target;
  }

  function step() {
    const R = 60, SEP = 22, MAX = 1.6;
    for (const b of boids) {
      let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;
      for (const o of boids) {
        if (o === b) continue;
        const dx = o.x - b.x, dy = o.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 > R * R) continue;
        n++; ax += o.vx; ay += o.vy; cx += o.x; cy += o.y;
        if (d2 < SEP * SEP) { sx -= dx / (d2 + 1); sy -= dy / (d2 + 1); }
      }
      if (n) {
        b.vx += (ax / n - b.vx) * 0.04 + (cx / n - b.x) * 0.0006 + sx * 0.9;
        b.vy += (ay / n - b.vy) * 0.04 + (cy / n - b.y) * 0.0006 + sy * 0.9;
      }
      if (pointer.x !== null) {
        const dx = pointer.x - b.x, dy = pointer.y - b.y, d = Math.hypot(dx, dy) + 1;
        if (d < 260) { b.vx += (dx / d) * 0.03; b.vy += (dy / d) * 0.03; }
      }
      const s = Math.hypot(b.vx, b.vy);
      if (s > MAX) { b.vx = (b.vx / s) * MAX; b.vy = (b.vy / s) * MAX; }
      b.x = (b.x + b.vx + w) % w; b.y = (b.y + b.vy + h) % h;
    }
  }

  // Neighbour links are batched into a few alpha buckets: one stroke() per bucket.
  const BUCKETS = 4;
  const buckets = Array.from({ length: BUCKETS }, () => []);
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    buckets.forEach((b) => { b.length = 0; });
    for (let i = 0; i < boids.length; i++) {
      const a = boids[i];
      for (let j = i + 1; j < boids.length; j++) {
        const b = boids[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 4900) buckets[Math.min(BUCKETS - 1, Math.floor((Math.sqrt(d2) / 70) * BUCKETS))].push(a, b);
      }
    }
    buckets.forEach((segs, k) => {
      if (!segs.length) return;
      ctx.strokeStyle = `rgba(41,151,255,${((1 - (k + 0.5) / BUCKETS) * 0.22).toFixed(3)})`;
      ctx.beginPath();
      for (let i = 0; i < segs.length; i += 2) { ctx.moveTo(segs[i].x, segs[i].y); ctx.lineTo(segs[i + 1].x, segs[i + 1].y); }
      ctx.stroke();
    });
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    for (const b of boids) {
      const s = Math.hypot(b.vx, b.vy) || 1, c = b.vx / s, n = b.vy / s;
      // Triangle pointing along the velocity, without save/rotate/restore per boid.
      ctx.moveTo(b.x + 5 * c, b.y + 5 * n);
      ctx.lineTo(b.x - 3.5 * c - 2.6 * n, b.y - 3.5 * n + 2.6 * c);
      ctx.lineTo(b.x - 3.5 * c + 2.6 * n, b.y - 3.5 * n - 2.6 * c);
      ctx.closePath();
    }
    ctx.fill();
  }

  function loop() {
    if (!lowEnd || frame++ % 2 === 0) { step(); draw(); }
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  resize();
  // Only re-allocate when the width changes (mobile address bars change the height constantly).
  let lastW = w, t = 0;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (canvas.clientWidth === lastW) return;
      lastW = canvas.clientWidth;
      resize();
      if (reduced) draw();
    }, 150);
  });
  canvas.parentElement.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('pointerleave', () => { pointer.x = pointer.y = null; });

  if (reduced) { draw(); return; }
  // Pause when the hero is off-screen.
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) loop();
  }).observe(canvas);
  loop();
}
