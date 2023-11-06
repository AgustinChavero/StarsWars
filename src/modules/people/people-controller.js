const People = require("./people-model");
const ClientError = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postPeople = async (req, res) => {
  const { body } = req;

  const newPeople = await globalService.createElement(body, People);
  if (!newPeople) throw new ClientError("People not created", 409);

  customResponse(res, 200, { message: "People created", newPeople });
};

const putPeople = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findPeople = await globalService.findElement(id, People);
  if (!findPeople) throw new ClientError("People not found", 409);

  const people = await globalService.updateElement(id, body, People);
  if (!people) throw new ClientError("People not updated", 404);

  customResponse(res, 200, { message: "People updated", people });
};

const patchPeople = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findPeople = await globalService.findElement(id, People);
  if (!findPeople) throw new ClientError("People not found", 409);

  const people = await globalService.patchElement(id, body, People);
  if (!people) throw new ClientError("People not updated", 404);

  customResponse(res, 200, { message: "People updated", people });
};

const getAllPeople = async (req, res) => {
  const { query } = req;

  const peoples = await globalService.findAllElement(People, query, "Peoples");
  if (!peoples.length) throw new ClientError("Peoples not found", 404);

  customResponse(res, 200, { message: "Peoples finded", peoples });
};

const getPeople = async (req, res) => {
  const { id } = req.params;

  const people = await globalService.findElement(id, People);
  if (!people) throw new ClientError("People not found", 404);

  customResponse(res, 200, { message: "People finded", people });
};

const deletePeople = async (req, res) => {
  const { id } = req.params;

  const findPeople = await globalService.findElement(id, People);
  if (!findPeople) throw new ClientError("People not found", 409);

  const people = await globalService.deleteElement(id, People);
  if (!people) throw new ClientError("People not deleted", 404);

  customResponse(res, 200, { message: "People deleted", people });
};

module.exports = {
  postPeople: catchedAsync(postPeople),
  putPeople: catchedAsync(putPeople),
  patchPeople: catchedAsync(patchPeople),
  getAllPeople: catchedAsync(getAllPeople),
  getPeople: catchedAsync(getPeople),
  deletePeople: catchedAsync(deletePeople),
};
