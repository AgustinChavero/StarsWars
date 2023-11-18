const Planet = require("./planet-model");

const { bodySchema, querySchema } = require("./planet-schema");
const { paramsSchema } = require("../../services/global-validations/global-schema");
const {
  bodyValidation,
  paramsValidation,
  queryValidation,
} = require("../../services/global-validations/global-validation");
const { globalService } = require("../../services/global-functions/global-function");
const {
  catchedAsync,
  customResponse,
  customError,
} = require("../../services/global-errors/index-error");

const postPlanet = async (req, res) => {
  const { body } = req;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const newPlanet = await globalService.createElement(body, Planet);
  if (!newPlanet) return customError(res, 409, "Planet not created");

  customResponse(res, 200, { message: "Planet created", newPlanet });
};

const putPlanet = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findPlanet = await globalService.findElement(id, Planet);
  if (!findPlanet) return customError(res, 404, "Planet not found");

  const planet = await globalService.updateElement(id, body, Planet);
  if (!planet) return customError(res, 409, "Planet not updated");

  return customResponse(res, 200, { message: "Planet updated", planet });
};

const getAllPlanet = async (req, res) => {
  const { query } = req;

  const queryValidate = queryValidation(querySchema, req);
  if (queryValidate) return customError(res, 409, `${queryValidate}`);

  const planets = await globalService.findAllElement(Planet, query);
  if (!planets.length) return customError(res, 404, "Planets not found");

  customResponse(res, 200, { message: "Planets finded", planets });
};

const getPlanet = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const planet = await globalService.findElement(id, Planet);
  if (!planet) return customError(res, 404, "Planet not found");

  return customResponse(res, 200, { message: "Planet finded", planet });
};

const deletePlanet = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findPlanet = await globalService.findElement(id, Planet);
  if (!findPlanet) return customError(res, 404, "Planet not found");

  const planet = await globalService.deleteElement(id, Planet);
  if (!planet) return customError(res, 409, "Planet not deleted");

  return customResponse(res, 200, { message: "Planet deleted", planet });
};

module.exports = {
  postPlanet: catchedAsync(postPlanet),
  putPlanet: catchedAsync(putPlanet),
  getAllPlanet: catchedAsync(getAllPlanet),
  getPlanet: catchedAsync(getPlanet),
  deletePlanet: catchedAsync(deletePlanet),
};
