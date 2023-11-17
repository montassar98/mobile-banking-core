var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var getPaymentsHistory = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/payments-history.json";
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

var phoneDirectTransfer = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var phoneNumber = req.body.phoneNumber;
		var amount = req.body.amount;
		var currency = req.body.currency;
		

		if(accountId != null && phoneNumber != null&& amount != null && currency !=  null){
			//possiblity of adding transaction or a transfer history 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var getWaterBills = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/water-bills.json";
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

var getElectricityBills = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/electricity-bills.json";
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

var getTvServices = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/tv-services.json";
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

var getSoftwareServices = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/software-services.json";
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

var getInternetServices = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/internet-services.json";
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

var getTelephonyServices = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/payments/telephony-services.json";
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

var payBill = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var companyId = req.body.companyId;
		var billId = req.body.billId;
		var amount = req.body.amount;
		var currency = req.body.currency;
		

		if(accountId != null && companyId != null&& billId != null && amount !=  null&& currency !=  null){
			//possiblity of adding transaction or a history
			console.log("accountId: "+accountId+"/companyId "+"/billId "+billId+"/amount "+amount+"/currency "+currency);
		 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var payInternet = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var phoneNumber = req.body.phoneNumber;
		var accountId = req.body.accountId;
		var period = req.body.period;
		var providerId = req.body.providerId;


		if(phoneNumber != null && accountId != null&& period != null && providerId !=  null){
			//possiblity of adding transaction or a transfer history 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var payTvService = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var email = req.body.email;
		var phoneNumber = req.body.phoneNumber;
		var period = req.body.period;
		var providerId = req.body.providerId;


		if(email != null && phoneNumber != null && accountId != null&& period != null && providerId !=  null){
			//possiblity of adding transaction or a transfer history 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var paySoftwareService = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var email = req.body.email;
		var period = req.body.period;
		var providerId = req.body.providerId;


		if(email != null && accountId != null&& period != null && providerId !=  null){
			//possiblity of adding transaction or a transfer history 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var payTelephonyVoipService = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var telephonyAccountNumber = req.body.telephonyAccountNumber;
		var topupAmount = req.body.topupAmount;
		var securityKey = req.body.securityKey;
		var phoneNumber = req.body.phoneNumber;
		var providerId = req.body.providerId;


		if(accountId != null && 
			telephonyAccountNumber != null && 
			topupAmount != null && 
			securityKey != null && 
			phoneNumber != null && 
			providerId !=  null){
			//possiblity of adding transaction or a transfer history 				 
			res.json({});
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	utils.handleResultStatus(res);
	res.end();

};

exports.getPaymentsHistory =getPaymentsHistory;
exports.phoneDirectTransfer = phoneDirectTransfer;
exports.getWaterBills = getWaterBills;
exports.getElectricityBills = getElectricityBills;
exports.getTvServices = getTvServices;
exports.getInternetServices = getInternetServices;
exports.getSoftwareServices = getSoftwareServices;
exports.getTelephonyServices = getTelephonyServices;
exports.payBill = payBill;
exports.payInternet = payInternet;
exports.payTvService = payTvService;
exports.paySoftwareService = paySoftwareService;
exports.payTelephonyVoipService = payTelephonyVoipService;




