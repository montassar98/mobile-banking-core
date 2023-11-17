var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var getCurrencies = function (req, res) {
	var path = "models/currency-rate/currencies.json";
	if (fs.existsSync(path)) {
		var response = JSON.parse(fs.readFileSync(path, "utf8"));
		res.json(response);
		res.statusCode = 200;
	} else {
		res.statusCode = 404;
	}
	
	utils.handleResultStatus(res);
	res.end();
};

/*var getRateHistorical = function (req, res) {
	var path = "models/currency-rate/historical.json";
	var date = req.query.date;
	if(date != null){
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
};*/

var getRateHistorical = function (req, res) {
	var path = "models/currency-rate/historical-USD.json";
	var date = req.query.date;
	var from = req.query.from;

	if(date != null && from != null){
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

var convertCurrency = function (req, res) {
	var path = "models/currency-rate/convert.json";
	var ratePath = "models/currency-rate/historical.json";
	var from = req.query.from;
	var to = req.query.to;
	var amount = req.query.amount;
	if(from != null && to != null && amount != null){
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			if(fs.existsSync(ratePath)){
				var currencySource = JSON.parse(fs.readFileSync(ratePath, "utf8"));
				var euroRate = currencySource.results.EUR;
				var usdRate = currencySource.results.USD;
				var gbpRate = currencySource.results.GBP;
				var tndRate = currencySource.results.TND;
				var mruRate = currencySource.results.MRU;
				var xofRate = currencySource.results.XOF;
				console.log("rates "+euroRate+" - "+usdRate+" - "+gbpRate+" - "+tndRate+" - "+mruRate+" - "+xofRate);
				response.amount = Number(amount);
				console.log("amount = "+amount)
				switch(to){
					case "USD":{
						amount = Number(amount) * Number(usdRate);
						response.rate = Number(usdRate);
						console.log("converted amount "+amount);
						break;
					} 
					case "EUR":{
						amount = Number(amount) * Number(euroRate);
						response.rate = Number(euroRate);
						console.log("converted amount "+amount);
						break;
					} 
					case "GBP":{
						amount = Number(amount) * Number(gbpRate);
						response.rate = Number(gbpRate);
						console.log("converted amount "+amount);
						break;
					} 
					case "TND": {
						amount = Number(amount) * Number(tndRate);
						response.rate = Number(tndRate);
						console.log("converted amount "+amount);
						break;
					}
					case "MRU": {
						amount = Number(amount) * Number(mruRate);
						response.rate = Number(mruRate);
						console.log("converted amount "+amount);
						break;
					}
					case "XOF": {
						amount = Number(amount) * Number(xofRate);
						response.rate = Number(xofRate);
						console.log("converted amount "+amount);
						break;
					}
					default : {
						amount = Number(amount) * Number(euroRate);
						response.rate = Number(euroRate);
						console.log("converted amount "+amount);
						break;
					}
				}	
				console.log("amount = "+amount);
				response.convertedAmount= amount;
				response.convertedCurrency= to;
				response.baseCurrency= from;
			}else{
				console.log("file not exist");
			}
		
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

var fetchCurrencyRate = function (req, res) {
	var path = "models/currency-rate/fetch-one.json";
	var from = req.query.from;
	var to = req.query.to;
	if(from != null && to != null){
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


exports.getCurrencies = getCurrencies;
exports.getRateHistorical = getRateHistorical;
exports.convertCurrency = convertCurrency;
exports.fetchCurrencyRate = fetchCurrencyRate;
