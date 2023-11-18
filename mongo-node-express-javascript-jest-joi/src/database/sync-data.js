const axios = require("axios");

const Film = require("../modules/film/film-model");
const People = require("../modules/people/people-model");
const Planet = require("../modules/planet/planet-model");
const Starship = require("../modules/starship/starship-model");

const entityMappings = [
  { entityName: "films", model: Film },
  { entityName: "people", model: People },
  { entityName: "starships", model: Starship },
  { entityName: "planets", model: Planet },
];

async function clearData(model) {
  try {
    await model.deleteMany({});
    console.log(`All records deleted from ${model.collection.name}`);
  } catch (error) {
    console.error(`Error to delete records from ${model.collection.name}:`, error);
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

      console.log(`Successful synchronization of ${entityName}`);
    }

    console.log("Synchronization of all entities completed");
  } catch (error) {
    console.error("Synchronization error:", error);
  }
}

module.exports = { syncData };
