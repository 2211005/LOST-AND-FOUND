// src/config/upload.config.js
const path = require('path');
const multer = require('multer');

// Carpeta /uploads en la raíz de LF_BACK
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, '_')
      .toLowerCase();
    cb(null, `${Date.now()}_${base}${ext}`);
  },
});

// Si luego quieres limitar solo imágenes:
// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith('image/')) {
//     return cb(new Error('Solo se permiten imágenes'), false);
//   }
//   cb(null, true);
// };

const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
