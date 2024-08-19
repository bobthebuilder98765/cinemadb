const express = require('express');
const cors = require('cors');
const roomRoutes = require('./routes/rooms');

const app = express();

// Enable CORS for the specific frontend URL
app.use(cors({
  origin: 'https://cinemadb-iotl.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', roomRoutes);
app.use('/uploads', express.static('uploads'));

// Remove the production check and static file serving since frontend is separate

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
