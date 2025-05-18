export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    const url = new URL(request.url);
    if (url.pathname === "/matchmaking/join" && request.method === "POST") {
      const { player } = await request.json();
      await env.MATCHMAKING.prepare(`CREATE TABLE IF NOT EXISTS matchmaking (
        lobby_id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_one TEXT,
        player_two TEXT,
        clip1_winner TEXT,
        clip2_winner TEXT,
        clip3_winner TEXT,
        clip4_winner TEXT,
        clip5_winner TEXT,
        winner TEXT
      )`).run();
      const existing = await env.MATCHMAKING.prepare(
        "SELECT lobby_id FROM matchmaking WHERE player_two IS NULL AND player_one != ? ORDER BY lobby_id LIMIT 1"
      ).bind(player).first();
      if (existing) {
        const lobbyId = existing.lobby_id;
        await env.MATCHMAKING.prepare(
          "UPDATE matchmaking SET player_two = ? WHERE lobby_id = ?"
        ).bind(player, lobbyId).run();
        return new Response(JSON.stringify({ lobby_id: lobbyId, status: "ready" }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      } else {
        const result = await env.MATCHMAKING.prepare(
          "INSERT INTO matchmaking (player_one) VALUES (?)"
        ).bind(player).run();
        const lobbyId = result.lastInsertRowid;
        return new Response(JSON.stringify({ lobby_id: lobbyId, status: "waiting" }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/status" && request.method === "GET") {
      const lobby_id = url.searchParams.get("lobby_id");
      const row = await env.MATCHMAKING.prepare(
        "SELECT player_one, player_two FROM matchmaking WHERE lobby_id = ?"
      ).bind(lobby_id).first();
      if (row.player_two) {
        return new Response(JSON.stringify({ lobby_id, status: "ready", player_one: row.player_one, player_two: row.player_two }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      } else {
        return new Response(JSON.stringify({ lobby_id, status: "waiting", player_one: row.player_one }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/clip" && request.method === "POST") {
      const { lobby_id, clip, winner } = await request.json();
      const col = `clip${clip}_winner`;
      await env.MATCHMAKING.prepare(
        `UPDATE matchmaking SET ${col} = ? WHERE lobby_id = ?`
      ).bind(winner, lobby_id).run();
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (url.pathname === "/matchmaking/finish" && request.method === "POST") {
      const { lobby_id } = await request.json();
      const row = await env.MATCHMAKING.prepare(
        "SELECT clip1_winner, clip2_winner, clip3_winner, clip4_winner, clip5_winner FROM matchmaking WHERE lobby_id = ?"
      ).bind(lobby_id).first();
      const counts = {};
      [row.clip1_winner, row.clip2_winner, row.clip3_winner, row.clip4_winner, row.clip5_winner].forEach(p => { counts[p] = (counts[p] || 0) + 1; });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      await env.MATCHMAKING.prepare(
        "UPDATE matchmaking SET winner = ? WHERE lobby_id = ?"
      ).bind(winner, lobby_id).run();
      return new Response(JSON.stringify({ winner }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
} 