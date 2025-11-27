// src/app/shared/models/report.model.ts

export interface Report {
  _id?: string;

  title: string;
  description: string;

  // 'lost' = perdido, 'found' = encontrado
  type: 'lost' | 'found';

  category:
    | 'electronics'
    | 'documents'
    | 'clothing'
    | 'accessories'
    | 'other';

  location: string;

  // Fecha en string ISO (ej: new Date().toISOString())
  date: string;

  photoUrl?: string;

  // Datos de quien reporta
  reporterName: string;
  reporterEmail?: string;
  reporterPhone?: string;

  // Flujo de estados
  status?:
    | 'Nuevo'
    | 'Verificado'
    | 'En espera de dueño'
    | 'Entregado'
    | 'Rechazado';

  // Datos de entrega (si aplica)
  delivery?: {
    deliveredTo?: string;
    deliveredAt?: string;
    evidencePhotoUrl?: string;
    notes?: string;
  };

  createdAt?: string;
  updatedAt?: string;
}
