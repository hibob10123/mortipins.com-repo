/**
 * Runs in <head> (no defer): if previous page set gmSlideNav, incoming page slides in normally.
 */
(function () {
  try {
    if (sessionStorage.getItem("gmSlideNav") !== "1") return;
    sessionStorage.removeItem("gmSlideNav");
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    document.documentElement.classList.add("gm-slide-enter");
  } catch (e) {}
})();
