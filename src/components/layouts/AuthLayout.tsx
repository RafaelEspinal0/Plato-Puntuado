import Head from 'next/head'
import React, { FC } from 'react'

interface Props{
    title: string;
    children:any;
}

export const AuthLoyout:FC<Props> = ({children, title }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <link rel="icon" type="image/x-icon" href="/darktheme.png"></link>
        </Head>
        <main>
            {children}
        </main>
    </>
  )
}
