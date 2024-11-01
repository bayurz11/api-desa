// models/UserRole.js
const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    trim: true // Menghapus spasi di awal dan akhir
  },
  description: {
    type: String,
    trim: true // Menghapus spasi di awal dan akhir
  }
}, { timestamps: true }); // Menambahkan createdAt dan updatedAt

const UserRole = mongoose.model('UserRole', userRoleSchema);
module.exports = UserRole;
