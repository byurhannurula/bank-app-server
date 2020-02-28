import React, { useState, useEffect } from 'react'
import { PlusIcon, NewPaymentIcon } from '../icons'

import './styles.scss'

const QuickActions = () => {
  const [isActionsActive, setIsActionsActive] = useState(false)

  useEffect(() => {
    window.addEventListener('click', e => {
      const el = e.target.closest('.button')
      if (!el) setIsActionsActive(false)
    })
  }, [isActionsActive])

  return (
    <div className="quick-actions">
      <div className={isActionsActive ? 'modal isVisible' : 'modal'}>
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
        className={isActionsActive ? 'isVisible button' : 'button'}
        onClick={() => setIsActionsActive(!isActionsActive)}
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export default QuickActions
