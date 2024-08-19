const express = require('express');
const cors = require('cors');
const path = require('path');
const roomRoutes = require('./routes/rooms');

const app = express();

console.log('Server starting...');

// Enable CORS for the specific frontend URL
app.use(cors({
  origin: 'https://cinemadb-iotl.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log('CORS enabled for https://cinemadb-iotl.onrender.com');

app.use(express.json());

// Debug middleware for all requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

// Use room routes
app.use('/api', roomRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Debug log for image requests
app.use('/uploads', (req, res, next) => {
  console.log(`Received request for image: ${req.url}`);
  console.log('Image request headers:', req.headers);
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Add a test route to check if the server is responding
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Server is running and accessible' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  res.status(500).json({ error: 'An internal server error occurred' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
