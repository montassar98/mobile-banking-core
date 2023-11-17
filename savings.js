var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const moment= require('moment') 

const { param } = require("express/lib/request");
const { response } = require("express");

var getSavingsAccounts = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/savings/savings-accounts.json";
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

var getSavingAccountResume = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/savings/savings-accounts.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response[0]);
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
var getSavingsDetails = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/savings/savings-details.json";
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

var getSavingsAccountById = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params["accountId"];
		var path = "models/savings/"+accountId+"/account.json";
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

var getAccountOperations = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params["accountId"];
		var path = "models/savings/"+accountId+"/operations.json";
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

var simulateSavingsAccount = function (req, res) {
	console.log("simulateSavingsAccount ");
	console.log(req.body);
	var accountName = req.body.accountName;
	var startAmount = req.body.startAmount;
	var numberOfMonths = req.body.numberOfMonths;
	var monthlyPayment = req.body.monthlyPayment;
	var currency = req.body.currency;

	if(accountName != null && startAmount != null && numberOfMonths !=  null
		&& monthlyPayment != null && currency != null ){
			try {
				console.log("body inputted correctly");
				var interestRate = Math.floor(Math.random()*(500-100+100)+100) / 100;
				var cleanedAmount = startAmount + (monthlyPayment * numberOfMonths);
				var interestAmount = (cleanedAmount * interestRate)/100;
				var totalSavings = cleanedAmount + interestAmount;
				var currency = currency;
				//convert date
				const today = new Date();
				const dd = today.getDate()+1;
				const mm = today.getMonth()+1;
				const todayFormatted = today.getFullYear()+"-"+mm+"-"+dd;
				console.log("today's date = "+todayFormatted);
				const dateToList = todayFormatted.split("-"); 
				var jan312009 = new Date(Number(dateToList[0]),Number(dateToList[1]),Number(dateToList[2]));
				var endSavingDate = new Date(jan312009.setMonth(jan312009.getMonth()+ numberOfMonths));
	
				 
				res.json({
					"totalSavings": totalSavings,
					"interestRate":interestRate,
					"interestAmount":interestAmount,
					"endLoanDate":endSavingDate.getFullYear()+"-"+endSavingDate.getMonth()+"-"+endSavingDate.getDay(),
					"currency": currency
				});
				res.statusCode = 200
			} catch (error) {
				console.log("catched error = "+error)
			}
	}else{
		res.statusCode = 404
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var depositToAccount = function (req, res) {
	console.log("depositToAccount");
	if(req.headers["token"] == token.token){
		console.log(req.body);
		var fromAccountId = req.body.fromAccountId;
		var depositAmount = req.body.depositAmount;
		var toSavingAccountId = req.body.toSavingAccountId;
		var currency = req.body.currency;

		if(fromAccountId != null && depositAmount != null 
			&& toSavingAccountId !=  null && currency != null ){
				try {
					console.log("body inputted correctly");
					var path = "models/savings/"+toSavingAccountId+"/account.json";
					if (fs.existsSync(path)) {
						var response = JSON.parse(fs.readFileSync(path, "utf8"));
						response.currentAmount = response.currentAmount + Number(depositAmount);
						fs.writeFileSync(path,JSON.stringify(response),"utf8");
						//save operation 
						saveNewOperation(depositAmount,currency,"Deposit",toSavingAccountId);
						res.json({});
						res.statusCode = 200;
					}else{
						res.statusCode = 404;
					}
					
				} catch (error) {
					console.log("catched error = "+error)
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

var withdrawFromSavingAccount = function (req, res) {
	console.log("withdrawFromSavingAccount");
	if(req.headers["token"] == token.token){
		console.log(req.body);
		var toAccountId = req.body.toAccountId;
		var withdrawAmount = req.body.withdrawAmount;
		var fromSavingAccountId = req.body.fromSavingAccountId;
		var currency = req.body.currency;

		if(toAccountId != null && withdrawAmount != null 
			&& fromSavingAccountId !=  null && currency != null ){
				try {
					console.log("body inputted correctly");
					var path = "models/savings/"+fromSavingAccountId+"/account.json";
					var pathAllAccounts = "models/savings/savings-accounts.json";
					if (fs.existsSync(path)) {
						
						var response = JSON.parse(fs.readFileSync(path, "utf8"));
						var responseAllAccounts = JSON.parse(fs.readFileSync(pathAllAccounts, "utf8"));
						var value = Number(response.currentAmount) - Number(withdrawAmount);
						console.log("value = "+value);
						if(value > 0){
							response.currentAmount = value;
							fs.writeFileSync(path,JSON.stringify(response),"utf8");
							//save operation 
							saveNewOperation(-(withdrawAmount),currency,"Withdrawal",fromSavingAccountId);
							res.json({});
							res.statusCode = 200;
						}else{
							res.statusCode = 404;
						}
					
					}else{
						res.statusCode = 404;
					}
				} catch (error) {
					console.log("catched error = "+error)
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

var submitSavingsAccountApplication = function (req, res) {
	console.log("submitSavingsAccountApplication ");
	console.log(req.body);
	if (req.headers['token'] === token.token) {
		var accountName = req.body.accountName;
		var description = req.body.description;
		var initiateDeposit = req.body.initiateDeposit;
		var fromAccount = req.body.fromAccount;
		var hasSavingsObject = req.body.hasSavingsObject;
		var savingsObjectAmount = req.body.savingsObjectAmount;
		var hasMonthlyDeposit = req.body.hasMonthlyDeposit;
		var monthlyDeposit = req.body.monthlyDeposit;
		var currency = req.body.currency;

		if(accountName != null && initiateDeposit != null && hasSavingsObject !=  null
			&& hasMonthlyDeposit != null && currency != null ){
				
			console.log("body inputted correctly");
			const path = "models/savings/applications.json";
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				const id = utils.getRandomInt(9999); 
				req.body.id = id.toString();
				req.body.statusId = "1";
				req.body.status = "PENDING";
				response.unshift(req.body);
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
				res.statusCode = 200;
			}else{
				res.statusCode = 404;
			}
		
					
				
		}else{
			res.statusCode = 404
		}
	
	}else{
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var getSavingsAccountsApplications = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/savings/applications.json"
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

function saveNewOperation(amount,currency,transactionType,accountId) {
	console.log("addOperation "+amount+" "+currency+" "+transactionType+" "+accountId);
	var dateTime = moment().format( "YYYY-MM-DDThh:mm:ss" )+"Z";
    var operation = {
		"id":utils.getRandomInt(999),
		"amount": amount,
		"currencyType": currency,
		"transactionDateTime": dateTime,
		"transactionTypeCode": transactionType,
		"counterpartyAccountId": accountId
	};
	console.log(operation);
	const operationPath = "models/savings/"+accountId+"/operations.json";
	if (fs.existsSync(operationPath)) {
		const response = JSON.parse(fs.readFileSync(operationPath, "utf8"));
		response.unshift(operation);
		fs.writeFileSync(operationPath,JSON.stringify(response),"utf8")
	}
}

exports.getSavingsAccounts = getSavingsAccounts;
exports.getSavingAccountResume = getSavingAccountResume;
exports.getSavingsDetails = getSavingsDetails;
exports.getSavingsAccountById = getSavingsAccountById;
exports.getAccountOperations = getAccountOperations;
exports.simulateSavingsAccount =simulateSavingsAccount;
exports.depositToAccount =depositToAccount;
exports.submitSavingsAccountApplication = submitSavingsAccountApplication;
exports.getSavingsAccountsApplications = getSavingsAccountsApplications;
exports.withdrawFromSavingAccount =withdrawFromSavingAccount;
