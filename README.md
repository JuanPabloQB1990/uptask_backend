# 📌 Uptask Backend API

**Uptask Backend** es una API REST desarrollada con **Node.js, TypeScript y MongoDB**, asegurada con **JWT** y diseñada para gestionar proyectos, tareas y colaboración entre usuarios en tiempo real.

Esta API forma parte de un sistema completo de gestión de tareas, conectándose con un frontend (como el de Uptask Frontend) para crear una herramienta colaborativa con actualizaciones en tiempo real y seguridad.

---

## 🚀 ¿Qué hace esta aplicación?

Uptask Backend es una API que provee servicios para:

✔️ Autenticación de usuarios (JWT)  
✔️ Gestión de proyectos (crear, leer, actualizar, eliminar)  
✔️ Gestión de tareas por proyecto  
✔️ Gestión de colaboradores por proyecto  
✔️ Agregar notas a tareas  
✔️ Actualizaciones en tiempo real mediante Socket.IO  
✔️ Control de permisos de usuario

Esto permite a una aplicación frontend construir un dashboard colaborativo para manejo de proyectos con roles y notificaciones en tiempo real.

---

## 🛠️ Tecnologías

Esta API está construida con:

- Node.js
- TypeScript
- MongoDB (base de datos)
- Mongoose (ORM para MongoDB)
- JWT (autenticación segura)
- Socket.IO (actualizaciones en tiempo real)
- Express (framework web)

---

⚡ Requisitos Previos

-- Antes de instalar, asegúrate de tener instalado:

-- Node.js (v16+ recomendado)

-- npm o Yarn

-- MongoDB en local o cluster de MongoDB Atlas

-- Ingresar con cuenta gmail a mailtrap https://mailtrap.io/inboxes y crea un sandbox para recibir los correos que se requieren recibir para verificar cuenta, recuperar contraseñas.

-- En la configuracion del sandbox creado dar click en el piñon de configuracion y copia y pega en las variables de entorno correspondientes las credenciales: 

   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=your_port
   SMTP_USER=your_user
   SMTP_PASS=your_password

   
🛠️ Instalación

1. Clona el repositorio

git clone https://github.com/JuanPabloQB1990/uptask_backend.git


2. Instala dependencias

cd uptask_backend
npm install

3. Crea un archivo .env con base al .env.example

cp .env.example .env

4. Ajusta tus variables de entorno:

PORT=5000
DATABASE_URL=mongodb://localhost:27017/uptask
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_secreto_jwt
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=your_port
SMTP_USER=your_user
SMTP_PASS=your_password


5. Inicia el servidor

npm run dev

---

📌 Endpoints de la API

La API sigue el patrón REST. A continuación se detallan los principales endpoints:

🔐 Autenticación

Método	Ruta	Descripción

POST	/api/users/login	Iniciar sesión
```md
### POST /api/users/login

**Request Body**
```json
{
  "email": "user@email.com",
  "password": "123456"
}

POST	/api/users/register	Crear nuevo usuario
GET	/api/users/profile	Obtener perfil del usuario (requiere token)
📁 Proyectos
Método	Ruta	Descripción
GET	/api/projects	Listar todos los proyectos del usuario
GET	/api/projects/:id	Obtener un proyecto
POST	/api/projects	Crear un nuevo proyecto
PUT	/api/projects/:id	Actualizar proyecto
DELETE	/api/projects/:id	Eliminar proyecto

📌 Retorna objeto JSON con campo ok, data, etc.

📌 Tareas
Método	Ruta	Descripción
GET	/api/tasks/:projectId	Lista tareas de un proyecto
POST	/api/tasks	Crear tarea
PUT	/api/tasks/:id	Actualizar tarea
DELETE	/api/tasks/:id	Eliminar tarea
PUT	/api/tasks/status/:id	Cambiar estado de tarea

📌 Solicitudes de estado deben recibir { status: "Pendiente" | "Progreso" | ... }

👥 Colaboradores
Método	Ruta	Descripción
GET	/api/team/:projectId	Lista miembros del equipo
POST	/api/team/:projectId	Agregar miembro
DELETE	/api/team/:projectId/:userId	Eliminar miembro
📝 Notas
Método	Ruta	Descripción
POST	/api/notes	Crear nota para tarea
DELETE	/api/notes/:id	Eliminar nota
