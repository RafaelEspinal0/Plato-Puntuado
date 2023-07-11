import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined, Restaurant } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IRestaurant } from '@/interfaces';
import { AdminLayout } from '@/components/layouts';



const columns:GridColDef[] = [
    { 
        field: 'images', 
        headerName: 'images',
        renderCell: ({ row } ) => {
            return (
                <a href={ `/restaurants/${ row.id }` } target="_blank" rel="noreferrer">
                    <CardMedia 
                        component='img'
                        alt={ row.name }
                        className='fadeIn'
                        image={ `/restaurants/${row.images}` }
                    />
                </a>
            )
        }
    },
    { 
        field: 'name', 
        headerName: 'name', 
        width: 250,
        renderCell: ({row}) => {
            return (
                <NextLink href={`/admin/restaurants/${ row.id }`} passHref>
                    <Link underline='always'>
                        { row.name}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'categories', headerName: 'Categories' },
    { field: 'description', headerName: 'Description' },
    

];



const RestaurantPage = () => {

    const { data, error } = useSWR<IRestaurant[]>('/api/admin/restaurants');

    if ( !data && !error ) return (<></>);
    
    const rows = data!.map( restaurant => ({
        id: restaurant._id,
        images: restaurant.images[0],
        name: restaurant.name,
        categories: restaurant.categories,
        description: restaurant.description
       
    }));


  return (
    <AdminLayout 
        title={`Restaurants (${ data?.length })`} 
        icon={ <Restaurant /> }
    >
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/restaurants/new"
            >
                Add restaurant
            </Button>
        </Box>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                   
                    
                />

            </Grid>
        </Grid>
        
    </AdminLayout>
  )
}

export default RestaurantPage;