var express =  require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app=express();

var apiKey = 'b3506aeedae6f8bd0174477164413f0a'

app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
	res.render('index');
});

app.post('/', function(req, res){
	var city = req.body.city;
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	request(url, function(err, response, body){
		if(err){
			res.render('index', {weather:null, error: 'Error, please try again'});
		}
		else{
			var weather= JSON.parse(body);
			if(weather.main == undefined){
				res.render('index', {weather:null, error: 'Error, please try again'});
			}
			else{
				var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});
			}
		}
	});
	
})

app.listen(3000);		