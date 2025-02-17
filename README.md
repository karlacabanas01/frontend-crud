# 🚀 CRUD con Next.js, Node.js, MySQL y AWS

## 📌 Descripción

### Este proyecto es una aplicación CRUD (Create, Read, Update, Delete) que utiliza Next.js para el frontend y Node.js con Express para el backend, con una base de datos MySQL alojada en AWS RDS. La aplicación está desplegada en un servidor EC2 de AWS, asegurando escalabilidad y alta disponibilidad.

## 🌍 Tecnologías utilizadas

## 🖥️ Frontend (Repositorio en GitHub)

Next.js (Framework basado en React)
Tailwind CSS (Para estilos modernos y eficientes)
Axios (Manejo de peticiones HTTP)
React Hook Form (Manejo de formularios)

## 🛠️ Backend (Repositorio en GitHub)

Node.js con Express.js (Servidor backend)
MySQL (Base de datos en AWS RDS)
Sequelize (ORM para MySQL)
Cors & dotenv (Configuración de seguridad y variables de entorno)
JSON Web Token (JWT) (Para autenticación segura)

## ☁️ Infraestructura en AWS

AWS RDS (MySQL) → Base de datos administrada
AWS EC2 → Servidor donde se ejecuta la aplicación

## 🏗️ Instalación y configuración

🔹 Requisitos previos
Asegúrate de tener instalado:
Node.js
MySQL (o acceso a la base de datos en AWS RDS)
Git
PM2 (para mantener el backend en ejecución en EC2)

## ⚙️ Backend - Configuración y despliegue en EC2

### Conectar al servidor EC2

ssh -i "tu-clave.pem" ubuntu@tu-ip-publica

### Clonar el repositorio

git clone https://github.com/karlacabanas01/crud-node-mysql.git
cd crud-node-mysql

### Instalar dependencias

npm install

### Configurar las variables de entorno en .env

DB_HOST=crud-app-db.cmvhpzzezajb.us-east-2.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=<tu-contraseña-segura>
DB_NAME=crud_app
DB_PORT=3306
JWT_SECRET=<clave-secreta-para-tokens>

### Iniciar el servidor backend en el puerto 3000 con PM2

pm2 start server.js --name "crud-backend" -- --port 3000
pm2 save
pm2 startup

## 🎨 Frontend - Configuración y despliegue en EC2

### Conectar al servidor EC2

ssh -i "tu-clave.pem" ubuntu@tu-ip-publica

### Clonar el repositorio

git clone https://github.com/karlacabanas01/frontend-crud.git
cd frontend-crud

### Instalar dependencias

npm install

### Configurar variables de entorno en .env.local

NEXT_PUBLIC_API_URL=http://tu-ip-publica:3000
Construir e iniciar el frontend en el puerto 3001

## Autor

📌 Desarrollado por @karlacabanas01 🚀
