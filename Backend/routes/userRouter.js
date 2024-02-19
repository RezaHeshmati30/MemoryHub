import express from "express";
import { addStudySetToUser, getUserInfo } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router
  .patch("/users/:id", addStudySetToUser)
  .get("/user", isAuth, getUserInfo)

export default router;
