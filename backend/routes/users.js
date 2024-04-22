const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');

router.post('/add', authMiddleware, async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { firstName, lastName, email, dateOfBirth, gender, mobileNumber } = req.body;
    if (!firstName || !lastName || !email || !dateOfBirth || !gender || !mobileNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = new User({
      type: 'USER',
      status: 'ONBOARD',
      basic_info: {
        first_name: firstName,
        last_name: lastName,
        dob: dateOfBirth,
        gender: gender,
      },
      contact_info: {
        mobile_number: mobileNumber,
        email: email,
      },
      auth_info: {
        password: 'tempPassword', 
      },
    });

    console.log('New user:', newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ type: 'USER' });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
