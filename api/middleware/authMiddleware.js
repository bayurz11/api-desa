// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env

const JWT_SECRET = process.env.JWT_SECRET; // Mengambil JWT_SECRET dari environment variable

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Akses ditolak, token tidak ditemukan!'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'error',
        message: 'Token tidak valid!'
      });
    }

    req.user = user; // Menyimpan data pengguna yang telah diverifikasi ke dalam request
    next();
  });
};

module.exports = authenticateToken;
