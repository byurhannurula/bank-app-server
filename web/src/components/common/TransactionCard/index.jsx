import React from 'react'

export const TransactionCard = ({ node }) => (
  <div className="t-card">
    <span className="left">
      <p>{node.reason}</p>
      <p>{new Date(node.createdAt)}</p>
    </span>
    <span className="right">
      <p>{node.value}</p>
    </span>
  </div>
)
