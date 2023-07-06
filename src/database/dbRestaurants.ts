import { isValidObjectId } from "mongoose";
import { db } from "."
import { Restaurant } from "@/models";
import { IRestaurant } from "@/interfaces";





export const getRestaurantById = async( id: string) : Promise<IRestaurant | null> => {

    await db.connect();
    
    if (!isValidObjectId(id)) return null;

    const restaurant = await Restaurant.findById(id).lean()

    await db.disconnect();

    if( !restaurant){
        return null;
    }

    return JSON.parse(JSON.stringify(restaurant))

}

export const getRestaurantByTerm = async (term: string): Promise<IRestaurant[]> => {
    
    term = term.toString().toLowerCase();
    
    await db.connect()
    
    const restaurants = await Restaurant.find({
        $text: { $search : `/.*${term}.*/i`  }
    })
    .select('name images -_id')
    .lean()

    await db.disconnect()

    return restaurants;
}

export const getAllRestaurants = async(): Promise<IRestaurant[]> => {
    
    await db.connect();
    const restaurants = await Restaurant.find().lean()
    await db.disconnect();

    return JSON.parse(JSON.stringify(restaurants))
}