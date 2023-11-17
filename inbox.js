var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getAllMessages = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/inbox/messages/messages.json"
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

var getAllNotifications = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/inbox/notifications/notifications.json"
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

var deleteNotification = function (req, res) {
	if (req.headers['token'] === token.token) {
		const id = req.params['id'];
		const path = "models/inbox/notifications/notifications.json"
		if (fs.existsSync(path)) {
			var notifications = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, notif] of notifications.entries()) {
				console.log("notif index= "+i);
				if (notif.id === id) {
					console.log("delete on index "+i);
					notifications.splice(i, 1);
				}
			  }
			fs.writeFileSync(path,JSON.stringify(notifications),"utf8");
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

var deleteMessage = function (req, res) {
	if (req.headers['token'] === token.token) {
		const id = req.params['id'];
		const path = "models/inbox/messages/messages.json"
		if (fs.existsSync(path)) {
			var messages = JSON.parse(fs.readFileSync(path, "utf8"));
			for (let [i, msg] of messages.entries()) {
				console.log("message index= "+i);
				if (msg.id === id) {
					console.log("message on index "+i);
					messages.splice(i, 1);
				}
			  }
			fs.writeFileSync(path,JSON.stringify(messages),"utf8");
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


var sendMessage = function (req, res) {
	if(req.headers['token'] == token.token){
		console.log(req.body);
		var receiver = req.body.receiver;
		var subject = req.body.subject;
		var message = req.body.message;

		if(receiver != null&&subject!=null&&message !=  null){
			//send Message				 
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



exports.getAllMessages = getAllMessages;
exports.getAllNotifications = getAllNotifications;
exports.sendMessage = sendMessage;
exports.deleteNotification = deleteNotification;
exports.deleteMessage = deleteMessage;

