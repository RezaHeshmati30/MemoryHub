// export { createStudySetsAndCards };
// import StudySetModel from "../models/StudySetModel.js";
// import CardModel from "../models/CardModel.js";
// import UserModel from "../models/UserModel.js";

// const createStudySetsAndCards = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { topicTitle, title, description, cards } = req.body;

//     console.log("Incoming Request Body:", req.body);
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!Array.isArray(cards)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid format for flashcards. Expecting an array." });
//     }

//     const newCards = await CardModel.create(
//       cards.map((card) => ({ question: card.question, answer: card.answer }))
//     );

//     let savedCards;
//     try {
//       savedCards = await CardModel.insertMany(newCards);
//     } catch (error) {
//       if (error.code === 11000) {
//         console.error("Handle it gracefully.");

//         savedCards = newCards;
//       } else {
//         throw error;
//       }
//     }

//     const studySet = await StudySetModel.findOneAndUpdate(
//       { title, description },
//       { $push: { cards: { $each: savedCards.map((card) => card._id) } } },
//       { upsert: true, new: true }
//     );

//     user.savedStudySets.push({
//       topicTitle,
//       studySet: studySet._id,
//       cards: savedCards.map((card) => ({
//         question: card.question,
//         answer: card.answer,
//       })),
//     });
//     await user.save();

//     res
//       .status(201)
//       .json({
//         message: "Flashcards created successfully",
//         flashcards: savedCards,
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { createStudySetsAndCards };

// import StudySetModel from "../models/StudySetModel.js";
// import CardModel from "../models/CardModel.js";
// import UserModel from "../models/UserModel.js";

// const createStudySetsAndCards = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { title, description, cards } = req.body;

//     console.log("Incoming Request Body:", req.body);

//     // Check if the user exists
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!Array.isArray(cards)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid format for flashcards. Expecting an array." });
//     }

//     const newCards = await CardModel.create(
//       cards.map((card) => ({ question: card.question, answer: card.answer }))
//     );

//     let savedCards;
//     try {
//       savedCards = await CardModel.insertMany(newCards);
//     } catch (error) {
//       if (error.code === 11000) {
//         console.error("Handle it gracefully.");
//         savedCards = newCards;
//       } else {
//         throw error;
//       }
//     }

//     // Create a new study set
//     const studySet = await StudySetModel.create({
//       title,
//       description,
//       cards: savedCards.map((card) => card._id),
//     });

//     // Add study set data to user's savedStudySets
//     user.savedStudySets.push({

//       studySet: studySet._id,
//       cards: savedCards.map((card) => ({
//         question: card.question,
//         answer: card.answer,
//       })),
//     });

//     await user.save();

//     res.status(201).json({
//       message: "Flashcards created successfully",
//       flashcards: savedCards,
//     });
//   } catch (error) {
//     console.error(error);
//     console.log("error in backend,in catch");
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { createStudySetsAndCards };

////????this code works
// import StudySetModel from "../models/StudySetModel.js";
// import CardModel from "../models/CardModel.js";
// import UserModel from "../models/UserModel.js";

// const createStudySetsAndCards = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { topicTitle, title, description, cards } = req.body;

//     console.log("Incoming Request Body:", req.body);

//     // Check if the user exists
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!Array.isArray(cards)) {
//       return res
//         .status(400)
//         .json({ error: "Invalid format for flashcards. Expecting an array." });
//     }

//     const newCards = await CardModel.create(
//       cards.map((card) => ({ question: card.question, answer: card.answer }))
//     );

//     let savedCards;
//     try {
//       savedCards = await CardModel.insertMany(newCards);
//     } catch (error) {
//       if (error.code === 11000) {
//         console.error("there is an error 11000.");
//         savedCards = await CardModel.find({
//              $or: newCards.map((card) => ({
//                question: card.question,
//               answer: card.answer
//             })),
//            });

//         savedCards = newCards;
//       } else {
//         throw error;
//       }
//     }

//     const studySet = await StudySetModel.create({
//       title,
//       description,
//       cards: savedCards.map((card) => card._id),
//     });

//     user.savedStudySets.push({
//       topicTitle,
//       studySet: studySet._id,
//       cards: savedCards.map((card) => ({
//         card: card._id,
//         question: card.question,
//         answer: card.answer,
//       })),
//     });

//     await user.save();

//     res.status(201).json({
//       message: "Flashcards created successfully",
//       flashcards: {
//         topicTitle,
//         title,
//         description,
//         cards: user.savedStudySets[user.savedStudySets.length - 1].cards,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     console.log("error in backend, in catch");
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { createStudySetsAndCards };
////????here
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
      return res
        .status(400)
        .json({
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

///***this is good till /userId/studySetId */
// export const editCreatedCard = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const studySetId = req.params.studySetId; // Extract studySetId from route parameters
//     const { updatedData } = req.body;

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const studySet = await StudySetModel.findById(studySetId);
//     if (!studySet) {
//       return res.status(404).json({ error: "Study set not found" });
//     }

//     Object.assign(studySet, updatedData);

//     await studySet.save();

//     res.status(200).json({
//       message: "Study set updated successfully",
//       updatedStudySet: studySet,
//     });
//   } catch (error) {
//     console.error("Error in editing study set:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
///***working good but doenst show the question and answer */
// export const editCreatedCard = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const studySetId = req.params.studySetId;
//     const cardId = req.params.cardId; // Extract cardId from route parameters
//     const { updatedData } = req.body;

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const studySet = await StudySetModel.findById(studySetId);
//     if (!studySet) {
//       return res.status(404).json({ error: "Study set not found" });
//     }

//     const cardIndex = studySet.cards.findIndex(card => card._id.toString() === cardId);
//     if (cardIndex === -1) {
//       return res.status(404).json({ error: "Card not found in study set" });
//     }

//     // Update card fields with the provided updatedData
//     Object.assign(studySet.cards[cardIndex], updatedData);

//     await studySet.save();

//     res.status(200).json({
//       message: "Card updated successfully",
//       updatedCard: studySet.cards[cardIndex],
//     });
//   } catch (error) {
//     console.error("Error in editing card:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export const editCreatedCard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const studySetId = req.params.studySetId;
    const cardId = req.params.cardId;
    const { updatedData } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const studySet = await StudySetModel.findById(studySetId);
    if (!studySet) {
      return res.status(404).json({ error: "Study set not found" });
    }

    const cardIndex = studySet.cards.findIndex(card => card._id.toString() === cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found in study set" });
    }

    // Update card fields with the provided updatedData
    Object.assign(studySet.cards[cardIndex], updatedData);

    // Save the study set to persist the changes
    await studySet.save();

    // Fetch the updated card from the database
    const updatedCard = await CardModel.findById(cardId);

    res.status(200).json({
      message: "Card updated successfully",
      updatedCard,
    });
  } catch (error) {
    console.error("Error in editing card:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
