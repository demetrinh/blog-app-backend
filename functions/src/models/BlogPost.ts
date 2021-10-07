import { ObjectId } from "mongodb";

export default interface BlogPost {
  _id: ObjectId;
  title: string;
  author: string;
  date: string;
  post: string;
}
