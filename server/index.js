import express from 'express';
import { addHandlers } from './addHandlers.js';
import { port } from './config/consts.js';
import { db } from './modules/db.js';

async function start() {
  await db.init();
  const recommendationsCollection = db.getCollection('recommendations');
  if (!recommendationsCollection) db.createCollection('recommendations');
  const likesCollection = db.getCollection('likes');
  if (!likesCollection) db.createCollection('likes');
  if (!recommendationsCollection || !likesCollection) await db.save();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  addHandlers(app);

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}

start();
