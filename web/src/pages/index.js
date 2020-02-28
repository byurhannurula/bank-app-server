import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../context/UserContext'
import { useMessage } from '../hooks'
import { formatMoney } from '../util'

import '../styles/pages/home.scss'

const Home = () => {
  const [balance, setBalance] = useState('0')
  const currentUser = useContext(UserContext)
  const { welcomeMessage } = useMessage()

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

  return (
    <>
      {currentUser && (
        <div className="homepage">
          <div className="banner">
            <span className="user-data">
              <h1>Banking Dashboard</h1>
              <h3>
                {welcomeMessage}, {currentUser.lastName}
              </h3>
            </span>

            <span className="balance">
              <h3>Balance</h3>
              <p>BGN {balance}</p>
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
