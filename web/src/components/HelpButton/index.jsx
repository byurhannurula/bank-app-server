/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { useModal } from '@hooks'
import { PaymentModal, AccountModal } from '@common'

import { PlusIcon } from '../icons'

import './styles.scss'

const QuickActions = () => {
  const {
    showModal: showPaymentModal,
    RenderModal: RenderPaymentModal,
  } = useModal()
  const {
    showModal: showAccountModal,
    RenderModal: RenderAccountModal,
  } = useModal()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleOuterClick = e => {
      const el = e.target.closest('.toggle-btn')
      if (!el) setIsActive(false)
    }
    window.addEventListener('click', e => handleOuterClick(e))
    return () => window.removeEventListener('click', e => handleOuterClick(e))
  }, [isActive])

  return (
    <>
      <RenderPaymentModal header="New Payment">
        <PaymentModal />
      </RenderPaymentModal>
      <RenderAccountModal header="Create Account">
        <AccountModal />
      </RenderAccountModal>
      <div className="quick-actions">
        <div className={classNames('actions-modal', { isActive })}>
          <h4>Quick Actions</h4>
          <ul className="list">
            <li
              className="list-item"
              onClick={showAccountModal}
              onKeyPress={() => console.log('hi')}
            >
              <i className="ion-android-add" />
              Create Account
            </li>
            <li
              className="list-item"
              onClick={showPaymentModal}
              onKeyPress={() => console.log('hi')}
            >
              <i className="ion-arrow-swap" />
              Transfer Money
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={classNames('toggle-btn', { isActive })}
        >
          <PlusIcon />
        </button>
      </div>
    </>
  )
}

export default QuickActions
