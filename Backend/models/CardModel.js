import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
  savedAt: { type: Date, default: Date.now },
})

const CardModel = mongoose.model('Card', CardSchema)

export default CardModel


