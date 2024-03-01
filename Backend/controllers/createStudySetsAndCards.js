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
  console.log("topicId", topicId);
  console.log("studySetId", studySetId);
  console.log("userId", userId);
  console.log("cards at first", cards);
  console.log(req.body);
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
    const updatedCardsPromises = cards.map( (eachCard) => {
      const cardId = eachCard.cardId;
      console.log("cardIDDD", cardId);

      try {
        const foundCard = CardModel.findByIdAndUpdate(
          cardId,
          {
            $set: {
              question: eachCard.question,
              answer: eachCard.answer,
            },
          },
          { new: true }
        );

        //console.log("Found Card:", foundCard)
        return foundCard; // Move the return statement outside of the inner map
      } catch (error) {
        console.error("Error updating card:", error.message);
        return null; // Handle the error by returning null or some other value
      }
    });
    const updatedCards = await Promise.all(updatedCardsPromises);
     console.log("updatedcards", updatedCards)
    //find the topic and update it
    const updatedTopic = await TopicModel.findByIdAndUpdate(
      topicId,
      {
        $set: {
          title: topicTitle,
        },
      },
      { new: true }
    );

    //console.log("Received updatedtopicTitle:", updatedTopic);

    if (!updatedTopic) {
      console.error("Topic not found");
      return res.status(404).json({ error: "Topic not found" });
    }

    // const updatedUser = await UserModel.findByIdAndUpdate(
    //   userId,
    //   {
    //     $set: {
    //       "savedStudySets.$[elem].topicTitle": topicTitle,
    //     },
    //   },
    //   {
    //     arrayFilters: [{ "elem.studySet": studySet._id.toString() }],
    //     new: true,
    //   }
    // );

    // if (!updatedUser) {
    //   console.error("User not found");
    //   return res.status(404).json({ error: "User not found" });
    // }

    // const formattedUpdatedCards = updatedCards.map((card) => ({
    //   card: card.value._id,
    //   question: card.value.question,
    //   answer: card.value.answer,
    // }));

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

// export const editCreatedCard = async (req, res) => {
//   const userId = req.params.userId;
//   const studySetId = req.params.studySetId;
//   const { topicTitle, title, description, cards } = req.body;

//   try {
//     const studySet = await StudySetModel.findByIdAndUpdate(
//       studySetId,
//       {
//         title: title,
//         description: description,
//         cards: cards.map((eachCard) => eachCard.card),
//       },
//       { new: true }
//     );

//     if (!studySet) {
//       console.error("Study set not found");
//       return res.status(404).json({ error: "Study set not found" });
//     }

//     const updatedCards = await Promise.allSettled(
//       cards.map(async (eachCard) => {
//         const foundCard = await CardModel.findByIdAndUpdate(
//           eachCard.cardId,
//           {
//             $set: {
//               question: eachCard.question,
//               answer: eachCard.answer,
//             },
//           },
//           { new: true }
//         );

//         if (!foundCard) {
//           console.error("Card not found:", eachCard.card);
//           return { status: "rejected", reason: "Card not found" };
//         }

//         return { status: "fulfilled", value: foundCard };
//       })
//     );

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           "savedStudySets.$[studySet].topicTitle": topicTitle,
//           "savedStudySets.$[studySet].studySetId": studySetId,
//           "savedStudySets.$[studySet].cards": updatedCards.map((card) => ({
//             card: card.value._id, // Use 'card.value._id' to get the ID from Promise result
//           })),
//         },
//       },
//       {
//         arrayFilters: [{ "studySet._id": studySet._id }],
//         new: true,
//       }
//     );

//     if (!updatedUser) {
//       console.error("User not found");
//       return res.status(404).json({ error: "User not found" });
//     }

//     const formattedUpdatedCards = updatedCards.map((card) => ({
//       card: card.value._id, // Use 'card.value._id' to get the ID from Promise result
//       question: card.value.question,
//       answer: card.value.answer,
//     }));

//     res.status(201).json({
//       topicTitle: topicTitle,
//       title: studySet.title,
//       description: studySet.description,
//       cards: formattedUpdatedCards,
//       message: "Flashcards updated successfully",
//     });
//   } catch (error) {
//     console.error("Internal server error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };