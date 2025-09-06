const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('User Management API is running 🚀');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
