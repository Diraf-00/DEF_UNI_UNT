# 🗺️ Mapa del Proyecto: Defensoría Universitaria UNT

Este documento es una guía educativa diseñada para que entiendas la función exacta de cada archivo y carpeta de este proyecto, organizada en tres grandes grupos funcionales. Úsalo como referencia para aprender cómo se estructura una aplicación web moderna.

---

## 📂 Grupo A: Desarrollo y Diseño (El Corazón de la Web)
Este grupo contiene todo el código fuente, componentes y configuraciones de diseño. Es el único grupo que vas a modificar activamente cuando quieras cambiar la apariencia o la funcionalidad de la página.

### 📁 Carpetas Principales
*   `src/` (Source - Código Fuente): Aquí dentro está programado el 99% de tu aplicación web.
    *   `src/main.tsx`: Es el "interruptor de encendido" de la web. Le dice al navegador que inicie la aplicación de React y la dibuje dentro del `index.html`.
    *   `src/index.css`: Contiene los estilos de diseño globales, fuentes y colores de toda la página web usando TailwindCSS.
    *   `src/App.tsx`: Es el "organizador de rutas". Define qué componentes cargar según la dirección en la que esté el usuario (por ejemplo, si entra a `/base-legal` o `/procedimiento`).
    *   `src/types.ts`: Define las "plantillas de datos". Especifica qué datos requiere el formulario (como nombre, DNI, tipo de reclamo) para evitar errores.
    *   `src/global.d.ts`: Le ayuda a TypeScript a entender que está bien importar archivos que no son código de programación puro (como imágenes `.png`, `.jpg` o archivos de diseño `.css`).
    *   `src/components/layout/`: Contiene el encabezado (`Navbar.tsx`) y el pie de página (`Footer.tsx`) que se muestran en toda la web de forma fija.
    *   `src/components/public/`: Contiene las páginas públicas a las que acceden los usuarios:
        *   `Home.tsx`: La página principal de bienvenida.
        *   `BaseLegal.tsx`: Muestra las leyes que respaldan la defensoría.
        *   `Funciones.tsx`: Explica qué hace y qué no hace el defensor universitario.
        *   `Procedimiento.tsx`: Guía interactiva sobre los pasos de un caso.
        *   `Llenado-formularios.tsx`: Página explicativa sobre los anexos.
        *   `FormularioAnexo01.tsx`: El formulario interactivo paso a paso para el registro de quejas.
    *   `src/components/ui/`: Una caja de herramientas con componentes visuales listos para reutilizar, como botones (`button.tsx`), campos de texto (`input.tsx`), diálogos (`dialog.tsx`), etc.
    *   `src/services/pdf/anexo01-generator.ts`: El cerebro que toma las respuestas del formulario y la firma del usuario, las ordena, y fabrica el documento PDF listo para descargar.
    *   `src/validations/form-schemas.ts`: Contiene las reglas del formulario (por ejemplo: "el DNI debe tener 8 números exactos" o "este campo es obligatorio").
*   `images/`: Carpeta que guarda las fotos utilizadas en el diseño de la web (como banners y fotos del defensor).
*   `public/`: Guarda archivos estáticos que se envían directamente al navegador sin procesarse, como el logo oficial de la universidad (`logo-unt.svg`) o los archivos PDF de los reglamentos para descargar.
*   `build/`: El resultado de compilar toda la web para producción. Contiene puros archivos HTML, CSS y JS clásicos que los navegadores pueden leer de golpe. Es la que usas con **"Go Live"**.

### 📄 Archivos de Configuración (Las Reglas del Juego)
*   `index.html`: La única página HTML real del proyecto. Contiene una cajita especial (`<div id="root"></div>`) donde React inyecta y dibuja todas las vistas dinámicamente.
*   `package.json`: El "inventario" de tu proyecto. Aquí se listan todas las herramientas de desarrollo que utiliza la página (como React o la librería de PDFs) y los comandos rápidos para ejecutarla.
*   `package-lock.json`: Un registro superdetallado que asegura que todas las personas del equipo instalen exactamente las mismas versiones de las herramientas para evitar fallos.
*   `tsconfig.json` y `tsconfig.node.json`: Archivos con las directivas de comportamiento para TypeScript (el supervisor que corrige la sintaxis del código).
*   `vite.config.ts`: La configuración del compilador Vite, que optimiza y empaqueta el código para que la página sea ultrarrápida.

---

## 📦 Grupo B: Despliegue y Servidores (La Caja de Transporte)
Este grupo contiene herramientas para virtualizar e implementar tu página web en internet. **No necesitas tocar ninguno de estos archivos durante el desarrollo diario.**

*   `Dockerfile`: Una receta paso a paso para compilar la web y meterla dentro de un contenedor cerrado (Docker) listo para funcionar en cualquier servidor web del mundo.
*   `docker-compose.yml`: Un archivo que automatiza el inicio y la detención de los contenedores Docker con un solo comando.
*   `nginx.conf`: Configuración del servidor Nginx (un programa especializado que recibe a los visitantes en internet y les entrega los archivos de la web optimizados).
*   `.dockerignore`: Lista de archivos que no deben meterse en el contenedor de Docker para que no pese demasiado (como la carpeta temporal `node_modules`).

---

## 📝 Grupo C: Documentos de Ayuda y Notas (El Manual de Usuario)
Archivos de texto planos destinados exclusivamente a ayudarte a entender el proyecto y recordar comandos útiles. Puedes leerlos cuando tengas dudas.

*   `README.md`: El manual de bienvenida con la descripción general del proyecto, la estructura y cómo iniciarlo.
*   `QUICK-START.md`: Una guía rápida paso a paso para los que desean correr el proyecto usando Docker.
*   `GUIA-EQUIPO.md`: Normas y buenas prácticas dirigidas al equipo de programadores sobre cómo escribir código en este proyecto.
*   `README_DEPLOY.md`: Instrucciones técnicas de cómo subir esta web a servidores de internet.
*   `COMANDOS-RAPIDOS.txt`: Un "bloc de notas" con comandos útiles que usarás constantemente.
*   `commands.txt`: Notas con comandos de Docker que se usaron en el pasado.
*   `informacion.txt`: Bloc de notas con textos informativos redactados que se usan en las distintas secciones de la web.
