const People = require("./people-model");

const { bodySchema, querySchema } = require("./people-schema");
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

const postPeople = async (req, res) => {
  const { body } = req;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const newPeople = await globalService.createElement(body, People);
  if (!newPeople) return customError(res, 409, "People not created");

  customResponse(res, 200, { message: "People created", newPeople });
};

const putPeople = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const bodyValidate = bodyValidation(bodySchema, req);
  if (bodyValidate) return customError(res, 404, `${bodyValidate}`);

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findPeople = await globalService.findElement(id, People);
  if (!findPeople) return customError(res, 404, "People not found");

  const people = await globalService.updateElement(id, body, People);
  if (!people) return customError(res, 409, "People not updated");

  return customResponse(res, 200, { message: "People updated", people });
};

const getAllPeople = async (req, res) => {
  const { query } = req;

  const queryValidate = queryValidation(querySchema, req);
  if (queryValidate) return customError(res, 409, `${queryValidate}`);

  const people = await globalService.findAllElement(People, query);
  if (!people.length) return customError(res, 404, "Peoples not found");

  customResponse(res, 200, { message: "Peoples finded", people });
};

const getPeople = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const people = await globalService.findElement(id, People);
  if (!people) return customError(res, 404, "People not found");

  return customResponse(res, 200, { message: "People finded", people });
};

const deletePeople = async (req, res) => {
  const { id } = req.params;

  const paramsValidate = paramsValidation(paramsSchema, req);
  if (paramsValidate) return customError(res, 404, `${paramsValidate}`);

  const findPeople = await globalService.findElement(id, People);
  if (!findPeople) return customError(res, 404, "People not found");

  const people = await globalService.deleteElement(id, People);
  if (!people) return customError(res, 409, "People not deleted");

  return customResponse(res, 200, { message: "People deleted", people });
};

module.exports = {
  postPeople: catchedAsync(postPeople),
  putPeople: catchedAsync(putPeople),
  getAllPeople: catchedAsync(getAllPeople),
  getPeople: catchedAsync(getPeople),
  deletePeople: catchedAsync(deletePeople),
};
