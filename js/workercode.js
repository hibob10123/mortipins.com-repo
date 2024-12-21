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