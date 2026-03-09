FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

EXPOSE 5000

CMD ["npm","run","start"]