//server/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { getRecipientName, getLatestTransaction} = require('../controllers/transactionController');

// Route for fetching recipient name based on account number
//router.get('/recipient-name/:accountNumber', transactionController.getRecipientName);

// Define the recipient name route
router.get('/get-recipient/:accountNumber', getRecipientName);
// Route for submitting a transaction
router.post('/submit-transaction', transactionController.processTransaction);

// Define the route for fetching the latest transaction
router.get('/transaction', getLatestTransaction); // Use the controller function

module.exports = router;
