// src/models/Report.js
const { Schema, model } = require('mongoose');

const reportSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    category: {
      type: String,
      enum: ['electronics', 'documents', 'clothing', 'accessories', 'other'],
      default: 'other',
    },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    photoUrl: { type: String },

    reporterName: { type: String, required: true, trim: true },
    reporterEmail: { type: String, trim: true },
    reporterPhone: { type: String, trim: true },

    status: {
      type: String,
      enum: ['Nuevo', 'Verificado', 'En espera de dueño', 'Entregado', 'Rechazado'],
      default: 'Nuevo',
    },

    delivery: {
      deliveredTo: { type: String },
      deliveredAt: { type: Date },
      evidencePhotoUrl: { type: String },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = model('Report', reportSchema);
