import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;
let USER = '';
let TWEETS = [
  {
    username: 'bobesponja',
    avatar: 'https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png',
    tweet: 'Eu amo hambúrguer de siri!'
  },
  {
    username: 'bobesponja',
    avatar: 'https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png',
    tweet: 'Eu amo hambúrguer de siri!'
  },
  {
    username: 'bobesponja',
    avatar: 'https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png',
    tweet: 'Eu amo hambúrguer de siri!'
  },
  {
    username: 'bobesponja',
    avatar: 'https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png',
    tweet: 'Eu amo hambúrguer de siri!'
  }
];
// LISTEN
app.listen(PORT, () => console.log(`Server is open on http://localhost:${PORT}`));

// APP.USES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET METHODS
app.get('/tweets', (req, res) => {
  res.send(TWEETS);
});


// POST METHODS

app.post('/sign-up', (req, res) => {
  let data = req.body;
  USER = data;
  console.log(USER);
  res.send(JSON.stringify(data));
});

app.post('/tweets', (req, res) => {
  const data = req.body;
  const tweet = data.tweet;
  TWEETS = [...TWEETS, { ...USER, tweet }];
  res.send(JSON.stringify(data));
});