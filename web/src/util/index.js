export const formatMoney = money => {
  const val = (
    Math.round((money + Number.EPSILON) * 100) / 100
  ).toLocaleString()

  return val
}

export const formatDate = value => {
  const dateVal = `/Date(${value})/`
  const date = new Date(parseFloat(dateVal.substr(6)))
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getUTCFullYear()

  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}
