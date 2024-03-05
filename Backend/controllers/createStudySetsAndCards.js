import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import TopicModel from "../models/TopicModel.js";

export const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topic, title, description, createdBy, cards } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({
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
      if (topic && typeof topic === "string") {
        // Find or create topic
        topicObject = await TopicModel.findOne({
          title: { $regex: new RegExp(topic, "i") },
        });
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
        return res
          .status(500)
          .json({ error: "Internal server error from backend" });
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Error in backend, in catch");
    return res
      .status(500)
      .json({ error: "Internal server error from backend catch" });
  }
};

//!!!!!!!!!
//!!!!!!!!!
export const editStudySet = async (req, res) => {
  const userId = req.params.userId;
  const topicId = req.params.topicId;
  const studySetId = req.params.studySetId;

  const { topicTitle, title, description, cards } = req.body;

  try {
    //find the studyset and update it
    const studySet = await StudySetModel.findByIdAndUpdate(
      studySetId,
      {
        title: title,
        description: description,
      },
      { new: true }
    );

    if (!studySet) {
      console.error("Study set not found");
      return res.status(404).json({ error: "Study set not found" });
    }
    //find the card and update it, then return the updated card
// ... (previous code)

const updatedCardsPromises = cards.map(async (eachCard) => {
  const cardId = eachCard.cardId;
  const status = eachCard.status || "not studied";  // Use a default value if status is not provided
  if (!cardId) {
    try {
      const newCard = await CardModel.create(eachCard);

      await StudySetModel.findByIdAndUpdate(studySetId, {
        $push: { cards: newCard._id },
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: {
          "savedStudySets.$[elem].cards": {
            card: newCard._id,
            status: status,
          },
        },
      }, {
        arrayFilters: [{"elem.studySet": studySetId}]
      });

      return newCard;
    } catch (error) {
      console.error("Error creating and updating new card:", error.message);
      return null;
    }
  } else {
    try {
      const foundCard = await CardModel.findByIdAndUpdate(
        cardId,
        {
          $set: {
            question: eachCard.question,
            answer: eachCard.answer,
          },
        },
        { new: true }
      );

      if (!foundCard) {
        console.error("Card not found");
        return null;
      }

      return foundCard;
    } catch (error) {
      console.error("Error updating card:", error.message);
      return null;
    }
  }
});

const updatedCards = (await Promise.all(updatedCardsPromises)).filter(card => card !== null);
console.log("updatedcards", updatedCards);

    const updatedTopic = await TopicModel.findByIdAndUpdate(
      topicId,
      {
        $set: {
          title: topicTitle,
        },
      },
      { new: true }
    );

    if (!updatedTopic) {
      console.error("Topic not found");
      return res.status(404).json({ error: "Topic not found" });
    }
    res.status(201).json({
      topicTitle: topicTitle,
      title: studySet.title,
      description: studySet.description,
      cards: updatedCards,
      message: "Flashcards updated successfully",
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
