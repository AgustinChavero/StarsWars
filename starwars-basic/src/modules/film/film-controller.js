const Film = require("./film-model");
const ClientError = require("../../utils/errors/client-error");
const { CastError } = require("mongoose").Error;
const {
  catchedAsync,
  customResponse,
  customError,
} = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postFilm = async (req, res) => {
  const { body } = req;

  const newFilm = await globalService.createElement(body, Film);
  if (!newFilm) throw new ClientError("Film not created", 409);

  customResponse(res, 200, { message: "Film created", newFilm });
};

const putFilm = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findFilm = await globalService.findElement(id, Film);
    if (!findFilm) {
      return customError(res, 404, "Film not found");
    }

    const film = await globalService.updateElement(id, body, Film);
    if (!film) {
      return customError(res, 409, "Film not updated");
    }

    return customResponse(res, 200, { message: "Film updated", film });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const getAllFilm = async (req, res) => {
  const { query } = req;

  const films = await globalService.findAllElement(Film, query);
  if (!films.length) throw new ClientError("Film not found", 404);

  customResponse(res, 200, { message: "Films finded", films });
};

const getFilm = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const film = await globalService.findElement(id, Film);
    if (!film) {
      return customError(res, 404, "Film not found");
    }

    return customResponse(res, 200, { message: "Film finded", film });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const deleteFilm = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findFilm = await globalService.findElement(id, Film);
    if (!findFilm) {
      return customError(res, 404, "Film not found");
    }

    const film = await globalService.deleteElement(id, Film);
    if (!film) {
      return customError(res, 409, "Film not deleted");
    }

    return customResponse(res, 200, { message: "Film deleted", film });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

module.exports = {
  postFilm: catchedAsync(postFilm),
  putFilm: catchedAsync(putFilm),
  getAllFilm: catchedAsync(getAllFilm),
  getFilm: catchedAsync(getFilm),
  deleteFilm: catchedAsync(deleteFilm),
};
