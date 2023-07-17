import { isValidObjectId } from "mongoose";
import { db } from ".";
import { User, Comment} from "@/models";


type Data = 
    | {}

const avg = (array:any) => {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length
}

export const getCommentByRestaurants = async( id: string) : Promise<Data | null> => {

    await db.connect()

    if (!isValidObjectId(id)) return null;
    
    const comments = await Comment.find({restaurant: id}).sort({createdAt:-1}).lean();
    const rating = comments.map(x => x.rating)

    const commentsWithUser = await Promise.all(comments.map(async (comment) =>{
        const user = await User.findById(comment.from).lean().exec()
       
        
        return { ...comment, nameUser: user?.name}
    }))
    await db.disconnect()

    return JSON.parse(JSON.stringify({commentsWithUser ,  ratingRestaurant: avg(rating)}))

}


export const getCommentByUser = async( id: string) : Promise<Data | null> => {

    await db.connect()

    if (!isValidObjectId(id)) return null;
    
    const comments = await Comment.find({from: id}).sort({createdAt:-1}).lean();
    const rating = comments.map(x => x.rating)

    const commentsWithUser = await Promise.all(comments.map(async (comment) =>{
        const user = await User.findById(comment.from).lean().exec()
       
        
        return { ...comment, nameUser: user?.name}
    }))
    await db.disconnect()

    return JSON.parse(JSON.stringify({commentsWithUser ,  ratingRestaurant: avg(rating)}))

}
