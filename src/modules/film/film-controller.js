const { ClientError } = require("../../utils/errors/error");
const { customResponse } = require("../../utils/errors/custom-response");
const { create } = require("./film-service");

const postFilm = (req, res) => {
  const { body: data } = req;

  const newFilm = create(data);

  if (!newFilm) throw new ClientError("Error to create film", 409);

  customResponse(res, 200, { message: "Film created", newFilm });
};
const putFilm = (req, res) => {};
const patchFilm = (req, res) => {};
const getAllFilm = (req, res) => {};
const getFilm = (req, res) => {};
const deleteFilm = (req, res) => {};

module.exports = {
  postFilm,
  putFilm,
  patchFilm,
  getAllFilm,
  getFilm,
  deleteFilm,
};
