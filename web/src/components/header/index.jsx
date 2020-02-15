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

const Header = () => (
  <header className="header">
    <div className="container">
      <span className="logo">TNT-Bank</span>

      <nav className="nav">
        <ul className="nav__list">
          {navLinks.map(({ id, label, link, icon }) => (
            <li className="nav__item" key={id}>
              <SiteLink label={label} link={link} icon={icon} />
            </li>
          ))}
        </ul>
      </nav>

      <SiteLink label="Logout" link="/" />
    </div>
  </header>
)

export default Header
