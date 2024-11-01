const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require(path.join(__dirname, 'api','config', 'db')); // Menggunakan path absolut
const userRoutes = require('./api/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke Database
connectDB();

// Rute API
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
