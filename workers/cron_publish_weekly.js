/*
Cron worker: publish weekly leaderboard
- Bind D1 as DB and KV namespace as LEADERBOARD_KV
- Set a Cron Trigger (example schedule: 0 5 * * MON for Monday 05:00 UTC)
*/

function weekIdForDate(d = new Date()) {
  const date = new Date(d);
  const day = date.getUTCDay();
  const shift = (day + 6) % 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - shift);
  return monday.toISOString().slice(0,10);
}

export async function scheduled(event, env) {
  // Publish the *previous* week so the week is complete
  const now = new Date();
  const prevWeek = new Date(now);
  prevWeek.setUTCDate(now.getUTCDate() - 7);
  const weekId = weekIdForDate(prevWeek);

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

  // Also store pointer to latest published week
  await env.LEADERBOARD_KV.put('weekly::current', weekId);

  return new Response('ok');
}

// Ensure a default export so Wrangler treats this as a module worker
export default { scheduled };