import React, { useEffect, useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Flickity from 'react-flickity-component'

import UserContext from '@context/UserContext'
import { AccountCard, TransactionCard, Loader } from '@common'
import { getAccountPayments } from '@requests'
import { useMessage } from '@hooks'
import { formatMoney } from '@util'

import '@styles/pages/home.scss'

const flickityOptions = {
  pageDots: false,
  // prevNextButtons: false,
  cellAlign: 'center',
  contain: true,
}

const Home = () => {
  const { welcomeMsg } = useMessage()
  const currentUser = useContext(UserContext)
  const [balance, setBalance] = useState('0')
  const [payments, setPayments] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)

  const { error, loading, data } = useQuery(getAccountPayments, {
    skip: selectedAccount === null,
    variables: { iban: selectedAccount },
  })

  useEffect(() => {
    async function calcBalance() {
      let tempBalance = 0.0
      // eslint-disable-next-line no-return-assign
      await currentUser?.accounts.map(acc => (tempBalance += acc.balance))
      const formattedBalance = formatMoney(tempBalance)

      setBalance(formattedBalance)
    }
    calcBalance()
  })

  useEffect(() => {
    const mergePayments = () => {
      const result = []
      if (error) return error
      if (loading) return <Loader />
      if (!loading && data) {
        try {
          const { incomes, expenses } = data && data.payments

          incomes.map(object => {
            Object.assign(object, { type: 'income' })
            return result.push(object)
          })
          expenses.map(object => {
            Object.assign(object, { type: 'expenses' })
            return result.push(object)
          })

          result.sort((a, b) => {
            return Date(a.createdAt) - Date(b.createdAt)
          })

          setPayments(result)
        } catch (err) {
          console.log(err)
        }
      }

      return result
    }
    mergePayments()
    return () => mergePayments()
  }, [data, error, loading, selectedAccount])

  return (
    <>
      {currentUser && (
        <div className="homepage">
          <div className="banner">
            <span className="user-data">
              <h1>Banking Dashboard</h1>
              <h3>
                {welcomeMsg}, {currentUser.lastName}
              </h3>
            </span>

            <span className="balance">
              <h3>Balance</h3>
              <p>BGN {balance}</p>
            </span>
          </div>

          {/* Accounts */}
          <section className="accounts-section">
            <h2>Accounts</h2>
            <div className="accounts">
              <Flickity className="cards-slider" options={flickityOptions}>
                {currentUser?.accounts.map(acc => (
                  <AccountCard
                    key={acc.id}
                    node={acc}
                    onClick={() => setSelectedAccount(acc.IBAN)}
                  />
                ))}
              </Flickity>
            </div>
          </section>

          {/* Transactions for selected account */}
          {selectedAccount !== null && (
            <section className="transactions-section">
              <h2>Transactions</h2>
              <div className="transactions">
                {payments !== null && payments.length > 0 ? (
                  payments.map(payment => (
                    <TransactionCard key={payment.id} node={payment} />
                  ))
                ) : (
                  <p>There is no transactions for this account!</p>
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  )
}

export default Home
