/**
 * Blog index: filter post cards by search query (title + excerpt).
 */
(function () {
  const input = document.getElementById("blog-search");
  const grid = document.getElementById("posts-grid");
  const countEl = document.getElementById("blog-results-count");
  const emptyEl = document.getElementById("blog-empty");

  if (!input || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".post-card[data-search]"));
  const total = cards.length;

  function norm(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function update() {
    const q = norm(input.value);
    let n = 0;
    cards.forEach(function (card) {
      const hay = norm(card.getAttribute("data-search"));
      const show = !q || hay.includes(q);
      card.hidden = !show;
      if (show) n += 1;
    });
    if (countEl) {
      if (!q) {
        countEl.textContent = total === 1 ? "1 post" : total + " posts";
      } else {
        countEl.textContent =
          n === 0
            ? "No results"
            : n === 1
              ? "1 match"
              : n + " matches";
      }
    }
    if (emptyEl) {
      emptyEl.hidden = !(n === 0 && q.length > 0);
    }
  }

  input.addEventListener("input", update);
  input.addEventListener("search", update);
  update();
})();
