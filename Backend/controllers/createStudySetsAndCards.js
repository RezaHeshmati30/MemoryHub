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

const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topicTitle, title, description, cards } = req.body;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({ error: "Invalid format for flashcards. Expecting a non-empty array." });
    }

    try {
      // Save each card to CardModel
      const savedCards = await Promise.all(cards.map(async (cardData) => {
        const newCard = new CardModel(cardData);
        return await newCard.save();
      }));

      // Save StudySet with card references
      const newStudySet = new StudySetModel({
        title,
        description,
        cards: savedCards.map(card => card._id),
      });

      const savedStudySet = await newStudySet.save();

      // Associate StudySet with the User
      user.savedStudySets.push({
        topicTitle,
        studySet: savedStudySet._id,
        cards: savedCards.map(card => ({
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
        return res.status(400).json({ error: "StudySet with the given title already exists." });
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
