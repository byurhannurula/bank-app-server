import React from 'react'
import Head from 'next/head'

export const SEO = ({ title = 'TNT Bank' }) => (
  <Head>
    <title>{title}</title>
    <link
      href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/flickity@2.2.1/dist/flickity.css"
    />
  </Head>
)
