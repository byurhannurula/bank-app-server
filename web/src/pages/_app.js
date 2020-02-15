import React from 'react'
import Head from 'next/head'

import Header from '../components/header'

import '../styles/app.scss'

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>TNT Bank</title>
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
      />
    </Head>
    <Header />
    <main role="main">
      <div className="container-small">
        <Component {...pageProps} />
      </div>
    </main>
  </>
)

export default MyApp
