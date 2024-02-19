
import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";

const createStudySetsAndCards = async (studySetData) => {
    try {
      const studySetIds = [];
  
      for (const set of studySetData) {
        const newStudySet = await StudySetModel.create({
          title: set.title,
          description: set.description
        });
  
        const cardIds = [];
  
        for (const card of set.cards) {
          const newCard = await CardModel.create({
            question: card.question,
            answer: card.answer
          });
          cardIds.push(newCard._id);
        }
  
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
  