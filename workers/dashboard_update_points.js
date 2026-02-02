/*
Dashboard worker: Update points handler (username-based)
- Bind D1 as: DB
- This is a template. Replace `verifyToken` with your real auth lookup that resolves to a username.
- Use this function in your worker route that currently handles '/update-points'.
*/

// Helper: compute week start (Monday) as YYYY-MM-DD
function weekIdForDate(d = new Date()) {
  const date = new Date(d);
  const day = date.getUTCDay(); // 0=Sun..6=Sat
  const shift = (day + 6) % 7; // days since Monday
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - shift);
  return monday.toISOString().slice(0,10);
}

// Session-based token verification using the `sessions` table.
// Returns `{ username }` on success or `null` on failure.
async function verifyToken(env, token) {
  if (!token) return null;
  try {
    const row = await env.DB.prepare(
      'SELECT username FROM sessions WHERE token = ? AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)'
    ).bind(token).first();
    return row ? { username: row.username } : null;
  } catch (err) {
    console.error('verifyToken error', err);
    return null;
  }
}

export async function handleUpdatePoints(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return new Response('Unauthorized', { status: 401 });

  const user = await verifyToken(env, token);
  if (!user) return new Response('Unauthorized', { status: 401 });
  const username = user.username;

  const body = await request.json();
  // Compute delta on server using your Elo or points algorithm
  // Replace this example with your real logic
  const delta = body.isCorrect ? 10 : -3;

  const weekId = weekIdForDate();

  try {
    await env.DB.exec('BEGIN');

    // 1) Append to points_history
    await env.DB.prepare('INSERT INTO points_history (username, delta, reason) VALUES (?, ?, ?)')
      .bind(username, delta, 'guess')
      .run();

    // 2) Update users table: assume users table has column 'points'
    await env.DB.prepare('UPDATE users SET points = points + ? WHERE username = ?')
      .bind(delta, username)
      .run();

    // 3) Upsert weekly_totals - increment points for the week and increment correct_count when appropriate
    const correctDelta = body.isCorrect ? 1 : 0;
    await env.DB.prepare(`
      INSERT INTO weekly_totals (username, week_id, points, correct_count) VALUES (?, ?, ?, ?)
      ON CONFLICT(username, week_id) DO UPDATE SET
        points = weekly_totals.points + excluded.points,
        correct_count = weekly_totals.correct_count + excluded.correct_count
    `).bind(username, weekId, delta, correctDelta).run();

    await env.DB.exec('COMMIT');

    // Return updated points
    const updated = await env.DB.prepare('SELECT points FROM users WHERE username = ?').bind(username).first();
    return new Response(JSON.stringify({ points: updated ? updated.points : null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    await env.DB.exec('ROLLBACK');
    console.error('update-points error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// ES module worker entry: export default fetch handler
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/update-points') {
      return handleUpdatePoints(request, env);
    }
    return new Response('Not Found', { status: 404 });
  }
};