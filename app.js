//  This is the NEW app
//
//	Express & Wunderground Node.js app
//  ****** Updated App Oct-08-2018 ******
//	Usage:
//			command prompt
//			run 'node app.js'
//			Console will print message
//			http://localhost:8082/weather/?zipcode
//
//	Replace "API-KEY"

//Imports
var express = require("express");
var Wunderground = require('wunderground-api');
var parse = require('utils-json-parse');
var bodyParser = require('body-parser');

// set the app port 
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
// add access to /public for CSS sub-directory
app.use(express.static('public'));
// set EJS as templating engine
app.set('view engine', 'ejs')
var client = new Wunderground('API-KEY');

app.post('/', function (req, res) {
	console.log(req.body.city);
	console.log('------------');

	//var client = new Wunderground('API-KEY', req.body.city, '');
	var opts = req.body.city;
	client.conditions(opts, function(err, response) {
		try {
			var city = client.conditions.city;
			var state = client.conditions.state;
			var obsTime = client.conditions.observation_time;
			var temp = client.conditions.temperature_string;
			var wind = client.conditions.wind_string;
        	var humidity = client.conditions.humidity;
			var dewpoint = client.conditions.dewpoint_string;
			var current_weather = client.weather;
		}
		catch(err) {
			console.log(err);
		}
		
/*			
//		var output = ("Date:  " + obsTime + "<br>" + "Location:  " + city + ", " + state + "<br>" + "Current Temp:  " + temp);
		var output = ("<strong>Date:  </strong>" + obsTime + "<br>" + "<strong>Location:  </strong>" + city + ", " + state + "<br>" + "<strong>Current Temp:  </strong>" + temp + "<br>" + "<strong>Wind:  </strong>" + wind + "<br>" + "<strong>Humidity:  </strong>" + humidity + "<br>" + "<strong>Dew Point:  </strong>" + dewpoint + "<br>" + "<strong>URL:  </strong>" + myRequest+ "<br>" + "<strong>Location Zip:  </strong>" + myLocation);
*/
		var weather;
		let weatherText = ("<strong>Date:  </strong>" + obsTime + "<br>" + "<strong>Location:  </strong>" + city + ", " + state + "<br>" + "<strong>Current Temp:  </strong>" + temp + "<br>" + "<strong>Wind:  </strong>" + wind + "<br>" + "<strong>Current Weather:  </strong>" + current_weather + "<br>" + "<strong>Humidity:  </strong>" + humidity + "<br>" + "<strong>Dew Point:  </strong>" + dewpoint);
		weatherText = weatherText + "<br> Hello"
		console.log(weatherText);
		res.render('index', {weather: weatherText, error: null});
});
})

app.get('/', function (req, res) {
	// NEW CODE
	res.render('index');
  })

// Express
app.get('/weather/', function (req, res){
    var myRequest = req.url;
	var myLocation = myRequest.split('?').pop();
	console.log("My Location:  " + myLocation);

    var client = new Wunderground('API-KEY', myLocation, '');
	
	client.conditions('', function(err, response) {
		var city = response.display_location.city;
		var state = response.display_location.state;
		var obsTime = response.observation_time;
        var temp = response.temperature_string;
        var wind = response.wind_string;
        var humidity = response.relative_humidity;
		var dewpoint = response.dewpoint_string;
		var current_weather = response.weather;
		
		var output = ("<strong>Date:  </strong>" + obsTime + "<br>" + "<strong>Location:  </strong>" + city + ", " + state + "<br>" + "<strong>Current Temp:  </strong>" + temp + "<br>" + "<strong>Wind:  </strong>" + wind + "<br>" + "<strong>Humidity:  </strong>" + humidity + "<br>" + "<strong>Dew Point:  </strong>" + dewpoint + "<br>" + "<strong>Curent Weather:  </strong>" + current_weather + "<br>" + "<strong>URL:  </strong>" + myRequest+ "<br>" + "<strong>Location Zip:  </strong>" + myLocation);
	
        //console.log(output);
        console.log(response);
		res.send(output);
	});
})


var server = app.listen(port, function () {
	//var host = server.address().address;
	//var port = server.address().port;

 	//Print Message To Console
	 //console.log('Server running at http://%s:%s', host, port);
	 console.log('Server running at http://%s:%s'+ port);
});