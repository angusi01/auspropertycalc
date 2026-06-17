import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_email' });

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_AUSPROPERTYCALC_LIST_ID);
  if (!apiKey || !listId) return res.status(500).json({ error: 'newsletter_not_configured' });

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: parsed.data.email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) return res.status(500).json({ error: 'subscribe_failed' });
  return res.status(200).json({ ok: true });
}
