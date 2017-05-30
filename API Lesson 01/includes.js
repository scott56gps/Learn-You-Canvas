var cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');

var accessToken = fs.readFileSync('canvasPracticeToken.txt', 'utf8');

var url = 'https://canvas.instructure.com/api/v1/courses?' + process.argv[2]; //Include between the url and '?': process.argv[2] + '?';

//console.log(process.argv.length)

// Get the search parameters, if there are any
if (process.argv.length > 3) {
  var searchParameterArray = process.argv.slice(3);

  // Include logic to convert a parameter if it has a space and uppercase to standard 'this_parameter' notation

  for (var i = 0; i < searchParameterArray.length; i++) {
    url += (searchParameterArray[i] + '&');
  }
} else {
  url += '&';
}

url += 'access_token=' + accessToken;

console.log('Requesting URL: ' + url);

var data = '';
https.get(url, function (response) {
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    let $ = cheerio.load(data);
    var courseArray = JSON.parse(data);

    //console.log(courseArray);
    courseArray.forEach(function (course) {
      //displayId(course);
      displayTermId(course)
    });
  });
});

function displayId(course) {
  console.log(course.id);
}

function displayTermId(course) {
  console.log('enrollment_term_id: ' + course.enrollment_term_id);
}
