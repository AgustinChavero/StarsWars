const Film = require("./film-model");
const { ClientError } = require("../../utils/errors/error");
const { customResponse } = require("../../utils/errors/custom-response");
const { create } = require("./film-service");
const { globalService } = require("../../utils/global-service/global-service");

const postFilm = (req, res) => {
  const { body: data } = req;

  const newFilm = create(data);

  if (!newFilm) throw new ClientError("Error to create film", 409);

  customResponse(res, 200, { message: "Film created", newFilm });
};

const putFilm = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const film = globalService.updateElement(id, body, Film, "Film");

  customResponse(res, 200, { message: "Film updated", film });
};

const patchFilm = (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const film = globalService.patchElement(id, body, Film, "Film");

  customResponse(res, 200, { message: "Film updated", film });
};

const getAllFilm = (req, res) => {};

const getFilm = (req, res) => {
  const { id } = req.params;

  const film = globalService.findElement(id, Film, "Film");

  customResponse(res, 200, { message: "Film finded", film });
};

const deleteFilm = (req, res) => {
  const { id } = req.params;

  const film = globalService.deleteElement(id, Film, "Film");

  customResponse(res, 200, { message: "Film deleted", film });
};

module.exports = {
  postFilm,
  putFilm,
  patchFilm,
  getAllFilm,
  getFilm,
  deleteFilm,
};
