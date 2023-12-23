# Inicializacion

- Tener docker desktop instalado

## Ejecucion general

        docker compose up --build

## Ejecucion individual

- Primero buildear

        docker build -t nombre-carpeta .

- Encender

        docker run -p port:port nombre-build
