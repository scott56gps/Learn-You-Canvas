var cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');

var accessToken = fs.readFileSync('canvasPracticeToken.txt', 'utf8');

// Get the search parameters
if (process.argv.length >= 2) {
  var searchParameterArray = process.argv.slice(2);
}

// Include logic to convert a parameter if it has a space and uppercase to standard 'this_parameter' notation

var url = 'https://canvas.instructure.com/api/v1/courses?';
for (var i = 0; i < searchParameterArray.length; i++) {
  url += (searchParameterArray[i] + '&');
}

url += '&access_token=' + accessToken;

var data = '';
https.get(url, function (response) {
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    let $ = cheerio.load(data);
    var courseArray = JSON.parse(data);
    
    courseArray.forEach(function (course) {
      displayId(course);
      //displayCourse(course);
    });
  });
});

function displayId(course) {
  console.log(course.id);
}

function displayCourse(course) {
  console.log(course.enrollments);
}