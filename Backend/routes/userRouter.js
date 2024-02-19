import express from "express";
import { addStudySetToUser } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router
  .patch("/users/:id", addStudySetToUser)


export default router;
