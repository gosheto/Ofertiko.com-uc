import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = request.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return response.status(400).json({ error: 'Invalid email address' });
    }

    // Save email to a Set in Redis (Vercel KV) called 'subscribers'
    // Using a Set automatically handles duplicates
    await kv.sadd('subscribers', email);

    // Optional: Store a timestamp for the user
    await kv.hset(`subscriber:${email}`, {
      joinedAt: new Date().toISOString(),
      source: 'under-construction-page'
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}