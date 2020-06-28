const EventSource = require('eventsource');

var source = new EventSource("https://streaming-graph.facebook.com/188752415888615/live_comments?access_token=270996950909699");
source.onmessage = function(event) {
    console.log(event);
  // Do something with event.message for example
};
