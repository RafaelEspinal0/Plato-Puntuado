import { IComment } from "@/interfaces";
import mongoose, { Model, Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({

    restaurant: { type: ObjectId, ref: 'Restaurant' },
    from: { type: ObjectId, ref:'User'},
    content: {type: String},
    rating: {type: Number}
},{
    timestamps:true
});

const Comment: Model<IComment> = mongoose.models.Comment || model('Comment', commentSchema);

export default Comment;
