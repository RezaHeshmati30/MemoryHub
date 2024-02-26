import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import TopicModel from "../models/TopicModel.js";

export const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topicTitle, title, description, cards } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({
        error: "Invalid format for flashcards. Expecting a non-empty array.",
      });
    }

    try {
      // Save each card to CardModel
      const savedCards = await Promise.all(
        cards.map(async (cardData) => {
          const newCard = new CardModel(cardData);
          return await newCard.save();
        })
      );

      const newStudySet = new StudySetModel({
        title,
        description,
        cards: savedCards.map((card) => card._id),
      });

      const savedStudySet = await newStudySet.save();
      const existingTopic = await TopicModel.findOne({ title: topicTitle });
      if (existingTopic) {
        existingTopic.studySets.push(savedStudySet._id);
        await existingTopic.save();
      } else {
        const newTopic = new TopicModel({
          title: topicTitle,
          studySets: [savedStudySet._id],
        });
        await newTopic.save();
      }

      user.savedStudySets.push({
        topicTitle,
        studySet: savedStudySet._id,
        cards: savedCards.map((card) => ({
          card: card._id,
          question: card.question,
          answer: card.answer,
        })),
      });

      await user.save();

      res.status(201).json({
        message: "Flashcards created successfully",
        flashcards: {
          topicTitle,
          title,
          description,
          cards: user.savedStudySets[user.savedStudySets.length - 1].cards,
        },
      });
    } catch (error) {
      console.error("Error in saving study set:", error);
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: "StudySet with the given title already exists." });
      } else {
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Error in backend, in catch");
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editCreatedCard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const studySetId = req.params.studySetId;
    const cardId = req.params.cardId;
    const { updatedData } = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    const updatedCard = await CardModel.findByIdAndUpdate(
      cardId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCard && !cardId) {
      return res.status(404).json({ error: "Card not found" });
    }

    const studySet = await StudySetModel.findByIdAndUpdate(
      studySetId,
      {
        $set: {
          title: updatedData.title,
          description: updatedData.description,
          cards: [updatedCard],
        },
      },
      { new: true }
    );

    if (!studySet) {
      return res.status(404).json({ error: "Study set not found" });
    }

    await studySet.save();
    console.log(studySet, "studySet");
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming user.savedStudySets is an array where you store study sets
    const lastStudySet = user.savedStudySets[user.savedStudySets.length - 1];
    console.log("lastStudySet:", lastStudySet);
    let cards;
    if (Array.isArray(updatedCard)) {
      // Handle the case where updatedCard is an array
      cards = updatedCard.map((eachCard) => ({
        question: eachCard.question,
        answer: eachCard.answer,
      }));
    } else {
      // Handle the case where updatedCard is a single document
      cards = [
        {
          question: updatedCard.question,
          answer: updatedCard.answer,
        },
      ];
      console.log("cards:", cards);
    }

    res.status(201).json({
      topicTitle: lastStudySet.topicTitle,
      title: studySet.title,
      description: studySet.description,
      cards: cards,
      message: "Flashcards updated successfully",
    });
    
  } catch (error) {
    console.error("Error in editing card:", error);

    // Handle the CastError and BSONError
    if (error.name === "CastError" || error.name === "BSONError") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
