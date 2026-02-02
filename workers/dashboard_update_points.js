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

// Helper: add CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Helper to create a random token
function makeToken(bytes = 32) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Password verification using SHA-256 (matching existing database format)
async function verifyPassword(storedHash, password) {
  // Hash the input password with SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Compare with stored hash
  return storedHash === hashedPassword;
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
  if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });

  const user = await verifyToken(env, token);
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
  const username = user.username;

  const body = await request.json();
  // Use the delta calculated by the frontend (includes streak bonuses, etc)
  const delta = body.delta || (body.isCorrect ? 10 : -3);

  const weekId = weekIdForDate();
  const correctDelta = body.isCorrect ? 1 : 0;

  try {
    // D1 batch execution for atomic operations
    const batch = [
      // 1) Append to points_history
      env.DB.prepare('INSERT INTO points_history (username, delta, reason) VALUES (?, ?, ?)')
        .bind(username, delta, 'guess'),
      
      // 2) Update users table: assume users table has column 'points'
      env.DB.prepare('UPDATE users SET points = points + ? WHERE username = ?')
        .bind(delta, username),
      
      // 3) Upsert weekly_totals - increment points for the week and increment correct_count when appropriate
      env.DB.prepare(`
        INSERT INTO weekly_totals (username, week_id, points, correct_count) VALUES (?, ?, ?, ?)
        ON CONFLICT(username, week_id) DO UPDATE SET
          points = weekly_totals.points + excluded.points,
          correct_count = weekly_totals.correct_count + excluded.correct_count
      `).bind(username, weekId, delta, correctDelta)
    ];

    // Execute batch atomically
    await env.DB.batch(batch);

    // Return updated points
    const updated = await env.DB.prepare('SELECT points FROM users WHERE username = ?').bind(username).first();
    return new Response(JSON.stringify({ points: updated ? updated.points : null, message: 'Points updated successfully' }), { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders()
      } 
    });
  } catch (err) {
    console.error('update-points error', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), { 
      status: 500, 
      headers: { 
        'Content-Type': 'application/json', 
        ...corsHeaders() 
      } 
    });
  }
}

// Helper to hash password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Signup handler
async function handleSignup(request, env) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
  
  const body = await request.json();
  const { username, email, password } = body;
  
  if (!username || !email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  // Check if user already exists
  const existing = await env.DB.prepare('SELECT username FROM users WHERE username = ? OR email = ?')
    .bind(username, email)
    .first();
    
  if (existing) {
    return new Response(JSON.stringify({ message: 'Username or email already exists. Please login instead.' }), { 
      status: 409, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user (initialize with 0 points)
  try {
    await env.DB.prepare('INSERT INTO users (username, email, password, points) VALUES (?, ?, ?, 0)')
      .bind(username, email, hashedPassword)
      .run();

    // Create session token (expires in 30 days)
    const token = makeToken(32);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

    await env.DB.prepare('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)')
      .bind(token, username, expiresAt)
      .run();

    return new Response(JSON.stringify({ token, username }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  } catch (err) {
    console.error('Signup error:', err);
    return new Response(JSON.stringify({ message: 'Failed to create account' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }
}

// Login handler
async function handleLogin(request, env) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
  
  const body = await request.json();
  const username = body.username;
  const password = body.password;
  if (!username || !password) return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });

  // Fetch user row
  const user = await env.DB.prepare('SELECT username, password FROM users WHERE username = ?').bind(username).first();
  if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });

  const ok = await verifyPassword(user.password, password);
  if (!ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });

  // Password migration removed (all passwords are plain text for now)

  // Create session token (expires in 30 days)
  const token = makeToken(32);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

  await env.DB.prepare('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)')
    .bind(token, username, expiresAt)
    .run();

  return new Response(JSON.stringify({ token }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
}

// Verify token handler (for dashboard page load)
async function handleVerify(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  const user = await verifyToken(env, token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  // Fetch user data
  const userData = await env.DB.prepare('SELECT username, email, points FROM users WHERE username = ?')
    .bind(user.username)
    .first();

  return new Response(JSON.stringify({ 
    username: userData.username, 
    email: userData.email,
    points: userData.points || 0 
  }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
  });
}

// Get points handler
async function handleGetPoints(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  const user = await verifyToken(env, token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  const userData = await env.DB.prepare('SELECT points FROM users WHERE username = ?')
    .bind(user.username)
    .first();

  return new Response(JSON.stringify({ points: userData?.points || 0 }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
  });
}

// Logout handler
async function handleLogout(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return new Response(JSON.stringify({ message: 'Logged out' }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  // Delete session token
  try {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?')
      .bind(token)
      .run();
  } catch (err) {
    console.error('Logout error:', err);
  }

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
  });
}

// Update email handler
async function handleUpdateEmail(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  const user = await verifyToken(env, token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  const body = await request.json();
  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }

  try {
    await env.DB.prepare('UPDATE users SET email = ? WHERE username = ?')
      .bind(email, user.username)
      .run();

    return new Response(JSON.stringify({ message: 'Email updated successfully' }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  } catch (err) {
    console.error('Update email error:', err);
    return new Response(JSON.stringify({ message: 'Failed to update email' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
    });
  }
}

// ES module worker entry: export default fetch handler
export default {
  async fetch(request, env) {
    // Handle CORS preflight for all routes
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);
    
    if (request.method === 'POST' && url.pathname === '/signup') {
      return handleSignup(request, env);
    }
    
    if (request.method === 'POST' && url.pathname === '/login') {
      return handleLogin(request, env);
    }
    
    if (request.method === 'GET' && url.pathname === '/verify') {
      return handleVerify(request, env);
    }
    
    if (request.method === 'GET' && url.pathname === '/get-points') {
      return handleGetPoints(request, env);
    }
    
    if (request.method === 'POST' && url.pathname === '/logout') {
      return handleLogout(request, env);
    }
    
    if (request.method === 'POST' && url.pathname === '/update-email') {
      return handleUpdateEmail(request, env);
    }
    
    if (request.method === 'POST' && url.pathname === '/update-points') {
      return handleUpdatePoints(request, env);
    }
    
    return new Response('Not Found', { status: 404, headers: corsHeaders() });
  }
};