(function () {
  const defaultPalette = {
    start: '#203A58',
    middle: '#2b4a68',
    end: '#6F8CA4',
    glow: 'rgba(219,175,138,0.10)',
  };

  function createAmbientBackground(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const palette = { ...defaultPalette, ...options.palette };
    const pointCount = options.pointCount || 55;
    const gradientWidth = options.gradientWidth || 0.4;
    const glowX = options.glowX || 0.5;
    const glowY = options.glowY || 0.15;
    const glowRadius = options.glowRadius || 0.5;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }

    resize();
    window.addEventListener('resize', resize);

    const points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * (options.alphaRange || 0.28) + 0.05,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.08 - 0.03,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
      warm: Math.random() > 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width * gradientWidth, canvas.height);
      gradient.addColorStop(0, palette.start);
      gradient.addColorStop(0.55, palette.middle);
      gradient.addColorStop(1, palette.end);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glow = ctx.createRadialGradient(
        canvas.width * glowX,
        canvas.height * glowY,
        0,
        canvas.width * glowX,
        canvas.height * glowY,
        canvas.width * glowRadius,
      );
      glow.addColorStop(0, palette.glow);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        point.pulse += point.pulseSpeed;

        if (point.x < -5) point.x = canvas.width + 5;
        if (point.x > canvas.width + 5) point.x = -5;
        if (point.y < -5) point.y = canvas.height + 5;
        if (point.y > canvas.height + 5) point.y = -5;

        const alpha = point.alpha * (0.7 + 0.3 * Math.sin(point.pulse));
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = point.warm ? `rgba(219,175,138,${alpha})` : `rgba(162,174,179,${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  window.Selah = window.Selah || {};
  window.Selah.createAmbientBackground = createAmbientBackground;
}());
