import { IUser } from "@/interfaces";
import mongoose, { Model, Schema, model } from "mongoose";


const userSchema = new Schema({

    name: { type: String, required: true },
    username: [ { type:String } ],
    password: {type: String, required: true},
    role:{
        type:String,
        enum:{
            values: ['Admin', 'Client', 'Restaurant'],
            message: "{VALUES} no es un role valido",
            default: 'client',
            requerid: true
        }
    },
},{
    timestamps:true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
