import express from "express";
import { getClient } from "../db";
import BlogPost from "../models/BlogPost";

// create a new router object
const routes = express.Router();

// GET /blog
routes.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<BlogPost>("posts")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routes.post("/blog", async (req, res) => {
  const newPost: BlogPost = req.body;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<BlogPost>("posts")
      .insertOne(newPost);
    newPost._id = result.insertedId;
    res.status(201);
    res.json(newPost);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
