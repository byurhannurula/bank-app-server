import { getUser } from '../requests'

export default apolloClient =>
  apolloClient
    .query({ query: getUser })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      return { loggedInUser: {} }
    })
