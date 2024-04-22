const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config/jwt');
const User = require('../models/User');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ 'contact_info.email': email });
    if (!user || !(await bcrypt.compare(password, user.auth_info.password))) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });
    const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    res.json({ token, expiresIn });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
