//routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); 
const router = express.Router();
const { signup } = require('../controllers/userController');
const { User } = require('../models/User'); 
const logger = require('../utils/logger'); // Import the logger

// POST /signup - Register a new user
router.post('/signup', signup);

// POST /check-user - Check if a user exists
router.post('/check-user', async (req, res) => {
  const { type, inputValue } = req.body;

  try {
    let user;
    if (type === 'PIN') {
      user = await User.findOne({ pin: inputValue });
    } else if (type === 'Password') {
      user = await User.findOne({ password: inputValue });
    }

    if (user) {
      logger.info(`User found for type ${type}: ${inputValue}`);
      res.json({ success: true, user });
    } else {
      logger.info(`User not found for type ${type}: ${inputValue}`);
      res.json({ success: false });
    }
  } catch (error) {
    logger.error(`Error checking user: ${error.message}`);
    res.status(500).json({ error: 'Error checking user' });
  }
});


// POST /login - Authenticate user using PIN or Password
router.post('/login', async (req, res) => {
  const { pin, password } = req.body;

  // Ensure that either pin or password is provided
  if (!pin && !password) {
    logger.warn('Login attempt failed: No PIN or Password provided');
    return res.status(400).json({ error: 'Please provide either PIN or Password' });
  }

  try {
    let user;

    // If PIN is provided, find user by PIN
    if (pin) {
      logger.info(`Login attempt using PIN: ${pin}`);
      user = await User.findOne({ pin });

      // If user is not found, return an error
      if (!user) {
        logger.warn(`User not found for PIN: ${pin}`);
        return res.status(404).json({ error: 'User not found' });
      }
    }

    // If password is provided, find user by password (assuming a unique password per user)
    if (password) {
      logger.info(`Login attempt using Password`);
      user = await User.findOne({ password: bcrypt.hashSync(password) }); // This assumes password is stored as a hash

      if (!user) {
        logger.warn('User not found for the provided password');
        return res.status(404).json({ error: 'User not found' });
      }
    }

    // If user is found, return user details
    logger.info('Login successful');
    res.status(200).json({
      message: 'Login successful',
      user: {
        fullname: user.fullname,
        email: user.email,
        tel: user.tel,
        pin: user.pin,
        accountNumber: user.accountNumber,
        currentBalance: user.currentBalance,
        image: user.image,
      },
    });
  } catch (err) {
    logger.error(`Error logging in user: ${err.message}`);
    res.status(500).json({ error: 'Error logging in user' });
  }
});


module.exports = router;