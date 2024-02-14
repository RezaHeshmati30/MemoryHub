import express from "express";
import { addCards, addCardsToStudySet, addStudySet } from "../controllers/studySetControllers.js";

const router = express.Router();

router 
    .post("/addNewSet", addStudySet)
    .post("/addCards", addCards)
    .patch("/addCardsToSet/:id", addCardsToStudySet)


export default router;    