import TopicModel from '../models/TopicModel.js'

export const addTopic = async (req, res) => {
    try {
        const newTopic = new TopicModel(req.body);
        await newTopic.save();
        res.status(201).send('new Topic added');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addStudySetToTopic = async (req, res) => {
    const topicId = req.params.id
    const studySetId = req.body.studySetId
    try {
      await TopicModel.findByIdAndUpdate(
        topicId,
        { $push: { studySets: studySetId } }
      )
      res.status(200).json('StudySet added to topic')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }