# 🏛️ Sistema de Defensoría Universitaria

Sistema web para la gestión de casos y expedientes de la Defensoría Universitaria.

## 🚀 Inicio Rápido con Docker

### Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo

### Comandos para iniciar

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd defensoria-universitaria

# 2. Navegar a backend
cd backend

# 3. Configurar variables de entorno
copy .env.example .env     # Windows
cp .env.example .env       # Linux/Mac

# 4. Iniciar todos los servicios
docker-compose up -d

# 5. Verificar que todo esté corriendo
docker-compose ps
```

### 🌐 Acceso a las aplicaciones

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación React |
| **Backend** | http://localhost:4000 | API NestJS |
| **Adminer** | http://localhost:8080 | Gestor de BD |

**Tiempo de inicio (primera vez):** ~5-10 minutos

---

## 📚 Documentación Completa

- **[COMANDOS-RAPIDOS.txt](COMANDOS-RAPIDOS.txt)** - Comandos esenciales de un vistazo
- **[GUIA-EQUIPO.md](GUIA-EQUIPO.md)** - Guía detallada para el equipo
- **[DOCKER-README.md](DOCKER-README.md)** - Documentación completa de Docker
- **[QUICK-START.md](QUICK-START.md)** - Guía de inicio rápido

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** NestJS 11
- **ORM:** Prisma 6.16
- **Base de Datos:** PostgreSQL
- **Lenguaje:** TypeScript

### Frontend
- **Framework:** React 18.3
- **Build Tool:** Vite 6.3
- **UI:** Radix UI + TailwindCSS + shadcn/ui
- **Routing:** React Router v6
- **Lenguaje:** TypeScript

---

## 📝 Comandos Más Usados

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Detener servicios
docker-compose down

# Reiniciar todo
docker-compose restart

# Reconstruir después de cambios
docker-compose up -d --build

# Resetear todo
docker-compose down -v
docker-compose up -d
```

---

## 🗃️ Base de Datos

### Modelos principales
- **Usuario** - Gestión de usuarios (estudiantes, docentes, administrativos)
- **Caso** - Expedientes con seguimiento
- **Denunciado** - Datos del acusado
- **Actualizacion** - Historial de cambios
- **Documento** - Archivos adjuntos

### Acceso a Adminer
- **URL:** http://localhost:8080
- **Sistema:** PostgreSQL
- **Servidor:** db
- **Usuario:** user
- **Contraseña:** password
- **Base de datos:** defensoria_db

---

## 🔧 Desarrollo

### Backend (Hot Reload Automático)
Los cambios en `backend/src/` se detectan automáticamente.

### Frontend (Requiere Reconstrucción)
```bash
docker-compose up -d --build frontend
```

### Migraciones de Prisma
```bash
# Crear nueva migración
docker exec -it defensoria_backend npx prisma migrate dev --name nombre

# Aplicar migraciones
docker exec -it defensoria_backend npx prisma migrate deploy

# Prisma Studio (GUI)
docker exec -it defensoria_backend npx prisma studio
```

---

## 🏗️ Estructura del Proyecto

```
defensoria-universitaria/
├── backend/                 # Backend NestJS
│   ├── src/
│   │   ├── archivos/       # Gestión de documentos
│   │   ├── auth/           # Autenticación
│   │   ├── casos/          # Gestión de casos
│   │   ├── notificaciones/ # Sistema de notificaciones
│   │   └── usuarios/       # Gestión de usuarios
│   ├── prisma/
│   │   └── schema.prisma   # Esquema de base de datos
│   ├── Dockerfile
│   └── docker-compose.yml  # Orquestación de servicios
│
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/      # Componentes de autenticación
│   │   │   ├── layout/    # Layout y navegación
│   │   │   ├── private/   # Rutas privadas
│   │   │   ├── public/    # Rutas públicas
│   │   │   └── ui/        # Componentes UI (shadcn)
│   │   └── App.tsx
│   ├── Dockerfile
│   └── nginx.conf
│
└── [Documentación]
    ├── README.md           # Este archivo
    ├── COMANDOS-RAPIDOS.txt
    ├── GUIA-EQUIPO.md
    ├── DOCKER-README.md
    └── QUICK-START.md
```

---

## 🎯 Características Implementadas

### Rutas Públicas
- `/` - Página de inicio
- `/base-legal` - Marco legal
- `/formularios` - Formularios
- `/ingreso-caso` - Registro de casos
- `/seguimiento` - Seguimiento de casos
- `/login` - Autenticación

### Rutas Privadas (requieren login)
- `/dashboard` - Panel de control
- `/expedientes` - Gestión de expedientes
- `/expediente/:id` - Detalle de expediente
- `/reportes` - Generación de reportes
- `/perfil` - Perfil de usuario

---

## ❓ Solución de Problemas

### Docker no inicia
```bash
# Verificar que Docker Desktop esté corriendo
docker --version

# Ver logs
docker-compose logs
```

### Puertos ocupados
Cambia los puertos en `backend/docker-compose.yml`:
```yaml
ports:
  - "3001:80"    # Frontend (cambia 3000 por 3001)
  - "4001:4000"  # Backend (cambia 4000 por 4001)
```

### Resetear completamente
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d
```

---

## 👥 Equipo de Desarrollo

Para más información sobre cómo trabajar con este proyecto, consulta **[GUIA-EQUIPO.md](GUIA-EQUIPO.md)**.

---

## 📄 Licencia

UNLICENSED - Uso privado

---

## 🆘 Soporte

Si tienes problemas:
1. Consulta **COMANDOS-RAPIDOS.txt** para comandos comunes
2. Revisa **GUIA-EQUIPO.md** para solución de problemas
3. Verifica logs: `docker-compose logs -f`
4. Resetea: `docker-compose down -v && docker-compose up -d`
