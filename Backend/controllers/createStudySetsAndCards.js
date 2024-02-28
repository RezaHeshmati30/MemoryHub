import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import TopicModel from "../models/TopicModel.js";

const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topic, title, description, createdBy, cards } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (!Array.isArray(cards) || cards.length === 0) {
      return res
        .status(400)
        .json({
          error: "Invalid format for flashcards. Expecting a non-empty array.",
        });
    }

    try {
      const savedCards = await Promise.all(
        cards.map(async (cardData) => {
          const newCard = new CardModel(cardData);
          return await newCard.save();
        })
      );

      let topicObject;
      if (topic && typeof topic === 'string') {
        // Find or create topic
        topicObject = await TopicModel.findOne({ title: { $regex: new RegExp(topic, "i") } });
        if (!topicObject) {
          topicObject = await TopicModel.create({ title: topic });
        }
      } else {
        throw new Error("Invalid topic data");
      }
     
      const newStudySet = new StudySetModel({
        title,
        description,
        createdBy,
        cards: savedCards.map((card) => card._id),
      });

      const savedStudySet = await newStudySet.save();

      topicObject.studySets.push(savedStudySet._id);
      await topicObject.save();

      user.savedStudySets.push({
        topic: topicObject._id,
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
          topicTitle: topic.title,
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

export { createStudySetsAndCards };
