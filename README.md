
# Defensoría Universitaria 🏛️

Sistema web para la Defensoría Universitaria desarrollado con React, TypeScript y Vite.

## 📋 Descripción

Este proyecto es una aplicación web moderna para gestionar los servicios y procesos de una Defensoría Universitaria. Incluye funcionalidades para estudiantes, personal administrativo y defensores.

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes de UI accesibles
- **Lucide React** - Iconos modernos

## 🎨 Paleta de Colores

El proyecto utiliza un sistema de colores semánticos con soporte para modo claro y oscuro:
- **Primary**: `#030213` (Azul muy oscuro)
- **Secondary**: Gris claro con tinte azul
- **Destructive**: `#d4183d` (Rojo para errores)
- **Muted**: `#ececf0` (Gris claro para elementos secundarios)

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Navegar al directorio
cd defensoria-universitaria

# Instalar dependencias
npm install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
```

### Construcción
```bash
# Construir para producción
npm run build
```

### Docker

Construye e inicia la imagen lista para producción.

```bash
# Construir la imagen
docker build -t defensoria-universitaria .

# Ejecutar el contenedor en el puerto 8080
docker run -d -p 8080:80 --name defensoria-web defensoria-universitaria
```

El contenedor sirve los archivos estáticos con Nginx y expone un endpoint de salud en `/health`.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── layout/         # Componentes de layout
│   ├── private/        # Componentes privados
│   ├── public/         # Componentes públicos
│   └── ui/             # Componentes de UI base
├── styles/             # Estilos globales
└── types.ts           # Definiciones de tipos
```

## 🌟 Características

- ✅ Diseño responsive y moderno
- ✅ Soporte para modo oscuro
- ✅ Componentes accesibles
- ✅ Tipado estricto con TypeScript
- ✅ Optimizado para rendimiento

## 👨‍💻 Desarrollo

**Rama de desarrollo**: `dev_angel`

Este README ha sido actualizado como prueba para subir cambios a GitHub.

---

*Proyecto desarrollado para la Defensoría Universitaria*
  