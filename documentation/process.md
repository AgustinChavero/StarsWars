# Proceso de desarrollo:

    npm init

    git init

### Instalacion de MongoDB

    npm i mongodb

### Instalacion de Express

    npm i express

### Instalacion de Nodemon (para que el servidor se reinicie con cada cambio)

    npm i nodemon -D

-   En el archivo package.json agregar y sobre escribir la siguiente linea de codigo en *"scripts": {}*

``
"dev": "nodemon src/index.js"
``

### Instalacion de Morgan (para ver peticiones que llegan al servidor)

    npm i morgan

### Instalacion de Mongoose

    npm i mongoose

-   Recordar que la conexion esta hecha en Mongo Atlas