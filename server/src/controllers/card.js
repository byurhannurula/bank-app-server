const Card = require('../models/card')

exports.getCard = async (req, res) => {
  const card = await Card.find({ number: req.params.id })
  return res.status(200).send({ data: card })
}

exports.getCards = async (req, res) => {
  const cards = await Card.find({})
  return res.status(200).send({ data: cards })
}
