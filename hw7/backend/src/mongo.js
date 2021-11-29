// define connection with mongo
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config()
const mongodb = () => {
    mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));
    const db = mongoose.connection;
    return db
}
export default mongodb