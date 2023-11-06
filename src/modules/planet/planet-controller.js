const Planet = require("./planet-model");
const ClientError = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");
const { createPlanet } = require("./planet-service");

const postPlanet = (req, res) => {
  const { body: data } = req;

  const newPlanet = createPlanet(data);
  if (!newPlanet) throw new ClientError("Planets not created", 400);

  customResponse(res, 200, { message: "Planet created", newPlanet });
};

const putPlanet = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const planet = globalService.updateElement(id, body, Planet, "Planet");
  if (!planet) throw new ClientError("Planet not found", 400);

  customResponse(res, 200, { message: "Planet updated", planet });
};

const patchPlanet = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const planet = globalService.patchElement(id, body, Planet, "Planet");
  if (!planet) throw new ClientError("Planet not found", 400);

  customResponse(res, 200, { message: "Planet updated", planet });
};

const getAllPlanet = (req, res) => {
  const { query } = req;

  const planets = globalService.findAllElement(Planet, query, "Planets");
  if (!planets.length) throw new ClientError("Planets not found", 400);

  customResponse(res, 200, { message: "Planets finded", planets });
};

const getPlanet = (req, res) => {
  const { id } = req.params;

  const planet = globalService.findElement(id, Planet, "Planet");
  if (!planet) throw new ClientError("Planet not found", 400);

  customResponse(res, 200, { message: "Planet finded", planet });
};

const deletePlanet = (req, res) => {
  const { id } = req.params;

  const planet = globalService.deleteElement(id, Planet, "Planet");
  if (!planet) throw new ClientError("Planet not found", 400);

  customResponse(res, 200, { message: "Planet deleted", planet });
};

module.exports = {
  postPlanet: catchedAsync(postPlanet),
  putPlanet: catchedAsync(putPlanet),
  patchPlanet: catchedAsync(patchPlanet),
  getAllPlanet: catchedAsync(getAllPlanet),
  getPlanet: catchedAsync(getPlanet),
  deletePlanet: catchedAsync(deletePlanet),
};
