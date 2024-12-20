/* editing this wont actually change the worker code, it's just for reference */

export default {
    async fetch(request) {
      return handleRequest(request)
    }
  }
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname
  
    if (request.method === 'OPTIONS') {
      return handleOptions(request)
    } else if (path === '/api/guess-distribution') {
      return handleGuessDistribution(request)
    } else if (path === '/api/guess') {
      return handleGuess(request)
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
  
  async function handleGuessDistribution(request) {
    // Example data for the distribution chart
    const distributionData = [
      { guess: 'Bronze', count: 1 },
      { guess: 'Silver', count: 3 },
      { guess: 'Gold', count:8 },
      { guess: 'Diamond', count: 8 },
      { guess: 'Mythic', count: 10 },
      { guess: 'Legendary', count: 3 },
      { guess: 'Masters', count: 0 }
    ]
  
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  
    return new Response(JSON.stringify(distributionData), { headers })
  }
  
  async function handleGuess(request) {
    const { video_id, guess } = await request.json()
    console.log(`Received guess: video_id=${video_id}, guess=${guess}`)
  
    // Example response for the guess submission
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