var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils");
const { param } = require("express/lib/request");

var getPersonalInfo = function(req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/settings/personal-info.json"
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
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


var getNotificationsSettings = function(req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/settings/notifications.json"
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
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

var setNotificationsSettings = function(req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/settings/notifications.json"

		var allowNotifications = req.body.allowNotifications;
		var noDayRestrictions = req.body.noDayRestrictions;
		var daysOfTheWeek = req.body.daysOfTheWeek;
		var paymentRequest = req.body.paymentRequest;

		var transferNotifications = req.body.transferNotifications;
		var incomeNotifications = req.body.incomeNotifications;
		var hasDebtorTransaction = req.body.hasDebtorTransaction;
		var debtorTransactionExceeds = req.body.debtorTransactionExceeds;
		var hasCreditTransaction = req.body.hasCreditTransaction;
		var creditTransactionExceeds = req.body.creditTransactionExceeds;

		var chequesApproval = req.body.chequesApproval;
		var chequesRejection = req.body.chequesRejection;
		var chequesUnpaid = req.body.chequesUnpaid;

		var inboxMessages = req.body.inboxMessages;
		var chatMessages = req.body.chatMessages;
		var chatRequests = req.body.chatRequests;


		console.log("allow notifications "+allowNotifications);
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			response.allowNotifications = allowNotifications;
			response.noDayRestrictions = noDayRestrictions;
			response.daysOfTheWeek = daysOfTheWeek;
			response.paymentRequest = paymentRequest;

			response.transferNotifications = transferNotifications;
			response.incomeNotifications = incomeNotifications;
			response.hasDebtorTransaction = hasDebtorTransaction;
			response.debtorTransactionExceeds = debtorTransactionExceeds;
			response.hasCreditTransaction = hasCreditTransaction;
			response.creditTransactionExceeds = creditTransactionExceeds;

			response.chequesApproval = chequesApproval;
			response.chequesRejection = chequesRejection;
			response.chequesUnpaid = chequesUnpaid;
			
			response.inboxMessages = inboxMessages;
			response.chatMessages = chatMessages;
			response.chatRequests = chatRequests;
			fs.writeFileSync(path,JSON.stringify(response),"utf8");
			res.json({});
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

var getUserQrDetails = function(req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/settings/user-qr.json"
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			res.json(response);
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

var changePassword = function(req, res) {
	if (req.headers['token'] === token.token) {
		var username = req.body.username;
		var currentPassword = req.body.currentPassword;
		var newPassword = req.body.newPassword;
		var path = "models/authentication/"+username+"-"+currentPassword+".json";
		console.log("path: "+path);
		if (fs.existsSync(path)) {
			fs.unlinkSync(path);
			const user = { "password": newPassword, "username": username }; 
			const newPath = "models/authentication/"+username+"-"+newPassword+".json";
			fs.writeFileSync(newPath,JSON.stringify(user),"utf8");
			res.json({});
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

var changeEmail = function(req, res) {
	if (req.headers['token'] === token.token) {
		var currentEmail = req.body.currentEmail;
		var newEmail = req.body.newEmail;
		var path = "models/settings/personal-info.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			if(response.email == currentEmail){
				response.email = newEmail;
				fs.writeFileSync(path,JSON.stringify(response),"utf8");
				res.json({});
				res.statusCode = 200;
			}else{
				res.statusCode = 500;
			}
		} else {
			res.statusCode = 500;
		}
	} else {
		res.statusCode = 401;
	}
	utils.handleResultStatus(res);
	res.end();
};

var uploadDocument = function(req, res) {
	if (req.headers['token'] === token.token) {
		var documentType = req.body.documentType;
		var documentID = req.body.documentID;
		var attachedFile = req.body.attachedFile;
		var path = "models/settings/upload-document.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			const document = {
				"id": utils.getRandomInt(999),
				"documentType":documentType,
				"documentID":documentID,
				"attachedFile":attachedFile
			}
			response.unshift(document);
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

var updatePersonalInfo = function(req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/settings/update-info-requests.json";
		if (fs.existsSync(path)) {
			var response = JSON.parse(fs.readFileSync(path, "utf8"));
			response.unshift(req.body);
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


exports.getPersonalInfo = getPersonalInfo;
exports.getNotificationsSettings = getNotificationsSettings;
exports.setNotificationsSettings = setNotificationsSettings;
exports.getUserQrDetails = getUserQrDetails;
exports.changePassword = changePassword;
exports.changeEmail = changeEmail;
exports.uploadDocument = uploadDocument;
exports.updatePersonalInfo = updatePersonalInfo;