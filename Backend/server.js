import express from "express";
import "dotenv/config";
import { connectMongoose } from "./utils/connectMongoose.js";
import cookieParser from "cookie-parser"
import cors from "cors"



const PORT = process.env.PORT || 3001;

await connectMongoose();
const app = express();
app.use(express.json());
app.use( cookieParser() );
app.use( cors({}) );

// app.use("/", router)


app.listen(PORT, () => {
    console.log(`I am running in port ${PORT}`);
});
