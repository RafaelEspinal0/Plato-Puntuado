import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '@/database';
import { Comment, Restaurant, User } from '@/models';

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    if(process.env.NODE_ENV == 'production'){
        return res.status(401).json({message:'No tienes acceso a esta API.'})
    }

    await db.connect();

    await Restaurant.deleteMany();
    await Restaurant.insertMany(seedDatabase.initialData.restaurants)
    await User.deleteMany();
    await User.insertMany(seedDatabase.initialData.users);

    await db.disconnect();
    
    res.status(200).json({ message: 'Proceso realizado correctamente.' })

}