function weekIdForDate(d = new Date()) {
  const date = new Date(d);
  const day = date.getUTCDay();
  const shift = (day + 6) % 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - shift);
  return monday.toISOString().slice(0,10);
}

async function authorize(req, env) {
  const auth = req.headers.get('authorization') || '';
  if (!env.SETUP_SECRET) return false;
  if (!auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  return token === env.SETUP_SECRET;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Basic auth check
    if (!await authorize(request, env)) {
      return new Response('unauthorized', { status: 401 });
    }

    if (request.method === 'POST' && url.pathname === '/admin/backfill') {
      // Accept optional JSON body: { "weekId": "2026-02-02" }
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const weekId = body.weekId || weekIdForDate(new Date());

      // Run single-statement backfill (no BEGIN/COMMIT) - idempotent
      const sql = `INSERT OR IGNORE INTO weekly_totals (username, week_id, points, correct_count)
        SELECT username, ?, 0, 0 FROM users;`;
      await env.DB.prepare(sql).bind(weekId).run();
      return new Response(JSON.stringify({ ok: true, weekId }), { status: 200 });
    }

    if (request.method === 'POST' && url.pathname === '/admin/publish') {
      // Publish the given week (default to previous week)
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const weekId = body.weekId || (() => {
        const now = new Date();
        const prev = new Date(now);
        prev.setUTCDate(now.getUTCDate() - 7);
        return weekIdForDate(prev);
      })();

      // Fetch top N from weekly_totals
      const rows = await env.DB.prepare(`
        SELECT wt.username, wt.points, wt.correct_count, u.email
        FROM weekly_totals wt
        LEFT JOIN users u ON u.username = wt.username
        WHERE wt.week_id = ?
        ORDER BY wt.correct_count DESC, wt.points DESC
        LIMIT 200
      `).bind(weekId).all();

      const items = (rows.results || []).map(r => ({ username: r.username, email: r.email, points: r.points, correct_count: r.correct_count }));

      // Persist snapshot in DB
      await env.DB.prepare(`
        INSERT INTO weekly_leaderboards (week_id, snapshot_json, published_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(week_id) DO UPDATE SET snapshot_json = excluded.snapshot_json, published_at = CURRENT_TIMESTAMP
      `).bind(weekId, JSON.stringify(items)).run();

      // Cache top-10 in KV
      await env.LEADERBOARD_KV.put('weekly::' + weekId, JSON.stringify(items.slice(0,10)), { expirationTtl: 60*60*24*14 });
      await env.LEADERBOARD_KV.put('weekly::current', weekId);

      return new Response(JSON.stringify({ ok: true, weekId, count: items.length }), { status: 200 });
    }

    return new Response('not found', { status: 404 });
  }
};
