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
      } else if (node.classList.contains("legal-page")) {
        var entries = node.querySelectorAll(":scope > .gm-changelog-entry");
        var title = node.querySelector(":scope > .legal-title");
        var lead = node.querySelector(":scope > .legal-lead");
        if (entries.length) {
          if (title) add(title);
          if (lead) add(lead);
          entries.forEach(add);
        } else {
          add(node);
        }
      } else if (node.classList.contains("hero")) {
        var intros = node.querySelectorAll(".brawldle-intro, .trophyguess-intro");
        if (intros.length) intros.forEach(add);
        else add(node);
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
      } else if (node.classList.contains("brawldle-ys-grid")) {
        node.querySelectorAll(":scope > .brawldle-ys-card").forEach(add);
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

    var vh = window.innerHeight || document.documentElement.clientHeight;
    var inViewport = [];
    var belowFold = [];

    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      /* Anything intersecting the first screen: animate on page open (navigation), not on scroll */
      if (r.bottom > 0 && r.top < vh) {
        inViewport.push(el);
      } else {
        belowFold.push(el);
      }
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    function revealViewportAndWireScroll() {
      inViewport.forEach(function (el) {
        el.classList.add("is-visible");
      });
      belowFold.forEach(function (el) {
        io.observe(el);
      });
    }

    function scheduleViewportReveal() {
      requestAnimationFrame(function () {
        requestAnimationFrame(revealViewportAndWireScroll);
      });
    }

    /* Card reveals on every load; shell slide (gm-slide-enter) runs in parallel via CSS */
    scheduleViewportReveal();
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

/**
 * Any glass-metal page → another: set gmSlideNav, optional exit motion, then navigate.
 * (Previously only index loaded this; logic now lives here so all pages participate.)
 */
(function () {
  var home = document.body.classList.contains("glass-metal-home");
  var site = document.body.classList.contains("glass-metal-site");
  if (!home && !site) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var durationHomeMs = 400;
  var durationSiteMs = 360;

  function go(url) {
    try {
      sessionStorage.setItem("gmSlideNav", "1");
    } catch (e) {}
    window.location.href = url;
  }

  function isInternalPageLink(anchor) {
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return false;
    if (/^mailto:|^tel:/i.test(href)) return false;

    var abs;
    try {
      abs = new URL(anchor.href, window.location.href);
    } catch (e) {
      return false;
    }
    if (abs.origin !== window.location.origin) return false;

    var cur = new URL(window.location.href);
    if (abs.pathname === cur.pathname && abs.search === cur.search) return false;

    var path = abs.pathname || "";
    return /\.html$/i.test(path) || path === "/" || /\/$/i.test(path);
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || !isInternalPageLink(a)) return;
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      var url = a.href;

      if (reduce) {
        go(url);
        return;
      }

      if (home) {
        document.body.classList.add("gm-slide-exit");
        window.setTimeout(function () {
          go(url);
        }, durationHomeMs);
      } else {
        document.body.classList.add("gm-slide-exit-site");
        window.setTimeout(function () {
          go(url);
        }, durationSiteMs);
      }
    },
    true
  );
})();
