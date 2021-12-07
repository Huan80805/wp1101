import express from 'express'
import postRoute from './routes/post'
import mongoose from 'mongoose'
import { dataInit } from './upload'
import Post from "./models/post"

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// TODO 1: connect to your mongodb here
const mongodb = () => {
    mongoose
    .connect(process.env.MONGO_URL,dboptions)
    .then((res) => console.log("mongo db connection created"));
    const db = mongoose.connection;
    return db
}
const db = mongodb()
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  if (process.env.MODE === 'EXAM')
    dataInit()
  app.use('/api', postRoute)
  app.listen(port, async() => {
    console.log(`Server is up on port ${port}.`)
    // const post = await Post.findOne({postID:"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"})
    // console.log(post)
  })
})
