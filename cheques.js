var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");
const id = require("faker/lib/locales/id_ID");


var getChequesInfo = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cheques/cheques-info.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};


var getChequesOperations = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cheques/activities.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var getChequebookOrdersHistory = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cheques/orders-history.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var sendEmergencyIssue = function (req, res) {
	if (req.headers['token'] === token.token) {
		
		var userId = req.body.userId;
		var subject = req.body.subject;
		var description = req.body.description;
		if(userId != null && description != null && subject != null){
			res.json({});
			res.statusCode = 200;
		}else{
			res.statusCode = 404;
		}
	
	}else{
		res.statusCode = 401;
	}
	
	utils.handleResultStatus(res);
	res.end();
};

var getAllCities = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cheques/cities.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var getAgenciesByCity = function (req, res) {
	if (req.headers['token'] === token.token) {
		var city = req.query.city;
		console.log(city);
		if(city != undefined){
			var path = "models/cheques/agencies-";
			if(city.toLowerCase().includes("berlin")){
				path +="berlin.json";
			}else if(city.toLowerCase().includes("tunis")){
				path +="tunis.json";
			}else if(city.toLowerCase().includes("ariana")){
				path +="ariana.json";
			}else{
				path +="tunis.json";
			}
			console.log(path);
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				res.json(response);
				res.statusCode = 200;
			} else {
				res.statusCode = 404;
			}
		}else{
			res.statusCode = 404;
		}
	
	}else{
		res.statusCode = 401;
	}
	
	utils.handleResultStatus(res);
	res.end();
};

var orderCheckbook = function (req, res) {
	if (req.headers['token'] === token.token) {
		var city = req.body.city;
		var agency = req.body.agency;
		var chequeType = req.body.chequeType;
		if( agency != undefined && chequeType != undefined){
			res.json({});
			res.statusCode = 200;
		}else{
			res.statusCode = 404;
		}
	
	}else{
		res.statusCode = 401;
	}
	
	utils.handleResultStatus(res);
	res.end();
};

exports.getChequesInfo = getChequesInfo;
exports.getChequesOperations = getChequesOperations;
exports.getAllCities = getAllCities;
exports.getAgenciesByCity = getAgenciesByCity;
exports.sendEmergencyIssue = sendEmergencyIssue;
exports.orderCheckbook = orderCheckbook;
exports.getChequebookOrdersHistory = getChequebookOrdersHistory;




