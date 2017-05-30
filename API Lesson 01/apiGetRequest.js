var fs = require('fs');
var got = require('got');
var https = require('https');


var accessToken = fs.readFileSync('canvasPracticeToken.txt', 'utf8');
var url = 'https://canvas.instructure.com/api/v1/users/self/profile?access_token=' + accessToken;

/*var response = got(url).then(function (tempResponse) {
  tempResponse.on('data', function (chunk) {
    body += tempResponse.body;
  });
  tempResponse.on('end', function() {
    console.log(body);
  })
});*/

var resultObject;
https.get(url, function(response) {
  var body = '';
  response.on('data', function(chunk) {
    body += chunk;
  });
  response.on('end', function() {
    var jsonObject = JSON.parse(body);
    console.log(jsonObject.calendar.ics);
  })
})

//console.log(resultObject);
//var jsonResult = JSON.parse(resultObject);

//console.log(jsonResult.calendar);

//console.log(body);

//console.log(response.body);
