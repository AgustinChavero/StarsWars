# Proceso de desarrollo:

### Instalacion de MongoDB

    npm i mongodb

### Instalacion de Express

    npm i express

### Instalacion de Nodemon (para que el servidor se reinicie con cada cambio)

    npm i nodemon -D

- En el archivo package.json agregar y sobre escribir la siguiente linea de codigo en _"scripts": {}_

`"dev": "nodemon src/index.js"`

### Instalacion de Morgan (para ver peticiones que llegan al servidor)

    npm i morgan

### Instalacion de Mongoose

    npm i mongoose

- Recordar que la conexion esta hecha en Mongo Atlas

### Instalacion de Jest

    npm install --save-dev jest

- Necesario para los test unitarios

### Instalacion de Supertest

    npm install --save-dev supertest
