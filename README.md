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

Antes de instalar, asegúrate de tener instalado:

-- Node.js (v16+ recomendado)

-- npm o Yarn

-- MongoDB en local o cluster de MongoDB Atlas

-- Ingresar con cuenta gmail a mailtrap https://mailtrap.io/inboxes y crea un sandbox para recibir los correos que se requieren recibir para verificar cuenta, recuperar contraseñas.

-- En la configuracion del sandbox creado dar click en el piñon de configuracion y copia y pega en las variables de entorno correspondientes las credenciales: 

```js
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=your_port
SMTP_USER=your_user
SMTP_PASS=your_password
```
   
🛠️ Instalación

1. Clona el repositorio

   git clone https://github.com/JuanPabloQB1990/uptask_backend.git


2. Instala dependencias

```js
cd uptask_backend
```

```js
npm install
```

3. Crea un archivo .env en la carpeta raiz del proyecto.

4. Ajusta tus variables de entorno:

```js
PORT=5000
DATABASE_URL=mongodb://localhost:27017/uptask
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_secreto_jwt
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=your_port
SMTP_USER=your_user
SMTP_PASS=your_password
```

5. Inicia el servidor

```js
npm run dev
```

6. Ve al repositorio del frontend y sigue los pasos descritos en el redmi.
