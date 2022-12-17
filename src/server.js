import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import monDb from './db';
import ScoreCard from './models/ScoreCard';
import routes from './routes';


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Hello, World!');
  next();
});

app.use('/', routes);


app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

// const saveUser = async (name, subject, score) => {
//   // const existing = await ScoreCard.findOne({ name });
//   // if (existing) throw new Error(`data ${name} exists!!`);
//   try {
//     const newUser = new ScoreCard({ name, subject, score});
//     console.log("Created user", newUser);
//     return newUser.save();
//   } catch (e) { throw new Error("User creation error: " + e); }
// };

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  } catch (e) { throw new Error("Database deletion failed"); }
};

monDb.connect();
const db = mongoose.connection;

db.on('error', (err) => console.error('Connection error', err));
// db.once('open', (db) => console.log('Connected to MongoDB'));

db.once("open", async () => {
  console.log('db open');
});