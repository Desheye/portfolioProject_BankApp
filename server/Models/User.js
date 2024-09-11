// server/Models/User.js
const mongoose = require('mongoose'); // Importing Mongoose
const validator = require('validator'); // Import validator for data validation
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 3; // Validate fullname length
      },
      message: props => `${props.value} is not a valid fullname!`
    }
  },
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
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 8; // Validate password length
      },
      message: props => `${props.value} is not a valid password!`
    }
  },
  image: {
    type: String, // URL or path to the image
    default: '', // Default image path or empty
  },
  pin: {
    type: String,
    required: true,
    unique: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  currentBalance: {
    type: Number,
    required: true,
    default: 200000.00
  }
});

userSchema.index({ email: 1 }); // Index email field for faster querying

// Hash password before saving
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema); // Creating the User model from the schema

// Function to generate a random PIN
const generatePIN = async () => {
  let pin;
  do {
    pin = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit PIN
  } while (await User.exists({ pin }));
  return pin;
};

// Function to generate a random account number
const generateAccountNumber = async () => {
  let accountNumber;
  do {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generates a 10-digit account number
  } while (await User.exists({ accountNumber }));
  return accountNumber;
};

module.exports = { User, generatePIN, generateAccountNumber };