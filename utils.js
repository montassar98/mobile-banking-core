var faker = require('faker');
var dayjs = require('dayjs');
var crypto = require('crypto');

var startsWith = (string, start) => {
	string = string.toUpperCase();
	start = start.toUpperCase();
	let tmp = string.substr(0, start.length);
	return tmp === start;
};

exports.startsWith = startsWith;
const ContractStatus = {
	NEGOTIATION_STARTED: 'NEGOTIATION_STARTED',
	NEGOTIATION_FINISHED: 'NEGOTIATION_FINISHED'
}
exports.ContractStatus = ContractStatus;

const OperationType = {
	WARRANTY_MODIFICATION: 'WARRANTY_MODIFICATION',
	DIMINUTION: 'DIMINUTION',
	CHANGE_GUARANTEES: 'CHANGE_GUARANTEES',
	SGB_PARTIAL_TOTAL_EXECUTION: 'SGB_PARTIAL_TOTAL_EXECUTION'
}
exports.OperationType = OperationType;

const ProcessCategory = {
	STANDARD_PROCESS: 'STANDARD_PROCESS ',
	SIMPLIFIED_NEGOTIATION_PROCESS: 'SIMPLIFIED_NEGOTIATION_PROCESS',
	STANDARD_NEGOTIATION_PROCESS: 'STANDARD_NEGOTIATION_PROCESS'
}
exports.ProcessCategory = ProcessCategory;

const StepStatus = {
	COMPLETED: 'COMPLETED',
	IN_PROGRESS: 'IN_PROGRESS',
	TO_COMPLETE: 'TO_COMPLETE',
}
exports.StepStatus = StepStatus;

var contractStatusKeys = Object.keys(ContractStatus);
var operationTypeKeys = Object.keys(OperationType);

var getValueFromObject = (o, a) => {
	let indexOfPoint = a.indexOf('.');
	return (indexOfPoint === -1) ? o[a] : getValueFromObject(o[a.substring(0, indexOfPoint)], a.substring(indexOfPoint+1));
};

exports.Contract = (i) => {
	return {
		id: i,
		contractNumber: "" + faker.datatype.number(),
		contractStatus: ContractStatus[contractStatusKeys[Math.floor(Math.random() * contractStatusKeys.length)]],
		productCode: faker.commerce.product(),
		productName: faker.commerce.productName(),
		operationType: OperationType[operationTypeKeys[Math.floor(Math.random() * operationTypeKeys.length)]],
		facilityValue: "" + faker.datatype.number(),
		unitPosting: "0" + Math.floor(Math.random() * 99).toString() + " – " + faker.name.findName(),
		branch: "test",
		lastModifiedDate: "2021-07-05T09:54:40+0100",
		estimatedDuration: "2h 30m",
		contractSigningDate: "2021-10-14T09:57:21+0100"
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

  

exports.Product = (i) => {
	return {
		id: i,
		productIdFile: "" + crypto.randomBytes(8).toString('hex')
	}
}

function handleResultStatus(res){
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
			res.statusMessage = "not found";
			res.json({
				status: res.statusCode,
				error: "not found"
			});
			break;
		}
		case 500: {
			res.statusMessage = "generic error";
			res.json({
				status: res.statusCode,
				error: "generic error"
			});
			break;
		}
	}
}

exports.handleResultStatus = handleResultStatus;

exports.getValueFromObject = getValueFromObject;
exports.getRandomInt = getRandomInt;