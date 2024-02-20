
// import StudySetModel from "../models/StudySetModel.js";
// import CardModel from "../models/CardModel.js";

// const createStudySetsAndCards = async (studySetData) => {
//     try {
//       const studySetIds = [];
  
//       for (const set of studySetData) {
//         const newStudySet = await StudySetModel.create({
//           title: set.title,
//           description: set.description
//         });
  
//         const cardIds = [];
  
//         for (const card of set.cards) {
//           const newCard = await CardModel.create({
//             question: card.question,
//             answer: card.answer
//           });
//           cardIds.push(newCard._id);
//         }
  
//         await StudySetModel.findByIdAndUpdate(
//           newStudySet._id,
//           { $set: { cards: cardIds } }
//         );
  
//         studySetIds.push(newStudySet._id);
//       }
  
//       return studySetIds;
//     } catch (error) {
//       console.error("Error creating study sets and cards:", error);
//       throw error;
//     }
//   };
  

//     export { createStudySetsAndCards };
  
import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";

const createStudySetsAndCards = async (savedStudySets) => {
  try {
    if (!Array.isArray(savedStudySets)) {
      throw new Error("studySet must be an array");
    }

    const studySetIds = [];

    for (const set of savedStudySets) {
      if (!set || !set.title || !set.description || !set.cards) {
        console.error("Invalid study set data:", set);
        continue; // Skip to the next iteration if the data is invalid
      }

      const newStudySet = await StudySetModel.create({
        title: set.title,
        description: set.description,
        cards: [] // Initialize cards as an empty array
      });

      const cardIds = [];

      for (const card of set.cards) {
        if (!card || !card.question || !card.answer) {
          console.error("Invalid card data:", card);
          continue; // Skip to the next iteration if the data is invalid
        }

        const newCard = await CardModel.create({
          question: card.question,
          answer: card.answer
        });
        cardIds.push(newCard._id);
      }

      // Update the created StudySet with the cardIds
      await StudySetModel.findByIdAndUpdate(
        newStudySet._id,
        { $set: { cards: cardIds } }
      );

      studySetIds.push(newStudySet._id);
    }

    return studySetIds;
  } catch (error) {
    console.error("Error creating study sets and cards:", error);
    throw error;
  }
};

export { createStudySetsAndCards };
