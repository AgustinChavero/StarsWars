const Planet = require("./planet-model");
const ClientError = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postPlanet = async (req, res) => {
  const { body } = req;

  const newPlanet = await globalService.createElement(body, Planet);
  if (!newPlanet) throw new ClientError("Planets not created", 409);

  customResponse(res, 200, { message: "Planet created", newPlanet });
};

const putPlanet = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findPlanet = await globalService.findElement(id, Planet);
  if (!findPlanet) throw new ClientError("Planet not found", 409);

  const planet = await globalService.updateElement(id, body, Planet);
  if (!planet) throw new ClientError("Planet not updated", 404);

  customResponse(res, 200, { message: "Planet updated", planet });
};

const patchPlanet = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findPlanet = await globalService.findElement(id, Planet);
  if (!findPlanet) throw new ClientError("Planet not found", 409);

  const planet = await globalService.patchElement(id, body, Planet);
  if (!planet) throw new ClientError("Planet not updated", 409);

  customResponse(res, 200, { message: "Planet updated", planet });
};

const getAllPlanet = async (req, res) => {
  const { query } = req;

  const planets = await globalService.findAllElement(Planet, query);
  if (!planets.length) throw new ClientError("Planets not found", 404);

  customResponse(res, 200, { message: "Planets finded", planets });
};

const getPlanet = async (req, res) => {
  const { id } = req.params;

  const planet = await globalService.findElement(id, Planet);
  if (!planet) throw new ClientError("Planet not found", 404);

  customResponse(res, 200, { message: "Planet finded", planet });
};

const deletePlanet = async (req, res) => {
  const { id } = req.params;

  const findPlanet = await globalService.findElement(id, Planet);
  if (!findPlanet) throw new ClientError("Planet not found", 409);

  const planet = await globalService.deleteElement(id, Planet);
  if (!planet) throw new ClientError("Planet not deleted", 409);

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
