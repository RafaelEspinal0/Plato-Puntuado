import { ReviewLayout } from "@/components/layouts";
import { RestaurantList } from "@/components/restaurants";
import { FullScreenLoading } from "@/components/ui";
import { initialData } from "@/database/seed-data";
import { useRestaurants } from "@/hooks";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";


const HomePage: NextPage = () => {

  const { restaurants, isError, isLoading } = useRestaurants('/restaurants')

  return (
    <ReviewLayout title="Dashboard restaurantes 👨🏾‍🍳">
      <Typography variant="h1" component='h1'>Restaurantes</Typography>
      <Typography  variant="h2" sx={{mb:4}}>Todos los restautantes</Typography>

      {
        isLoading 
        ? <FullScreenLoading/>
        : <RestaurantList restaurants = { restaurants }/>
      }


    </ReviewLayout>
  );
};

export default HomePage;
