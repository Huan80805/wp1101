// source code of server
import express from 'express'
import cors from 'cors'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import mongodb from './mongo.js'
// define server
const port = process.env.PORT || 5000
const db = mongodb()
db.on("error", (err) => console.log(err));
db.once("open", async () => {
  const app = express()
  // init middleware
  app.use(bodyParser.json())
  app.use(cors())
  // define routes
  app.use('/api',router)
  app.listen(port, () =>{
    console.log(`Server is up on port ${port}.`)   
   })
});

  