const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  type: { type: String, enum: ['ADMIN', 'USER'], required: true },
  status: { type: String, enum: ['ACTIVE', 'ONBOARD', 'INACTIVE'], required: true },
  basic_info: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
  },
  contact_info: {
    mobile_number: { type: String, required: true },
    email: { type: String, required: true },
  },
  auth_info: {
    password: { type: String, required: true },
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('auth_info.password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.auth_info.password, 10);
    this.auth_info.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
