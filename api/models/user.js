// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// models/UserRole.js
const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  role: { type: String, unique: true }
});

const UserRole = mongoose.model('UserRole', userRoleSchema);
module.exports = UserRole;
