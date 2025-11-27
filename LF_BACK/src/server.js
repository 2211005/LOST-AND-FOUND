// src/server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB(); // Conecta a Mongo

  app.listen(PORT, () => {
    console.log(`🚀 Backend LF 2.0 escuchando en http://localhost:${PORT}`);
  });
}


startServer();
