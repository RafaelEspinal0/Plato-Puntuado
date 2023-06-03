import { ReviewLayout } from '@/components/layouts'
import { Box, Link, Typography } from '@mui/material';
import React from 'react'

const Custom404 = () => {
  return (
    <ReviewLayout title='Pagina no encontrada'>
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs:'column', sm:'row'} }}
        >
        <Link display="flex" alignItems="center">
          <Box
            component="img"
            sx={{
              height: 200,
              paddingLeft: 3,
            }}
            alt=""
            src="lighttheme.png"
          />
        </Link>
        <Typography variant='h2' component='h1' fontSize={50} fontWeight={100}>404 |</Typography>
        <Typography marginLeft={2}>No encontramos ninguna pagina aqui</Typography>
      </Box>
    </ReviewLayout>
  )
}

export default Custom404