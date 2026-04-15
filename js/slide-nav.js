/**
 * Home → brawldle.html: smooth slide-out, then navigate. Brawldle slides in via CSS + sessionStorage.
 */
(function () {
  if (!document.body.classList.contains("glass-metal-home")) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var durationMs = 400;

  function isBrawldleInternalLink(anchor) {
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    if (anchor.target && anchor.target !== "" && anchor.target !== "_self")
      return false;
    if (/^https?:\/\//i.test(href)) return false;
    return /(^|\/)brawldle\.html([?#]|$)/.test(href.trim());
  }

  function go(url) {
    try {
      sessionStorage.setItem("gmSlideFromHome", "1");
    } catch (e) {}
    window.location.href = url;
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || !isBrawldleInternalLink(a)) return;
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      var url = a.href;

      if (reduce) {
        go(url);
        return;
      }

      document.body.classList.add("gm-slide-exit");
      window.setTimeout(function () {
        go(url);
      }, durationMs);
    },
    true
  );
})();
