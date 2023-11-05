const Film = require("./film-model");
const { ClientError } = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");
const { createFilm } = require("./film-service");

const postFilm = (req, res) => {
  const { body: data } = req;

  const newFilm = createFilm(data);

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

const getAllFilm = (req, res) => {
  const { query } = req;

  const films = globalService.findAllElement(Film, query, "Films");

  customResponse(res, 200, { message: "Films finded", films });
};

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
  postFilm: catchedAsync(postFilm),
  putFilm: catchedAsync(putFilm),
  patchFilm: catchedAsync(patchFilm),
  getAllFilm: catchedAsync(getAllFilm),
  getFilm: catchedAsync(getFilm),
  deleteFilm: catchedAsync(deleteFilm),
};
