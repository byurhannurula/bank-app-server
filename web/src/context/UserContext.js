import React, { createContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getUser } from '../requests'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const { loading, error, data } = useQuery(getUser)

  if (error && loading) {
    return null
  }

  const currentUser = data && data.me

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  )
}

export default UserContext
export { UserProvider }
