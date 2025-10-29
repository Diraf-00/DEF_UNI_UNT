# 🚀 Guía para el Equipo - Defensoría Universitaria

## Requisitos Previos
1. **Docker Desktop** instalado y corriendo
   - Windows/Mac: https://www.docker.com/products/docker-desktop/
   - Linux: `sudo apt install docker.io docker-compose`

2. **Git** instalado

---

## 📋 Pasos para Ejecutar el Proyecto

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd defensoria-universitaria
```

### 2. Navegar a la carpeta backend
```bash
cd backend
```

### 3. Crear archivo de variables de entorno
```bash
# Windows (PowerShell)
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

### 4. Iniciar todos los servicios con Docker
```bash
docker-compose up -d
```

**Tiempo estimado primera vez:** 5-10 minutos (descarga imágenes e instala dependencias)

### 5. Verificar que todo esté corriendo
```bash
docker-compose ps
```

Deberías ver 4 contenedores:
- `defensoria_backend` - Status: Up
- `defensoria_frontend` - Status: Up
- `defensoria_postgres` - Status: Up (healthy)
- `defensoria_adminer` - Status: Up

---

## 🌐 Acceder a las Aplicaciones

Una vez iniciado, abre tu navegador:

| Aplicación | URL |
|------------|-----|
| **Frontend (React)** | http://localhost:3000 |
| **Backend API** | http://localhost:4000 |
| **Adminer (Base de Datos)** | http://localhost:8080 |

### Credenciales para Adminer
- **Sistema:** PostgreSQL
- **Servidor:** db
- **Usuario:** user
- **Contraseña:** password
- **Base de datos:** defensoria_db

---

## 📝 Comandos Útiles

### Ver logs de todos los servicios
```bash
docker-compose logs -f
```
Presiona `Ctrl + C` para salir

### Ver logs de un servicio específico
```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# Base de datos
docker-compose logs -f db
```

### Detener los servicios
```bash
# Detener (mantiene los datos)
docker-compose stop

# Detener y eliminar contenedores (mantiene los datos)
docker-compose down

# Detener y eliminar TODO (incluye base de datos)
docker-compose down -v
```

### Reiniciar los servicios
```bash
# Reiniciar todo
docker-compose restart

# Reiniciar solo backend
docker-compose restart backend
```

### Reconstruir después de cambios en el código
```bash
# Reconstruir todo
docker-compose up -d --build

# Reconstruir solo backend
docker-compose up -d --build backend

# Reconstruir solo frontend
docker-compose up -d --build frontend
```

---

## 🔧 Solución de Problemas

### El puerto 3000/4000/5432 ya está en uso
```bash
# Ver qué proceso usa el puerto (Windows)
netstat -ano | findstr :3000

# Detener el proceso o cambiar el puerto en docker-compose.yml
```

### Docker Desktop no está corriendo
1. Abre Docker Desktop
2. Espera a que diga "Docker is running"
3. Ejecuta de nuevo `docker-compose up -d`

### Error al descargar imágenes
```bash
# Descargar manualmente las imágenes
docker pull postgres:16-alpine
docker pull node:20-alpine
docker pull nginx:alpine
docker pull adminer

# Luego ejecutar
docker-compose up -d
```

### Backend se reinicia constantemente
```bash
# Ver los logs para identificar el error
docker-compose logs backend

# Reconstruir el backend
docker-compose up -d --build backend
```

### Limpiar todo y empezar de cero
```bash
# Detener y eliminar todo
docker-compose down -v

# Limpiar caché de Docker
docker system prune -a

# Iniciar de nuevo
docker-compose up -d
```

---

## 🔄 Workflow de Desarrollo

### Hacer cambios en el código

**Backend:**
- Los cambios en `backend/src/` se detectan automáticamente (hot reload)
- El servidor se reinicia automáticamente

**Frontend:**
- Necesitas reconstruir la imagen:
  ```bash
  docker-compose up -d --build frontend
  ```

### Ejecutar migraciones de Prisma
```bash
# Crear nueva migración
docker exec -it defensoria_backend npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones
docker exec -it defensoria_backend npx prisma migrate deploy

# Abrir Prisma Studio (GUI para ver la BD)
docker exec -it defensoria_backend npx prisma studio
```

### Acceder al terminal del contenedor
```bash
# Backend
docker exec -it defensoria_backend sh

# Frontend
docker exec -it defensoria_frontend sh

# Una vez dentro, puedes ejecutar comandos como npm, node, etc.
# Para salir: exit
```

---

## ✅ Ventajas de este Setup

- ✅ **No necesitas instalar Node.js** en tu máquina
- ✅ **No necesitas instalar PostgreSQL**
- ✅ **No contaminas tu sistema** con dependencias
- ✅ **Entorno idéntico** para todo el equipo
- ✅ **Fácil de limpiar**: `docker-compose down -v`
- ✅ **Fácil de resetear** si algo sale mal

---

## 📞 Ayuda

Si tienes problemas:
1. Revisa que Docker Desktop esté corriendo
2. Ejecuta `docker-compose logs` para ver errores
3. Intenta reconstruir: `docker-compose up -d --build`
4. Como último recurso: `docker-compose down -v && docker-compose up -d`

---

## 🎯 Checklist de Inicio

- [ ] Docker Desktop instalado y corriendo
- [ ] Repositorio clonado
- [ ] Archivo `.env` creado (copiar de `.env.example`)
- [ ] Ejecutado `docker-compose up -d`
- [ ] Verificado con `docker-compose ps` que todo está "Up"
- [ ] Abierto http://localhost:3000 en el navegador
- [ ] Abierto http://localhost:4000 para verificar API
- [ ] Accedido a http://localhost:8080 (Adminer) para ver la BD

**¡Si completaste todo esto, estás listo para desarrollar!** 🎉
