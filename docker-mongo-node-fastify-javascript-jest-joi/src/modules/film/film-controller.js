const Film = require("./film-model");

const { bodySchema, querySchema } = require("./film-schema");
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

const postFilm = async (req, res, next) => {
  const { body } = req;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const newFilm = await globalService.createElement(body, Film);
  if (!newFilm) return customError(res, 409, "Film not created");

  customResponse(res, 200, { message: "Film created", newFilm });
};

const putFilm = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findFilm = await globalService.findElement(id, Film);
  if (!findFilm) return customError(res, 404, "Film not found");

  const film = await globalService.updateElement(id, body, Film);
  if (!film) return customError(res, 409, "Film not updated");

  return customResponse(res, 200, { message: "Film updated", film });
};

const getAllFilm = async (req, res) => {
  const { query } = req;

  const queryValidate = queryValidation(querySchema, req);
  if (queryValidate) return customError(res, 409, `${queryValidate}`);

  const films = await globalService.findAllElement(Film, query);
  if (!films.length) return customError(res, 404, "Films not found");

  customResponse(res, 200, { message: "Films finded", films });
};

const getFilm = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const film = await globalService.findElement(id, Film);
  if (!film) return customError(res, 404, "Film not found");

  return customResponse(res, 200, { message: "Film finded", film });
};

const deleteFilm = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findFilm = await globalService.findElement(id, Film);
  if (!findFilm) return customError(res, 404, "Film not found");

  const film = await globalService.deleteElement(id, Film);
  if (!film) return customError(res, 409, "Film not deleted");

  return customResponse(res, 200, { message: "Film deleted", film });
};

module.exports = {
  postFilm: catchedAsync(postFilm),
  putFilm: catchedAsync(putFilm),
  getAllFilm: catchedAsync(getAllFilm),
  getFilm: catchedAsync(getFilm),
  deleteFilm: catchedAsync(deleteFilm),
};
