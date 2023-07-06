import { ReviewLayout } from '@/components/layouts'
import React, { useState } from 'react'
import { Avatar, Box, Button, Collapse, Grid, Paper, Rating, TextField, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { RestaurantSlideShow } from '@/components/restaurants';
import { IRestaurant } from '@/interfaces';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { dbRestaurants } from '@/database';

interface Props {
  restaurant: IRestaurant
}

const RestaurantPage:NextPage<Props> = ({restaurant}) => {

  const [value, setValue] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setShowMore(!showMore)
  };

  return (


    <ReviewLayout title={restaurant.name}>
      <Grid sx={{mt:4}} container spacing={2}>

        <Grid item xs={12} sm={7} padding='0 10px 10px 10px'>
          {/* SlideShow */}
          <RestaurantSlideShow images={restaurant.images}/>
          {/* Description */}
          <Box sx={{mt:3}}>
            <Typography variant='subtitle2'>Description</Typography>
            <Typography variant='body2'>{restaurant.description}</Typography>

          </Box>
       
        </Grid>

        <Grid item xs={12} sm={5} padding='0 10px 10px 10px' sx={{height:'75vh', overflow:'scroll'}} >

          {/* Titulos */}
          <Typography variant='h1' component='h1'>{restaurant.name}</Typography>

          {/* Rating */}
          <Box sx={{my:2}}>
            <Typography variant='subtitle2'>Rating</Typography>
            {/* Promedio Rating */}
            <Typography>4.5</Typography>
          </Box>

          <Box display='flex' flexDirection='column'>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />

          <TextField
            sx={{ mt:3 }}
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={4}
            />

          <Collapse in={open} >
            <Paper style={{ padding: "40px 20px", marginTop:20}}> 
              <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                  <Avatar alt="hola"   />
                  </Grid>
                  <Grid justifyContent="center" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>Erick Caldor</h4>
                  <p style={{ textAlign: 'justify', marginRight:'30px' }}>
                    Hola como etsas esto es una prueba asi que vengale mijo{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                  </p>
                  </Grid>
              </Grid>
            </Paper> 
            
          </Collapse> 

            <Button sx={{mt:2}} className='showMore' onClick={handleClick}>
              {showMore ?  <ExpandLess/> : <ExpandMore/>}
            </Button>
            
            
          </Box>
        </Grid>

      </Grid>

    </ReviewLayout>
  )
}

//Server side Rendering
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
  const { id = '' } = params as { id: string};
  const restaurant = await dbRestaurants.getRestaurantById(id);

  if( !restaurant ) {
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      restaurant
    }
  }
}



export default RestaurantPage