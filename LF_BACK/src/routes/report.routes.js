const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');
// Si tu archivo realmente se llama middlewares/auth.middleware.js, cambia la ruta arriba

// 👇 NUEVO: importamos la config de subida
const upload = require('../config/upload.config');

// =======================
// RUTAS PÚBLICAS
// =======================

// Lista de reportes (con filtros, etc.)
router.get('/', reportController.getReports);

// Obtener un reporte por ID
router.get('/:id', reportController.getReportById);

// Crear reporte (ahora acepta archivo "photo")
router.post(
  '/',
  upload.single('photo'),        // 👈 aquí Multer mete req.file
  reportController.createReport
);

// =======================
// RUTAS SOLO ADMIN
// =======================

router.patch(
  '/:id/status',
  authenticate,
  requireAdmin,
  reportController.updateReportStatus
);

router.patch(
  '/:id/delivery',
  authenticate,
  requireAdmin,
  reportController.registerDelivery
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  reportController.deleteReport
);

module.exports = router;
