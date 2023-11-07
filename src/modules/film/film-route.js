const { Router } = require("express");
const filmRoute = Router();

const {
  postFilm,
  putFilm,
  getAllFilm,
  getFilm,
  deleteFilm,
} = require("./film-controller.js");
const { validatePostFilm } = require("./validations/film-post-validation.js");

filmRoute
  .post("/", validatePostFilm, postFilm)
  .put("/:id", putFilm)
  .get("/", getAllFilm)
  .get("/:id", getFilm)
  .delete("/:id", deleteFilm);

module.exports = filmRoute;
