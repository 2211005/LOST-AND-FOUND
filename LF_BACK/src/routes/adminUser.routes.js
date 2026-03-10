// src/routes/adminUser.routes.js
const express = require('express');
const router = express.Router();

const {
  listAdminUsers,
  createAdminUser,
  updateAdminStatus,
} = require('../controllers/adminUser.controller');

const {
  authenticateAdmin,
  requireSuperAdmin,
} = require('../middleware/auth.middleware');

// Todas estas rutas requieren:
// - estar logueado (authenticateAdmin)
// - ser superadmin (requireSuperAdmin)
router.use(authenticateAdmin, requireSuperAdmin);

router.get('/', listAdminUsers);
router.post('/', createAdminUser);
router.patch('/:id/status', updateAdminStatus);

module.exports = router;
