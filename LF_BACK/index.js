// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());              // habilita CORS
app.use(express.json());      // parsea JSON

// Rutas de ejemplo
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'lost-and-found-api', ts: Date.now() });
});

// Ejemplo CRUD base
const items = []; // temporal en memoria
app.get('/api/items', (req, res) => res.json(items));
app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
