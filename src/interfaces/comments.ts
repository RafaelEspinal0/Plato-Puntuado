import { Types } from "mongoose";

export interface IComment{

    restaurant:  Types.ObjectId,
    from: Types.ObjectId,
    content: string
   
    //TODO: agregar createdAt y updatedAt
}
