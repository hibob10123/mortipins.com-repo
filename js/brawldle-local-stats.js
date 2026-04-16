/**
 * localStorage-backed Brawldle stats (daily + unlimited), per-guess distribution,
 * and daily one-guess-per-UTC-day.
 */
(function () {
  const STATS_KEY = "mortipins.brawldle.stats.v2";
  const STATS_KEY_LEGACY = "mortipins.brawldle.stats.v1";
  const DAILY_LAST_KEY = "mortipins.brawldle.dailyLastGuessUtc";

  const STEPS = 7; // 0 = exact … 6 = max rank steps in ladder

  function getUtcDateString() {
    return new Date().toISOString().split("T")[0];
  }

  function defaultDist() {
    return new Array(STEPS).fill(0);
  }

  function defaultBucket() {
    return {
      games: 0,
      correct: 0,
      wrongRankSteps: 0,
      distribution: defaultDist(),
    };
  }

  function defaultDailyStreak() {
    return {
      current: 0,
      longest: 0,
      lastCorrectUtcDate: null,
    };
  }

  /** Days between two UTC calendar strings YYYY-MM-DD (b should be >= a). */
  function utcDaysBetween(a, b) {
    if (!a || !b) return NaN;
    const ta = Date.parse(a + "T12:00:00.000Z");
    const tb = Date.parse(b + "T12:00:00.000Z");
    if (Number.isNaN(ta) || Number.isNaN(tb)) return NaN;
    return Math.round((tb - ta) / 86400000);
  }

  function mergeDailyStreak(raw) {
    const base = defaultDailyStreak();
    if (!raw || typeof raw !== "object") return base;
    base.current = Math.max(0, Number(raw.current) || 0);
    base.longest = Math.max(0, Number(raw.longest) || 0);
    base.lastCorrectUtcDate =
      typeof raw.lastCorrectUtcDate === "string" ? raw.lastCorrectUtcDate : null;
    return base;
  }

  function defaultUnlimitedStreak() {
    return { longest: 0 };
  }

  function mergeUnlimitedStreak(raw) {
    const base = defaultUnlimitedStreak();
    if (!raw || typeof raw !== "object") return base;
    base.longest = Math.max(0, Number(raw.longest) || 0);
    return base;
  }

  function updateUnlimitedLongestStreak(currentSessionStreak) {
    const n = Math.max(0, Number(currentSessionStreak) || 0);
    const s = loadStats();
    s.unlimitedStreak = mergeUnlimitedStreak(s.unlimitedStreak);
    s.unlimitedStreak.longest = Math.max(s.unlimitedStreak.longest, n);
    saveStats(s);
  }

  function updateDailyStreak(isCorrect) {
    const s = loadStats();
    s.dailyStreak = mergeDailyStreak(s.dailyStreak);
    const st = s.dailyStreak;
    const today = getUtcDateString();

    if (isCorrect) {
      if (st.lastCorrectUtcDate === today) {
        saveStats(s);
        return;
      }
      if (!st.lastCorrectUtcDate) {
        st.current = 1;
      } else {
        const diff = utcDaysBetween(st.lastCorrectUtcDate, today);
        if (diff === 1) {
          st.current = (st.current || 0) + 1;
        } else {
          st.current = 1;
        }
      }
      st.lastCorrectUtcDate = today;
      st.longest = Math.max(st.longest || 0, st.current);
    } else {
      st.current = 0;
    }
    saveStats(s);
  }

  function migrateLegacy() {
    try {
      const raw = localStorage.getItem(STATS_KEY_LEGACY);
      if (!raw) return null;
      const o = JSON.parse(raw);
      const out = {
        v: 2,
        daily: defaultBucket(),
        unlimited: defaultBucket(),
        dailyStreak: defaultDailyStreak(),
        unlimitedStreak: defaultUnlimitedStreak(),
      };
      ["daily", "unlimited"].forEach((mode) => {
        const b = o[mode];
        if (!b) return;
        out[mode].games = b.games || 0;
        out[mode].correct = b.correct || 0;
        out[mode].wrongRankSteps = b.wrongRankSteps || 0;
      });
      localStorage.setItem(STATS_KEY, JSON.stringify(out));
      localStorage.removeItem(STATS_KEY_LEGACY);
      return out;
    } catch {
      return null;
    }
  }

  function loadStats() {
    try {
      let raw = localStorage.getItem(STATS_KEY);
      if (!raw) {
        const migrated = migrateLegacy();
        if (migrated) return migrated;
        return {
          v: 2,
          daily: defaultBucket(),
          unlimited: defaultBucket(),
          dailyStreak: defaultDailyStreak(),
          unlimitedStreak: defaultUnlimitedStreak(),
        };
      }
      const o = JSON.parse(raw);
      const merge = (b) => {
        const base = defaultBucket();
        if (!b) return base;
        base.games = b.games || 0;
        base.correct = b.correct || 0;
        base.wrongRankSteps = b.wrongRankSteps || 0;
        const d = b.distribution;
        if (Array.isArray(d) && d.length === STEPS) {
          base.distribution = d.map((n) => Math.max(0, Number(n) || 0));
        }
        return base;
      };
      const out = {
        v: 2,
        daily: merge(o.daily),
        unlimited: merge(o.unlimited),
        dailyStreak: mergeDailyStreak(o.dailyStreak),
        unlimitedStreak: mergeUnlimitedStreak(o.unlimitedStreak),
      };
      return out;
    } catch {
      return {
        v: 2,
        daily: defaultBucket(),
        unlimited: defaultBucket(),
        dailyStreak: defaultDailyStreak(),
        unlimitedStreak: defaultUnlimitedStreak(),
      };
    }
  }

  function saveStats(s) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(s));
    } catch (e) {
      console.warn("brawldle stats: could not save", e);
    }
  }

  function record(mode, isCorrect, rankStepsOff) {
    const s = loadStats();
    const b = s[mode];
    if (!b) return;
    b.games += 1;
    const steps = isCorrect ? 0 : Math.min(STEPS - 1, Math.max(0, Number(rankStepsOff) || 0));
    b.distribution[steps] += 1;
    if (isCorrect) {
      b.correct += 1;
    } else {
      const off = Math.max(0, Number(rankStepsOff) || 0);
      b.wrongRankSteps += off;
    }
    saveStats(s);
  }

  function hasDailyGuessUsedToday() {
    const today = getUtcDateString();
    const v = localStorage.getItem(DAILY_LAST_KEY);
    if (v === today) return true;
    const legacy = localStorage.getItem("lastGuessDate");
    if (legacy === today) {
      localStorage.setItem(DAILY_LAST_KEY, today);
      return true;
    }
    return false;
  }

  function setDailyGuessCompletedToday() {
    localStorage.setItem(DAILY_LAST_KEY, getUtcDateString());
    localStorage.setItem("lastGuessDate", getUtcDateString());
  }

  function accuracyPercent(correct, games) {
    if (!games) return null;
    return Math.round((100 * correct) / games);
  }

  function avgStepsWrongWhenWrong(wrongRankSteps, games, correct) {
    const wrong = games - correct;
    if (wrong <= 0) return null;
    return Math.round((10 * wrongRankSteps) / wrong) / 10;
  }

  window.MortipinsBrawldleStats = {
    getUtcDateString,
    loadStats,
    recordDaily: function (isCorrect, rankStepsOff) {
      record("daily", isCorrect, rankStepsOff);
      updateDailyStreak(isCorrect);
    },
    getDailyStreak: function () {
      const s = loadStats();
      return mergeDailyStreak(s.dailyStreak);
    },
    getUnlimitedStreak: function () {
      const s = loadStats();
      return mergeUnlimitedStreak(s.unlimitedStreak);
    },
    updateUnlimitedLongestStreak: function (currentSessionStreak) {
      updateUnlimitedLongestStreak(currentSessionStreak);
    },
    recordUnlimited: function (isCorrect, rankStepsOff) {
      record("unlimited", isCorrect, rankStepsOff);
    },
    hasDailyGuessUsedToday,
    setDailyGuessCompletedToday,
    accuracyPercent,
    avgStepsWrongWhenWrong,
  };
})();
