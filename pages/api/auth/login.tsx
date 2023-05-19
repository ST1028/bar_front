import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginResponse } from '@/src/types/Responses/LoginResponse'
import { LoginRequest } from '@/src/types/Requests/LoginRequest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { account, password }: LoginRequest = req.body;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, password })
    })

    if (!response.ok) {
      console.log(response)
      throw new Error('Response was not ok');
    }

    const data: LoginResponse = await response.json();
    res.status(200).json({data: data.data});

  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error: error, account: account, password: password});
  }
}
