import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";



export const addStudySet = async(req, res) => {
    try {
        const newStudySet = new StudySetModel(req.body);
        await newStudySet.save();
        res.status(201).send('new StudySet added');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCardToStudySet = async(req, res) => {
    const studySetId = req.params.id;
    const cardId = req.body.cardId;

    try {
        const studySet = await StudySetModel.findByIdAndUpdate(
          studySetId,
            { $push: { cards: cardId } }
        );
        res.status(200).json('Card added to study set');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCardsToStudySet = async (req, res) => {
    const studySetId = req.params.id;
    const cards = req.body.cards;

    try {
        const cardIds = await Promise.all(cards.map(async (card) => {
            const newCard = await CardModel.create(card);
            return newCard._id;
        }));

        await StudySetModel.findByIdAndUpdate(
            studySetId,
            { $push: { cards: { $each: cardIds } } }
        );
        res.status(200).json('Cards added to study set');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
