# Guía de Despliegue - Defensoría Universitaria

Esta guía detalla los pasos para desplegar la aplicación "Defensoría Universitaria" utilizando Docker.

## Prerrequisitos

- Tener [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en el servidor.

## Opción 1: Despliegue Rápido (Recomendado)

Si tienes los archivos del proyecto (incluyendo `docker-compose.yml` y `Dockerfile`), simplemente ejecuta:

1.  Abre una terminal en la carpeta del proyecto.
2.  Construye y levanta el contenedor en segundo plano:

    ```bash
    docker-compose up -d --build
    ```

3.  La aplicación estará disponible en el puerto 80 (http://localhost o la IP del servidor).

Para detener la aplicación:

```bash
docker-compose down
```

## Opción 2: Despliegue Manual con Docker

Si prefieres usar comandos directos de Docker o no tienes Docker Compose:

1.  **Construir la imagen:**

    ```bash
    docker build -t defensoria-app .
    ```

2.  **Correr el contenedor:**

    ```bash
    docker run -d -p 80:80 --name defensoria-container defensoria-app
    ```

Para detenerlo:

```bash
docker stop defensoria-container
docker rm defensoria-container
```

## Solución de Problemas

-   **Puerto ocupado:** Si el puerto 80 ya está en uso, modifica el archivo `docker-compose.yml` y cambia `"80:80"` por `"8080:80"` (o cualquier otro puerto libre). Luego accede vía `http://localhost:8080`.
-   **Ver logs:** Para ver si hay errores en el servidor web:
    ```bash
    docker logs -f defensoria-app
    ```
