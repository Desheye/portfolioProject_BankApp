// Models/User.js
const mongoose = require('mongoose'); // Importing Mongoose
const validator = require('validator'); // Import validator for data validation

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true }, // Full name is required
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: validator.isEmail, // Validate email format
      message: props => `${props.value} is not a valid email!`
    }
  },
  tel: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Validate phone number format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: { type: String, required: true }, // Password is required
  pin: { type: String, required: true }, // PIN is required
  accountNumber: { type: String, required: true, unique: true }, // Account number is required and must be unique
  currentBalance: { type: Number, required: true, default: 200000.00 } // Balance with a default value of 200,000.00
});

userSchema.index({ email: 1 }); // Index email field for faster querying

const User = mongoose.model('User', userSchema); // Creating the User model from the schema

module.exports = User; // Exporting the User model

// Function to generate a random PIN
const generatePIN = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit PIN
};
  
// Function to generate a random account number
const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generates a 10-digit account number
};
  
module.exports = {
  generatePIN,
  generateAccountNumber
};
