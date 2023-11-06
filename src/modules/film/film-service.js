const Film = require("./film-model");
const { ClientError } = require("../../utils/errors/error");

const createFilm = async (data) => {
  const newFilm = await new Film(data);
  return newFilm;
};

module.exports = { createFilm };
