// src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/login
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email y contraseña son obligatorios' });
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase(), isActive: true });

    if (!admin) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      sub: admin._id,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('❌ Error en loginAdmin:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

// ⚠️ Solo para crear el primer admin (puedes usarlo una vez y luego borrarlo)
async function seedAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await AdminUser.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe un admin con ese email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await AdminUser.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'superadmin',
    });

    res.status(201).json({
      message: 'Admin creado correctamente',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('❌ Error en seedAdmin:', error);
    res.status(500).json({ message: 'Error al crear admin inicial' });
  }
}

module.exports = {
  loginAdmin,
  seedAdmin, // si luego no lo usas, lo puedes quitar
};
