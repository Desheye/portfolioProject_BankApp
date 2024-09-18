//server/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { getRecipientName } = require('../controllers/transactionController');

// Route for fetching recipient name based on account number
//router.get('/recipient-name/:accountNumber', transactionController.getRecipientName);

// Define the recipient name route
router.get('/get-recipient/:accountNumber', getRecipientName);
// Route for submitting a transaction
router.post('/submit-transaction', transactionController.processTransaction);

module.exports = router;
