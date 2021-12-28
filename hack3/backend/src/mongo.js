import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import dotenv from "dotenv-defaults";
dotenv.config()
async function connect() {
  // TODO 1.1 Connect your MongoDB
  mongoose
  .connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));
  dataInit()
  const db = mongoose.connection;
  return db
}

export default { connect };