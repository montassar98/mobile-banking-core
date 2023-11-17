var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getCardsList = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cards/cards.json"
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

var getCardsPlansList = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/cards/cards_plans.json"
		if (fs.existsSync(path)) {
			console.log("find cards plans file")
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


var getCardAdvantages = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/"+cardId+"/advantages.json"
		if (fs.existsSync(path)) {
			console.log("find card advatanages file")
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

var getCardPlanById = function (req, res) {
	if (req.headers['token'] === token.token) {
		//gold card identifier = 1 , regular card id = 2
		var path = ""
		var cardPlanId = req.params['cardPlanId'];
		switch(cardPlanId){
			case "1" : //Gold
			path = "models/cards/card_plan_gold.json";
			break;
			case "2" : //Regular
			path = "models/cards/card_plan_regular.json";
			break;
			case "3" : //Gold
			path = "models/cards/card_plan_gold.json";
			break;
			default:
			path = "models/cards/card_plan_gold.json";
			break;
		}
		
		if (fs.existsSync(path)) {
			console.log("find cards plans file")
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

var getCardById = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("card on index "+i);
					res.json({card});
				}
			  }
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

var getCardTransactions = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/" + cardId + "/transactions.json";
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

var getCardLimit = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/" + cardId + "/card-limit.json";
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

var changeCardLimit = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var newLimitAmount = req.query.newLimitAmount;
		console.log("new limit is "+newLimitAmount);
		if(newLimitAmount != null){
			
			var path = "models/cards/" + cardId + "/card-limit.json";
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				response.amount = Number(newLimitAmount);
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
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


var blockCard = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json"
		//var path = "models/cards/" + cardId + "/blocking.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("remove on index "+i);
					response[i].lockingIndicator = true; // Tim is now removed from "beneficiaries"
				}
			  }
			fs.writeFileSync(path,JSON.stringify(response),"utf8");
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

var lockCard = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("lock on index "+i);
					cards[i].lockingIndicator = false; 
				}
			  }
			fs.writeFileSync(path,JSON.stringify(cards),"utf8");
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

var unlockCard = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("unlock on index "+i);
					cards[i].lockingIndicator = true; 
				}
			  }
			fs.writeFileSync(path,JSON.stringify(cards),"utf8");
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

var activateContactless = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("activate on index "+i);
					cards[i].contactlessChipIndicator = true; 
				}
			  }
			fs.writeFileSync(path,JSON.stringify(cards),"utf8");
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

var deactivateContactless = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("deactivate on index "+i);
					cards[i].contactlessChipIndicator = false; 
				}
			  }
			fs.writeFileSync(path,JSON.stringify(cards),"utf8");
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

var requestNewPIN = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		
		if (cardId != undefined) {
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

var reportLossOrTheft = function (req, res) {
	if (req.headers['token'] === token.token) {
		var cardId = req.params['cardId'];
		var path = "models/cards/cards.json";
		if (fs.existsSync(path)) {
			var cards = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, card] of cards.entries()) {
				console.log("card index= "+i);
				if (card.cardId === cardId) {
					console.log("block on index "+i);
					cards[i].blockingIndicator = true; 
				}
			  }
			fs.writeFileSync(path,JSON.stringify(cards),"utf8");
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


exports.getCardsList = getCardsList;
exports.getCardAdvantages = getCardAdvantages;
exports.getCardsPlansList = getCardsPlansList;
exports.getCardPlanById = getCardPlanById;
exports.getCardById = getCardById;
exports.getCardTransactions = getCardTransactions;
exports.getCardLimit = getCardLimit;
exports.changeCardLimit = changeCardLimit;
exports.blockCard = blockCard;
exports.lockCard = lockCard;
exports.unlockCard = unlockCard;
exports.activateContactless = activateContactless;
exports.deactivateContactless = deactivateContactless;
exports.reportLossOrTheft = reportLossOrTheft;
exports.requestNewPIN = requestNewPIN;