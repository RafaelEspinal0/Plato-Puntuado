import { SummaryTile } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { DashboardSummaryResponse } from '@/interfaces'
import { AccessTime, Comment, Dashboard, ErrorOutline, Person, Restaurant } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [ refreshIn, setRefreshIn ] = useState(30);

    useEffect(() => {
      const interval = setInterval(() => {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30);
      }, 1000);
        
      return () => clearInterval(interval)
    }, [])
    

    if( !error && !data) {
        return <></>
    }

    if (error){
        console.log(error);
        return <Typography>Error loading information</Typography>
    }

    const {
        numberOfClient,
        numberOfRestaurant,
        numberOfComentary,
        restaurantWithOutComm,
    } = data!;


  return (
    <AdminLayout 
        titleHead='Admin: Dashboard'
        title='Dashboard'
        icon={<Dashboard/>}
    >

        <Grid container spacing={2}>
            <SummaryTile 
                title={numberOfRestaurant}
                subTitle='Restaurantes totales'
                icon={<Restaurant color='secondary' sx={{fontSize: 40}} />}
            />
            <SummaryTile 
                title={numberOfClient}
                subTitle='Numero de clientes'
                icon={<Person color='secondary' sx={{fontSize: 40}} />}
            />
            <SummaryTile 
                title={restaurantWithOutComm[0].comments}
                subTitle='Restaurantes sin comentarios'
                icon={<ErrorOutline color='secondary' sx={{fontSize: 40}} />}
            />
            <SummaryTile 
                title={numberOfComentary}
                subTitle='Comentarios totales'
                icon={<Comment color='secondary' sx={{fontSize: 40}} />}
            />
            <SummaryTile 
                title={refreshIn}
                subTitle='Actualizaciones en'
                icon={<AccessTime color='secondary' sx={{fontSize: 40}} />}
            />
        </Grid>

    </AdminLayout>
  )
}

export default DashboardPage