import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { isAuthPath } from '../lib/isAuth'
import redirect from '../lib/redirect'
import withApollo from '../lib/withApollo'
import checkLoggedIn from '../lib/checkLoggedIn'
import { UserProvider } from '../context/UserContext'

import { SEO } from '../components/seo'
import Header from '../components/header'

import '../styles/app.scss'

const MyApp = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <UserProvider>
      <SEO />
      <Header />
      <main role="main">
        <div className="container-small">
          <Component {...pageProps} />
        </div>
      </main>
    </UserProvider>
  </ApolloProvider>
)

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}

  const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)

  // Check whether path is an "authorization" specific page
  const auth = isAuthPath(ctx.asPath)

  if (!loggedInUser.me) {
    // User is not logged in. Redirect to Login.
    if (!auth) redirect(ctx, '/login')
  } else if (auth) {
    // User is logged in. Redirect to Dashboard.
    redirect(ctx, '/')
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default withApollo(MyApp)
