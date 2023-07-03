import { IRestaurant } from "@/interfaces";
import useSWR, { SWRConfiguration } from "swr"

//const fetcher = (...args: [key:string]) => fetch(...args).then(res => res.json())

export const useRestaurants = (url: string, config: SWRConfiguration = {}) => {

    const { data, error, isLoading } = useSWR<IRestaurant[]>(`/api${ url }`, config);

    return {
        restaurants: data || [],
        isLoading,
        isError: error 
    }
} 