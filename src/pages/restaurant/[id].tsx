import { ReviewLayout } from '@/components/layouts'
import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Collapse, Grid, Link, Paper, Rating, TextField, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Star } from '@mui/icons-material';
import { RestaurantComment, RestaurantSlideShow } from '@/components/restaurants';
import { IComment, IRestaurant } from '@/interfaces';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { dbComments, dbRestaurants } from '@/database';
import { useForm } from 'react-hook-form';
import { platoApi } from '@/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context';

interface Props {
  restaurant: IRestaurant
  comment: {
    content: string,
    nameUser: string,
    rating: number,
    ratingRestaurant: number
    commentsWithUser: any[]
  },
  
}
type FormData = {
  rating: number,
  content: string
}

const RestaurantPage:NextPage<Props> = ({restaurant, comment}) => {
  
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
  const {user, isLoggedIn} = useContext(AuthContext)
  const router = useRouter();
  const [value, setValue] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setShowMore(!showMore)
  };

  const commentsAdd = ({content}:FormData) => {
    const rating = value;
    const restaurant = router.query.id
    const from = user?._id

    toast.promise(
      platoApi.post(`/restaurants/comments/${restaurant}`, {restaurant, content, rating, from})
      .then((data) => {
        router.reload()
      }),
      {
        loading: 'Loading...',
        success: `Thank you for sharing your review! ⭐️`,
        error: `Uh oh, there was an error in the credentials! 🤮`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '👍🏾',
        },
      }
    );
  }

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
            <Typography variant='h2'>Rating</Typography>
            {/* Promedio Rating */}
            <Typography sx={{display:"flex", alignItems:'center'}}>{ comment.ratingRestaurant.toFixed(2)} <Star fontSize='small' style={{color: "orange"}}/></Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit(commentsAdd)} sx={{ mt: 1 }} display='flex' flexDirection='column'>
            <Rating
              name="rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              sx={{ mt:3 }}
              label="Comments"
              multiline
              rows={4}
              {...register('content', {
                required: 'This field required'
              })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            {
              isLoggedIn 
              ? 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'black', color: 'white', ":hover": {
                    bgcolor: '#383838',
                    color: 'white'
                  }}}
                >
                  Enviar
                </Button>
              : 
                <Typography variant='h2' sx={{ mt: 3, mb: 2}}>
                  You must be logged in to be able to comment <Link href={`auth/login?p=`}>Sign up</Link>
                </Typography> 
            }
            



          <Collapse in={open} >
            <RestaurantComment commentsWithUser={comment.commentsWithUser}/>
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
  const comment = await dbComments.getCommentByRestaurants(id);

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
      restaurant,
      comment
    }
  }
}



export default RestaurantPage