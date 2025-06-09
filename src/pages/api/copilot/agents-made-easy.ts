import { NextApiRequest, NextApiResponse } from 'next';

// This proxies to your existing sales bot API
const AGENT_API_URL = process.env.VITE_SALES_BOT_API_URL || 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward the request to your existing agent API
    const response = await fetch(`${AGENT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: req.body.message,
        thread_id: req.body.thread_id || 'agents-made-easy-' + Date.now(),
        context: {
          mode: 'agents-made-easy',
          ...req.body.context
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Agent API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // Pass through the response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to agent API:', error);
    res.status(500).json({ 
      error: 'Failed to connect to agent service',
      details: error.message 
    });
  }
}
