import { IRestaurant } from '@/interfaces'
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import NextLink from 'next/link'

interface Props{
    restaurant: IRestaurant
}


export const RestaurantCard:FC<Props> = ({restaurant}) => {

  

  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const restaurantImage = useMemo(()=> {

    if(restaurant.images[0]==null){
      return `/lighttheme.png`
    }

    if(restaurant.images[1]==null){
      return `/restaurants/${restaurant.images[0]}`
    }else{
      return isHovered
      ? `/restaurants/${restaurant.images[1]}`
      : `/restaurants/${restaurant.images[0]}`
    }

  }, [isHovered, restaurant.images])



  return (
    <Grid item 
          xs={4} 
          sm={4} 
          key={restaurant.name}
          onMouseEnter={ () => setIsHovered(true) }
          onMouseLeave={ () => setIsHovered(false) }
    >
        <Card>
          <NextLink href={`/restaurant/${restaurant._id}`} passHref prefetch={false}>
           
              <CardActionArea>
                  <CardMedia 
                      component='img'
                      className='fadeIn'
                      key={restaurant.name}
                      image={restaurantImage}
                      alt={restaurant.name}
                      sx={{objectFit:'cover', height:'250px', width:'100%'}}
                      onLoad={ () => setIsImageLoaded(true) }
                  />
              </CardActionArea>
  
          </NextLink>
        </Card>

        <Box sx={{mt:1, display: isImageLoaded ? 'flex' : 'none'}} className='fadeIn'>
          <Typography fontWeight={700}>{restaurant.name}</Typography>
          {/* <Grid container justifyContent='flex-end'>
          <Grid item>
            <Typography></Typography>
          </Grid>
        </Grid> */}

        </Box>
        

    </Grid>
  )
}
