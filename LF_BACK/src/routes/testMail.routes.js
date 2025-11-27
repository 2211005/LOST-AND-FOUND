// LF_BACK/src/routes/testMail.routes.js
const express = require('express');
const { sendMail } = require('../services/emailService'); // ajusta la ruta si es necesario

const router = express.Router();

router.get('/test-mail', async (req, res) => {
  try {
    await sendMail({
      to: 'gera-xix3@hotmail.com',
      subject: 'Notificacion de objeto encontrado',
      text: 'Estimado Gerardo Xix, el objeto que reporto fue encontrado, vaya a la biblioteca 1 para recogerlo',
    });

    res.json({ ok: true, message: 'Correo de prueba enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error enviando correo' });
  }
});

module.exports = router;
