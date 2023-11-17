var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var requestAppointment = function (req, res) {
	if(req.headers["token"] == token.token){
		var path = "models/contact/request-appointment.json";
		var userId = req.body.userId;
		var subject = req.body.subject;
		var description = req.body.description;
		if(userId != null && description != null && subject != null){
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

var sendComplaint = function (req, res) {
	var path = "models/contact/send-complaint.json";
	var userId = req.body.userId;
	var subject = req.body.subject;
	var description = req.body.description;
	if(userId != null && description != null && subject != null){
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
	
	utils.handleResultStatus(res);
	res.end();
};

var getAdvisorInfo = function (req, res) {
	var path = "models/contact/advisor-info.json";
	if(req.headers["token"] == token.token){
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			
			res.json(response);
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
		}
	}else{
		res.statusCode = 401;
	}
	
	utils.handleResultStatus(res);
	res.end();
};


var contactUs = function (req, res) {
	var path = "models/contact/contact-us.json";
	var email = req.body.email;
	var subject = req.body.subject;
	var description = req.body.description;
	if(description != undefined && subject != undefined){
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			const anonymousMessage = {
				'email':email,
				'subject':subject,
				'description':description
			}
			response.push(anonymousMessage);
			res.json({});
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


exports.requestAppointment = requestAppointment;
exports.sendComplaint = sendComplaint;
exports.getAdvisorInfo = getAdvisorInfo;
exports.contactUs = contactUs;
