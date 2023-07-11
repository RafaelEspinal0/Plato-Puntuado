import React, { FC } from 'react'
import { GetServerSideProps } from 'next'

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { IRestaurant } from '@/interfaces';
import { AdminLayout } from '@/components/layouts';
import { dbRestaurants } from '@/database';

const validCategories = ['Steaks', 'Caribbean', 'American', 'Hamburgers', 'Italian', 'Ice cream', 'Chicken', 'Mexican food', 'Drinks', 'Vegan Food', 'Salads', 'Fish and seafood ', 'Sushi'];


interface Props {
    restaurant: IRestaurant;
}

const RestaurantAdminPage:FC<Props> = ({ restaurant }) => {

    return (
        <AdminLayout 
            title={'Restaurantes'} 
            icon={ <DriveFileRenameOutline /> }
        >
            <form>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Name"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            // { ...register('name', {
                            //     required: 'Este campo es requerido',
                            //     minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            // })}
                            // error={ !!errors.name }
                            // helperText={ errors.name?.message }
                        />

                        <TextField
                            label="Descripcion"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                        />

                        <Divider sx={{ my: 1 }} />


                        <FormGroup>
                            <FormLabel>Categories</FormLabel>
                            {
                                validCategories.map(category => (
                                    <FormControlLabel key={category} control={<Checkbox />} label={ category } />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>

                        
                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                            >
                                Cargar imagen
                            </Button>

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                            />

                            <Grid container spacing={2}>
                                {
                                    restaurant.images.map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/restaurant/${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error">
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id = '' } = params as { id: string};
    const restaurant = await dbRestaurants.getRestaurantById(id);

    if ( !restaurant ) {
        return {
            redirect: {
                destination: '/admin/restaurant',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            restaurant
        }
    }
}


export default RestaurantAdminPage
