import { isValidObjectId } from "mongoose";
import { db } from "."
import { Restaurant } from "@/models";
import { IRestaurant } from "@/interfaces";


export const getProductById = async( id: string) : Promise<IRestaurant | null> => {

    await db.connect();
    
    if (!isValidObjectId(id)) return null;

    const restaurant = await Restaurant.findById(id).lean()

    await db.disconnect();

    if( !restaurant){
        return null;
    }

    return JSON.parse(JSON.stringify(restaurant))

}