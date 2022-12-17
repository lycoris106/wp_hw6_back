import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

router.delete("/cards", async (_, res) => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.json({ message: 'Database cleared' });
  } catch (e) {
    console.log("Database delete error");
    res.json({ message: 'Database clear error' });
  }

});

router.post("/card", async (req, res) => {
  try {
    // console.log(req);
    const existing = await ScoreCard.findOne({ name: req.body.name, subject: req.body.subject });
    if (existing) {
      const updateRet = await ScoreCard.updateOne({ name: req.body.name, subject: req.body.subject }, { score: Number(req.body.score) });
      const findRet = await ScoreCard.find({ name: req.body.name});
      res.json({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true, tableContent: findRet});
    } else {
      const newCard = new ScoreCard({ name: req.body.name, subject: req.body.subject, score: req.body.score});
      console.log("Created card", newCard);
      const va = await newCard.save();
      const findRet = await ScoreCard.find({ name: req.body.name});
      res.json({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true, tableContent: findRet });
    }

  } catch (e) { res.json({ message: 'Add/Update error', card: false }); }
});

router.get("/cards", async (req, res) => {
  try {
    const type = req.query.type;
    const str = req.query.queryString;
    var ret, msgs;
    console.log('query', type);
    if (type === 'name') {
      ret = await ScoreCard.find({name: str});
      console.log('in name');
      msgs = ret.map((re) => {
        return `Found card with name: (${re.name}, ${re.subject}, ${re.score})`;
      });
      if (msgs.length) {
        console.log('msgs', msgs);
        res.json({ messages: ret });
      } else {
        console.log('msg');
        res.json({ message: `Name (${str}) not found!` });
      }
    } else {
      ret = await ScoreCard.find({subject: str});
      msgs = ret.map((re) => {
        return `Found card with subject: (${re.name}, ${re.subject}, ${re.score})`;
      });
      if (msgs.length) {
        res.json({ messages: ret });
      } else {
        res.json({ message: `Subject (${str}) not found!` });
      }
    }

  } catch (e) { res.json({ message: 'Query error' }); }
});
export default router;