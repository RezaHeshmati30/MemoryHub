import StudySetModel from "../models/StudySetModel.js";
import CardsModel from "../models/CardsModel.js";

export const addStudySet = async(req, res) => {
    try {
        const newStudySet = new StudySetModel(req.body);
        await newStudySet.save();
        res.status(201).send('new Set added');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCards = async(req, res) => {
    try {
        const newCards = new CardsModel(req.body);
        await newCards.save();
        res.status(201).send('new CardsSet added')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCardsToStudySet = async(req, res) => {
    const cardsId = req.body.cardsId;
    const studySetId = req.params.id;
    const topicId = req.body.topicId;

    try {
        const studySet = await StudySetModel.findByIdAndUpdate(studySetId,
            { $push: { "topics.$[elem].studySets": { $each: cardsId } } },
            { arrayFilters: [{ "elem._id": topicId }], new: true }
        );
        res.status(200).json({ success: true, studySet });
    } catch (error) {
        console.error("Error adding cards to study set:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}