export const formatMoney = money => {
  const val = (
    Math.round((money + Number.EPSILON) * 100) / 100
  ).toLocaleString()

  return val
}

export const formatDate = value => {
  const date = new Date(parseFloat(value))

  return date.toLocaleString()
}
