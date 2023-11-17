// ==============================================
// IMPORTS
// ==============================================
var express = require("express");
var cors = require("cors");
const path = require('path');

const dotenv = require('dotenv');
  
dotenv.config();


//**********
var generateToken = require("./generate-token");
var authentication = require("./authentication");
var accountsList = require("./accounts");
var cardsList = require("./cards");
var beneficiaries = require("./beneficiaries");
var transfer = require("./transfer");
var budget = require("./budget");
var credits = require("./credits");
var inbox = require("./inbox");
var savings = require("./savings");
var geolocation = require("./geolocation");
var contact = require("./contact");
var currencyRate = require("./currency-rate");
var documents = require("./documents");
var settings = require("./settings");
var payments = require("./payments");
var cheques = require("./cheques");
var loyaltyProgram = require("./loyalty-program");




//******/

// ==============================================
// REST SERVER SETUP
// ==============================================
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = 9997 //process.env.port;
var router = express.Router();

// ==============================================
// API ENDPOINTS
// ==============================================

//****************************************************************************************** */

// Generate Token
router.get("/v1/token", generateToken.getToken);
// authentication
router.post("/v1/authenticate", authentication.authenticate);
router.post("/v1/create-account", authentication.sendOtpMail);

// accounts List
router.get("/v1/accounts", accountsList.getAccountsList);
router.get("/v1/accounts/:accountId", accountsList.getAccountById);
router.get("/v1/accounts/:accountId/transactions", accountsList.getAccountTransactions);
router.get("/v1/accounts/:accountId/operational-limits", accountsList.getOperationalLimits);
router.get("/v1/accounts/:accountId/transactions/digital-export", accountsList.exportTransactionByPeriod);

// cards List
router.get("/v1/cards", cardsList.getCardsList);
router.get("/v1/cards-plans", cardsList.getCardsPlansList);
router.get("/v1/cards-plans/:cardPlanId", cardsList.getCardPlanById);
router.get("/v1/cards/:cardId", cardsList.getCardById);
router.get("/v1/cards/:cardId/advantages", cardsList.getCardAdvantages);
router.post("/v1/cards/:cardId/blocking", cardsList.blockCard);
router.post("/v1/cards/:cardId/locking-activation", cardsList.lockCard);
router.post("/v1/cards/:cardId/locking-deactivation", cardsList.unlockCard);
router.post("/v1/cards/:cardId/contactless-activation", cardsList.activateContactless);
router.post("/v1/cards/:cardId/contactless-deactivation", cardsList.deactivateContactless);
router.get("/v1/cards/:cardId/transactions", cardsList.getCardTransactions);
router.get("/v1/cards/:cardId/limit", cardsList.getCardLimit);
router.get("/v1/cards/:cardId/change-limit", cardsList.changeCardLimit);
router.get("/v1/cards/:cardId/report-loss", cardsList.reportLossOrTheft);
router.get("/v1/cards/:cardId/request-pin", cardsList.requestNewPIN);

//Beneficaries
router.get("/v1/beneficiaries", beneficiaries.getBeneficiaries);
router.delete("/v1/beneficiaries/:id", beneficiaries.deleteBeneficiary);
router.post("/v1/beneficiaries/create", beneficiaries.createBeneficiary);


//transfer
router.get("/v1/transfer/transfer-history", transfer.getTransferHistory);
router.post("/v1/transfer/transfer-account", transfer.transferAccount);
router.post("/v1/transfer/transfer-bank", transfer.transferAnotherBank);
router.post("/v1/transfer/transfer-international", transfer.transferInternational);
router.get("/v1/transfer/transfer-history/:transactionId/download-receipt", transfer.downloadTransferReceipt);

//payments
router.get("/v1/payments/history", payments.getPaymentsHistory);
router.post("/v1/payments/mobile-communication/direct-transfer", payments.phoneDirectTransfer);
router.get("/v1/payments/public-utilities/water-bills", payments.getWaterBills);
router.get("/v1/payments/public-utilities/electricity-bills", payments.getElectricityBills);
router.get("/v1/payments/tv-services", payments.getTvServices);
router.get("/v1/payments/internet-services", payments.getInternetServices);
router.get("/v1/payments/software-services", payments.getSoftwareServices);
router.get("/v1/payments/telephony-services", payments.getTelephonyServices);
router.post("/v1/payments/pay-bill", payments.payBill);
router.post("/v1/payments/pay-internet", payments.payInternet);
router.post("/v1/payments/pay-tv", payments.payTvService);
router.post("/v1/payments/pay-software", payments.paySoftwareService);
router.post("/v1/payments/pay-telephony", payments.payTelephonyVoipService);



//budget
router.get("/v1/budget/budget-resume/:accountId", budget.getBudgetResume);
router.post("/v1/budget/new-budget", budget.saveNewBudget);

//credits
router.get("/v1/credits/deals", credits.getDeals);
router.get("/v1/credits/deals/:categoryId", credits.getDealByCategory);
router.get("/v1/credits/deals/:categoryId/apply", credits.applyForDeal);
router.get("/v1/credits/active-credits", credits.getActiveCredits);
router.get("/v1/credits/applications", credits.getCreditsApplication);
router.get("/v1/credits/credit-resume", credits.getCreditResume);
router.get("/v1/credits/credit-score", credits.getCreditScore);
router.get("/v1/credits/active-credits/:activeCreditId", credits.getActiveCreditById);
router.get("/v1/credits/loan-categories/:loanCategoryId", credits.getLoanCategoryDetailsById);
router.post("/v1/credits/simulate-loan", credits.simulateCredit);
router.post("/v1/credits/apply-for-loan", credits.applyForLoan);

