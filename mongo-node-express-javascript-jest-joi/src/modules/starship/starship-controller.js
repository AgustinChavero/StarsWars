const Starship = require("./starship-model");

const { bodySchema, querySchema } = require("./starship-schema");
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

const postStarship = async (req, res) => {
  const { body } = req;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const newStarship = await globalService.createElement(body, Starship);
  if (!newStarship) return customError(res, 409, "Starship not created");

  customResponse(res, 200, { message: "Starship created", newStarship });
};

const putStarship = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findStarship = await globalService.findElement(id, Starship);
  if (!findStarship) return customError(res, 404, "Starship not found");

  const starship = await globalService.updateElement(id, body, Starship);
  if (!starship) return customError(res, 409, "Starship not updated");

  return customResponse(res, 200, { message: "Starship updated", starship });
};

const getAllStarship = async (req, res) => {
  const { query } = req;

  const queryValidate = queryValidation(querySchema, req);
  if (queryValidate) return customError(res, 409, `${queryValidate}`);

  const starships = await globalService.findAllElement(Starship, query);
  if (!starships.length) return customError(res, 404, "Starships not found");

  customResponse(res, 200, { message: "Starships finded", starships });
};

const getStarship = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const starship = await globalService.findElement(id, Starship);
  if (!starship) return customError(res, 404, "Starship not found");

  return customResponse(res, 200, { message: "Starship finded", starship });
};

const deleteStarship = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findStarship = await globalService.findElement(id, Starship);
  if (!findStarship) return customError(res, 404, "Starship not found");

  const starship = await globalService.deleteElement(id, Starship);
  if (!starship) return customError(res, 409, "Starship not deleted");

  return customResponse(res, 200, { message: "Starship deleted", starship });
};

module.exports = {
  postStarship: catchedAsync(postStarship),
  putStarship: catchedAsync(putStarship),
  getAllStarship: catchedAsync(getAllStarship),
  getStarship: catchedAsync(getStarship),
  deleteStarship: catchedAsync(deleteStarship),
};
