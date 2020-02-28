import React, { useState, useEffect } from 'react'
import { PlusIcon, NewPaymentIcon } from '../icons'

import './styles.scss'

const QuickActions = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleOuterClick = e => {
      const el = e.target.closest('.button')
      if (!el) setIsActive(false)
    }
    window.addEventListener('click', e => handleOuterClick(e))
    return () => window.removeEventListener('click', e => handleOuterClick(e))
  }, [isActive])

  return (
    <div className="quick-actions">
      <div className={isActive ? 'actions-modal isVisible' : 'actions-modal'}>
        <h4>Quick Actions</h4>
        <ul className="list">
          <li className="list-item">
            <i className="ion-android-add" />
            Create Account
          </li>
          <li className="list-item">
            <i className="ion-arrow-swap" />
            Transfer Money
          </li>
        </ul>
      </div>
      <button
        type="button"
        className={('button', isActive ? 'isVisible button' : '')}
        onClick={() => setIsActive(!isActive)}
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export default QuickActions
