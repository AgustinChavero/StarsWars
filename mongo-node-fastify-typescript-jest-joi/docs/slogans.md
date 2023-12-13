# Challenge para perfil backend:

## Implementar una RESTful API que tome la información de la API de Star Wars (https://swapi.dev/).

### Las techs a utilizar son NodeJS, queda a libre elección la herramienta para armar el API.

- Objetivos:
  - Crear una sincronización de información que corra en un cron para mandar los datos a una base de datos propia usando MongoDB. (Se puede usar cualquier ORM/ODM).
  - Las entidades que se deberian implementar son:
    - People
    - Films
    - Starships
    - Planets
- Solo se deben implementar endpoints de obtención de información.
- Los 4 endpoints de listado de elementos deberia permitirme filtrar la informacion por al menos un atributo.
- Implementar los tests unitarios.

### Criterios de Evaluación:

- Este test va a estar evaluado de la siguiente manera:
  - Funcional: ¿La aplicación cumple con todos los puntos?
  - Code Quality: ¿El código se encuentra bien estructurado, limpio y es escalable?
  - Testing: ¿Todos los test unitarios del backend están desarrollados para realmente probar la funcionalidad?

### Agregado:

- Se agregara ESLint para tener un codigo mas limpio
