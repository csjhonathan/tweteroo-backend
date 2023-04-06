import express from 'express';
import cors from 'cors';
import getTweets from './constants/tweets.js';
import getUsers from './constants/users.js';

const app = express();
const PORT = 5000;

// LISTEN
app.listen(PORT, () => console.log(`Server is open on http://localhost:${PORT}`));

// APP.USES
app
  .use(cors())
  .use(express.json());

// GET METHODS
app.get('/tweets', (req, res) => {
  const { page } = req.query;

  if (page >= 1) {
    res
      .status(200)
      .send(getTweets(page)[0]);
    return;
  }
  if (page && page < 1) {
    res
      .status(400)
      .send('Informe uma página válida');
  }
  if (!page) {
    res
      .status(200)
      .send(getTweets(undefined)[0]);
  }
});

app.get('/tweets/:USERNAME', (req, res) => {
  const { USERNAME } = req.params;
  const USERTWEETS = getTweets()[0].filter(({ username }) => USERNAME === username);
  res
    .status(200)
    .send(USERTWEETS);
});

// POST METHODS

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar || !Number.isNaN(Number(avatar)) || !Number.isNaN(Number(username))) {
    res
      .status(400)
      .send('Todos os campos são obrigatórios');
    return;
  }
  getUsers().push({ username, avatar });
  res
    .status(201)
    .send('OK!');
});

app.post('/tweets', (req, res) => {
  const { tweet } = req.body;
  const { user: username } = req.headers;
  const USER = getUsers().find(({ username: name }) => name === username);

  if (!USER) {
    res
      .status(401)
      .send('UNAUTHORIZED');
    return;
  }

  if (!username || !tweet || !Number.isNaN(Number(tweet))) {
    res
      .status(400)
      .send('Todos os campos são obrigatórios/Tweet não pode conter apenas números');
    return;
  }

  getTweets()[1].push({ ...USER, tweet });
  res
    .status(201)
    .send('OK!');
});
