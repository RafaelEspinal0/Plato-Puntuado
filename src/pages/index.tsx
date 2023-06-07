import { ReviewLayout } from "@/components/layouts";
import { RestaurantList } from "@/components/restaurants";
import { initialData } from "@/database/seed-data";
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext } from "react";

const HomePage: NextPage = () => {


  return (
    <ReviewLayout title="Dashboard restaurantes 👨🏾‍🍳">
      <Typography variant="h1" component='h1'>Restaurantes</Typography>
      <Typography  variant="h2" sx={{mb:4}}>Todos los restautantes</Typography>

      <RestaurantList
        restaurants={initialData.restaurants as any}
      />


    </ReviewLayout>
  );
};

export default HomePage;
