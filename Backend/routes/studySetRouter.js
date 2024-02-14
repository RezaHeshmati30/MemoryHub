import express from "express";
import { addCards, addCardsToSet, addNewTopic, addStudySet } from "../controllers/studySetControllers.js";

const router = express.Router();

router 
    .post("/addNewSet", addStudySet)
    .post("/addCards", addCards)
    .patch("/addCardsToSet/:id", addCardsToSet)
    .post("/addNewTopic/:id", addNewTopic)


export default router;    