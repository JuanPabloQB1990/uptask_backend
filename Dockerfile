FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# compilar typescript
RUN npm run build

EXPOSE 5000

CMD ["npm","start"]