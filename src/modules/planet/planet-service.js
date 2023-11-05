const Planet = require("./planet-model");
const { ClientError } = require("../../utils/errors/error");

const createPlanet = async (data) => {
  const existingPlanet = await Planet.findOne({ name: data.name });
  if (existingPlanet) throw new ClientError("Name in use", 409);

  const newPlanet = await new Planet(data);
  return newPlanet;
};

module.exports = { createPlanet };
