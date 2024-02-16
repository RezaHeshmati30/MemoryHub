import ModuleModel from "../models/ModuleModel.js";


export const addModule = async(req, res) => {
    try {
        const newModule = new ModuleModel(req.body);
        await newModule.save();
        res.status(201).send('new Module added');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const addTopicToModule = async (req, res) => {
    const moduleId = req.params.id
    const topicId = req.body.topicId
    try {
      await ModuleModel.findByIdAndUpdate(
        moduleId,
        { $push: { topics: topicId } }
      )
      res.status(200).json('Topic added to module')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }