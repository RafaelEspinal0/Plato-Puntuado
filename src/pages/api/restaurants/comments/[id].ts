import { db } from '@/database'
import { IComment, IRestaurant } from '@/interfaces'
import { Comment, Restaurant, User } from '@/models'
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';

type Data = 
    | {message: string}
    | IComment
    | {
       
    }
    
    

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'GET':
            return getCommentByRestaurant(req, res)
        case 'POST':
            return addCommentsByRestaruant(req, res)
        case 'DELETE':
            return deleteCommentsByRestaruant(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
            
    }
    
}

const avg = (array:any) => {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length
}

const getCommentByRestaurant =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect()
    const { id } = req.query

    if (!isValidObjectId(id)) return null;
    
    const comments = await Comment.find({restaurant: id}).lean();
    const rating = comments.map(x => x.rating)

    
    const commentsWithUser = await Promise.all(comments.map(async (comment) =>{
        const user = await User.findById(comment.from).lean().exec()
       
        
        return { ...comment, nameUser: user?.name}
    }))
    await db.disconnect()

    if( !comments){
        res.status(404).json({message:'This restaurant has not yet been rated.'})
    }

    res.status(200).json({commentsWithUser ,  ratingRestaurant: avg(rating)});
}

const addCommentsByRestaruant =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {
        restaurant = '',
        from = '',
        content = '',
        rating = ''
    } = req.body

    await db.connect();
    const comment = await Comment.create({restaurant, from, content, rating});

    await db.disconnect();
    
    return res.status(200).json({
        comment
    })
}

const deleteCommentsByRestaruant =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query
    await db.connect();
    const comment = await Comment.findByIdAndDelete(id);

    await db.disconnect();
    
    return res.status(200).json({
        comment,
        message:"Comment deleted successfully."
    })
}

