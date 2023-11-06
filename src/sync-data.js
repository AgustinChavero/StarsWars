const axios = require("axios");
const mongoose = require("mongoose");

const Film = require("./modules/film/film-model");
const People = require("./modules/people/people-model");
const Planet = require("./modules/planet/planet-model");
const Starship = require("./modules/starship/starship-model");

const entityMappings = [
  { entityName: "films", model: Film },
  { entityName: "people", model: People },
  { entityName: "starships", model: Starship },
  { entityName: "planets", model: Planet },
];

async function clearData(model) {
  try {
    await model.deleteMany({});
    console.log(`Eliminados todos los registros de ${model.collection.name}`);
  } catch (error) {
    console.error(`Error al eliminar registros de ${model.collection.name}:`, error);
  }
}

async function syncData() {
  try {
    for (const mapping of entityMappings) {
      await clearData(mapping.model);
    }

    for (const mapping of entityMappings) {
      const entityName = mapping.entityName;
      const model = mapping.model;

      const response = await axios.get(`https://swapi.dev/api/${entityName}`);
      const starWarsData = response.data.results;

      await model.create(starWarsData);

      console.log(`Sincronización exitosa de ${entityName}`);
    }

    console.log("Sincronización de todas las entidades completada");
  } catch (error) {
    console.error("Error en la sincronización:", error);
  }
}

module.exports = { syncData };
