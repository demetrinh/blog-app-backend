import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import blogPostRoute from "./routes/blogPostRoute";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", blogPostRoute);

export const api = functions.https.onRequest(app);
