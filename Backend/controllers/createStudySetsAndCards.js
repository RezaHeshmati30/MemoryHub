// import StudySetModel from "../models/StudySetModel.js";
// import CardModel from "../models/CardModel.js";
// import UserModel from "../models/UserModel.js";

// const createStudySetsAndCards = async (req, res) => {
//   try {
//     const studySetData = req.body.studySetData;
//     console.log("here", studySetData);
//     const studySetIds = [];

//     for (const set of studySetData) {
//       const newStudySet = await StudySetModel.create({
//         title: set.title,
//         description: set.description,
//       });

//       const cardIds = [];
//       const cards = [];

//       for (const card of set.cards) {
//         const newCard = await CardModel.create({
//           question: card.question,
//           answer: card.answer,
//         });

//         cardIds.push(newCard._id);
//         cards.push(newCard);
//         console.log(cards);
//       }

//       await StudySetModel.findByIdAndUpdate(
//         newStudySet._id,
//         { $set: { cards: cardIds } },
//         { new: true }
//       );

//       studySetIds.push(newStudySet._id);
//     }
//     const userId = req.params.id;
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { $push: { savedStudySets: { $each: studySetIds } } },
//       { new: true }
//     );

//     res.status(201).json({ userId });
//   } catch (error) {
//     console.error("Error creating study sets and cards:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";

const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topicTitle, title, description, cards } = req.body;

    console.log("Incoming Request Body:", req.body);

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!Array.isArray(cards)) {
      return res
        .status(400)
        .json({ error: "Invalid format for flashcards. Expecting an array." });
    }

    const newCards = await CardModel.create(
      cards.map((card) => ({ question: card.question, answer: card.answer }))
    );

    let savedCards;
    try {
      savedCards = await CardModel.insertMany(newCards);
    } catch (error) {
      if (error.code === 11000) {
        console.error("Handle it gracefully.");
        savedCards = newCards;
      } else {
        throw error;
      }
    }

    // Create a new study set
    const studySet = await StudySetModel.create({
      title,
      description,
      cards: savedCards.map((card) => card._id),
    });

    // Add study set data to user's savedStudySets
    user.savedStudySets.push({
      topicTitle,
      studySet: studySet._id,
      cards: savedCards.map((card) => ({
        card: card._id,
        status: "not studied",
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
    console.error(error);
    console.log("error in backend, in catch");
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createStudySetsAndCards };
