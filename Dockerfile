# Usar la imagen oficial de Node.js como base
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build -- --configuration=production

# Usar Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/ruleta-akpo/browser /usr/share/nginx/html

# Copiar el archivo de configuración personalizado a nginx.conf
# RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

# Exponer el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]