const express = require('express');
const cors = require('cors');
const path = require('path');
const roomRoutes = require('./routes/rooms');
const { sequelize } = require('./models/Room');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', roomRoutes);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => {
  console.error('Unable to sync database:', error);
});