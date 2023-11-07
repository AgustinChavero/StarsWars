# Node + Express + JavaScript + MongoDB Atlas + Mongoose + Jest + Joi:

- Comentarios:
  - La documentacion esta en español para el facil entendimiento
  - La nomenclatura del codigo, asi como el codigo, esta todo en ingles, inclusive los mensajes de error
  - La arquitectura se hiso tomando de ejemplo la arquitectura horizontal y la mvc, buscando optimizar la velocidad del desarrollo del proyecto
  - Tener en cuenta que cada vez que se inicie el backend se dropeara la base de datos y se resincronizara con la api de Starwars
  - Para realizar los testeos de los endpoints asi como todo el codigo utilice Postman, su archivo se encuentra en la carpeta documentation
  - Al ser algo hecho por solo una persona solo se hiso uso de la rama main
  - Las credenciales de inicio se dejaran en el codigo y no se hara uso del .env para facilitar su testeo en los proximos dias

## API de Star Wars (https://swapi.dev/).

### Guia

#### Documentation-arquitecture.text

`Se encuentra la arquitectura del proyecto y la explicacion de donde van los archivos y que hacen`

#### Documentation-process.md

`Se encuentran anotados todos las librerias que se instalaron en el proceso`

#### Documentation-starswars.postman_collection

`Se encuentran para importar todos los endpoints del proyecto`

#### Instalacion de dependencias

`Parado en la carpeta raiz, ejecutar:`

                npm i

#### Inicializacion de la APIRest

`Parado en la carpeta raiz, ejecutar:`

                npm run dev

#### Ejecucion de los tests

`Parado en la carpeta raiz, y con el backend encendido, ejecutar`

                npx jest
