import express from "express";
import { addCards, addCardsToSet, addNewTopic, addStudySet, getStudySetInfo } from "../controllers/studySetControllers.js";

const router = express.Router();

router 
    .post("/addNewSet", addStudySet)
    .post("/addCards", addCards)
    .patch("/addCardsToSet/:id", addCardsToSet)
    .post("/addNewTopic/:id", addNewTopic)
    .get("/studySet/:id", getStudySetInfo)


export default router;    