// src/services/emailTemplates.js

function buildReportCreatedEmail(report) {
  const {
    title,
    description,
    type,
    category,
    location,
    date,
    reporterName,
  } = report;

  const humanType = type === 'lost' ? 'Objeto perdido' : 'Objeto encontrado';

  const subject = `Hemos recibido tu reporte: ${title}`;

  const text = `
Hola ${reporterName},

Hemos recibido tu reporte en Lost & Found.

Detalles del reporte:
- Título: ${title}
- Tipo: ${humanType}
- Categoría: ${category || 'No especificada'}
- Descripción: ${description}
- Lugar: ${location}
- Fecha del suceso: ${date}

Te avisaremos cuando haya novedades sobre tu reporte.

— Equipo Lost & Found UTRM
`;

  const html = `
    <h2>Lost & Found UTRM</h2>
    <p>Hola <strong>${reporterName}</strong>,</p>
    <p>Hemos recibido tu reporte con la siguiente información:</p>
    <ul>
      <li><strong>Título:</strong> ${title}</li>
      <li><strong>Tipo:</strong> ${humanType}</li>
      <li><strong>Categoría:</strong> ${category || 'No especificada'}</li>
      <li><strong>Descripción:</strong> ${description}</li>
      <li><strong>Lugar:</strong> ${location}</li>
      <li><strong>Fecha del suceso:</strong> ${date}</li>
    </ul>
    <p>Te avisaremos cuando haya novedades sobre tu reporte.</p>
    <p>— Equipo Lost & Found UTRM</p>
  `;

  return { subject, text, html };
}

function buildReportStatusUpdatedEmail(report) {
  const {
    title,
    description,
    location,
    status,
    reporterName,
  } = report;

  const subject = `Actualización de tu reporte: ${title}`;

  const text = `
Hola ${reporterName},

El estado de tu reporte en Lost & Found ha cambiado.

Detalles:
- Título: ${title}
- Descripción: ${description}
- Lugar: ${location}
- Nuevo estado: ${status}

Si tienes dudas, puedes acudir al área responsable del Lost & Found.

— Equipo Lost & Found UTRM
`;

  const html = `
    <h2>Actualización de tu reporte - Lost & Found UTRM</h2>
    <p>Hola <strong>${reporterName}</strong>,</p>
    <p>El estado de tu reporte ha cambiado:</p>
    <ul>
      <li><strong>Título:</strong> ${title}</li>
      <li><strong>Descripción:</strong> ${description}</li>
      <li><strong>Lugar:</strong> ${location}</li>
      <li><strong>Nuevo estado:</strong> ${status}</li>
    </ul>
    <p>Si tienes dudas, puedes acudir al área responsable del Lost & Found.</p>
    <p>— Equipo Lost & Found UTRM</p>
  `;

  return { subject, text, html };
}

function buildReportDeliveredEmail(report) {
  const {
    title,
    description,
    location,
    reporterName,
    delivery,
  } = report;

  const subject = `Tu objeto ha sido entregado: ${title}`;

  const text = `
Hola ${reporterName},

Te informamos que el objeto relacionado con tu reporte ha sido marcado como ENTREGADO.

Detalles:
- Título: ${title}
- Descripción: ${description}
- Lugar: ${location}
- Entregado a: ${delivery?.deliveredTo || 'No especificado'}
- Fecha de entrega: ${delivery?.deliveredAt || 'No especificada'}

Gracias por utilizar el sistema Lost & Found UTRM.

— Equipo Lost & Found UTRM
`;

  const html = `
    <h2>Tu objeto ha sido entregado - Lost & Found UTRM</h2>
    <p>Hola <strong>${reporterName}</strong>,</p>
    <p>Te informamos que el objeto relacionado con tu reporte ha sido marcado como <strong>ENTREGADO</strong>.</p>
    <ul>
      <li><strong>Título:</strong> ${title}</li>
      <li><strong>Descripción:</strong> ${description}</li>
      <li><strong>Lugar:</strong> ${location}</li>
      <li><strong>Entregado a:</strong> ${delivery?.deliveredTo || 'No especificado'}</li>
      <li><strong>Fecha de entrega:</strong> ${delivery?.deliveredAt || 'No especificada'}</li>
    </ul>
    <p>Gracias por utilizar el sistema Lost & Found UTRM.</p>
    <p>— Equipo Lost & Found UTRM</p>
  `;

  return { subject, text, html };
}

module.exports = {
  buildReportCreatedEmail,
  buildReportStatusUpdatedEmail,
  buildReportDeliveredEmail,
};
