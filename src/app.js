const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Inicializa la base de datos
connectDB();

module.exports = app;