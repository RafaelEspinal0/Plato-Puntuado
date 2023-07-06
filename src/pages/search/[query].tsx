import { ReviewLayout } from "@/components/layouts";
import { RestaurantList } from "@/components/restaurants";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { GetServerSideProps } from 'next'
import { dbRestaurants } from "@/database";
import { IRestaurant } from "@/interfaces";


interface Props {
    restaurants: IRestaurant[];
    foundRestaurants: boolean;
    query: string
}


const SearchPage: NextPage<Props> = ({restaurants, foundRestaurants, query}) => {

  return (
    <ReviewLayout title="Busqueda de restaurantes">
        <Typography variant="h1" component='h1'>Buscar restaurante</Typography>

        {
            foundRestaurants
            ? 
                <Typography  variant="h2" sx={{mb:4}} textTransform='capitalize'>Termino: {query}</Typography>
            :(
                <Box display='flex'>
                    <Typography  variant="h2" sx={{mb:4}}>No encontramos ningun restaurante con el nombre </Typography>  
                    <Typography  variant="h2" sx={{ml:1}}>{query}</Typography>  
                </Box> 
            )
            
        }
        
        <RestaurantList restaurants = { restaurants }/>

    </ReviewLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
     
    const { query = '' } = params as { query: string };

    if(query.length === 0 ){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let restaurants = await dbRestaurants.getRestaurantByTerm(query)

    const foundRestaurants = restaurants.length > 0;


    if(!foundRestaurants){
        restaurants = await dbRestaurants.getAllRestaurants()
    }



    return {
        props: {
            restaurants,
            foundRestaurants,
            query
        }
    }
}

export default SearchPage;
