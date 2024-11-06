// api/models/UserRole.js
const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const UserRole = mongoose.model('UserRole', userRoleSchema);
module.exports = UserRole;
