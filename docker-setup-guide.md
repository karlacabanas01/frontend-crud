
# 🏗️ Guía para el Frontend  

## 🌐 **Configuración de la red compartida (`nabi-network`)**  
Docker maneja la comunicación entre servicios mediante **redes internas**.  
- La red `nabi-network` permite que el backend, la base de datos y el frontend **se comuniquen entre sí por nombre de servicio** en lugar de IP o `localhost`.  
- Docker resolverá automáticamente el nombre del contenedor como `nabi_backend`, `nabi_mysql`, `nabi_frontend`, etc.  
- Si la red **no existe**, créala manualmente antes de levantar cualquier servicio:  

```bash
docker network create nabi-network
```

✅ Si la red ya existe → Docker simplemente la usará.  
✅ Si la red no existe → Docker la creará automáticamente.  

---


## **1️⃣ Detener y eliminar el frontend**
Para detener solo el frontend:

```bash
docker compose down
```

---

## **2️⃣ Eliminar la imagen del frontend**
Si hiciste cambios en el `Dockerfile` o las dependencias:

```bash
docker rmi nabi_frontend
```

---

## **3️⃣ Levantar el frontend**
Para reconstruir el frontend desde cero:

```bash
docker compose up --build
```

Para ejecutarlo en segundo plano:

```bash
docker compose up --build -d
```

---

## **4️⃣ Verificar que el frontend está corriendo**
```bash
docker ps
```

✅ Si todo está bien, debería aparecer algo como esto:

```
CONTAINER ID   IMAGE         STATUS         PORTS                   NAMES
mnop1234       nabi_frontend Up 10 seconds  0.0.0.0:3001->3001/tcp  nabi_frontend
```

---

## **5️⃣ Ver logs del frontend**
```bash
docker logs -f nabi_frontend
```

---

## **6️⃣ Acceder al frontend**
El frontend estará disponible en:

```
http://localhost:3001
```

