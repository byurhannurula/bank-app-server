exports.randomIban = length => {
  const numberLength = 10 ** length - 1
  const randomNumber = Math.floor(
    numberLength + Math.random() * 9 * numberLength,
  )

  return `TNT${randomNumber}`
}

exports.randomNumber = length => {
  const numberLength = 10 ** length - 1
  const randomNumber = Math.floor(
    numberLength + Math.random() * 9 * numberLength,
  )

  return randomNumber
}

exports.formatDate = () => {
  // Returns a date 2 year later from now in format => MM/YY
  const date = new Date(new Date().setFullYear(new Date().getFullYear() + 2))

  const month = date.getMonth() + 1
  const year = date
    .getFullYear()
    .toString()
    .substr(-2)

  return `${month <= 9 ? `0${month}` : month}/${year}`
}
