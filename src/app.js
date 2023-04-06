import express from 'express';
import cors from 'cors';
import getTweets from './constants/tweets.js';
import getUsers from './constants/users.js';

const app = express();
const PORT = 5000;

// LISTEN
app.listen(PORT, () => console.log(`Server is open on http://localhost:${PORT}`));

// APP.USES
app.use(cors());
app.use(express.json());

// GET METHODS
app.get('/tweets', (req, res) => {
  res.send(getTweets()[0]);
});

// POST METHODS

app.post('/sign-up', (req, res) => {
  const data = req.body;
  getUsers().push(data);
  res
    .send(data);
});

app.post('/tweets', (req, res) => {
  const data = req.body;
  const { tweet, username: name } = data;
  const USER = getUsers().filter(({ username }) => name === username)[0];

  if (USER) {
    getTweets()[1].push({ ...USER, tweet });
    res
      .status(200)
      .send(data);
  } else {
    res
      .status(400)
      .send('UNAUTHORIZED');
  }
});
