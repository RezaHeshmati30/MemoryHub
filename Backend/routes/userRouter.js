import express from "express";
import { addStudySetToUser, deleteSavedStudySet, getUserInfo, updateCardStatus } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router
  .patch("/users/:id", addStudySetToUser)
  .get("/user", isAuth, getUserInfo)
  .delete("/user/:userId/:setId", deleteSavedStudySet)
  .patch("/user/:userId/:studySetId/:cardId", updateCardStatus)
  

export default router;
