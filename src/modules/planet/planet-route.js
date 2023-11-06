const { Router } = require("express");
const planetRoute = Router();

const {
  postPlanet,
  putPlanet,
  patchPlanet,
  getAllPlanet,
  getPlanet,
  deletePlanet,
} = require("./planet-controller.js");

planetRoute
  .post("/", postPlanet)
  .put("/:id", putPlanet)
  .patch("/:id", patchPlanet)
  .get("/", getAllPlanet)
  .get("/:id", getPlanet)
  .delete("/:id", deletePlanet);

module.exports = planetRoute;
