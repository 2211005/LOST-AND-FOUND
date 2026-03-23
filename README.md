# 🧳 Lost & Found – Sistema de Reporte de Objetos Perdidos

![CI/CD](https://img.shields.io/badge/CI%2FCD-Configurado-blue)
![Cobertura](https://img.shields.io/badge/Cobertura-Pendiente-lightgrey)
![Licencia](https://img.shields.io/badge/Licencia-Por%20definir-lightgrey)

---

## 📚 Tabla de contenidos

- [📌 Descripción del proyecto](#-descripción-del-proyecto)
- [✨ Características principales](#-características-principales)
- [🛠️ Stack tecnológico](#️-stack-tecnológico)
- [✅ Requisitos previos](#-requisitos-previos)
- [📦 Instalación](#-instalación)
- [🚀 Ejecución local](#-ejecución-local)
- [🧪 Pruebas](#-pruebas)
- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [🔐 Variables de entorno](#-variables-de-entorno)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [👥 Autores](#-autores)

---

## 📌 Descripción del proyecto

**Lost & Found** es una aplicación web diseñada para facilitar el **reporte, registro, consulta y recuperación de objetos perdidos** dentro de una organización o institución.

El sistema permite que los usuarios reporten objetos perdidos o encontrados, adjunten imágenes, consulten el estado de sus reportes y mantengan un flujo claro de seguimiento entre los responsables del sistema.

Este proyecto fue desarrollado como parte del **Proyecto Integrador** de la materia **Desarrollo Web Integral**.

---

## ✨ Características principales

- 📝 Registro de reportes de objetos perdidos o encontrados.
- 📸 Subida de imágenes asociadas a cada reporte.
- 🔍 Consulta de reportes mediante API REST.
- 🔐 Autenticación segura mediante JWT.
- 🧩 Separación clara entre frontend y backend.
- 🛡️ Aplicación de buenas prácticas de seguridad.
- ⚙️ Organización modular para facilitar mantenimiento y escalabilidad.
- 🚦 Integración de flujo básico de automatización mediante GitHub Actions.

---

## 🛠️ Stack tecnológico

### 🎨 Frontend
- Angular
- TypeScript
- HTML
- CSS

### ⚙️ Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer

### 🔧 Herramientas de desarrollo
- Git
- GitHub
- GitHub Actions
- Postman
- Visual Studio Code

> **Nota:** Aunque Docker fue considerado en una etapa inicial del proyecto, **actualmente no se implementa dentro del repositorio**. En su lugar, se documenta el proceso de configuración y ejecución local del entorno de desarrollo.

---

## ✅ Requisitos previos

Antes de ejecutar el proyecto localmente, asegúrate de contar con lo siguiente:

- [Node.js](https://nodejs.org/) 18 o superior
- npm 9 o superior
- Angular CLI instalado globalmente
- MongoDB local o una cadena de conexión remota válida
- Git instalado
- Visual Studio Code u otro editor de código

### Instalación de Angular CLI

npm install -g @angular/cli

---

### 📦 Instalación
1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd LOST-AND-FOUND

2. Instalar dependencias del frontend
cd LF
npm install

3. Instalar dependencias del backend
cd ../LF_BACK
npm install

---

### 🚀 Ejecución local

Para ejecutar el proyecto localmente, se recomienda abrir dos terminales: una para el frontend y otra para el backend.

Frontend
cd LF
ng serve --open

Por defecto, Angular suele ejecutarse en http://localhost:4200.

Backend
cd LF_BACK
npm run dev

El backend se ejecutará en el puerto configurado en el archivo .env.

---

### 🧪 Pruebas

El backend del proyecto incluye pruebas automatizadas de **integración** y **unitarias**, además de análisis estático con **ESLint**.

### Tecnologías utilizadas
- **Jest**: framework principal de pruebas
- **Supertest**: pruebas de integración para endpoints HTTP
- **ESLint**: análisis estático de código

---

## Requisitos previos

Antes de ejecutar las pruebas, asegúrate de:

- Tener instaladas las dependencias del backend
- Estar ubicado dentro de la carpeta `LF_BACK`

```bash
cd LF_BACK
npm install
```

## Estructura de pruebas

Las pruebas están organizadas de la siguiente manera:

tests/
├── integration/
│   └── health.test.js
└── unit/
    └── auth.controller.test.js

health.test.js: pruebas de integración del endpoint GET /api/health
auth.controller.test.js: pruebas unitarias de la función loginAdmin

## Ejecutar todas las pruebas
```bash
npm.cmd test
```
Este comando ejecuta todas las suites configuradas en el proyecto.

## Ejecutar pruebas con salida más detallada

```bash
npm.cmd test -- --verbose
```
Este comando muestra los casos de prueba de forma más desglosada en la terminal.

## Ejecutar solo las pruebas unitarias

```bash
npm.cmd test -- tests/unit/auth.controller.test.js --verbose
```

## Ejecutar solo las pruebas de integración

```bash
npm.cmd test -- tests/integration/health.test.js --verbose
```

## Generar reporte de cobertura

npm.cmd run test:coverage

Este comando ejecuta las pruebas y genera un reporte de cobertura con métricas como:

% Stmts
% Branch
% Funcs
% Lines

El reporte se genera en la carpeta:

coverage/
## Análisis estático con ESLint

# Ejecutar análisis estático

```bash
npm.cmd run lint
```

Este comando revisa el código fuente del backend y reporta advertencias o errores de calidad y estilo.

# Generar reporte HTML de ESLint

```bash
npm.cmd run lint:html
```

Este comando genera un archivo llamado:

eslint-report.html

que puede abrirse en el navegador para revisar los hallazgos de forma visual.

# Corregir automáticamente problemas simples

```bash
npm.cmd run lint -- --fix
```

Este comando intenta corregir automáticamente observaciones simples, como problemas de formato.

## Scripts disponibles

Los scripts principales del backend son los siguientes:

```bash
"scripts": {
  "test": "cross-env NODE_ENV=test jest --runInBand",
  "test:watch": "cross-env NODE_ENV=test jest --watch",
  "test:coverage": "cross-env NODE_ENV=test jest --coverage --runInBand",
  "lint": "eslint src",
  "lint:html": "eslint src -f html -o eslint-report.html",
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

## Resumen rápido de comandos

```bash
Pruebas
npm.cmd test
npm.cmd test -- --verbose
npm.cmd test -- tests/unit/auth.controller.test.js --verbose
npm.cmd test -- tests/integration/health.test.js --verbose
npm.cmd run test:coverage
```
```bash
ESLint
npm.cmd run lint
npm.cmd run lint:html
npm.cmd run lint -- --fix
```

### 📁 Estructura del proyecto

.
├── .github
│   └── workflows
├── LF
│   ├── .vscode
│   ├── public
│   └── src
│       └── app
│           ├── core
│           │   ├── home-page-nav
│           │   ├── interceptors
│           │   └── not-found
│           ├── features
│           │   ├── admin
│           │   │   ├── admin-login
│           │   │   ├── reporte-detalle-admin
│           │   │   └── reportes-admin
│           │   ├── home-page
│           │   └── reportes
│           │       ├── encontrado-form
│           │       ├── perdido-form
│           │       ├── publicaciones
│           │       ├── reporte
│           │       └── reportes-home
│           ├── home-page
│           ├── reporte
│           └── shared
│               ├── guards
│               ├── models
│               └── services
└── LF_BACK
    └── src
        ├── config
        ├── controllers
        ├── middleware
        ├── models
        ├── routes
        ├── services
        └── utils

        Descripción general

.github/workflows: contiene los archivos de GitHub Actions para automatización de procesos.

LF/: contiene el frontend desarrollado con Angular.

LF_BACK/: contiene el backend desarrollado con Node.js, Express y MongoDB.

core/: módulos y componentes base del sistema.

features/: módulos funcionales principales de la aplicación.

shared/: recursos reutilizables como guards, modelos y servicios.

---

### 🔐 Variables de entorno

El backend requiere un archivo .env dentro de la carpeta LF_BACK/.

Ejemplo de archivo .env
PORT=3000
MONGO_URI=tu_cadena_de_conexion
JWT_SECRET=tu_secreto
EMAIL_USER=correo@example.com
EMAIL_PASS=tu_contraseña
Descripción de variables

PORT: puerto en el que se ejecutará el servidor backend.

MONGO_URI: cadena de conexión a MongoDB.

JWT_SECRET: clave secreta para firmar tokens JWT.

EMAIL_USER: correo utilizado para procesos relacionados con mensajería o notificaciones, si aplica.

EMAIL_PASS: contraseña o clave de aplicación del correo configurado.

Importante: El archivo .env no debe subirse al repositorio y debe incluirse en .gitignore.

---

### 🤝 Contribución

Para contribuir al proyecto, se recomienda seguir el siguiente flujo de trabajo:

1. Cambiar a la rama de desarrollo
git switch dev
git pull origin dev

2. Crear una nueva rama de trabajo
git switch -c feature/nombre-del-cambio

3. Realizar cambios y registrar avances
git add .
git commit -m "Descripción clara del cambio realizado"

4. Subir la rama al repositorio remoto
git push -u origin feature/nombre-del-cambio

5. Crear un Pull Request

Desde GitHub:

Seleccionar como rama base: dev

Seleccionar como rama de comparación: feature/nombre-del-cambio

Agregar un título y una descripción clara del cambio realizado

Solicitar revisión si corresponde

Recomendaciones

No trabajar directamente sobre main

Mantener actualizada la rama local con respecto a dev

Usar mensajes de commit claros y descriptivos

Verificar el funcionamiento del sistema antes de abrir un Pull Request

---

### 📄 Licencia

La licencia del proyecto se encuentra pendiente de definición.

Este apartado deberá actualizarse una vez que el equipo determine la licencia oficial del repositorio.

---

### 👥 Autores

Gerardo Alfonso Xix Cel

Julian Patricio Turriza Mena

Gabriel De Jesús Ramírez Canul

Moisés Esteban Suárez Méndez

Ericl Emmanuel Chay Colli