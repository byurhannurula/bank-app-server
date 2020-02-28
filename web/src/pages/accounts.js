import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { AccountCard } from '../components/Common'
import { getAccounts } from '../requests'

import '../styles/pages/accounts.scss'

const Accounts = () => {
  const { error, loading, data } = useQuery(getAccounts)

  const accounts = data && data.me.accounts

  return (
    <div className="accounts-page">
      <h2 className="page-title">My Accounts</h2>
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      <div className="accounts">
        {!error &&
          !loading &&
          accounts?.map(acc => <AccountCard key={acc.id} node={acc} />)}
      </div>
    </div>
  )
}

export default Accounts
