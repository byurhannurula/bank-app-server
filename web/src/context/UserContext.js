import React, { createContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getUser } from '../requests'
import { Loader } from '../components/common'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const { error, loading, data } = useQuery(getUser, { ssr: false })

  if (error) {
    return null
  }
  if (loading) {
    return <Loader />
  }

  const currentUser = data && data.me

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  )
}

export default UserContext
export { UserProvider }
