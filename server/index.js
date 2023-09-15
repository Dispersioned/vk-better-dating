import express from 'express';
import { addHandlers } from './addHandlers.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

addHandlers(app);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
