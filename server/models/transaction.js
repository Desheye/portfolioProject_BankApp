//server/models/transaction.js
const mongoose = require('mongoose');

// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
  senderAccountNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Validate 10-digit number
      },
      message: props => `${props.value} is not a valid sender account number!`
    }
  },
  recipientAccountNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Validate 10-digit number
      },
      message: props => `${props.value} is not a valid recipient account number!`
    }
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: props => `${props.value} is not a valid transaction amount!`
    }
  },
  currency: {
    type: String,
    required: true,
    default: 'NGR'
  },
  transferMethod: {
    type: String,
    required: true,
    enum: ['instant', 'scheduled', 'international']
  },
  memo: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
transactionSchema.index({ senderAccountNumber: 1 });
transactionSchema.index({ recipientAccountNumber: 1 });
transactionSchema.index({ status: 1 });

// Add a method to update the status of a transaction
transactionSchema.methods.updateStatus = async function(newStatus) {
  console.debug(`Updating transaction status from ${this.status} to ${newStatus}`);
  try {
    this.status = newStatus;
    await this.save();
    console.debug('Transaction status updated successfully');
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};

// Compile the model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
