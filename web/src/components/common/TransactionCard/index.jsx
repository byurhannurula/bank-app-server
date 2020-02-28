import React from 'react'

import { formatMoney, formatDate } from '../../../util'

import './styles.scss'

export const TransactionCard = ({ node, sign }) => {
  console.log(sign)

  return (
    <div className="t-card">
      <span className="left">
        <p>{node.reason}</p>
        <p>{formatDate(node.createdAt)}</p>
      </span>
      <span className="right">
        <p>
          {sign} {node.currency} {formatMoney(node.value)}
        </p>
      </span>
    </div>
  )
}
