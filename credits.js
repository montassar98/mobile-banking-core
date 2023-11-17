var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getDeals = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/credits/deals.json"
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

var getDealByCategory = function (req, res) {
	if (req.headers['token'] === token.token) {
		var categoryId = req.params["categoryId"];
		var path = "models/credits/deals/deal-"+categoryId+".json";
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

var getActiveCredits = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/credits/active-credits.json"
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

var getActiveCreditById = function (req, res) {
	if (req.headers['token'] === token.token) {
		var activeCreditId = req.params["activeCreditId"]
		if(activeCreditId != null){
			var path = "models/credits/active-credits/active-credit-"+activeCreditId+".json"
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
		
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var getCreditResume = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/credits/active-credits/active-credit-01.json"
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

var getCreditsApplication = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/credits/applications.json"
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

var getCreditScore = function (req, res) {
	if (req.headers['token'] === token.token) {
		
		var path = "models/credits/credits-score.json"
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

var getLoanCategoryDetailsById = function (req, res) {
	if (req.headers['token'] === token.token) {
		var categoryId = req.params['loanCategoryId'];
		var path = "models/credits/categories/category-"+categoryId+".json"
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

var simulateCredit = function (req, res) {
	console.log(req.body);
	var loanCategoryId = req.body.loanCategoryId;
	var principalAmount = req.body.principalAmount;
	var loanTerm = req.body.loanTerm;
	var firstPaymentDate = req.body.firstPaymentDate;
	var currency = req.body.currency;

	if(loanCategoryId != null&&principalAmount!=null&&loanTerm !=  null
		&& firstPaymentDate != null && currency != null ){
			try {
				var interestRate = Math.floor(Math.random()*(500-100+100)+100) / 100;
				var interestAmount = (principalAmount * interestRate)/100;
				var totalLoan = principalAmount + interestAmount;
				var numberOfPayments = loanTerm * 12;
				var monthlyPayment = totalLoan /numberOfPayments;
				var currency = currency;
				//convert date
				const dateToList = firstPaymentDate.split("-");
				var jan312009 = new Date(Number(dateToList[0]),Number(dateToList[1]),Number(dateToList[2]));
				var endLoanDate = new Date(jan312009.setMonth(jan312009.getMonth()+(loanTerm*12)));
				
				
				
				var convertedDate  = new Date(jan312009.setMonth(jan312009.getMonth()+8));
				 
				res.json({
					"loanCategoryId": loanCategoryId,
					"totalLoan":totalLoan,
					"interestRate":interestRate,
					"interestAmount":interestAmount,
					"monthlyPayment":monthlyPayment,
					"numberOfPayments":numberOfPayments,
					"endLoanDate":endLoanDate.getFullYear()+"-"+endLoanDate.getMonth()+"-"+endLoanDate.getDay(),
					"currency": currency
				});
			} catch (error) {
				console.log("catched error = "+error)
			}
	}else{
		res.statusCode = 404
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var applyForLoan = function (req, res) {
	console.log(req.body);
	if (req.headers['token'] === token.token) {
		var loanCategoryId = req.body.loanCategoryId;
		var name = req.body.name;
		var totalLoan = req.body.totalLoan;
		var interestRate = req.body.interestRate;
		var interestAmount = req.body.interestAmount;
		var currency = req.body.currency;
		var monthlyPayment = req.body.monthlyPayment;
		var numberOfPayments = req.body.numberOfPayments;

		if(loanCategoryId != null&&totalLoan!=null&&name!=null&&interestRate !=  null
			&& interestAmount != null && currency != null
			&& monthlyPayment != null && numberOfPayments != null ){
				console.log("body filled correctly");
				const path = "models/credits/applications.json";
				if (fs.existsSync(path)) {
					var response = JSON.parse(fs.readFileSync(path, "utf8"));
					var randomId = utils.getRandomInt(1000);
					var application = {
						"id":randomId.toString(),
						"categoryId":loanCategoryId,
						"categoryName":"DEBT_LOAN",
						"name":name,
						"totalDurationInMonths":numberOfPayments,
						"currency":currency,
						"ratePercentage":interestRate,
						"monthShareAmount":monthlyPayment,
						"totalInterestAmount":interestAmount,
						"totalCreditAmount": totalLoan,
						"statusId":"1",
						"status":"PENDING"
					}
					response.unshift(application);
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

var applyForDeal = function (req, res) {
	console.log(req.body);
	if (req.headers['token'] === token.token) {
		
		res.json({});
		res.statusCode = 200;
				
	}else{
		res.statusCode = 401;
	}
	
	utils.handleResultStatus(res);
	res.end();

};


exports.getDeals = getDeals;
exports.getDealByCategory = getDealByCategory;
exports.applyForLoan = applyForLoan;
exports.applyForDeal = applyForDeal;
exports.getActiveCredits = getActiveCredits;
exports.getCreditResume = getCreditResume;
exports.getCreditScore = getCreditScore;
exports.getCreditsApplication = getCreditsApplication;
exports.getActiveCreditById = getActiveCreditById;
exports.getLoanCategoryDetailsById = getLoanCategoryDetailsById;
exports.simulateCredit = simulateCredit;