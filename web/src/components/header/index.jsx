import React from 'react'
import Link from 'next/link'

import { navLinks } from './links'

import './styles.scss'

const SiteLink = ({ label, link, icon }) => (
  <Link href={link}>
    <a className="nav__link">
      {icon && <i className={`ion-${icon}`} />}
      {label}
    </a>
  </Link>
)

const currentUser = false

const Header = () => (
  <header className="header">
    <div className="container">
      <span className="logo">TNT-Bank</span>

      {currentUser ? (
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

          <Link href="/">
            <a className="nav__link">Logout</a>
          </Link>
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

export default Header
