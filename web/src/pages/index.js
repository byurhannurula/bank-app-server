import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../context/UserContext'

import '../styles/pages/home.scss'
import { AccountCard } from '../components/common/AccountCard'

const Home = () => {
  const [balance, setBalance] = useState('0')
  const currentUser = useContext(UserContext)

  useEffect(() => {
    async function calcBalance() {
      let tempBalance = 0.0
      await currentUser?.accounts.map(acc => (tempBalance += acc.balance))
      const formattedBalance = (
        Math.round((tempBalance + Number.EPSILON) * 100) / 100
      ).toLocaleString()

      setBalance(formattedBalance)
    }
    calcBalance()
  })

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

          {/* Accounts section */}
          <section className="accounts">
            {currentUser?.accounts.map(acc => (
              <AccountCard key={acc.id} node={acc} />
            ))}
          </section>
        </div>
      )}
    </>
  )
}

export default Home
