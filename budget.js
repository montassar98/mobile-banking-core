var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getBudgetResume = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.params["accountId"];
		var path = "models/budget/budget-resume.json";
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


var saveNewBudget = function (req, res) {
	if (req.headers['token'] === token.token) {
		var accountId = req.body.accountId;
		var amount = req.body.amount;
		var name = req.body.name;
		var resumePath = "models/budget/budget-resume.json";
		if (fs.existsSync(resumePath)) {
			var response = JSON.parse(fs.readFileSync(resumePath, "utf8"));
			var mConsumedAmount = response.amountConsumed;
			response.amount = amount;
			response.wording = name;

			const mPercentage = (Number(mConsumedAmount) * 100) / Number(amount);
			console.log("my consumed amount is "+mConsumedAmount+" and percentage will be "+mPercentage);
			response.percentage = mPercentage;
			const jsonString = JSON.stringify(response, null, 2);
			fs.writeFileSync(resumePath,jsonString);
			res.json({});
			res.statusCode = 200;
		} else {
			res.statusCode = 404;
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

exports.getBudgetResume = getBudgetResume;
exports.saveNewBudget = saveNewBudget;