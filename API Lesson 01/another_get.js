var https = require('https');
var fs = require('fs');

if (process.argv[2] === 'byui') {
  // Get the https beginning string
  var url = fs.readFileSync('../canvasByuiUrl.txt', 'utf8');

  // Get the API call from the command line
  url = url + process.argv[3] + '?';

  // If there are parameters, get them
  if (process.argv.length > 4) {
    // Check if the first parameter contains 'include[]'
    if (process.argv[4].includes('include')) {
      url += process.argv[4];
    } else {
      for (var i = 4; i < process.argv.length; i++) {
        url += process.argv[i];
      }
    }
  }

  url += '&access_token=' + fs.readFileSync('../canvasByuiToken.txt', 'utf8');
} else {
  // Get the https beginning string
  var url = fs.readFileSync('../canvasUrlTemplate.txt', 'utf8');

  // Get the API call from the command line
  url = url + process.argv[3] + '?';

  // If there are parameters, get them
  if (process.argv.length > 4) {
    // Check if the first parameter contains 'include[]'
    if (process.argv[4].includes('include')) {
      url += process.argv[4];
    } else {
      for (var i = 4; i < process.argv.length; i++) {
        url += process.argv[i];
      }
    }
  }

  url += '&access_token=' + fs.readFileSync('../canvasPracticeToken.txt', 'utf8');
}

console.log(url);
// Now, perform the GET request
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

function displayData(data) {
  console.log(data);
}
