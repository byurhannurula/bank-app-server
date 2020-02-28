import React, { useState, useEffect } from 'react'
import { PlusIcon, NewPaymentIcon } from '../icons'

import './styles.scss'

const QuickActions = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    window.addEventListener('click', e => {
      const el = e.target.closest('.button')
      if (!el) setIsActive(false)
    })
  }, [isActive])

  return (
    <div className="quick-actions">
      <div className={isActive ? 'actions-modal isVisible' : 'actions-modal'}>
        <h4>Quick Actions</h4>
        <ul className="list">
          <li className="list-item">
            <i>
              <PlusIcon />
            </i>
            Create Account
          </li>
          <li className="list-item">
            <i>
              <NewPaymentIcon />
            </i>
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
