// src/routes/index.js
const { Router } = require('express');
const reportRoutes = require('./report.routes');
// const authRoutes = require('./auth.routes'); // luego

const router = Router();

router.use('/reports', reportRoutes);
// router.use('/auth', authRoutes);   // luego

module.exports = router;
