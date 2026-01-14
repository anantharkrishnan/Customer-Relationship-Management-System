const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const { connectDatabase } = require('./config/db');
const path = require('path');

dotenv.config();
connectDatabase();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// API routes 
app.use('/api', router);

// Test route
app.get('/', (req, res) => res.send('Hello World!'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    );
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server Error',
    error: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
