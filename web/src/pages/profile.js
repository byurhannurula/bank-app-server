import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../context/UserContext'

import '../styles/pages/profile.scss'

const Home = () => {
  const currentUser = useContext(UserContext)

  console.log(currentUser)

  return (
    <>
      {currentUser && (
        <div className="profile-page">
          <h1>Your Profile</h1>

          <div className="content">
            <div className="sidebar">
              <img
                src={currentUser.avatar}
                alt={currentUser.firstName}
                className="profile-img"
              />
              <span>
                <h2>
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p>{currentUser.email}</p>
              </span>
            </div>
            <div className="main">
              <div className="card details">
                <span>
                  <h2>
                    {currentUser.firstName} {currentUser.lastName}
                  </h2>
                  <p>{currentUser.email}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
