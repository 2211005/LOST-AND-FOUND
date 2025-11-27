const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');
// O '../middlewares/auth.middleware' si tu carpeta se llama con "s"
// (usa el que actualmente NO te da MODULE_NOT_FOUND)


// RUTAS PÚBLICAS
router.get('/', reportController.getReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);

// RUTAS SOLO ADMIN
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

// 🔴 ELIMINAR REPORTE (SOLO ADMIN)
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  reportController.deleteReport
);

module.exports = router;
