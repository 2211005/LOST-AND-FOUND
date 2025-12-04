📦 README.md — Lost & Found

(Versión profesional para GitHub)

# 🧳 Lost & Found – Sistema de Reporte de Objetos Perdidos

Aplicación web diseñada para facilitar el reporte, registro y recuperación de objetos perdidos dentro de una organización o institución.  
Permite a los usuarios reportar objetos extraviados o encontrados, subir imágenes, consultar estatus y mantener un flujo claro entre los responsables del sistema.

Este proyecto fue desarrollado como parte del **Proyecto Integrador** de la materia *Desarrollo Web Integral*.

---

## ✨ Características principales

- 📝 **Registro de reportes** de objetos perdidos o encontrados.
- 📸 **Subida de imágenes** asociadas al reporte.
- 🔍 **Consulta de reportes** mediante API REST.
- 🔐 **Autenticación segura con JWT**.
- 🧩 **Separación clara de Frontend (Angular) y Backend (Node.js + Express)**.
- 📦 **Contenerización con Docker**.
- ☁️ **Preparado para despliegue en la nube**.
- 🛡️ **Buenas prácticas de seguridad** (CORS, bcrypt, variables de entorno).

---

## 🛠️ Tecnologías utilizadas

### **Frontend**
- Angular 17+
- TypeScript
- TailwindCSS / CSS
- Servicios REST

### **Backend**
- Node.js
- Express
- MongoDB / Mongoose
- JWT + bcrypt
- Multer (para imágenes)

### **DevOps**
- Docker
- Git / GitHub
- Postman

---

## 📁 Estructura del Proyecto

### **Frontend (`LF_FRONT/`)**


src/
├── app/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── models/
├── assets/
└── environments/


### **Backend (`LF_BACK/`)**


src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
└── server.js


---

## ⚙️ Instalación y ejecución

### 🔹 **1. Clonar el repositorio**
```bash
git clone https://github.com/tuUsuario/LostAndFound.git
cd LostAndFound

🖥️ Backend
🔹 2. Instalar dependencias
cd LF_BACK
npm install

🔹 3. Configurar variables de entorno

Crear archivo .env:

PORT=3000
MONGO_URI=tu_cadena_de_conexion
JWT_SECRET=tu_secreto
EMAIL_USER=correo@example.com
EMAIL_PASS=contraseña

🔹 4. Ejecutar servidor
npm run dev

🌐 Frontend
🔹 1. Instalar dependencias
cd LF_FRONT
npm install

🔹 2. Ejecutar aplicación
ng serve --open

📡 Endpoints principales (API REST)
🔹 Reportes
Método	Endpoint	Descripción
GET	/api/reports	Obtener todos los reportes
POST	/api/reports	Crear un nuevo reporte
GET	/api/reports/:id	Obtener un reporte
PUT	/api/reports/:id	Actualizar estado o datos
DELETE	/api/reports/:id	Eliminar reporte
🔹 Autenticación
Método	Endpoint	Descripción
POST	/api/auth/login	Iniciar sesión
POST	/api/auth/register	Crear usuario
🛡️ Seguridad implementada

JWT para sesiones seguras.

bcrypt para hashing de contraseñas.

CORS configurado adecuadamente.

Multer para validar imágenes.

Variables de entorno para proteger datos sensibles.

Control de roles (administrador/usuario en futuras versiones).

🐳 Ejecución con Docker
🔹 Build del contenedor
docker build -t lostandfound-backend .

🔹 Ejecutar
docker run -p 3000:3000 lostandfound-backend
