# API de Star Wars (https://swapi.dev/).

- El proyecto esta hecho en diferentes partes, como veran estan divididas en carpetas que estan nombradas segun lo que se utilizo, la unica diferencia entre ellas es la arquitectura y los lenguajes, su funcionamiento es el mismo.

  - Microservices + Docker + MongoDB Atlas + Node + Fastify + Javascript + Mongoose + Jest + Joi
  - MongoDB Atlas + NET + ASP.NET + C#: En proceso
  - MongoDB Atlas + Node + Express + Javascript + Mongoose + Jest + Joi
  - MongoDB Atlas + Node + Fastify + TypeScript + Mongoose + Jest

- Comentarios:
  - La documentacion esta en español para el facil entendimiento
  - La nomenclatura del codigo, asi como el codigo, esta en ingles, inclusive los mensajes de error
  - La arquitectura se hiso tomando de ejemplo la arquitectura horizontal y la mvc, buscando optimizar la velocidad del desarrollo de cualquier proyecto pequeño
  - Tener en cuenta que cada vez que se inicie el backend se dropeara la base de datos y se resincronizara con la api de Starwars
  - Para realizar los testeos de los endpoints pueden utilizar Postman, sus archivos se encuentra en la carpetas documentation
  - Al ser algo hecho por solo una persona solo se hiso uso de la rama main

### Guia para todas las carpetas:

#### Docs-arquitecture.text

`Se encuentra la arquitectura del proyecto y la explicacion de donde van los archivos y que hacen`

#### Docs-starswars.postman_collection

`Se encuentran para importar todos los endpoints del proyecto`
