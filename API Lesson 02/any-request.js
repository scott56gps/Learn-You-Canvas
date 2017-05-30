var request = require('request');
var https = require('https');
var fs = require('fs');

var requestType = '';

if (process.argv[2] === 'byui') {
  // Get the https beginning string
  //var url = fs.readFileSync('../canvasByuiUrl.txt', 'utf8');
  var url = 'https://byui.instructure.com';
  
  // Get the request type
  requestType = process.argv[3];

  // Get the API call from the command line
  url = url + process.argv[4] + '?';

  // If there are parameters, get them
  if (process.argv.length > 5) {
    // Check if the first parameter contains 'include[]'
    if (process.argv[5].includes('include')) {
      url += process.argv[5];
    } else {
      for (var i = 5; i < process.argv.length; i++) {
        url += process.argv[i];
      }
    }
  }

  url += '&access_token=' + fs.readFileSync('../canvasByuiToken.txt', 'utf8');
  //url += '&access_token=' + '1121~AzIFRbAj0dCvYg4kLtANjMsnR8ZDAWGuBwTJpiqaRqwhXx0x8kxlatAt6fFZdHnF';
} else {
  // Get the https beginning string
  var url = fs.readFileSync('../canvasUrlTemplate.txt', 'utf8');

  // Get the request type
  requestType = process.argv[3];

  // Get the API call from the command line
  url = url + process.argv[4] + '?';

  // If there are parameters, get them
  if (process.argv.length > 5) {
    // Check if the first parameter contains 'include[]'
    if (process.argv[5].includes('include')) {
      url += process.argv[5];
    } else {
      for (var i = 5; i < process.argv.length; i++) {
        url += process.argv[i];
        url += '&';
      }
    }
  } else {
    url += '&'
  }

  url += 'access_token=' + fs.readFileSync('../canvasPracticeToken.txt', 'utf8');
}

console.log(url);

requestType = requestType.toLowerCase();
switch (requestType) {
  case 'get':
    var body = '';
    https.get(url, function (response) {
      response.on('data', function (chunk) {
        body += chunk.toString();
      });
      response.on('end', function () {
        var parsedData = JSON.parse(body);

        if (Array.isArray(parsedData)) {
          parsedData.forEach(function (dataItem) {
            displayData(dataItem);
          });
        } else {
          displayData(parsedData);
        }
      });
    });

    break;

  case 'put':
    request.put(url, function (error, response, body) {
      console.log(body);
    });

    break;
  case 'post':
    request.post(url, function (error, response, body) {
      console.log(body);
    });

    break;

  case 'delete':
    request.delete(url, function (body) {
      console.log(body);
    });
}

function displayData(data) {
  console.log(data);
}
