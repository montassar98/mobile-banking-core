var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");


var getScore = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/loyalty-score.json";
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

var getAvailablePoints = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/loyalty-score.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response.points);
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

var getWeeklyDeals = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/weekly-deals.json";
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

var getWeeklyOffers = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/weekly-offers.json";
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

var getRedeems = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/redeems.json";
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

var redeemCoupon = function (req, res) {
	if (req.headers['token'] === token.token) {
		const id = req.query.id;
		console.log("id "+id);
		const redeemsPath = "models/loyalty-program/redeems.json";
		const couponsPath = "models/loyalty-program/available-coupons.json";
		if (fs.existsSync(redeemsPath) && fs.existsSync(couponsPath)) {
			var redeems = JSON.parse(fs.readFileSync(redeemsPath, "utf8"));
			var availableCoupons = JSON.parse(fs.readFileSync(couponsPath, "utf8"));
			for (let [i, redeem] of redeems.entries()) {
				console.log("redeem index= "+i);
				if (redeem.couponId === id) {
					console.log("redeem on index "+i);
					redeems.splice(i, 1);
					availableCoupons.unshift(redeem);
				}
			}	
			fs.writeFileSync(couponsPath,JSON.stringify(availableCoupons),"utf8");
			res.json({});
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

var getAvailableCoupons = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/available-coupons.json";
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

var getBadges = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/loyalty-program/loyalty-badges.json";
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

var transferPoints = function (req, res) {

	if(req.headers['token'] == token.token){
		console.log(req.body);
		var phoneNumber = req.body.phoneNumber;
		var amount = req.body.amount;
		var motive = req.body.motive;
		
		if(phoneNumber != null && amount != null){
			//possiblity of adding transaction or a transfer history
			var path = "models/loyalty-program/loyalty-score.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				response.points = response.points - amount;
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
		res.statusCode = 401
	}
	
	utils.handleResultStatus(res);
	res.end();

};


exports.getScore = getScore;
exports.getAvailablePoints = getAvailablePoints;
exports.getWeeklyDeals = getWeeklyDeals;
exports.getWeeklyOffers = getWeeklyOffers;
exports.getAvailableCoupons = getAvailableCoupons;
exports.redeemCoupon = redeemCoupon;
exports.getRedeems = getRedeems;
exports.getBadges = getBadges;
exports.transferPoints = transferPoints;




