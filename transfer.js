var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")
const moment= require('moment') 
const { uniqueNamesGenerator, names } = require('unique-names-generator');




var getTransferHistory = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/transfer/history/transfer-history.json"
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

var transferAccount = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var iban = req.body.iban;
		var amount = req.body.amount;
		var currency = req.body.currency;
		var motive = req.body.motive;
		var isScheduled = req.body.isScheduled;
		var scheduleDate = req.body.scheduleDate;
		

		if(accountId != null && iban != null&& amount != null && currency !=  null && isScheduled != null){
			//possiblity of adding transaction or a transfer history
			var uniqueName = uniqueNamesGenerator({
				dictionaries: [names]
			  });
			
			console.log("unique name = "+uniqueName);
			var dateTime = moment().format( "YYYY-MM-DDThh:mm:ss" )+"Z"; 
			console.log(dateTime);
			var mMotive = "No description";
			if(motive != undefined && motive != null)  mMotive = motive;

			console.log("motive: "+mMotive);
			var transferHistory = {
				"accountId": accountId,
				"amount": Number(amount),
				"currency": currency,
				"description": mMotive,
				"type": "STRUCTURED_BE",
				"counterpartyAccountId": iban,
				"counterpartyAccountIdType": "BBAN",
				"counterpartyName": uniqueName,
				"id": "B7K06XM02A000096000001",
				"operationDate": dateTime,
				"transactionId": "B7K06XM02A000096000001",
				"transactionProcessingDate": dateTime
			  }
			console.log(transferHistory); 
			var path = "models/transfer/history/transfer-history.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				response.unshift(transferHistory);
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
			}else{
				res.statusCode = 404;
			}
					
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var transferAnotherBank = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var bankName = req.body.bankName;
		var swiftCode = req.body.swiftCode;
		var beneficiaryName = req.body.beneficiaryName;
		var beneficiaryAccountNumber = req.body.beneficiaryAccountNumber;
		var amount = req.body.amount;
		var currency = req.body.currency;
		var motive = req.body.motive;
		

		if(accountId != undefined && bankName != undefined && swiftCode != undefined 
			&& beneficiaryName != undefined&& beneficiaryAccountNumber != undefined
			 && amount != undefined && currency !=  undefined){
			//possiblity of adding transaction or a transfer history
			var dateTime = moment().format( "YYYY-MM-DDThh:mm:ss" )+"Z"; 
			console.log(dateTime);
			var mMotive = "No description";
			if(motive != undefined || motive != null || motive == "")  mMotive = motive;

			console.log("motive: "+mMotive);
			var transferHistory = {
				"accountId": accountId,
				"amount": Number(amount),
				"currency": currency,
				"description": mMotive,
				"type": "NATIONAL",
				"counterpartyAccountId": beneficiaryAccountNumber,
				"counterpartyAccountIdType": swiftCode,
				"counterpartyName": beneficiaryName,
				"id": "B7K06XM02A000096000001",
				"operationDate": dateTime,
				"transactionId": "B7K06XM02A000096000001",
				"transactionProcessingDate": dateTime
			  }
			console.log(transferHistory); 
			var path = "models/transfer/history/transfer-history.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				response.unshift(transferHistory);
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
			}else{
				res.statusCode = 404;
			}
					
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var transferInternational = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var accountId = req.body.accountId;
		var bankName = req.body.bankName;
		var bankAddress = req.body.bankAddress;
		var swiftCode = req.body.swiftCode;
		var beneficiaryName = req.body.beneficiaryName;
		var beneficiaryAccountNumber = req.body.beneficiaryAccountNumber;
		var amount = req.body.amount;
		var currency = req.body.currency;
		var motive = req.body.motive;
		

		if(accountId != undefined && bankName != undefined && bankAddress != undefined 
			&& swiftCode != undefined && beneficiaryName != undefined&& beneficiaryAccountNumber != undefined
			 && amount != undefined && currency !=  undefined){
			//possiblity of adding transaction or a transfer history
			var dateTime = moment().format( "YYYY-MM-DDThh:mm:ss" )+"Z"; 
			console.log(dateTime);
			var mMotive = "No description";
			if(motive != undefined || motive != null || motive == "")  mMotive = motive;

			console.log("motive: "+mMotive);
			var transferHistory = {
				"accountId": accountId,
				"amount": Number(amount),
				"currency": currency,
				"description": mMotive,
				"type": "INTERNATIONAL",
				"counterpartyAccountId": beneficiaryAccountNumber,
				"counterpartyAccountIdType": swiftCode,
				"counterpartyName": beneficiaryName,
				"id": "B7K06XM02A000096000001",
				"operationDate": dateTime,
				"transactionId": "B7K06XM02A000096000001",
				"transactionProcessingDate": dateTime
			  }
			console.log(transferHistory); 
			var path = "models/transfer/history/transfer-history.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				response.unshift(transferHistory);
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
			}else{
				res.statusCode = 404;
			}
					
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var downloadTransferReceipt = function(req, res) {
	if (req.headers['token'] === token.token) {
		var transactionId = req.params['transactionId'];
		var path = "models/transfer/history/receipt-sample.pdf"
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
		
	utils.handleResultStatus(res);
	res.end();
};

exports.getTransferHistory = getTransferHistory;
exports.transferAccount = transferAccount;
exports.transferAnotherBank = transferAnotherBank;
exports.transferInternational = transferInternational;
exports.downloadTransferReceipt = downloadTransferReceipt;