// server/controllers/transactionController.js
const { User } = require('../models/User');
const Transaction = require('../models/Transaction');


// Controller to process the transaction
const processTransaction = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Submit Transaction Route Hit');
  try {
    const {
      accountNumber,
      fullname, // Update to match the frontend
      amount,
      currency,
      transferMethod,
      memo
    } = req.body;

    console.log({
      accountNumber,
      fullname, // This should now correctly match with the frontend
      amount,
      currency,
      transferMethod,
      memo
    });

    if (!accountNumber || !fullname || !amount || !currency || !transferMethod) {
      console.debug('Missing required transaction details');
      return res.status(400).json({ message: 'Missing required transaction details' });
    }

    const recipient = await User.findOne({ accountNumber });
    if (!recipient) {
      console.debug('Recipient not found');
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const sender = await User.findOne({ accountNumber });
    if (!sender) {
      console.debug('Sender not found');
      return res.status(404).json({ message: 'Sender not found' });
    }

    if (sender.currentBalance < amount) {
      console.debug('Insufficient balance');
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.currentBalance -= amount;
    await sender.save();

    recipient.currentBalance += amount;
    await recipient.save();

    await Transaction.create({
      senderAccountNumber: sender.accountNumber,
      recipientAccountNumber: recipient.accountNumber,
      amount,
      currency,
      transferMethod,
      memo
    });

    console.debug('Transaction processed successfully');
    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller to fetch recipient name based on account number
const getRecipientName = async (req, res) => {
  console.log('Recipient Name Route Hit');
  try {
    const { accountNumber } = req.params;
    console.debug(`Searching for recipient with account number: ${accountNumber}`);

    // Find the user with the given account number
    const user = await User.findOne({ accountNumber });

    if (user) {
      console.debug('Recipient found:', user.fullname);
      res.json({ fullname: user.fullname });
    } else {
      console.debug('Recipient not found');
      res.status(404).json({ message: 'Recipient not found' });
    }
  } catch (error) {
    console.error('Error fetching recipient name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the functions
module.exports = {
  getRecipientName,
  processTransaction
};
