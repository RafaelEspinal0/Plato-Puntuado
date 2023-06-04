import { IRestaurant } from "@/interfaces";
import mongoose, { Model, Schema, model } from "mongoose";


const restaurantSchema = new Schema({

    name: { type: String, required: true },
    images: [ { type:String } ],
    description: {type: String, required: true},
    categories:[{
        type:String,
        enum:{
            values: ['American', 'Hamburgers', 'Italian', 'Ice cream', 'Chicken', 'Mexican food', 'Drinks', 'Vegan Food', 'Salads', 'Fish and seafood ', 'Sushi'],
            message: "{VALUES} no es una categoria valida"
        }
    }],
},{
    timestamps:true
});

const Restaurant: Model<IRestaurant> = mongoose.models.Restaurant || model('Restaurant', restaurantSchema);

export default Restaurant;
