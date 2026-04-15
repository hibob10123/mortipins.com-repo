/**
 * Parallax star layers + shooting stars (canvas), parallax planets (DOM).
 * Home: full .gm-starfield | Minigames: .gm-starfield.gm-starfield--subtle
 * Optional: data-image on .gm-planet or .gm-planet--has-image + CSS background.
 * Respects prefers-reduced-motion.
 */
(function () {
  var host = document.querySelector(".gm-starfield");
  if (!host) return;

  var subtle = host.classList.contains("gm-starfield--subtle");

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var planets = host.querySelectorAll(".gm-planet");
  planets.forEach(function (el) {
    var u = el.getAttribute("data-image");
    if (u && u.trim()) {
      el.classList.add("gm-planet--has-image");
      el.style.backgroundImage = 'url("' + u.replace(/"/g, "") + '")';
    }
  });

  var canvas = document.createElement("canvas");
  canvas.className = "gm-starfield-canvas";
  host.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var stars = [];
  var shooting = [];

  var w = 0;
  var h = 0;
  var dpr = 1;
  var nextShootAt = 0;
  var lastT = 0;
  var scrollY = 0;

  var layerParallax = subtle
    ? [0.032, 0.068, 0.12]
    : [0.048, 0.105, 0.188];

  var maxMeteors = subtle ? 1 : 5;

  function onScroll() {
    scrollY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cap = subtle ? 200 : 420;
    var div = subtle ? 7200 : 4800;
    var n = Math.min(cap, Math.floor((w * h) / div));
    stars = [];
    for (var i = 0; i < n; i++) {
      var spd = subtle ? 0.55 : 1;
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: subtle ? Math.random() * 1.05 + 0.22 : Math.random() * 1.25 + 0.28,
        phase: Math.random() * Math.PI * 2,
        tw: reduce ? 0 : (0.6 + Math.random() * 1.4) * spd,
        vx: reduce ? 0 : (Math.random() - 0.5) * 3.5 * spd,
        vy: reduce ? 0 : (Math.random() - 0.5) * 3.5 * spd,
        layer: i % 3,
      });
    }
  }

  function spawnShoot(now) {
    if (reduce) return;
    var margin = 80;
    var x = -margin + Math.random() * (w * 0.55);
    var y = -margin + Math.random() * (h * 0.45);
    var angle = Math.PI * 0.3 + Math.random() * 0.18;
    var speed;
    var len;
    var alpha;
    var nextDelay;

    if (subtle) {
      speed = 380 + Math.random() * 260;
      len = (72 + Math.random() * 100) * 1.05;
      alpha = 0.58 + Math.random() * 0.35;
      nextDelay = 3800 + Math.random() * 6500;
    } else {
      /* Home: frequent, very bright streaks */
      speed = 460 + Math.random() * 380;
      len = 92 + Math.random() * 130;
      alpha = Math.min(1, 0.82 + Math.random() * 0.18);
      nextDelay = 450 + Math.random() * 1100;
    }

    shooting.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: len,
      alpha: alpha,
    });
    nextShootAt = now + nextDelay;
  }

  function wrap(v, max) {
    if (v < 0) return v + max;
    if (v > max) return v - max;
    return v;
  }

  function wrapCoord(v, max) {
    var m = v % max;
    if (m < 0) m += max;
    return m;
  }

  function applyPlanets() {
    if (reduce) {
      for (var p = 0; p < planets.length; p++) {
        planets[p].style.transform = "";
      }
      return;
    }
    for (var i = 0; i < planets.length; i++) {
      var el = planets[i];
      var f = parseFloat(el.getAttribute("data-parallax"));
      if (isNaN(f)) f = 0.1;
      el.style.transform = "translate3d(0, " + scrollY * f + "px, 0)";
    }
  }

  function tick(now) {
    if (!lastT) lastT = now;
    var dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;

    ctx.clearRect(0, 0, w, h);

    applyPlanets();

    if (!reduce) {
      var baseA = subtle ? 0.22 : 0.32;
      var pulseM = subtle ? 0.48 : 0.58;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.phase += dt * s.tw;
        s.x = wrap(s.x + s.vx * dt, w);
        s.y = wrap(s.y + s.vy * dt, h);
        var pulse = 0.45 + Math.sin(s.phase) * 0.35;
        var pf = layerParallax[s.layer] || 0.1;
        var dx = wrapCoord(s.x, w);
        var dy = wrapCoord(s.y + scrollY * pf, h);
        ctx.beginPath();
        ctx.arc(dx, dy, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          "rgba(235, 240, 255, " + (baseA + pulse * pulseM) + ")";
        ctx.fill();
      }
    } else {
      var stAlpha = subtle ? 0.4 : 0.52;
      for (var j = 0; j < stars.length; j++) {
        var t = stars[j];
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 238, 255, " + stAlpha + ")";
        ctx.fill();
      }
    }

    if (!reduce) {
      if (now >= nextShootAt && shooting.length < maxMeteors) spawnShoot(now);

      var lineW = subtle ? 1.75 : 2.25;
      var midMul = subtle ? 0.62 : 0.88;

      for (var k = shooting.length - 1; k >= 0; k--) {
        var sh = shooting[k];
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;

        var nx = sh.vx / (Math.abs(sh.vx) + Math.abs(sh.vy) + 1e-6);
        var ny = sh.vy / (Math.abs(sh.vx) + Math.abs(sh.vy) + 1e-6);
        var bx = sh.x - nx * sh.len;
        var by = sh.y - ny * sh.len;

        var g = ctx.createLinearGradient(bx, by, sh.x, sh.y);
        if (subtle) {
          g.addColorStop(0, "rgba(255, 255, 255, 0)");
          g.addColorStop(
            0.42,
            "rgba(220, 240, 255, " + sh.alpha * midMul + ")"
          );
          g.addColorStop(0.88, "rgba(255, 255, 255, " + sh.alpha + ")");
          g.addColorStop(1, "rgba(200, 230, 255, " + sh.alpha * 0.95 + ")");
        } else {
          g.addColorStop(0, "rgba(255, 255, 255, 0)");
          g.addColorStop(
            0.28,
            "rgba(230, 250, 255, " + sh.alpha * midMul + ")"
          );
          g.addColorStop(0.62, "rgba(255, 255, 255, " + sh.alpha + ")");
          g.addColorStop(0.92, "rgba(255, 255, 255, " + sh.alpha + ")");
          g.addColorStop(1, "rgba(220, 245, 255, " + sh.alpha * 0.98 + ")");
        }

        ctx.strokeStyle = g;
        ctx.lineWidth = lineW;
        ctx.lineCap = "round";
        if (!subtle) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.65)";
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(sh.x, sh.y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (sh.x > w + 120 || sh.y > h + 120) shooting.splice(k, 1);
      }
    }

    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", function () {
    resize();
    nextShootAt = performance.now() + 800;
  });

  if (!reduce) {
    nextShootAt = performance.now() + (subtle ? 2200 : 350);
  }
  requestAnimationFrame(tick);
})();
