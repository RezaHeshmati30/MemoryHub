import express from "express";
import { addModule, addTopicToModule } from "../controllers/moduleController.js";
import { addTopic, addStudySetToTopic, addAllStudySetsWithCardsToTopic   } from "../controllers/topicController.js";
import { addCardToStudySet, addCardsToStudySet, addStudySet } from "../controllers/studySetController.js";
import { addCard } from "../controllers/cardController.js";


const router = express.Router();

router 
    .post("/modules", addModule)
    .post("/topics", addTopic)
    .patch("/modules/:id", addTopicToModule)
    .post("/studySets", addStudySet)
    .patch("/topics/:id", addStudySetToTopic)
    .post("/cards", addCard)
    // .patch("/studySets/:id", addCardToStudySet)
    .patch("/studySets/:id", addCardsToStudySet)
    .patch("/addAllStudySets/:id", addAllStudySetsWithCardsToTopic)


export default router;    