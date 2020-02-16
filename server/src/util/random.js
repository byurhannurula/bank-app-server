exports.randomIban = length => {
  const numberLength = 10 ** length - 1
  const randomNumber = Math.floor(
    numberLength + Math.random() * 9 * numberLength,
  )

  return `TNT${randomNumber}`
}
