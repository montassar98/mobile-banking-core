var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var getLocations = function (req, res) {
	var path = __dirname+"/models/geolocation/locations.json";
	var lat = req.body.lat;
	var lng = req.body.lng;
	console.log("current location "+lat+" "+lng);

	if(lat != null && lng != null){
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			var currentSign = "+";
			response.forEach(element => {
				var mLat = (Math.floor(Math.random()*(500-100+100)+100) / 100000).toFixed(5);
				var mLng = (Math.floor(Math.random()*(500-100+100)+100) / 100000).toFixed(5);
				console.log("test "+mLat+" "+mLng);

				if(currentSign=="+") {
					element.location.lat = Number((parseFloat(mLat)+parseFloat(lat)).toFixed(5));
					element.location.lng = Number((parseFloat(mLng)+parseFloat(lng)).toFixed(5));
					currentSign = "-";
				}else {
					element.location.lat = Number((parseFloat(lat)-parseFloat(mLat)).toFixed(5));
					element.location.lng = Number((parseFloat(lng)-parseFloat(mLng)).toFixed(5));
					currentSign ="+";
				}
			});
			//fs.writeFileSync("locations1.json", JSON.stringify(response));
	
			//console.log("test");
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	}else{
		res.statusCode = 404;
	}
	
	utils.handleResultStatus(res);
	res.end();
};



exports.getLocations = getLocations;
