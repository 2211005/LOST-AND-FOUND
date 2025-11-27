// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { loginAdmin, seedAdmin } = require('../controllers/auth.controller');

// Login
router.post('/login', loginAdmin);

// Ruta opcional para crear el primer admin (solo usar una vez y luego quitar)
router.post('/seed-admin', seedAdmin);

module.exports = router;
