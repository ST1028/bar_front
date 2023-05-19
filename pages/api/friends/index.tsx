// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies';
import { FriendsResponse } from '@/src/types/Responses/FriendsResponse'
import { FriendResponse } from '@/src/types/Responses/FriendResponse'
import { FriendCreateRequest } from '@/src/types/Requests/FriendCreateRequest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parseCookies({ req });
  const token = cookies['token'];
  if (req.method == 'GET') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const friends = await response.json()
    res.status(200).json({ data: friends.data } as FriendsResponse)
  } else if(req.method == 'POST') {
    const body: FriendCreateRequest = JSON.parse(req.body);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error('Response was not ok');
        }

        const data: FriendResponse = await response.json();
        res.status(200).json({data: data.data});

    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
    
}
