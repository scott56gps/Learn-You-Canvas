var https = require('https');
//var async = require('async');

var url = process.argv[2];

var parseJson = function(jsonChunk) {
  var parsedJson = JSON.parse(jsonChunk);
  return parsedJson;
}

function display(jsonObject) {
  console.log('code: ' + jsonObject.code);
}

https.get(url, function respondToUrl(response) {
  response.setEncoding('utf8');
  response.on('data', function(chunk) {
    // Parse the JSON data
    var parsedJsonObject = parseJson(chunk);
    display(parsedJsonObject);
  });
})