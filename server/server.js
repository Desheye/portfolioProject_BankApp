require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
// Import and use routes
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connection successful');
    console.log('Connected to database:', mongoose.connection.name);
  })
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
