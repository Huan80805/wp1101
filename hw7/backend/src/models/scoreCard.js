import mongoose from 'mongoose'
  
const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
  name: String,   
  subject: String,
  score:Number  // Number is shorthand for {type: Number}
});
const scoreCard = mongoose.model('scoreCard', scoreCardSchema);

export default scoreCard;
