const Film = require("./film-model");
const ClientError = require("../../utils/errors/error");
const { customResponse, catchedAsync } = require("../../utils/errors/index-error");
const { globalService } = require("../../utils/global-service/global-service");

const postFilm = async (req, res) => {
  const { body } = req;

  const newFilm = await globalService.createElement(body, Film);
  if (!newFilm) throw new ClientError("Film not found", 409);

  customResponse(res, 200, { message: "Film created", newFilm });
};

const putFilm = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findFilm = await globalService.findElement(id, Film);
  if (!findFilm) throw new ClientError("Film not found", 409);

  const film = await globalService.updateElement(id, body, Film);
  if (!film) throw new ClientError("Film not updated", 404);

  customResponse(res, 200, { message: "Film updated", film });
};

const patchFilm = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const findFilm = await globalService.findElement(id, Film);
  if (!findFilm) throw new ClientError("Film not found", 409);

  const film = await globalService.patchElement(id, body, Film);
  if (!film) throw new ClientError("Film not updated", 404);

  customResponse(res, 200, { message: "Film updated", film });
};

const getAllFilm = async (req, res) => {
  const { query } = req;

  const films = await globalService.findAllElement(Film, query);
  if (!films.length) throw new ClientError("Film not found", 404);

  customResponse(res, 200, { message: "Films finded", films });
};

const getFilm = async (req, res) => {
  const { id } = req.params;

  const film = await globalService.findElement(id, Film);
  if (!film) throw new ClientError("Film not found", 404);

  customResponse(res, 200, { message: "Film finded", film });
};

const deleteFilm = async (req, res) => {
  const { id } = req.params;

  const findFilm = await globalService.findElement(id, Film);
  if (!findFilm) throw new ClientError("Film not found", 409);

  const film = await globalService.deleteElement(id, Film);
  if (!film) throw new ClientError("Film not found", 404);

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
