import { db } from '@/database'
import { IComment, IRestaurant } from '@/interfaces'
import { Comment, Restaurant, User } from '@/models'
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | {message: string}
    | IRestaurant[] | null;
    
    
    

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'GET':
            return getRestaurants(req, res)
        case 'POST':
         
        case 'PUT':
            

        default:
            res.status(400).json({ message: 'Bad request' })
            
    }
}

const getRestaurants = async(req:NextApiRequest, res:NextApiResponse<Data>) => {
    await db.connect()

    const restaurants = await Restaurant.find()
        .sort({name:'asc'})
        .lean()

    await db.disconnect()

    res.status(200).json(restaurants)
}

