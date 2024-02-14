import express from "express";
import "dotenv/config";
import { connectMongoose } from "./utils/connectMongoose.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/authRouter.js";
import studySetRouter from "./routes/studySetRouter.js"



const PORT = process.env.PORT || 3001;

await connectMongoose();
const app = express();
app.use( cors({
    origin: "http://localhost:5173", // URL unseres Frontends
    credentials: true // erlaube Cookie-Austausch
  }) );
app.use(express.json());
app.use( cookieParser() );


app.use("/", authRouter)
app.use("/", studySetRouter)


app.listen(PORT, () => {
    console.log(`I am running in port ${PORT}`);
});
