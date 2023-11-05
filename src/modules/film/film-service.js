const Film = require("./film-model");
const { ClientError } = require("../../utils/errors/error");

const createFilm = async (data) => {
  const existingFilm = await Film.findOne({ title: data.title });
  if (existingFilm) throw new ClientError("Title in use", 409);

  const newFilm = await new Film(data);
  if (!newFilm) throw new ClientError("Error to create film", 409);

  return newFilm;
};

module.exports = { createFilm };
