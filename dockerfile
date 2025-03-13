# Usa la imagen base de Node.js
FROM node:18

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# ⚠️ Aquí se genera el build de Next.js (esto faltaba)
RUN npm run build


# Expone el puerto donde correrá la app
EXPOSE 3001

# Comando para iniciar el servidor en modo producción
CMD ["npm", "run", "start"]
