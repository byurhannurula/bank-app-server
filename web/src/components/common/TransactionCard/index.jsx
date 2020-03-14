import React from 'react'

import { formatMoney, formatDate } from '@util'

import './styles.scss'

export const TransactionCard = ({ node }) => {
  const sign = node.type === 'income' ? '+' : '-'

  return (
    <div className="t-card">
      <span className="left">
        <p>{node.reason}</p>
        <p>{formatDate(node.createdAt)}</p>
      </span>
      <span className="right">
        <p
          style={{
            color: sign === '-' ? '#9c695d' : '',
            backgroundColor: sign === '-' ? '#fff3f3' : '',
          }}
        >
          {sign} {node.currency} {formatMoney(node.value)}
        </p>
      </span>
    </div>
  )
}
