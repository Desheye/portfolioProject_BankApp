//server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
const path = require('path');
const morgan = require('morgan');

const routes = require('./routes/routes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React app
}));
app.use(morgan('common'));

// Initialize Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL // Use environment variable to define Redis URL
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis server
redisClient.connect().then(() => {
  console.log('Connected to Redis');
});

// Example to test Redis connection
redisClient.ping().then((response) => {
  console.log('Redis server ping response:', response);
});

// Make Redis client available throughout the app
app.use((req, res, next) => {
  req.redis = redisClient; // Attach Redis client to request object
  next();
});

// MongoDB connection
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connection successful');
    console.log('Connected to database:', mongoose.connection.name);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serving static files from 'public/uploads'

// Routes
app.use('/api', routes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
