// server/controllers/transactionController.js
const { User } = require('../models/User');
const Transaction = require('../models/Transaction');


// Controller to process the transaction
const processTransaction = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Submit Transaction Route Hit');
  try {
    const {
      senderAccountNumber,
      recipientAccountNumber,
      fullname,
      amount,
      currency,
      transferMethod,
      memo
    } = req.body;

    console.log({
      senderAccountNumber,
      recipientAccountNumber,
      fullname,
      amount,
      currency,
      transferMethod,
      memo
    });

    if (!senderAccountNumber || !recipientAccountNumber || !fullname || !amount || !currency || !transferMethod) {
      console.debug('Missing required transaction details');
      return res.status(400).json({ message: 'Missing required transaction details' });
    }

    const recipient = await User.findOne({ accountNumber: recipientAccountNumber });
    if (!recipient) {
      console.debug('Recipient not found');
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const sender = await User.findOne({ accountNumber: senderAccountNumber });
    if (!sender) {
      console.debug('Sender not found');
      return res.status(404).json({ message: 'Sender not found' });
    }

    if (sender.currentBalance < amount) {
      console.debug('Insufficient balance');
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from sender and add to recipient balance
    sender.currentBalance -= amount;
    await sender.save();

    recipient.currentBalance += amount;
    await recipient.save();

    // Create transaction with full details for sender and recipient
    await Transaction.create({
      sender: {
        accountNumber: sender.accountNumber,
        fullname: sender.fullname
      },
      recipient: {
        accountNumber: recipient.accountNumber,
        fullname: recipient.fullname
      },
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

// Get latest transaction data
const getLatestTransaction = async (req, res) => {
  try {
    // Fetch the latest transaction (assuming sorting by createdAt)
    const transaction = await Transaction.findOne().sort({ createdAt: -1 }).select({
      'recipient.fullname': 1,
      'recipient.accountNumber': 1,
      transactionId: 1,
      sessionId: 1,
      createdAt: 1 // aliasing this to `transactionTime` on the frontend
    });
    
    if (!transaction) {
      return res.status(404).json({ message: 'No transaction found' });
    }

    // Return the transaction details in a simplified format
    res.json({
      recipientFullName: transaction.recipient.fullname,
      recipientAccountNumber: transaction.recipient.accountNumber,
      transactionId: transaction.transactionId,
      sessionId: transaction.sessionId,
      transactionTime: transaction.createdAt
    });
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Export the functions
module.exports = {
  getRecipientName,
  processTransaction,
  getLatestTransaction
};
