const express = require('express');
const path = require('path');
const roomRoutes = require('./routes/rooms');

const app = express();

app.use(express.json());
app.use('/api', roomRoutes);
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 10000;  // Render uses PORT, fallback to 10000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
