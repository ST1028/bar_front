import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderRequest } from '@/src/types/Requests/OrderRequest'
import { parseCookies } from 'nookies';
import { ResultResponse } from '@/src/types/Responses/ResultResponse';
import { OrdersResponse } from '@/src/types/Responses/OrdersResponse';
import { Logger } from 'aws-amplify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parseCookies({ req });
    const token = cookies['token'];
    const logger = new Logger('foo');
    if (req.method == 'GET') {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        const orders: OrdersResponse = await response.json()
        res.status(200).json({ data: orders.data })
    } else if (req.method == 'POST') {
        logger.warn('step1')
        const body: OrderRequest = JSON.parse(req.body);
        logger.warn('step2')
        logger.warn(body)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            logger.warn('step3')

            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            logger.warn('step4')

            const data: ResultResponse = await response.json();
            logger.warn('step5')
            res.status(200).json({data: data.data});

        } catch (error) {
            logger.warn(error)
            res.status(500).json({ message: 'An error occurred.', error: error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
}
