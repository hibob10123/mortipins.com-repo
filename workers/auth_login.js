/*
Simple login worker that verifies username/password and creates a session token.
- Bind D1 as DB
- This is a template; adapt password verification to your hashing scheme.
- POST /login with JSON { username, password }
*/

// Helper to create a random token
function makeToken(bytes = 32) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple bcrypt-based password check if bcryptjs is bundled. Fallback to plain compare if not.
async function verifyPassword(storedHash, password) {
  try {
    // try dynamically importing bcryptjs (works if bundled via Wrangler)
    const bcrypt = await import('bcryptjs');
    return await bcrypt.compare(password, storedHash);
  } catch (e) {
    // Fallback: if storedHash appears to be plain (unlikely), do direct compare (NOT SECURE)
    console.warn('bcrypt not available; falling back to insecure compare');
    return storedHash === password;
  }
}

export async function handleLogin(request, env) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const body = await request.json();
  const username = body.username;
  const password = body.password;
  if (!username || !password) return new Response('Bad Request', { status: 400 });

  // Fetch user row
  const user = await env.DB.prepare('SELECT username, password FROM users WHERE username = ?').bind(username).first();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const ok = await verifyPassword(user.password, password);
  if (!ok) return new Response('Unauthorized', { status: 401 });

  // Create session token (expires in 30 days)
  const token = makeToken(32);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

  await env.DB.prepare('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)')
    .bind(token, username, expiresAt)
    .run();

  return new Response(JSON.stringify({ token }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

// Example: export default to use with the Worker Boilerplate
export default { handleLogin };