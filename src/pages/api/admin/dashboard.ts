import { db } from '@/database';
import { Comment, Restaurant, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    numberOfClient: number;
    numberOfRestaurant: number;
    numberOfComentary: number;
    restaurantWithOutComm: any;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    await db.connect()

    const [
        numberOfClient,
        numberOfRestaurant,
        numberOfComentary,
        restaurantWithOutComm,
     ] = await Promise.all([
        User.find({role: 'Client'}).count(),
        Restaurant.count(),
        Comment.count(),
        Restaurant.aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'restaurant',
                        as: 'comments'
                    }
                },
                {
                    $match: {
                        comments: {$size:0}
                    }
                },
                {
                    $count: 'comments'
                }
            ]),
        ])
    
    await db.disconnect()
    
    res.status(200).json({ numberOfClient, numberOfComentary, numberOfRestaurant, restaurantWithOutComm })
}