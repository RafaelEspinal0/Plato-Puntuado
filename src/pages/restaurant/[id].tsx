import { ReviewLayout } from '@/components/layouts'
import React, { useContext, useState } from 'react'
import { Box, Button, Collapse, FormControl, Grid, InputLabel, Link, MenuItem, Rating, Select, TextField, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Star } from '@mui/icons-material';
import { RestaurantComment, RestaurantSlideShow } from '@/components/restaurants';
import { IRestaurant } from '@/interfaces';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { dbComments, dbRestaurants } from '@/database';
import { useForm } from 'react-hook-form';
import { platoApi } from '@/api';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '@/context';
import styles from './id.module.css'

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
  
  const {register, reset, handleSubmit, formState: {errors}} = useForm<FormData>();
  const {user, isLoggedIn} = useContext(AuthContext)
  const router = useRouter();
  const [value, setValue] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filterComment, setFilterComment] = useState('');

  const refreshData = () => {
    router.replace(router.asPath);
  }
  
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
        refreshData()
        reset()
        setValue(null)
      }),
      {
        loading: 'Loading...',
        success: `Thank you for sharing your review! ⭐️`,
        error: `At least give us a star 🤗`,
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
      <Toaster/>
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

        <Grid className={styles['scrollbar-hidden']} item xs={12} sm={5} padding='0 10px 10px 10px' sx={{height:'90vh'}} >

          {/* Titulos */}
          <Typography variant='h1' component='h1'>{restaurant.name}</Typography>

          {/* Rating */}
          <Box sx={{my:2}}>
            <Typography variant='h2'>Rating</Typography>
            {/* Promedio Rating */}
            <Typography sx={{ display:"flex", alignItems:'center' }}>{ comment.ratingRestaurant !=null ? comment.ratingRestaurant.toFixed(2): '0.00'} <Star fontSize='small' style={{color: "orange", marginLeft:'10px'}}/></Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit(commentsAdd)} sx={{ mt: 1 }} display='flex' flexDirection='column'>
            <Rating
              name="rating"
              value={value}
              size='large'
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
                  Send
                </Button>
              : 
                <Typography variant='h2' sx={{ mt: 3, mb: 2}}>
                  You must be logged in to be able to comment. <Link variant='h2' underline="hover" href={`/auth/register?p=${router.asPath}`}>Sign up</Link>
                </Typography> 
            }
            



            <Collapse in={open} >
              {
                isLoggedIn ? 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="filter-content">Filter by:</InputLabel>
                    <Select
                      labelId="filter-content"
                      id="filter-content-select"
                      value={filterComment}
                      onChange={(e) => {
                        setFilterComment(e.target.value);
                      }}
                      label="Age"
                    >
                      <MenuItem value={1}>Show all</MenuItem>
                      <MenuItem value={2}>Just me</MenuItem>
                    </Select>
                  </FormControl>
                </Box>:''
              }
              <RestaurantComment commentsWithUser=
              {
                filterComment == '2' 
                ? comment.commentsWithUser.filter(comments=>comments.from === user?._id)
                : comment.commentsWithUser 
                 
              }/>
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