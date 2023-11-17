var fs = require("fs");
var utils = require("./utils")
var token = require("./generate-token")

const nodemailer  = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const createTransporter = async () => {
	const oauth2Client = new OAuth2(
	  process.env.CLIENT_ID,
	  process.env.CLIENT_SECRET,
	  "https://developers.google.com/oauthplayground"
	);
  
	oauth2Client.setCredentials({
	  refresh_token: process.env.REFRESH_TOKEN
	});
  
	const accessToken = await new Promise((resolve, reject) => {
	  oauth2Client.getAccessToken((err, token) => {
		if (err) {
		  reject();
		}
		resolve(token);
	  });
	});
  
	const transporter = nodemailer.createTransport({
	  service: "gmail",
	  auth: {
		type: "OAuth2",
		user: process.env.EMAIL,
		accessToken,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN
	  }
	});
  
	return transporter;
};

//emailOptions - who sends what to whom
const sendEmail = async (emailOptions) => {
	let emailTransporter = await createTransporter();
	await emailTransporter.sendMail(emailOptions);
  };

var authenticate = function (req, res) {
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var path = "models/authentication/"+username+"-"+password+".json";
	if (fs.existsSync(path)) {
		var response = JSON.parse(fs.readFileSync(path, "utf8"));
		var mToken = token.token;
		res.json({
			"token" : mToken
		});
		res.statusCode = 200;
	} else {
		res.statusCode = 200;
		res.json({
			"error": "auth-0001",
    		"message": "Incorrect username and password",
    		"detail": "Ensure that the username and password included in the request are correct"
		});
	}
	
	utils.handleResultStatus(res);
	res.end();

};

var sendOtpMail = function (req, res) {
	console.log(req.body);
	var accountNumber = req.query.accountNumber;
	var path = "models/authentication/accounts/"+accountNumber+".json";
	if (fs.existsSync(path)) {
		var response = JSON.parse(fs.readFileSync(path, "utf8"));
		const otp =  utils.getRandomInt(999999).toString();
		var mailOptions = {
			from: 'vneuron.banking@gmail.com',
			to: response.email,
			subject: 'OTP Vneuron Mobile Banking',
			text: 'Use the following OTP code to procceed: '+otp
		  };
		console.log(mailOptions);
		sendEmail(mailOptions);
		res.json(Number(otp))
		res.statusCode = 200;
	} else {
		res.statusCode = 404;
	}
	
	utils.handleResultStatus(res);
	res.end();

};


exports.authenticate = authenticate;
exports.sendOtpMail = sendOtpMail;
