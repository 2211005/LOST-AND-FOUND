// src/controllers/report.controller.js
const Report = require('../models/Report');
const mongoose = require('mongoose');
// 👇 servicio de correo y plantillas
const { sendMail } = require('../services/emailService');
const {
  buildReportCreatedEmail,
  buildReportStatusUpdatedEmail,
  buildReportDeliveredEmail,
} = require('../services/emailTemplates');

// GET /api/reports
// Permite filtros por ?search=&type=lost|found
async function getReports(req, res) {
  try {
    const { search, type } = req.query;
    const filter = {};

    // Filtrar por tipo (lost/found)
    if (type && ['lost', 'found'].includes(type)) {
      filter.type = type;
    }

    // Búsqueda simple por título, descripción o ubicación
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const reports = await Report.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ message: 'Error al obtener los reportes' });
  }
}

// GET /api/reports/:id
async function getReportById(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.json(report);
  } catch (error) {
    console.error('Error al obtener reporte:', error);
    res.status(500).json({ message: 'Error al obtener el reporte' });
  }
}

// POST /api/reports
// 👉 ahora soporta:
// - campos normales en req.body (porque viene multipart/form-data)
// - archivo en req.file (subido con Multer como "photo")
async function createReport(req, res) {
  try {
    console.log('👉 Llegó POST /api/reports con body:', req.body);
    console.log('👉 Archivo recibido (req.file):', req.file);

    const {
      title,
      description,
      type,
      category,
      location,
      date,
      photoUrl,       // por si el front aún manda URL manual
      reporterName,
      reporterEmail,
      reporterPhone,
    } = req.body;

    // Validación básica
    if (!title || !description || !type || !location || !date || !reporterName) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
      });
    }

    // 🖼 decidir la foto final
    let finalPhotoUrl = photoUrl || null;

    // Si viene archivo subido, usamos la ruta /uploads/...
    if (req.file) {
      finalPhotoUrl = `/uploads/${req.file.filename}`;
    }

    const newReport = new Report({
      title,
      description,
      type,
      category,
      location,
      date,
      photoUrl: finalPhotoUrl,
      reporterName,
      reporterEmail,
      reporterPhone,
      // status por default si tu esquema no lo pone solo
      // status: 'Nuevo',
    });

    const saved = await newReport.save();

    // 👇 notificación al reportero
    if (reporterEmail) {
      try {
        const { subject, text, html } = buildReportCreatedEmail(saved);

        await sendMail({
          to: reporterEmail,
          subject,
          text,
          html,
        });
      } catch (error) {
        console.error('❌ Error al enviar correo de creación de reporte:', error);
        // No rompemos la respuesta al cliente si solo falla el correo
      }
    }

    // 👇 notificación al admin
    try {
      await sendMail({
        to: process.env.ADMIN_EMAIL || 'notificaciones.lostandfound@gmail.com',
        subject: `Nuevo reporte en Lost & Found: ${saved.title}`,
        text: `Se ha creado un nuevo reporte con ID ${saved._id}`,
        html: `<p>Se ha creado un nuevo reporte: <strong>${saved.title}</strong> (ID: ${saved._id})</p>`,
      });
    } catch (error) {
      console.error('⚠️ Error al notificar al admin del nuevo reporte:', error);
    }

    res.status(201).json(saved);
  } catch (error) {
    console.error('Error al crear reporte:', error);
    res.status(500).json({ message: 'Error al crear el reporte' });
  }
}

// PATCH /api/reports/:id/status
async function updateReportStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'Nuevo',
      'Verificado',
      'En espera de dueño',
      'Entregado',
      'Rechazado',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Estado inválido',
        validStatuses,
      });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true } // devuelve el documento actualizado
    );

    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    // 👇 notificación por cambio de estado
    if (report.reporterEmail) {
      try {
        const { subject, text, html } = buildReportStatusUpdatedEmail(report);

        await sendMail({
          to: report.reporterEmail,
          subject,
          text,
          html,
        });
      } catch (error) {
        console.error('❌ Error al enviar correo de actualización de estado:', error);
      }
    }

    res.json(report);
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
}

// PATCH /api/reports/:id/delivery
async function registerDelivery(req, res) {
  try {
    const { id } = req.params;
    const { deliveredTo, evidencePhotoUrl, notes } = req.body;

    if (!deliveredTo) {
      return res.status(400).json({ message: 'El campo deliveredTo es obligatorio' });
    }

    const deliveryData = {
      deliveredTo,
      deliveredAt: new Date().toISOString(),
      evidencePhotoUrl: evidencePhotoUrl || undefined,
      notes: notes || undefined,
    };

    const report = await Report.findByIdAndUpdate(
      id,
      {
        delivery: deliveryData,
        status: 'Entregado',
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    // 👇 notificación cuando se marca como entregado
    if (report.reporterEmail) {
      try {
        const { subject, text, html } = buildReportDeliveredEmail(report);

        await sendMail({
          to: report.reporterEmail,
          subject,
          text,
          html,
        });
      } catch (error) {
        console.error('❌ Error al enviar correo de entrega:', error);
      }
    }

    res.json(report);
  } catch (error) {
    console.error('❌ Error al registrar entrega:', error);
    res.status(500).json({ message: 'Error al registrar entrega' });
  }
}

// DELETE /api/reports/:id
async function deleteReport(req, res) {
  try {
    const { id } = req.params;
    console.log('🗑️ Solicitud de eliminar reporte', id, 'por', req.user?.email);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de reporte inválido' });
    }

    const deleted = await Report.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    return res.json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar reporte:', error);
    return res.status(500).json({ message: 'Error al eliminar el reporte' });
  }
}

module.exports = {
  getReports,
  getReportById,
  createReport,
  updateReportStatus,
  registerDelivery,
  deleteReport,
};
