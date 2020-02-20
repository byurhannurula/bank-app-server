import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Loader from '../components/loader'
import { getPayments } from '../requests'

const Transactions = () => {
  const { error, loading, data } = useQuery(getPayments)

  const payments = data && data.payments

  return (
    <>
      <h2>My Transactions</h2>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {!error &&
        !loading &&
        payments.map(node => (
          <div key={node.id}>
            <p>
              {node.value} {node.currency} - {node.reason}
            </p>
            <p>
              sender: {node.IBAN_sender}
              <br />
              receiver: {node.IBAN_beneficiary}
            </p>
          </div>
        ))}
    </>
  )
}

export default Transactions
