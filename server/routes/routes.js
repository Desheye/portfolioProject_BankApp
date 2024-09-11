const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/User'); // Import the User model
const { generatePIN, generateAccountNumber } = require('../utils/accountUtils');
const { rateLimit } = require('../middleware/rateLimit'); // Moved rate limit to middleware
const { getUserDataFromCache, cacheUserData } = require('../redisServer/redisServer');
const router = express.Router();

// Sample routes
router.get('/', (req, res) => {
  console.log('GET / hit');
  res.send('What It Do, Bruah!');
});

router.get('/signup', (req, res) => {
  console.log('GET /signup hit');
  res.send('Sign Up Or Sign Out!');
});

// Sign-up Route
router.post('/signup', async (req, res) => {
  console.log('POST /signup hit');
  const { email, password, fullname, tel } = req.body;
  if (!email || !password || !fullname || !tel) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
      tel,
      pin: generatePIN(),
      accountNumber: generateAccountNumber(),
      balance: 0
    });
    await newUser.save();
    console.log('User created successfully');
    res.status(201).json({
      message: 'User created successfully',
      user: { fullname: newUser.fullname, email: newUser.email, tel: newUser.tel }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch user data with Redis caching
router.post('/get-user-data', async (req, res) => {
  console.log('POST /get-user-data hit');
  const { type, value, email } = req.body;
  const cacheKey = type === 'pin' ? `user:pin:${value}` : `user:email:${email}`;

  try {
    // Check cache first
    const cachedData = await getUserDataFromCache(cacheKey, req.redis);
    if (cachedData) {
      console.log('Cached data found');
      return res.json(cachedData);
    }

    // Retrieve user from MongoDB
    let user;
    if (type === 'pin') {
      user = await User.findOne({ pin: value });
    } else if (type === 'password') {
      user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(value, user.password))) {
        console.log('Invalid credentials');
        return res.status(404).json({ error: 'Invalid credentials' });
      }
    }

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const responseData = {
      fullname: user.fullname,
      accountNumber: user.accountNumber,
      balance: user.balance
    };

    // Cache the user data
    await cacheUserData(cacheKey, responseData, req.redis);
    console.log('User data cached and returned');
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify credentials (PIN or password)
router.post('/verify', rateLimit, async (req, res) => {
  console.log('POST /verify hit');
  const { type, value, email } = req.body;
  if (!type || !value || (!email && type === 'password')) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let user;
    if (type === 'pin') {
      user = await User.findOne({ pin: value });
    } else if (type === 'password') {
      user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(value, user.password))) {
        console.log('Invalid credentials');
        return res.status(404).json({ error: 'Invalid credentials' });
      }
    }

    console.log('Credentials verified');
    res.json({ isValid: !!user });
  } catch (error) {
    console.error('Error verifying credentials:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;