var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var downloadStatement = function(req, res) {
	if (req.headers['token'] === token.token) {
		var statementId = req.params['statementId'];
		var path = "models/documents/statements/statement-sample" + statementId + ".pdf"
		if (fs.existsSync(path)) {
			res.contentType("application/pdf");
			res.send(fs.readFileSync(path));
			res.statusCode = 200;
		} else {
			res.statusCode = 500;
		}
	} else {
		res.statusCode = 401;
	}
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.statusMessage = "file not found";
			res.json({
				status: res.statusCode,
				error: "file not found"
			});
			break;
		}
		case 500: {
			res.statusMessage = "generic error";
			res.json({
				status: res.statusCode,
				error: "generic error"
			});
			break;
		}
	}
	res.end();
};

var getStatements = function (req, res) {
	var path = "models/documents/statements/statements.json";
	if (req.headers['token'] === token.token) {

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
	
	
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.json({
				status: "NOT_FOUND",
				errors: {
					"timestamp": new Date(),
					"message": "Requested accounts list  does not exist.",
					"details": "Requested accounts list  does not exist."
				}
			})
			break;
		}
		case 500: {
			res.json({
				status: "generic error",
				errors: {
					"timestamp": new Date(),
					"message": "generic error",
					"details": "generic error"
				}
			})
			res.statusMessage = "generic error";
			break;
		}
	}
	res.end();
};

var getLoans = function (req, res) {
	var path = "models/documents/loans/loans.json";
	if (req.headers['token'] === token.token) {

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
	
	
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.json({
				status: "NOT_FOUND",
				errors: {
					"timestamp": new Date(),
					"message": "Requested accounts list  does not exist.",
					"details": "Requested accounts list  does not exist."
				}
			})
			break;
		}
		case 500: {
			res.json({
				status: "generic error",
				errors: {
					"timestamp": new Date(),
					"message": "generic error",
					"details": "generic error"
				}
			})
			res.statusMessage = "generic error";
			break;
		}
	}
	res.end();
};

var downloadLoan = function(req, res) {
	if (req.headers['token'] === token.token) {
		var fileName = req.params['fileName'];
		var path = "models/documents/loans/" + fileName + ".pdf"
		if (fs.existsSync(path)) {
			res.contentType("application/pdf");
			res.send(fs.readFileSync(path));
			res.statusCode = 200;
		} else {
			res.statusCode = 500;
		}
	} else {
		res.statusCode = 401;
	}
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.statusMessage = "file not found";
			res.json({
				status: res.statusCode,
				error: "file not found"
			});
			break;
		}
		case 500: {
			res.statusMessage = "generic error";
			res.json({
				status: res.statusCode,
				error: "generic error"
			});
			break;
		}
	}
	res.end();
};

var getInsurances = function (req, res) {
	var path = "models/documents/insurances/insurances.json";
	if (req.headers['token'] === token.token) {

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
	
	
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.json({
				status: "NOT_FOUND",
				errors: {
					"timestamp": new Date(),
					"message": "Requested accounts list  does not exist.",
					"details": "Requested accounts list  does not exist."
				}
			})
			break;
		}
		case 500: {
			res.json({
				status: "generic error",
				errors: {
					"timestamp": new Date(),
					"message": "generic error",
					"details": "generic error"
				}
			})
			res.statusMessage = "generic error";
			break;
		}
	}
	res.end();
};

var downloadInsurance = function(req, res) {
	if (req.headers['token'] === token.token) {
		var fileName = req.params['fileName'];
		var path = "models/documents/insurances/" + fileName + ".pdf"
		if (fs.existsSync(path)) {
			res.contentType("application/pdf");
			res.send(fs.readFileSync(path));
			res.statusCode = 200;
		} else {
			res.statusCode = 500;
		}
	} else {
		res.statusCode = 401;
	}
	switch (res.statusCode) {
		case 200: {
			res.statusMessage = "ok";
			break;
		}
		case 401: {
			res.statusMessage = "wrong authentication token";
			res.json({
				status: res.statusCode,
				error: "wrong authentication token"
			});
			break;
		}
		case 404: {
			res.statusMessage = "file not found";
			res.json({
				status: res.statusCode,
				error: "file not found"
			});
			break;
		}
		case 500: {
			res.statusMessage = "generic error";
			res.json({
				status: res.statusCode,
				error: "generic error"
			});
			break;
		}
	}
	res.end();
};


exports.downloadStatement = downloadStatement;
exports.getStatements = getStatements;
exports.getLoans = getLoans;
exports.downloadLoan = downloadLoan;
exports.getInsurances = getInsurances;
exports.downloadInsurance = downloadInsurance;