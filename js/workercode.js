export default {
  async fetch(request, env) {
    return handleRequest(request, env)
  }
}

async function handleRequest(request, env) {
  const url = new URL(request.url)
  const path = url.pathname

  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  } else if (path === '/api/guess-distribution') {
    return handleGuessDistribution(request, env)
  } else if (path === '/api/guess') {
    return handleGuess(request, env)
  } else if (path === '/api/report-video' && request.method === 'POST') {
    return handleReportVideo(request, env)
  }

  return new Response('Not Found', { status: 404 })
}

function handleOptions(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
  return new Response(null, { headers })
}

async function handleGuessDistribution(request, env) {
  const db = env['guesses-db']
  const result = await db.prepare('SELECT VideoId, Bronze, Silver, Gold, Diamond, Mythic, Legendary, Masters FROM GUESSES').all()
  const distributionData = result.results
  console.log('handleGuessDistribution done')

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  return new Response(JSON.stringify(distributionData), { headers })
}

async function handleGuess(request, env) {
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return new Response('Invalid JSON', { status: 400 });
  }

  const { video_id, guess } = requestBody;
  console.log(`Received guess: video_id=${video_id}, guess=${guess}`);

  const db = env['guesses-db'];
  const column = guess.charAt(0).toUpperCase() + guess.slice(1).toLowerCase();
  console.log(`Updating column: ${column} for video_id: ${video_id}`);

  try {
    // Check if the row exists
    const checkResult = await db.prepare('SELECT * FROM GUESSES WHERE VideoId = ?').bind(video_id).first();
    if (!checkResult) {
      // No row exists, create a new row
      await db.prepare('INSERT INTO GUESSES (VideoId, Bronze, Silver, Gold, Diamond, Mythic, Legendary, Masters) VALUES (?, 0, 0, 0, 0, 0, 0, 0)').bind(video_id).run();
      console.log(`Created new row for video_id: ${video_id}`);
    }

    // Update the column
    const updateResult = await db.prepare(`UPDATE GUESSES SET ${column} = ${column} + 1 WHERE VideoId = ?`).bind(video_id).run();
    console.log('Update result:', updateResult);
  } catch (error) {
    console.error('Error updating database:', error);
    return new Response('Error updating database', { status: 500 });
  }

  const response = {
    video_id,
    guess,
    status: 'success'
  };

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  return new Response(JSON.stringify(response), { headers });
}

const REPORT_REASONS = new Set([
  'off_topic',
  'wrong_game',
  'inappropriate',
  'broken',
  'spam',
  'other'
])

const MAX_DETAILS = 500

async function handleReportVideo(request, env) {
  const webhookUrl = env.DISCORD_WEBHOOK_URL
  if (!webhookUrl || typeof webhookUrl !== 'string') {
    console.error('DISCORD_WEBHOOK_URL not configured')
    return jsonResponse({ ok: false, error: 'service_unavailable' }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400)
  }

  const reason = typeof body.reason === 'string' ? body.reason.trim() : ''
  if (!REPORT_REASONS.has(reason)) {
    return jsonResponse({ ok: false, error: 'invalid_reason' }, 400)
  }

  const videoId = truncateStr(body.video_id, 32)
  const videoUrl = truncateStr(body.video_url, 2048)
  const pageUrl = truncateStr(body.page_url, 2048)
  let details = typeof body.details === 'string' ? body.details.trim() : ''
  if (details.length > MAX_DETAILS) {
    details = details.slice(0, MAX_DETAILS)
  }

  const embed = {
    title: 'Video report',
    color: 0xb5651d,
    fields: [
      { name: 'Reason', value: reason, inline: true },
      { name: 'Video ID', value: videoId || '—', inline: true },
      { name: 'Video URL', value: videoUrl || '—' },
      { name: 'Page', value: pageUrl || '—' },
      { name: 'Details', value: details || '—' }
    ],
    timestamp: new Date().toISOString()
  }

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '**Morti-Site** — clip report',
        embeds: [embed]
      })
    })
    if (!discordRes.ok) {
      const text = await discordRes.text()
      console.error('Discord webhook error:', discordRes.status, text)
      return jsonResponse({ ok: false, error: 'forward_failed' }, 502)
    }
  } catch (err) {
    console.error('Discord fetch error:', err)
    return jsonResponse({ ok: false, error: 'forward_failed' }, 502)
  }

  return jsonResponse({ ok: true })
}

function truncateStr(value, max) {
  if (value == null) return ''
  const s = String(value)
  return s.length <= max ? s : s.slice(0, max)
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}