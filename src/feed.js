const FeedParser = require('feedparser');
const request = require('request'); // for fetching the feed

class Feed {
  constructor(url) {
    this.url = url;
    this.feedparser = new FeedParser();
    this.response = [];
    this.parent = this;
  }
  
  get(cb) {
    this.getFeed();
    var response = this.response;
    this.feedparser.on('readable', function () {
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      var item;
      var i = 0;
      while (item = stream.read()) {
        response.push(item);
      }
    });
    
    this.feedparser.on('end', function() {
      if (typeof(cb) !== 'undefined')
        cb(response);
      else
        console.log('Feed: callback required');
    })
  }
  
  getFeed() {
    request.get(this.url).pipe(this.feedparser);
  }
}

module.exports = Feed;