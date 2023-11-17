const People = require("./people-model");
const ClientError = require("../../services/global-errors/client-error");
const { CastError } = require("mongoose").Error;
const {
  catchedAsync,
  customResponse,
  customError,
} = require("../../services/global-errors/index-error");
const { globalService } = require("../../services/global-functions/global-function");

const postPeople = async (req, res) => {
  const { body } = req;

  const newPeople = await globalService.createElement(body, People);
  if (!newPeople) throw new ClientError("People not created", 409);

  customResponse(res, 200, { message: "People created", newPeople });
};

const putPeople = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findPeople = await globalService.findElement(id, People);
    if (!findPeople) {
      return customError(res, 404, "People not found");
    }

    const people = await globalService.updateElement(id, body, People);
    if (!people) {
      return customError(res, 409, "People not updated");
    }

    return customResponse(res, 200, { message: "People updated", people });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const getAllPeople = async (req, res) => {
  const { query } = req;

  const people = await globalService.findAllElement(People, query);
  if (!people.length) throw new ClientError("Peoples not found", 404);

  customResponse(res, 200, { message: "Peoples finded", people });
};

const getPeople = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const people = await globalService.findElement(id, People);
    if (!people) {
      return customError(res, 404, "People not found");
    }

    return customResponse(res, 200, { message: "People finded", people });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

const deletePeople = async (req, res) => {
  const { id } = req.params;
  //Me veo obligado a utilizar un try catch porque no entiendo como manejar por completo el catcheo de CastError en todas sus variables
  try {
    const findPeople = await globalService.findElement(id, People);
    if (!findPeople) {
      return customError(res, 404, "People not found");
    }

    const people = await globalService.deleteElement(id, People);
    if (!people) {
      return customError(res, 409, "People not deleted");
    }

    return customResponse(res, 200, { message: "People deleted", people });
  } catch (error) {
    if (error instanceof CastError) {
      return customError(res, 400, "Please verify ID");
    }
  }
};

module.exports = {
  postPeople: catchedAsync(postPeople),
  putPeople: catchedAsync(putPeople),
  getAllPeople: catchedAsync(getAllPeople),
  getPeople: catchedAsync(getPeople),
  deletePeople: catchedAsync(deletePeople),
};
