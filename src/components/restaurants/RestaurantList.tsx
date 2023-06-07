import { IRestaurant } from '@/interfaces'
import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { RestaurantCard } from './RestaurantCard'

interface Props{
    restaurants: IRestaurant[]
}

export const RestaurantList:FC<Props> = ({restaurants}) => {
  return (
    <Grid container spacing={4}>
        {
            restaurants.map( restaurant=> (
                <RestaurantCard
                    key={restaurant.name}
                    restaurant={restaurant}
                />
            ))
        }
    </Grid>
  )
}
