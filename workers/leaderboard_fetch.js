/*
Leaderboards worker: serve weekly leaderboard endpoints
- Bind D1 as DB and KV as LEADERBOARD_KV
- Routes:
  GET /leaderboard/weekly         -> returns LIVE current week's top-200 from weekly_totals
  GET /leaderboard/weekly/:weekId -> returns snapshot for specific past week
*/

// Helper: compute current week ID (Monday as YYYY-MM-DD)
function getCurrentWeekId() {
  const date = new Date();
  const day = date.getUTCDay();
  const shift = (day + 6) % 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - shift);
  return monday.toISOString().slice(0,10);
}

// Helper: add CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function handleRequest(request, env) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() });
  }

  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);

  // /leaderboard/alltime - All-time leaderboard (top 100)
  if (parts.length === 2 && parts[0] === 'leaderboard' && parts[1] === 'alltime') {
    const rows = await env.DB.prepare(`
      SELECT username, points, email
      FROM users
      ORDER BY points DESC
      LIMIT 100
    `).all();

    const items = (rows.results || []).map(r => ({ 
      username: r.username, 
      email: r.email, 
      points: r.points
    }));

    return new Response(JSON.stringify(items), { 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
        ...corsHeaders()
      } 
    });
  }

  // /leaderboard/weekly - LIVE data for current week
  if (parts.length === 2 && parts[0] === 'leaderboard' && parts[1] === 'weekly') {
    const currentWeekId = getCurrentWeekId();
    
    // Query weekly_totals directly for LIVE rankings
    const rows = await env.DB.prepare(`
      SELECT wt.username, wt.points, wt.correct_count, u.email
      FROM weekly_totals wt
      LEFT JOIN users u ON u.username = wt.username
      WHERE wt.week_id = ?
      ORDER BY wt.correct_count DESC, wt.points DESC
      LIMIT 10
    `).bind(currentWeekId).all();

    const items = (rows.results || []).map(r => ({ 
      username: r.username, 
      email: r.email, 
      points: r.points, 
      correct_count: r.correct_count 
    }));

    return new Response(JSON.stringify(items), { 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
        ...corsHeaders()
      } 
    });
  }

  // /leaderboard/weekly/:weekId - Historical snapshot for specific week
  if (parts.length === 3 && parts[0] === 'leaderboard' && parts[1] === 'weekly') {
    const weekId = parts[2];
    const currentWeekId = getCurrentWeekId();
    
    // If requesting current week, redirect to live data
    if (weekId === currentWeekId) {
      const rows = await env.DB.prepare(`
        SELECT wt.username, wt.points, wt.correct_count, u.email
        FROM weekly_totals wt
        LEFT JOIN users u ON u.username = wt.username
        WHERE wt.week_id = ?
        ORDER BY wt.correct_count DESC, wt.points DESC
        LIMIT 10
      `).bind(weekId).all();

      const items = (rows.results || []).map(r => ({ 
        username: r.username, 
        email: r.email, 
        points: r.points, 
        correct_count: r.correct_count 
      }));

      return new Response(JSON.stringify(items), { 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
          ...corsHeaders()
        } 
      });
    }

    // For past weeks, try KV cache first
    const kv = await env.LEADERBOARD_KV.get('weekly::' + weekId);
    if (kv) return new Response(kv, { 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
        ...corsHeaders()
      } 
    });

    // Fallback to DB snapshot
    const row = await env.DB.prepare('SELECT snapshot_json FROM weekly_leaderboards WHERE week_id = ?').bind(weekId).first();
    return new Response(row ? row.snapshot_json : JSON.stringify([]), { 
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
        ...corsHeaders()
      } 
    });
  }

  return new Response('Not Found', { status: 404 });
}

// ES module worker entry: default fetch handler
export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  }
};