import axios from "axios";
import { Model } from "mongoose";

import FilmModel from "../modules/film-schema";

interface EntityMapping {
  entityName: string;
  model: Model<any>;
}

const entityMappings: EntityMapping[] = [{ entityName: "films", model: FilmModel }];

async function clearData(model: Model<any>): Promise<void> {
  try {
    await model.deleteMany({});
    console.log(`All records deleted from ${model.collection.name}`);
  } catch (error) {
    console.error(`Error to delete records from ${model.collection.name}:`, error);
  }
}

async function syncData(): Promise<void> {
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

    console.log("Synchronization completed");
  } catch (error) {
    console.error("Synchronization error:", error);
  }
}

export { syncData };
