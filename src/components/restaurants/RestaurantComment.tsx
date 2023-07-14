
import { dateFunctions } from '@/utils';
import {  Avatar, Grid, Paper } from '@mui/material'
import React, { FC } from 'react'
import {v4} from 'uuid'


interface Props {
  commentsWithUser: any[];
}


export const RestaurantComment:FC<Props> = ({commentsWithUser}) => {

  
  return (
    <>
      {
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
              </Grid>
          </Paper> 
            </React.Fragment>
          )
          
        })
      }
    </>
  )
}
