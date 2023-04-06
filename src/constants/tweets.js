const TWEETS = [];
function getTweets(page) {
  if (page) {
    const MAX = page * 10;
    const MIN = MAX - 10;
    return [[...TWEETS].reverse().slice(MIN, MAX), TWEETS];
  }

  if (TWEETS.length < 10) {
    return [[...TWEETS].reverse(), TWEETS];
  }
  return [[...TWEETS].reverse().slice(0, 10), TWEETS];
}
export default getTweets;
