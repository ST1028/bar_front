import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderRequest } from '@/src/types/Requests/OrderRequest'
import { parseCookies } from 'nookies';
import { ResultResponse } from '@/src/types/Responses/ResultResponse';
import { OrdersResponse } from '@/src/types/Responses/OrdersResponse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parseCookies({ req });
    const token = cookies['token'];
    if (req.method == 'GET') {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        const orders: OrdersResponse = await response.json()
        res.status(200).json({ data: orders.data })
    } else if (req.method == 'POST') {
        const body: OrderRequest = JSON.parse(req.body);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
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

            const data: ResultResponse = await response.json();
            res.status(200).json({data: data.data});

        } catch (error) {
            res.status(500).json({ message: 'An error occurred.', error: error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
}
