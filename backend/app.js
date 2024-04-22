const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
require('dotenv').config();
require('./config/db');

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.use((req, res, next) => {
  console.log('Middleware function to verify JWT token');
  next();
  console.log('After next()');
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
