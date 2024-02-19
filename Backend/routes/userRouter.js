import express from "express";
import { register, login, logout } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router
  .post("/register", validateRequest, register)
  .post("/login", login)
  .post("/logout", logout)


export default router;
