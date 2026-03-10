// src/controllers/adminUser.controller.js
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');

// GET /api/admin-users
// Lista admins (solo superadmin)
async function listAdminUsers(req, res) {
  try {
    const admins = await AdminUser.find().select('-passwordHash');
    res.json(admins);
  } catch (error) {
    console.error('❌ Error listando admins:', error);
    res.status(500).json({ message: 'Error al obtener admins' });
  }
}

// POST /api/admin-users
// Crear nuevo admin (solo superadmin)
async function createAdminUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Nombre, email y contraseña son obligatorios' });
    }

    const exists = await AdminUser.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe un admin con ese email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await AdminUser.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
    });

    res.status(201).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
    });
  } catch (error) {
    console.error('❌ Error creando admin:', error);
    res.status(500).json({ message: 'Error al crear admin' });
  }
}

// PATCH /api/admin-users/:id/status
// Activar/desactivar admin (solo superadmin)
async function updateAdminStatus(req, res) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const admin = await AdminUser.findByIdAndUpdate(
      id,
      { isActive: !!isActive },
      { new: true }
    ).select('-passwordHash');

    if (!admin) {
      return res.status(404).json({ message: 'Admin no encontrado' });
    }

    res.json(admin);
  } catch (error) {
    console.error('❌ Error actualizando estado de admin:', error);
    res.status(500).json({ message: 'Error al actualizar estado de admin' });
  }
}

module.exports = {
  listAdminUsers,
  createAdminUser,
  updateAdminStatus,
};
