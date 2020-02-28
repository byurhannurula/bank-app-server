import React, { useEffect, useState, useContext } from 'react'
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import UserContext from '../context/UserContext'
import { AccountCard, TransactionCard } from '../components/common'

import { formatMoney, formatDate } from '../util'

import '../styles/pages/home.scss'

const Home = () => {
  const data = []
  const [balance, setBalance] = useState('0')
  const [accounts, setAccounts] = useState([])
  const [currentAccount, setCurrentAccount] = useState('')
  const currentUser = useContext(UserContext)

  useEffect(() => {
    async function getIbans() {
      await currentUser?.accounts.map(acc => accounts.push(acc.IBAN))
    }
    async function calcBalance() {
      let tempBalance = 0.0
      // eslint-disable-next-line no-return-assign
      await currentUser?.accounts.map(acc => (tempBalance += acc.balance))
      const formattedBalance = formatMoney(tempBalance)

      setBalance(formattedBalance)
    }
    calcBalance()
    getIbans()
  })

  const handleClick = id => {
    setCurrentAccount(id)
  }

  const hours = new Date().getHours()
  const isNoon = hours > 11 && hours < 18
  const isEvening = (hours >= 0 && hours <= 4) || (hours >= 18 && hours <= 23)

  let welcome = 'Good Morning'
  if (isNoon) welcome = 'Good Afternoon'
  else if (isEvening) welcome = 'Good Night'

  return (
    <>
      {currentUser && (
        <div className="homepage">
          <div className="banner">
            <span className="user-data">
              <h1>Banking Dashboard</h1>
              <h3>
                {welcome}, {currentUser.lastName}
              </h3>
            </span>

            <span className="balance">
              <h3>Balance</h3>
              <p>BGN {balance}</p>
            </span>
          </div>

          {/* Chart */}
          <AreaChart
            style={{ margin: '44px auto' }}
            width={890}
            height={350}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>

          {/* Accounts section */}
          {/* <section className="accounts">
            {currentUser?.accounts ? (
              currentUser?.accounts.map(acc => (
                <AccountCard
                  key={acc.id}
                  node={acc}
                  onClick={() => handleClick(acc.id)}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>
                There is no active account for this user!
              </p>
            )}
          </section> */}

          {/* Accounts section */}
          {/* <section className="transactions">
            {currentUser?.payments ? (
              currentUser?.payments.map(payment => {
                return <TransactionCard key={payment.id} node={payment} />
              })
            ) : (
              <p style={{ textAlign: 'center' }}>
                There is no active account for this user!
              </p>
            )}
          </section> */}
        </div>
      )}
    </>
  )
}

export default Home
