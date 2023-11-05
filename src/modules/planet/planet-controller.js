const Planet = require("./planet-model");
const { ClientError } = require("../../utils/errors/error");
const { customResponse } = require("../../utils/errors/custom-response");
const { globalService } = require("../../utils/global-service/global-service");
const { createPlanet } = require("./planet-service");

const postPlanet = (req, res) => {
  const { body: data } = req;

  const newPlanet = createPlanet(data);

  customResponse(res, 200, { message: "Planet created", newPlanet });
};

const putPlanet = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const planet = globalService.updateElement(id, body, Planet, "Planet");

  customResponse(res, 200, { message: "Planet updated", planet });
};

const patchPlanet = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const planet = globalService.patchElement(id, body, Planet, "Planet");

  customResponse(res, 200, { message: "Planet updated", planet });
};

const getAllPlanet = (req, res) => {
  const { query } = req;

  const planets = globalService.findAllElement(Planet, query, "Planets");

  customResponse(res, 200, { message: "Planets finded", planets });
};

const getPlanet = (req, res) => {
  const { id } = req.params;

  const planet = globalService.findElement(id, Planet, "Planet");

  customResponse(res, 200, { message: "Planet finded", planet });
};

const deletePlanet = (req, res) => {
  const { id } = req.params;

  const planet = globalService.deleteElement(id, Planet, "Planet");

  customResponse(res, 200, { message: "Planet deleted", planet });
};

module.exports = {
  postPlanet,
  putPlanet,
  patchPlanet,
  getAllPlanet,
  getPlanet,
  deletePlanet,
};
