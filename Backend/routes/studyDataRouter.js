import express from "express";
import { addModule, addTopicToModule, getModuleInfo } from "../controllers/moduleController.js";
import { addTopic, addStudySetToTopic, addAllStudySetsWithCardsToTopic   } from "../controllers/topicController.js";
import { addCardToStudySet, addCardsToStudySet, addStudySet } from "../controllers/studySetController.js";
import { addCard, getAllSets } from "../controllers/cardController.js";
import { createStudySetsAndCards } from "../controllers/createStudySetsAndCards.js";


const router = express.Router();

router 
    .post("/modules", addModule)
    .get("/modules/:id", getModuleInfo)
    .post("/topics", addTopic)
    .patch("/modules/:id", addTopicToModule)
    .post("/studySets", addStudySet)
    .patch("/topics/:id", addStudySetToTopic)
    .post("/cards", addCard)
    // .patch("/studySets/:id", addCardToStudySet)
    .patch("/studySets/:id", addCardsToStudySet)
    .patch("/addAllStudySets/:id", addAllStudySetsWithCardsToTopic)
    .post("/createSet/:userId", createStudySetsAndCards)
    //*****just for test
    .get("/getAllSets", getAllSets)


export default router;    