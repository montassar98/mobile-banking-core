var fs = require("fs");
var faker = require('faker');

var token = require("./generate-token")
var utils = require("./utils")

var getBeneficiaries = function (req, res) {
	if (req.headers['token'] === token.token) {
		var path = "models/beneficiaries/beneficiaries.json"
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

var createBeneficiary = function (req, res) {
	if(req.headers['token'] == token.token){
		console.log(req.body);
		var iban = req.body.iban;
		var name = req.body.name;
		var email = req.body.email;
		var phone = req.body.phone;
		var tag = req.body.tag;

		if(iban != null&&name!=null&&email !=  null
			&& phone != null && tag != null){
			//create the beneficiary				 
			var path = "models/beneficiaries/beneficiaries.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				const beneficiaryId ="ben"+ utils.getRandomInt(99);
				const id = "87562298675"+utils.getRandomInt(999);
				const beneficiary = {
					"accountId": iban,
					"beneficiaryId" :beneficiaryId ,
					"name":name,
					"reference":email,
					"imageURL":"",
					"id":id,
					"phoneNumber":phone,
					"tag":tag
				};
				response.unshift(beneficiary);
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

var deleteBeneficiary = function (req, res) {
	if(req.headers['token'] == token.token){
		console.log(req.query);
		var id = req.params['id'];

		if(id != undefined){
			//delete the beneficiary				 
			var path = "models/beneficiaries/beneficiaries.json"
			if (fs.existsSync(path)) {
				var response = JSON.parse(fs.readFileSync(path, "utf8"));
				for (let [i, bene] of response.entries()) {
					console.log("bene index= "+i);
					if (bene.beneficiaryId === id) {
						console.log("remove on index "+i);
						response.splice(i, 1); // Tim is now removed from "beneficiaries"
					}
				  }
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


exports.getBeneficiaries = getBeneficiaries;
exports.createBeneficiary = createBeneficiary;
exports.deleteBeneficiary = deleteBeneficiary;