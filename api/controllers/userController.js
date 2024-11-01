const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const UserRole = require('./api/models/UserRole'); 

// Fungsi untuk mendaftar pengguna
exports.registerUser = async (req, res) => {
    const { name, email, password, roleId } = req.body;
  
    // Validasi sederhana
    if (!name || !email || !password || !roleId) {
      return res.status(400).json({
        status: 'error',
        message: 'Semua field diperlukan!'
      });
    }
  
    try {
      
      const saltRounds = 8; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        roleId 
      });
  
      const savedUser = await user.save();
      return res.status(201).json({
        status: 'success',
        message: 'Pengguna berhasil dibuat!',
        data: {
          userId: savedUser._id,
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
  
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Email sudah terdaftar!'
        });
      }
  
      return res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan saat mendaftar pengguna. Silakan coba lagi nanti.'
      });
    }
  };

// Fungsi untuk login pengguna
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email dan password diperlukan!'
      });
    }
  
    try {
      const user = await User.findOne({ email }).populate('roleId'); 
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Email tidak ditemukan!'
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Password salah!'
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Login berhasil!',
        data: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: {
            id: user.roleId._id,   
            name: user.roleId.role, 
            description: user.roleId.description 
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
      });
    }
  };
  
