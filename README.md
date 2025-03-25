# 🚀 CRUD con Next.js, Node.js

## 📌 Descripción

### Este proyecto es una aplicación CRUD con Next.js en el frontend, conectándose a un backend en Node.js con Express y una base de datos MySQL en XAMPP. Utiliza Tailwind CSS para el diseño y React Hook Form para la gestión de formularios.

## 🌍 Tecnologías utilizadas

## 🖥️ Frontend

- React (19.0.0)
- Next.js (15.1.6)
- Tailwind CSS
- Axios
- React Hook Form (Manejo de formularios)

## 🏗️ Instalación y configuración

## Requisitos previos

- Node.js
- MySQL
- Git

## 🎨 Frontend - Configuración y despliegue

### Clonar el repositorio

- git clone https://github.com/karlacabanas01/frontend-crud.git
- cd frontend-crud

### Instalar dependencias

`npm install`

### Configurar variables de entorno en .env.local

- API_URL_BACK=http://localhost:3000

## 🚀 Construir e iniciar el frontend (puerto 3000)

- Después de actualizar tu `.env.local` reinicia los contenedores para que Docker tome los nuevos valores:

`docker compose down`
`docker compose up -d --build`

## Autor

📌 Desarrollado por @EquipoNabiProyect 🚀
