import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Restaurant } from '@/models';
import { IRestaurant } from '@/interfaces';

type Data = 
    | {message: string}
    | IRestaurant[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getRestaurants(req, res)
        
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
    
}

const getRestaurants = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const restaurants= await Restaurant.find()
                                        .select('name images categories')
                                        .lean();

    await db.disconnect();

    return res.status(200).json(restaurants)
}
