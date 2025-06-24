const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // so we can use variables from .env

const app = express();

// Middleware (tools the server uses)
app.use(cors());            // let frontend talk to backend
app.use(express.json());    // allow reading JSON in requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// Add our routes (we’ll write these next)
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));