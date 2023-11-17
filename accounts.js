var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getAccountsList = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/accounts/accounts.json"
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

var getAccountById = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params['accountId'];
		var path = "models/accounts/" + accountId + "/account.json";
		if (fs.existsSync(path)) {
			var card = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json({
				status: "OK",
				statusCode: 200,
				payload: card,
				errors: null
			});
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

var getOperationalLimits = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params['accountId'];
		console.log("getOperationalLimits with accountId = "+accountId);
		var path = "models/accounts/" + accountId + "/operational-limits.json";
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

var getAccountTransactions = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params['accountId'];
		var path = "models/accounts/"+accountId+"/transactions.json"
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

var exportTransactionByPeriod = function(req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params['accountId'];
		var startDate = req.query.startDate;
		var endDate = req.query.endDate;
		var format = req.query.format;
		if(accountId != null && startDate != null && endDate != null && format != null){
			var path = "models/accounts/"+accountId+"/digital-transactions.pdf"
			if (fs.existsSync(path)) {
				res.contentType("application/pdf");
				res.send(fs.readFileSync(path));
				res.statusCode = 200;
			} else {
				res.statusCode = 500;
			}
		
		}else{
			res.statusCode = 404;
		}

	} else {
		res.statusCode = 401;
	}
		
	utils.handleResultStatus(res);
	res.end();
};

exports.getAccountsList = getAccountsList;
exports.getAccountById = getAccountById;
exports.getOperationalLimits = getOperationalLimits;
exports.getAccountTransactions = getAccountTransactions;
exports.exportTransactionByPeriod = exportTransactionByPeriod;