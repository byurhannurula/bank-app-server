import React from 'react'
import Head from 'next/head'

import '../styles/app.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TNT Bank</title>
      </Head>
      <main role="main">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
