// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies';
import { MenuCategoriesResponse } from '@/src/types/Responses/MenuCategoriesResponse'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenuCategoriesResponse>
) {
    const cookies = parseCookies({ req });
    const token = cookies['token'];
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu_categories/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.status != 200) {
      res.status(response.status).json({ data: [] })
      
    } else {
      const menuCategories = await response.json()
      res.status(200).json({ data: menuCategories.data })
    }
}
