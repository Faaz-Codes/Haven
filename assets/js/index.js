/* ── LIVE TIME ── */
function updateTime() {
  const liveTime = document.getElementById('live-time');
  if (!liveTime) return;

  const now = new Date();
  const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
  liveTime.textContent = now.toLocaleTimeString('en-US', opts);
}
updateTime();
setInterval(updateTime, 30000);
window.addEventListener('load', updateTime);
document.addEventListener('selah:components-loaded', updateTime);

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
}
resize();
window.addEventListener('resize', resize);

// Background gradient
function drawBg() {
  const grad = ctx.createLinearGradient(0, 0, canvas.width * 0.5, canvas.height);
  grad.addColorStop(0, '#203A58');
  grad.addColorStop(0.55, '#2c4a6a');
  grad.addColorStop(1, '#6F8CA4');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // soft golden light source — upper center-right
  const glow = ctx.createRadialGradient(canvas.width * 0.72, canvas.height * 0.18, 0, canvas.width * 0.72, canvas.height * 0.18, canvas.width * 0.45);
  glow.addColorStop(0, 'rgba(219,175,138,0.08)');
  glow.addColorStop(0.5, 'rgba(219,175,138,0.03)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // secondary deeper blue light — lower left
  const glow2 = ctx.createRadialGradient(canvas.width * 0.12, canvas.height * 0.75, 0, canvas.width * 0.12, canvas.height * 0.75, canvas.width * 0.4);
  glow2.addColorStop(0, 'rgba(111,140,164,0.12)');
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Particles
const PARTICLE_COUNT = 68;
const particles = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    alpha: Math.random() * 0.35 + 0.05,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.09 - 0.04,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.012,
    warm: Math.random() > 0.55
  });
}

let raf;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBg();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.pulse += p.pulseSpeed;

    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.y > canvas.height + 10) p.y = -10;

    const alphaMod = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.warm
      ? `rgba(219,175,138,${alphaMod})`
      : `rgba(162,174,179,${alphaMod})`;
    ctx.fill();
  });

  raf = requestAnimationFrame(animate);
}

animate();

// Resize updates canvas height after content loads
window.addEventListener('load', () => {
  resize();
});
