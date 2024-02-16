import mongoose from 'mongoose'

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  studySets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudySet' }],
})

const TopicModel = mongoose.model('Topic', TopicSchema)

export default TopicModel
