// server/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * Route to fetch recipient name based on account number.
 * @param {string} accountNumber - The account number of the recipient.
 * @returns {Object} - The recipient's name if found.
 */
router.get('/recipient-name/:accountNumber', async (req, res) => {
  console.log('Recipient Route Hit');
  try {
    const { accountNumber } = req.params;
    console.debug(`Searching for recipient with account number: ${accountNumber}`);
    const user = await User.findOne({ accountNumber });
    if (user) {
      console.debug('Recipient found:', user.fullname);
      res.json(user.fullname);
    } else {
      console.debug('Recipient not found');
      res.status(404).json({ message: 'Recipient not found' });
    }
  } catch (error) {
    console.error('Error fetching recipient name:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Route to submit a transaction.
 * @param {Object} transactionDetails - Details of the transaction to be processed.
 * @returns {Object} - A success message if transaction is processed.
 */
router.post('/submit-transaction', async (req, res) => {
  console.log('Submit Route Hit');
  try {
    const transactionDetails = req.body;
    console.debug('Processing transaction with details:', transactionDetails);
    // Add your transaction processing logic here, e.g., updating balances
    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;