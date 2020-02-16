import React, { useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'

import { navLinks } from './links'
import UserContext from '../../context/UserContext'
import { logoutMutation } from '../../requests'

import './styles.scss'

const SiteLink = ({ label, link, icon }) => (
  <Link href={link}>
    <a className="nav__link">
      {icon && <i className={`ion-${icon}`} />}
      {label}
    </a>
  </Link>
)

const Header = () => {
  const currentUser = useContext(UserContext)

  const [logOut] = useMutation(logoutMutation)

  const handleLogout = async e => {
    e.preventDefault()
    await logOut()
    Router.replace('/login')
    location.replace('/login')
  }

  return (
    <header className="header">
      <div className="container">
        <span className="logo">
          <Link href="/">
            <a>TNT-Bank</a>
          </Link>
        </span>

        {currentUser && currentUser !== null ? (
          <>
            <nav className="nav">
              <ul className="nav__list">
                {navLinks.map(({ id, label, link, icon }) => (
                  <li className="nav__item" key={id}>
                    <SiteLink label={label} link={link} icon={icon} />
                  </li>
                ))}
              </ul>
            </nav>

            <button
              className="nav__link"
              type="button"
              onClick={e => handleLogout(e)}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex' }}>
            <Link href="/login">
              <a className="nav__link">Login</a>
            </Link>
            <Link href="/register">
              <a className="nav__link">Register</a>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
