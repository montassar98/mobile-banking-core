var crypto = require('crypto');
var token = crypto.randomBytes(48).toString('hex');
var getToken = function(req, res) {
	res.json({token: token});
	res.end();
};



exports.getToken = getToken;
exports.token = token;
