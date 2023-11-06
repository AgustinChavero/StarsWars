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
  .post("/")
  .put("/:id")
  .patch("/:id")
  .get("/", getAllPlanet)
  .get("/:id")
  .delete("/:id");

module.exports = planetRoute;