//inbox
router.get("/v1/inbox/messages", inbox.getAllMessages);
router.post("/v1/inbox/send-message", inbox.sendMessage);
router.get("/v1/inbox/notifications", inbox.getAllNotifications);
router.delete("/v1/inbox/notifications/:id", inbox.deleteNotification);
router.delete("/v1/inbox/messages/:id", inbox.deleteMessage);



//savings
router.get("/v1/savings/savings-details", savings.getSavingsDetails);
router.get("/v1/savings/savings-accounts", savings.getSavingsAccounts);
router.get("/v1/savings/saving-account-resume", savings.getSavingAccountResume);
router.get("/v1/savings/savings-accounts/:accountId/operations", savings.getAccountOperations);
router.get("/v1/savings/savings-accounts/:accountId", savings.getSavingsAccountById);
router.post("/v1/savings/simulate-savings", savings.simulateSavingsAccount);
router.post("/v1/savings/savings-account-application", savings.submitSavingsAccountApplication);
router.get("/v1/savings/applications", savings.getSavingsAccountsApplications);
router.post("/v1/savings/deposit", savings.depositToAccount);
router.post("/v1/savings/withdraw", savings.withdrawFromSavingAccount);



//geolocation
router.post("/v1/geolocation/locations", geolocation.getLocations);

//contact
router.post("/v1/contact/request-appointment", contact.requestAppointment);
router.post("/v1/contact/send-complaint", contact.sendComplaint);
router.get("/v1/contact/advisor-info", contact.getAdvisorInfo);
router.post("/v1/contact/contact-us", contact.contactUs);


//currency-rate
router.get("/v1/currency-rate/historical", currencyRate.getRateHistorical);
router.get("/v1/currency-rate/currencies", currencyRate.getCurrencies);
router.get("/v1/currency-rate/convert", currencyRate.convertCurrency);
router.get("/v1/currency-rate/fetch-one", currencyRate.fetchCurrencyRate);

//documents
router.get("/v1/documents/statements/:statementId", documents.downloadStatement);
router.get("/v1/documents/statements", documents.getStatements);
router.get("/v1/documents/loans", documents.getLoans);
router.get("/v1/documents/loans/:fileName", documents.downloadLoan);
router.get("/v1/documents/insurances", documents.getInsurances);
router.get("/v1/documents/insurances/:fileName", documents.downloadInsurance);

//cheques
router.get("/v1/cheques/cheques-info", cheques.getChequesInfo);
router.get("/v1/cheques/operations", cheques.getChequesOperations);
router.get("/v1/cheques/cities", cheques.getAllCities);
router.get("/v1/cheques/agencies", cheques.getAgenciesByCity);
router.post("/v1/cheques/send-emergency", cheques.sendEmergencyIssue);
router.post("/v1/cheques/order-checkbook", cheques.orderCheckbook);
router.get("/v1/cheques/orders-history", cheques.getChequebookOrdersHistory);


// Loyalty program
router.get("/v1/loyalty-program/score", loyaltyProgram.getScore);
router.get("/v1/loyalty-program/points", loyaltyProgram.getAvailablePoints);
router.get("/v1/loyalty-program/weekly-deals", loyaltyProgram.getWeeklyDeals);
router.get("/v1/loyalty-program/weekly-offers", loyaltyProgram.getWeeklyOffers);
router.get("/v1/loyalty-program/redeems", loyaltyProgram.getRedeems);
router.get("/v1/loyalty-program/redeems/redeem-coupon", loyaltyProgram.redeemCoupon);
router.get("/v1/loyalty-program/available-coupons", loyaltyProgram.getAvailableCoupons);
router.get("/v1/loyalty-program/badges", loyaltyProgram.getBadges);
router.post("/v1/loyalty-program/transfer", loyaltyProgram.transferPoints);


// settings
router.get("/v1/settings/personal-info", settings.getPersonalInfo);
router.get("/v1/settings/notifications", settings.getNotificationsSettings);
router.post("/v1/settings/notifications", settings.setNotificationsSettings);
router.get("/v1/settings/user-qr", settings.getUserQrDetails);
router.post("/v1/settings/change-password", settings.changePassword);
router.post("/v1/settings/change-email", settings.changeEmail);
router.post("/v1/settings/upload-document", settings.uploadDocument);
router.post("/v1/settings/update-info", settings.updatePersonalInfo);


//****************************************************************************************** */


// ==============================================
// START THE SERVER
// ==============================================
app.use(express.json());
app.use("/banking-rest/api", router);
app.listen(process.env.PORT || 5000);
app.get('/',(req,res)=>{
    res.send("welcome on board!!");
});

app.get('/test',(req,res)=>{
    res.sendFile(path.normalize(__dirname+'/models/cheques/cheques-info.json'))
});
console.log("###############################################");
console.log("bt-server listening on port " + port);
console.log("");
