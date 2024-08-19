const express = require('express');
const cors = require('cors');
const roomRoutes = require('./routes/rooms');
const path = require('path');
const { sequelize } = require('./models/Room');

const app = express();

console.log('Server starting...');

// Enable CORS for the specific frontend URL
app.use(cors({
  origin: 'https://cinemadb-iotl.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
console.log('CORS enabled for https://cinemadb-iotl.onrender.com');

// Middleware to parse JSON bodies
app.use(express.json());
console.log('JSON body parsing enabled');

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Middleware for /api routes with debug logs
app.use('/api', (req, res, next) => {
  console.log('Entering /api route');
  next();
}, roomRoutes);

// Middleware for /uploads with debug logs
app.use('/uploads', (req, res, next) => {
  console.log(`Received request for image: ${req.url}`);
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Test route for server health check
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Server is running and accessible' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Start server and connect to database
const PORT = process.env.PORT || 10000;

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(error => {
    console.error('Unable to sync database:', error);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
