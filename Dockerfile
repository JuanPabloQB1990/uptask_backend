# Imagen base
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Instala las dependencias de producción
RUN npm install 

# Expone el puerto de la API
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD npm run dev:api