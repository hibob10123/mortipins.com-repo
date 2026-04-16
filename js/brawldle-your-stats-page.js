/**
 * Your Brawldle stats page: animated distribution charts (device-local data).
 */
(function () {
  const LABELS = ["0 · exact", "±1", "±2", "±3", "±4", "±5", "±6"];

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function fillGradient(ctx, chartArea) {
    if (!chartArea) return "rgba(212, 165, 116, 0.12)";
    const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, "rgba(212, 165, 116, 0.38)");
    g.addColorStop(0.45, "rgba(212, 165, 116, 0.12)");
    g.addColorStop(1, "rgba(212, 165, 116, 0.02)");
    return g;
  }

  function buildChart(canvasId, dist, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === "undefined") return null;

    const data = dist.map((n) => Number(n) || 0);
    const total = data.reduce((a, b) => a + b, 0);
    const empty = total === 0;

    const animDuration = prefersReducedMotion() ? 0 : 1200;

    const displayData = empty ? [0, 0, 0, 0, 0, 0, 0] : data;

    return new Chart(canvas, {
      type: "bar",
      data: {
        labels: LABELS,
        datasets: [
          {
            type: "bar",
            label: title + " (count)",
            data: displayData,
            order: 2,
            borderRadius: 10,
            barPercentage: 0.62,
            backgroundColor: "rgba(212, 165, 116, 0.22)",
            borderColor: "rgba(212, 165, 116, 0.35)",
            borderWidth: 1,
          },
          {
            type: "line",
            label: title,
            data: displayData,
            order: 1,
            tension: 0.42,
            fill: true,
            borderWidth: 2.5,
            borderColor: "#e8c49a",
            pointBackgroundColor: "#1a1a1c",
            pointBorderColor: "#d4a574",
            pointBorderWidth: 2,
            pointRadius: empty ? 0 : 5,
            pointHoverRadius: 7,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              return fillGradient(ctx, chartArea);
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: animDuration,
          easing: "easeOutCubic",
        },
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            filter: (item) => item.datasetIndex === 1,
            backgroundColor: "rgba(18, 18, 20, 0.92)",
            titleColor: "#e5e2e1",
            bodyColor: "#c8c6c4",
            borderColor: "rgba(212, 165, 116, 0.35)",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label(ctx) {
                const v = ctx.parsed.y;
                const pct = total > 0 ? Math.round((100 * v) / total) : 0;
                return `${v} guess${v === 1 ? "" : "es"} (${pct}% of ${title.toLowerCase()})`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: {
              color: "#8a8a8a",
              font: { size: 11 },
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: empty ? 4 : undefined,
            ticks: {
              precision: 0,
              color: "#8a8a8a",
              font: { size: 11 },
            },
            grid: { color: "rgba(255,255,255,0.06)" },
            title: {
              display: true,
              text: "Count",
              color: "#6a6a6a",
              font: { size: 11 },
            },
          },
        },
      },
    });
  }

  function renderKpis(el, bucket, options) {
    if (!el) return;
    options = options || {};
    const g = bucket.games;
    const c = bucket.correct;
    const acc = window.MortipinsBrawldleStats
      ? window.MortipinsBrawldleStats.accuracyPercent(c, g)
      : null;
    const avgWrong = window.MortipinsBrawldleStats
      ? window.MortipinsBrawldleStats.avgStepsWrongWhenWrong(bucket.wrongRankSteps, g, c)
      : null;

    let extraBlock = "";
    if (options.showStreak && window.MortipinsBrawldleStats) {
      const st = window.MortipinsBrawldleStats.getDailyStreak();
      const cur = st && typeof st.current === "number" ? st.current : 0;
      const best = st && typeof st.longest === "number" ? st.longest : 0;
      extraBlock += `
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${cur}</span>
        <span class="brawldle-ys-kpi__lab">daily streak</span>
      </div>
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${best}</span>
        <span class="brawldle-ys-kpi__lab">longest streak</span>
      </div>`;
    }
    if (options.showUnlimitedStreak && window.MortipinsBrawldleStats) {
      const us = window.MortipinsBrawldleStats.getUnlimitedStreak();
      const longest =
        us && typeof us.longest === "number" ? us.longest : 0;
      extraBlock += `
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${longest}</span>
        <span class="brawldle-ys-kpi__lab">longest win streak</span>
      </div>`;
    }

    el.innerHTML = `
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${g}</span>
        <span class="brawldle-ys-kpi__lab">games</span>
      </div>
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${acc == null ? "—" : acc + "%"}</span>
        <span class="brawldle-ys-kpi__lab">accuracy</span>
      </div>
      <div class="brawldle-ys-kpi">
        <span class="brawldle-ys-kpi__val">${avgWrong == null ? "—" : avgWrong}</span>
        <span class="brawldle-ys-kpi__lab">avg. ranks off (when wrong)</span>
      </div>${extraBlock}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.MortipinsBrawldleStats) return;

    const s = window.MortipinsBrawldleStats.loadStats();
    const note = document.getElementById("brawldle-ys-empty");
    const totalGames = s.daily.games + s.unlimited.games;

    renderKpis(document.getElementById("brawldle-ys-kpi-daily"), s.daily, {
      showStreak: true,
      showUnlimitedStreak: false,
    });
    renderKpis(document.getElementById("brawldle-ys-kpi-unlimited"), s.unlimited, {
      showStreak: false,
      showUnlimitedStreak: true,
    });

    if (note) {
      note.hidden = totalGames > 0;
    }

    buildChart("brawldle-chart-daily", s.daily.distribution, "Daily");
    buildChart("brawldle-chart-unlimited", s.unlimited.distribution, "Unlimited");
  });
})();
