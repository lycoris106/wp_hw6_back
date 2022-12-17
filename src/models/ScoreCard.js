import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
});

const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);
export default ScoreCard;