import mongoose from 'mongoose'

const StudySetSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: { type: String },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
})

const StudySetModel = mongoose.model('StudySet', StudySetSchema)

export default StudySetModel