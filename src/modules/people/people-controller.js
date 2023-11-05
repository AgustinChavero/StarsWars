const People = require("./people-model");
const { ClientError } = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postPeople = (req, res) => {
  const { body } = req;

  const newPeople = globalService.createElement(body, People, "People");

  customResponse(res, 200, { message: "People created", newPeople });
};

const putPeople = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const people = globalService.updateElement(id, body, People, "People");

  customResponse(res, 200, { message: "People updated", people });
};

const patchPeople = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const people = globalService.patchElement(id, body, People, "People");

  customResponse(res, 200, { message: "People updated", people });
};

const getAllPeople = (req, res) => {
  const { query } = req;

  const peoples = globalService.findAllElement(People, query, "Peoples");

  customResponse(res, 200, { message: "Peoples finded", peoples });
};

const getPeople = (req, res) => {
  const { id } = req.params;

  const people = globalService.findElement(id, People, "People");

  customResponse(res, 200, { message: "People finded", people });
};

const deletePeople = (req, res) => {
  const { id } = req.params;

  const people = globalService.deleteElement(id, People, "People");

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
