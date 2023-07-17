
import { platoApi } from '@/api';
import { AuthContext } from '@/context';
import { dateFunctions } from '@/utils';
import { Delete } from '@mui/icons-material';
import {  Avatar, Grid, IconButton, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react'
import toast from 'react-hot-toast';
import {v4} from 'uuid'



interface Props {
  commentsWithUser: any[];
}


export const RestaurantComment:FC<Props> = ({commentsWithUser}) => {
  const router = useRouter();
  const { user } = useContext(AuthContext)

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const commentDelete = (id:any) => {

    toast.promise(
      platoApi.delete(`/restaurants/comments/${id}`)
      .then(() => {
        refreshData();
      }),
      {
        loading: 'Loading...',
        success: `Your comment has been deleted 🫶🏾`,
        error: `Apparently there was an error deleting the comment. 👺`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '👾',
        },
      }
    );
  }
 
  
  return (
    <>
      {
        commentsWithUser.length != 0 
        ?
        commentsWithUser.map( comment => {
          return(
            <React.Fragment key={v4()}>
              <Paper style={{ padding: "40px 20px", marginTop:20}}> 
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt={comment.nameUser}   />
                </Grid>
                <Grid justifyContent="center" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>{comment.nameUser}</h4>
                  <p style={{ textAlign: 'justify' }}>
                    {comment.content}{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                      {dateFunctions.getFormaDistanceNow(comment.createdAt)}
                  </p>
                </Grid>
                {
                  comment.from === user?._id 
                  ?  
                  <Grid item>
                    <IconButton 
                      sx={{bottom:'20px'}} 
                      aria-label="delete comment"
                      onClick={() => commentDelete(comment._id)}
                    >
                      <Delete/>
                    </IconButton>
                  </Grid>
                  : ''
                }
               
              </Grid>
          </Paper> 
            </React.Fragment>
          )
          
        })
        :
        <Typography sx={{mt:5}} display='flex' justifyContent='center' variant='body2'>No reviews have been made at this restaurant.</Typography>
        
      }
    </>
  )
}
