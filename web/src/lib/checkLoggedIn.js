import { getAuth } from '@requests'

export default apolloClient =>
  apolloClient
    .query({ query: getAuth })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      return { loggedInUser: {} }
    })
