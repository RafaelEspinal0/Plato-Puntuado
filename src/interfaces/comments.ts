import { Types } from "mongoose";

export interface IComment{

    restaurant:  Types.ObjectId,
    from: Types.ObjectId,
    content: string,
    rating:  number
   
    //TODO: agregar createdAt y updatedAt
}
