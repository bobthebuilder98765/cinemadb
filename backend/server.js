const express = require('express');
const cors = require('cors');
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
  next();
});

// Add debug logs to room routes
app.use('/api', (req, res, next) => {
  console.log('Entering /api route');
  next();
}, roomRoutes);

// Debug log for image requests
app.use('/uploads', (req, res, next) => {
  console.log(`Received request for image: ${req.url}`);
  next();
}, express.static('uploads'));

// Add a test route to check if the server is responding
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Server is running and accessible' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ error: 'An internal server error occurred' });
});
