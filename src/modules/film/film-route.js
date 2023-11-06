const { Router } = require("express");
const filmRoute = Router();

const {
  postFilm,
  putFilm,
  patchFilm,
  getAllFilm,
  getFilm,
  deleteFilm,
} = require("./film-controller.js");

filmRoute.post("/").put("/:id").patch("/:id").get("/").get("/:id").delete("/:id");

module.exports = filmRoute;
