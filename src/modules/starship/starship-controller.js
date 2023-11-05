const Starship = require("./starship-model");
const { ClientError } = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postStarship = (req, res) => {
  const { body } = req;

  const newStarship = globalService.createElement(body, Starship, "Starship");

  customResponse(res, 200, { message: "Starship created", newStarship });
};

const putStarship = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const starship = globalService.updateElement(id, body, Starship, "Starship");

  customResponse(res, 200, { message: "Starship updated", starship });
};

const patchStarship = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const starship = globalService.patchElement(id, body, Starship, "Starship");

  customResponse(res, 200, { message: "Starship updated", starship });
};

const getAllStarship = (req, res) => {
  const { query } = req;

  const starships = globalService.findAllElement(Starship, query, "Starships");

  customResponse(res, 200, { message: "Starships finded", starships });
};

const getStarship = (req, res) => {
  const { id } = req.params;

  const starship = globalService.findElement(id, Starship, "Starship");

  customResponse(res, 200, { message: "Starship finded", starship });
};

const deleteStarship = (req, res) => {
  const { id } = req.params;

  const starship = globalService.deleteElement(id, Starship, "Starship");

  customResponse(res, 200, { message: "Starship deleted", starship });
};

module.exports = {
  postStarship: catchedAsync(postStarship),
  putStarship: catchedAsync(putStarship),
  patchStarship: catchedAsync(patchStarship),
  getAllStarship: catchedAsync(getAllStarship),
  getStarship: catchedAsync(getStarship),
  deleteStarship: catchedAsync(deleteStarship),
};
