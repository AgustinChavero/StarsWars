const Planet = require("./planet-model");
const ClientError = require("../../utils/errors/client-error");
const { CastError } = require("mongoose").Error;
const {
  catchedAsync,
  customResponse,
  customError,
} = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postPlanet = async (req, res) => {
  const { body } = req;

  const newPlanet = await globalService.createElement(body, Planet);
  if (!newPlanet) throw new ClientError("Planet not created", 409);

  customResponse(res, 200, { message: "Planet created", newPlanet });
};

const putPlanet = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findPlanet = await globalService.findElement(id, Planet);
    if (!findPlanet) {
      return customError(res, 404, "Planet not found");
    }

    const planet = await globalService.updateElement(id, body, Planet);
    if (!planet) {
      return customError(res, 409, "Planet not updated");
    }

    return customResponse(res, 200, { message: "Planet updated", planet });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const getAllPlanet = async (req, res) => {
  const { query } = req;

  const planets = await globalService.findAllElement(Planet, query);
  if (!planets.length) throw new ClientError("Planets not found", 404);

  customResponse(res, 200, { message: "Planets finded", planets });
};

const getPlanet = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const planet = await globalService.findElement(id, Planet);
    if (!planet) {
      return customError(res, 404, "Planet not found");
    }

    return customResponse(res, 200, { message: "Planet finded", planet });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const deletePlanet = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findPlanet = await globalService.findElement(id, Planet);
    if (!findPlanet) {
      return customError(res, 404, "Planet not found");
    }

    const planet = await globalService.deleteElement(id, Planet);
    if (!planet) {
      return customError(res, 409, "Planet not deleted");
    }

    return customResponse(res, 200, { message: "Planet deleted", planet });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

module.exports = {
  postPlanet: catchedAsync(postPlanet),
  putPlanet: catchedAsync(putPlanet),
  getAllPlanet: catchedAsync(getAllPlanet),
  getPlanet: catchedAsync(getPlanet),
  deletePlanet: catchedAsync(deletePlanet),
};
