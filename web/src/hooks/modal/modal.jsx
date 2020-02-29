import React from 'react'
import { createPortal } from 'react-dom'

import './styles.scss'

const Modal = React.memo(
  ({ confirmModal, header, children, closeModal, submitModal }) => {
    const domEl = document.getElementById('modal-root')

    if (!domEl) return null

    return createPortal(
      <div className="modal">
        <div className="modal-content">
          <header className="modal-header">
            <h3>{header}</h3>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <div className="modal-body">{children}</div>
          {confirmModal && (
            <footer className="modal-footer">
              <button type="button" className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={submitModal}>
                Submit
              </button>
            </footer>
          )}
        </div>
      </div>,
      domEl,
    )
  },
)

Modal.displayName = 'Modal'

export default Modal
