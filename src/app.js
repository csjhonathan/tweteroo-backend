import express from 'express';
import cors from 'cors';
import getTweets from './constants/tweets.js';
import getUsers from './constants/users.js';
import userNameIsValid from './constants/usernameValidation.js';
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
  if (!username) {
    res
      .status(400)
      .send('Todos os campos são obrigatórios/Números não são aceitos');
    return;
  }
  const userNameHaveNumber = !username.split('').every(l => Number.isNaN(Number(l)));
  const avatarIsValid = Number.isNaN(Number(avatar));

  if (!avatar || (userNameHaveNumber || !avatarIsValid || !userNameIsValid(username))) {
    res
      .status(400)
      .send('Todos os campos são obrigatórios/Números/caracteres especiais não são aceitos');
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
  const isString = Number.isNaN(Number(tweet));
  if (!USER) {
    res
      .status(401)
      .send('UNAUTHORIZED');
    return;
  }

  if (!username || !tweet || !isString) {
    res
      .status(400)
      .send('Todos os campos são obrigatórios/Numeros não são aceitos');
    return;
  }

  getTweets()[1].push({ ...USER, tweet });
  res
    .status(201)
    .send('OK!');
});
