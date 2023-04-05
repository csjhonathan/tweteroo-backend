const TWEETS = [];
function getTweets() {
  if (TWEETS.length < 10) {
    return [[...TWEETS].reverse(), TWEETS];
  }
  return [[...TWEETS].reverse().slice(0, 10), TWEETS];

}
export default getTweets;