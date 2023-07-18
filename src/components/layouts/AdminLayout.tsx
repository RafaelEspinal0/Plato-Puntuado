import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Navbar } from '../ui';

import { Sidemenu } from '../ui';
import Head from 'next/head';


interface Props {
    titleHead:string;
    title: string;
    children: any;
    icon?: JSX.Element;
}

export const AdminLayout:FC<Props> = ({ children, title, icon, titleHead }) => {
  return (
    <>
        <Head>
            <title>{titleHead}</title>
            <link rel="icon" type="image/x-icon" href="/darktheme.png"></link>
        </Head>

        <nav>
            <Navbar />
        </nav>

        <Sidemenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>

            <Box display="flex" flexDirection='column'>
                <Typography variant='h1' component='h1'>
                    { icon }
                    {' '} { title }
                </Typography>

            </Box>

            <Box className='fadeIn'>
                { children }
            </Box>

        </main>


    </>
  )
}

