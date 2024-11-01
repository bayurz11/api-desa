// seedUserRoles.js

const mongoose = require('mongoose');
const UserRole = require('./api/models/UserRole'); // Sesuaikan path jika perlu

// Daftar peran pengguna
const userRoles = [
  { role: 'admin', description: 'Administrator dengan akses penuh' },
  { role: 'editor', description: 'Pengguna yang dapat mengedit konten' },
  { role: 'user', description: 'Pengguna biasa' }
];

// Fungsi untuk menyimpan role ke dalam database
async function seedUserRoles() {
  try {
    await UserRole.deleteMany({}); // Menghapus semua data sebelumnya
    await UserRole.insertMany(userRoles); // Menyimpan data baru
    console.log('User roles seeded successfully');
  } catch (error) {
    console.error('Error seeding user roles:', error);
  } finally {
    mongoose.connection.close(); // Menutup koneksi ke database setelah selesai
  }
}

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/desa', { // Ganti dengan URL dan nama database Anda
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  seedUserRoles(); // Memanggil fungsi untuk menyimpan role
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
