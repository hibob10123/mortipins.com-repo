/**
 * Glass & Metal UI: staggered slide-in reveal, optional card tilt (home),
 * auto-stamped .gm-reveal on interior pages.
 */
(function () {
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Interior pages: add .gm-reveal + stagger delays to main content blocks
   * (stats sections, blog sections, or each direct child of main).
   */
  function stampInteriorReveals() {
    if (document.body.classList.contains("glass-metal-home")) return;

    const main = document.querySelector("main#main, main");
    if (!main) return;

    const targets = [];

    function add(el) {
      if (!el || el.tagName === "SCRIPT" || el.tagName === "STYLE") return;
      if (el.classList.contains("gm-reveal")) return;
      targets.push(el);
    }

    Array.from(main.children).forEach(function (node) {
      if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return;

      if (node.classList.contains("stats-container")) {
        node.querySelectorAll(":scope > .stats-section").forEach(add);
      } else if (node.classList.contains("blog")) {
        node.querySelectorAll(":scope > *").forEach(function (child) {
          if (child.classList.contains("posts")) {
            var grid = child.querySelector(".posts-grid, #posts-grid");
            if (grid && grid.querySelector(".post-card")) {
              grid.querySelectorAll(":scope > .post-card").forEach(add);
              return;
            }
          }
          add(child);
        });
      } else if (node.classList.contains("leaderboard-container")) {
        node
          .querySelectorAll(":scope > .leaderboard-section, :scope > section")
          .forEach(add);
      } else if (node.classList.contains("footer")) {
        /* keep footer static for calmer layout */
      } else if (node.classList.contains("login-container")) {
        /* Centering uses transform in style.css; .gm-reveal would override it */
      } else {
        add(node);
      }
    });

    targets.forEach(function (el, i) {
      el.classList.add("gm-reveal");
      var step = Math.min(i + 1, 6);
      if (step > 1) el.classList.add("gm-reveal-delay-" + step);
    });
  }

  function initReveal() {
    stampInteriorReveals();

    var els = document.querySelectorAll(".gm-reveal");
    if (!els.length || reduceMotion) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      /* threshold 0 + modest bottom inset: reliable for above-the-fold on first paint */
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );

    els.forEach(function (el) {
      io.observe(el);
    });

    /**
     * Some browsers/layouts don't deliver the initial intersection callback before paint.
     * Force-visible any .gm-reveal already in the viewport so content never stays opacity:0.
     */
    function revealIfAlreadyInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".gm-reveal:not(.is-visible)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(revealIfAlreadyInView);
    });
  }

  function initTilt() {
    var cards = document.querySelectorAll(".gm-card-tilt");
    if (!cards.length || reduceMotion) return;

    cards.forEach(function (card) {
      var raf = 0;

      card.addEventListener("mousemove", function (e) {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          var rx = (-y * 5).toFixed(2);
          var ry = (x * 6).toFixed(2);
          card.style.transform =
            "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
        });
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      });
    });
  }

  function boot() {
    initReveal();
    initTilt();
    if (document.documentElement.classList.contains("gm-slide-enter")) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.body.classList.add("gm-slide-enter-done");
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
