// SETUP
// ====================================================
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

var port = process.env.PORT ||4730;

// ROUTE CONFIG
// ====================================================
var router = express.Router();

// GROUP SETUP
var groups = [{name: "Flying Unicorns", location: {long: "5.188546", lat: "52.349290"}},
			  {name: "Screaming Dragons", location: {long: "5.181551", lat: "52.347377"}},
			  {name: "Vintage Crowns", location: {long: "5.184899", lat: "52.352987"}},
			  {name: "Spiders"}];

// do before requests
router.use(function(req, res, next) {
	console.log('Something is happening');
	next();
});

router.get('/group/findAllGroups', function(req, res){
	res.json(groups);
});

router.get('/location/:name', function(req, res) {
	var name = req.params.name;
	var group = findGroupByName(name);
	
	res.json(group);
});

router.post('/location/update', function(req, res) {
	var name = req.body.name;
	var location = { long: req.body.long, lat: req.body.lat };
	
	var group = findGroupByName(name);
	
	if(group == null) {
		res.json(false);
	}
	else {
		updateGroupByName(name, location);
		res.json(true);
	}	
});

router.post('/group/create', function(req, res) {
	var name = req.body.name;
	var location = { long: req.body.long, lat: req.body.lat };
	
	var group = findGroupByName(name);
	
	if(group == null) {
		group = { name: name, location: location };
		groups.push(group);
		res.json(true);
	}
	else {
		res.json(false);
	}	
});

function updateGroupByName(name, location)
{
	for(var i = 0; i < groups.length; i++){
		if(groups[i].name === name){
			groups[i].location = location;
			return;
		}
	}
}

function findGroupByName(name)
{
	for(var i = 0; i < groups.length; i++){
		if(groups[i].name === name){
			return groups[i];
		}
	}
	return null;
}

// PREFIX
app.use('/api', router);

// START SERVER
// ====================================================
app.listen(port);
console.log('Magic happens on port ' + port);