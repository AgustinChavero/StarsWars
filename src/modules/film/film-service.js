const Film = require("./film-model");

const createFilm = async (data) => {
  const newFilm = await new Film(data);
  return newFilm;
};

module.exports = { create: createFilm };
