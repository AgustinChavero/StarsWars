const Starship = require("./starship-model");
const ClientError = require("../../utils/errors/client-error");
const { CastError } = require("mongoose").Error;
const {
  catchedAsync,
  customResponse,
  customError,
} = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postStarship = async (req, res) => {
  const { body } = req;

  const newStarship = await globalService.createElement(body, Starship);
  if (!newStarship) throw new ClientError("Starship not created", 409);

  customResponse(res, 200, { message: "Starship created", newStarship });
};

const putStarship = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findStarship = await globalService.findElement(id, Starship);
    if (!findStarship) {
      return customError(res, 404, "Starship not found");
    }

    const starship = await globalService.updateElement(id, body, Starship);
    if (!starship) {
      return customError(res, 409, "Starship not updated");
    }

    return customResponse(res, 200, { message: "Starship updated", starship });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const getAllStarship = async (req, res) => {
  const { query } = req;

  const starships = await globalService.findAllElement(Starship, query);
  if (!starships.length) throw new ClientError("Starships not found", 404);

  customResponse(res, 200, { message: "Starships finded", starships });
};

const getStarship = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const starship = await globalService.findElement(id, Starship);
    if (!starship) {
      return customError(res, 404, "Starship not found");
    }

    return customResponse(res, 200, { message: "Starship finded", starship });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const deleteStarship = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findStarship = await globalService.findElement(id, Starship);
    if (!findStarship) {
      return customError(res, 404, "Starship not found");
    }

    const starship = await globalService.deleteElement(id, Starship);
    if (!starship) {
      return customError(res, 409, "Starship not deleted");
    }

    return customResponse(res, 200, { message: "Starship deleted", starship });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

module.exports = {
  postStarship: catchedAsync(postStarship),
  putStarship: catchedAsync(putStarship),
  getAllStarship: catchedAsync(getAllStarship),
  getStarship: catchedAsync(getStarship),
  deleteStarship: catchedAsync(deleteStarship),
};
