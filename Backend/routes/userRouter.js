import express from "express";
import { addStudySetToUser, deleteSavedStudySet, deleteUserAccount, getUserInfo, updateCardStatus, updateUser, updateUserPhoto } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import isAuth from "../middleware/isAuth.js";
import { postChangePasswordController } from "../controllers/ChangePasswordController.js";

const router = express.Router();

router
  .patch("/users/:id", addStudySetToUser)
  .get("/user", isAuth, getUserInfo)
  .delete("/user/:userId/:setId", deleteSavedStudySet)
  .patch("/user/:userId/:studySetId/:cardId", updateCardStatus)
  .patch("/user/:id", updateUser)
  .post("/user/changePassword/:id", postChangePasswordController)
  .post("/user/uploadPhoto/:id", updateUserPhoto)
  .delete("/user/:id", deleteUserAccount);
  

export default router;
