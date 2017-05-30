var request = require('request');
var fs = require('fs');

// Get the https beginning string
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

// Now, we make the POST request
var r = request.post(url, function(error, response, body) {
  console.log(body);
});