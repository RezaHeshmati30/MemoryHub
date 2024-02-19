import express from "express";
import { postSignupController } from "../controllers/signUpController.js";
import { postLoginController } from "../controllers/loginController.js";
import { getUserInfo } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js"
import { postLogoutController } from "../controllers/logoutController.js";
import { sendContactForm } from "../controllers/contactFormController.js";

const router = express.Router();

router
  .post("/register", postSignupController)
  .post("/login", postLoginController)
  .get("/userInfo", isAuth, getUserInfo)
  .post("/logout", postLogoutController)
  .post("/contact",sendContactForm)

export default router;

