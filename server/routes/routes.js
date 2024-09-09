// server/routes/routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const { generatePIN, generateAccountNumber } = require('../Utils/accountUtils');

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

// API endpoint to handle sign up
router.post('/signup', async (req, res) => {
  console.log('Received a request to /api/signup');
  console.log('Request body:', req.body);

  // Input validation
  if (!req.body.email || !req.body.password || !req.body.fullname || !req.body.tel) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      pin: generatePIN(),
      accountNumber: generateAccountNumber()
    });
    await newUser.save();
    console.log('User saved to database:', newUser);
    res.status(201).send({
      message: 'User created successfully',
      user: {
        fullname: newUser.fullname,
        email: newUser.email,
        tel: newUser.tel
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send({ error: 'Error creating user' });
  }
});

// Route to fetch user data based on PIN or password
router.post('/get-user-data', async (req, res) => {
  const { type, value } = req.body;

  // Input validation
  if (!type || !value) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    let user;

    if (type === 'pin') {
      user = await User.findOne({ pin: value });
    } else if (type === 'password') {
      user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ error: 'User not found' });
      const isMatch = await bcrypt.compare(value, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid password' });
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return only the required fields
    res.json({
      fullname: user.fullname,
      accountNumber: user.accountNumber,
      balance: user.balance
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to verify credentials (PIN or password)
router.post('/verify', async (req, res) => {
  const { type, value, email } = req.body;

  // Input validation
  if (!type || !value || (!email && type === 'password')) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    let user;
    if (type === 'pin') {
      user = await User.findOne({ pin: value });
    } else if (type === 'password') {
      user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });
      const isMatch = await bcrypt.compare(value, user.password);
      if (!isMatch) user = null;
    }

    res.json({ isValid: !!user });
  } catch (error) {
    console.error('Error verifying credentials:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;