// src/app.js
const express = require('express');
const cors = require('cors');
const router = require('./routes'); // index.js de routes
const authRoutes = require('./routes/auth.routes');
const testMailRoutes = require('./routes/testMail.routes')
const adminUserRoutes = require('./routes/adminUser.routes');
const reportRoutes = require('./routes/report.routes')

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'LF 2.0 backend is running 🚀' });
});

// Rutas principales
app.use('/api', router);
app.use('/api/auth', authRoutes);

//email
app.use('/api', testMailRoutes);

//admin
app.use('/api/admin-users', adminUserRoutes);
app.use('/api/reports', reportRoutes);


module.exports = app;
