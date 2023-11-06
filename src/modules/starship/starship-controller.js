const Starship = require("./starship-model");
const ClientError = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
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

  const findStarship = await globalService.findElement(id, Starship);
  if (!findStarship) throw new ClientError("Starship not found", 409);

  const starship = await globalService.updateElement(id, body, Starship);
  if (!starship) throw new ClientError("Starship not updated", 404);

  customResponse(res, 200, { message: "Starship updated", starship });
};

const patchStarship = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findStarship = await globalService.findElement(id, Starship);
  if (!findStarship) throw new ClientError("Starship not found", 409);

  const starship = await globalService.patchElement(id, body, Starship);
  if (!starship) throw new ClientError("Starship not updated", 404);

  customResponse(res, 200, { message: "Starship updated", starship });
};

const getAllStarship = async (req, res) => {
  const { query } = req;

  const elementsToFind = await globalService.findAllElement(Starship, query);
  if (!elementsToFind.length) throw new ClientError("Starships not found", 404);

  customResponse(res, 200, { message: "Starships finded", elementsToFind });
};

const getStarship = async (req, res) => {
  const { id } = req.params;

  const starship = await globalService.findElement(id, Starship);
  if (!starship) throw new ClientError("Starship not found", 404);

  customResponse(res, 200, { message: "Starship finded", starship });
};

const deleteStarship = async (req, res) => {
  const { id } = req.params;

  const findStarship = await globalService.findElement(id, Starship);
  if (!findStarship) throw new ClientError("Starship not found", 409);

  const starship = await globalService.deleteElement(id, Starship);
  if (!starship) throw new ClientError("Starship not deleted", 404);

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
