import { db } from '@/database'
import { IRestaurant } from '@/interfaces'
import { Restaurant } from '@/models'
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | {message: string}
    | IRestaurant | null;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'GET':
            return getRestaurantById(req, res)

        default:
            res.status(400).json({ message: 'Bad request' })
            
    }
    
}

const getRestaurantById =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect()
    
    const { id } = req.query

    if (!isValidObjectId(id)) return null;

    const restaurant = await Restaurant.findById(id).lean()

    await db.disconnect()

    if( !restaurant){
        res.status(404).json({message:'Restaurante no encontrado'})
    }

    res.status(200).json(restaurant);
}
