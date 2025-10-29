# ⚡ Inicio Rápido - Docker

## Pasos para correr el proyecto SIN instalar dependencias localmente

### 1️⃣ Asegúrate de tener Docker Desktop corriendo
Abre Docker Desktop y espera a que inicie completamente.

### 2️⃣ Navega a la carpeta backend
```bash
cd c:\DEFENSORIA\defensoria-universitaria\backend
```

### 3️⃣ Copia el archivo de variables de entorno
```bash
copy .env.example .env
```

### 4️⃣ Inicia todos los servicios
```bash
docker-compose up -d
```

**Esto hará:**
- ✅ Crear la base de datos PostgreSQL
- ✅ Instalar dependencias del backend (dentro del contenedor)
- ✅ Ejecutar migraciones de Prisma
- ✅ Iniciar el backend en modo desarrollo
- ✅ Construir e iniciar el frontend
- ✅ Iniciar Adminer (gestor de base de datos)

**Primera vez:** Tomará 5-10 minutos descargando y construyendo todo.

### 5️⃣ Accede a las aplicaciones

| Servicio | URL |
|----------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:4000 |
| **Adminer** | http://localhost:8080 |

### 6️⃣ Ver logs (opcional)
```bash
docker-compose logs -f
```

Para salir de los logs: `Ctrl + C`

---

## 🛑 Para detener todo
```bash
docker-compose down
```

## 🔄 Para reiniciar
```bash
docker-compose restart
```

## 🧹 Para limpiar todo y empezar de cero
```bash
docker-compose down -v
docker-compose up -d
```

---

## 💡 Ventajas

- ✅ **NO necesitas instalar dependencias** (`node_modules`)
- ✅ **NO necesitas instalar PostgreSQL** 
- ✅ **NO contaminas tu máquina** con paquetes
- ✅ Todo corre en contenedores aislados
- ✅ Fácil de limpiar: `docker-compose down -v`

---

## 📝 Nota Importante

Los **errores de TypeScript que ves en VS Code** son normales porque no tienes `node_modules` localmente. 

El código **SÍ funcionará** dentro de Docker donde las dependencias están instaladas.

Para más detalles, consulta: `DOCKER-README.md`
