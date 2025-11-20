import type { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';

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

    if (!process.env.REDIS_URL) {
      console.error('REDIS_URL environment variable is missing');
      return response.status(500).json({ error: 'Database configuration error' });
    }

    // Initialize Redis client with the connection string
    const client = new Redis(process.env.REDIS_URL);

    // Save email to a Set in Redis called 'subscribers'
    // Using a Set automatically handles duplicates
    await client.sadd('subscribers', email);

    // Optional: Store a timestamp for the user
    await client.hset(`subscriber:${email}`, {
      joinedAt: new Date().toISOString(),
      source: 'under-construction-page'
    });

    // Close the connection to prevent serverless function timeouts
    await client.quit();

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}