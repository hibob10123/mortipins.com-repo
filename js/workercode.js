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
    const result = await db.prepare('SELECT Bronze, Silver, Gold, Diamond, Mythic, Legendary, Masters FROM GUESSES').all()
    const distributionData = result.results
    console.log('handguessdistribution done')
  
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  
    return new Response(JSON.stringify(distributionData), { headers })
  }
  
  async function handleGuess(request, env) {
    const { video_id, guess } = await request.json()
    console.log(`Received guess: video_id=${video_id}, guess=${guess}`)
  
    const db = env['guesses-db']
    const column = guess.charAt(0).toUpperCase() + guess.slice(1).toLowerCase()
    console.log(`Updating column: ${column} for video_id: ${video_id}`)
  
    try {
      const updateResult = await db.prepare(`UPDATE GUESSES SET ${column} = ${column} + 1 WHERE VideoId = ?`).bind(video_id).run() // what is this doing: 
      console.log('Update result:', updateResult)
    } catch (error) {
      console.error('Error updating database:', error)
    }
  
    const response = {
      video_id,
      guess,
      status: 'success'
    }
  
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  
    return new Response(JSON.stringify(response), { headers })
  }