import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getAccounts } from '../requests'

const Accounts = () => {
  const { error, loading, data } = useQuery(getAccounts)

  const acc = data && data.accounts

  return (
    <>
      <h2>My Accounts</h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!error &&
        !loading &&
        acc.map(node => (
          <div key={node.id}>
            <p>
              {node.IBAN} - {node.accountType} / {node.balance} {node.currency}
            </p>
          </div>
        ))}
    </>
  )
}

export default Accounts