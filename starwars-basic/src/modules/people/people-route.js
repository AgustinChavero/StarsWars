const { Router } = require("express");
const peopleRoute = Router();

const {
  postPeople,
  putPeople,
  getAllPeople,
  getPeople,
  deletePeople,
} = require("./people-controller.js");
const { validatePostPeople } = require("./validations/people-post-validation.js");

peopleRoute
  .post("/", validatePostPeople, postPeople)
  .put("/:id", putPeople)
  .get("/", getAllPeople)
  .get("/:id", getPeople)
  .delete("/:id", deletePeople);

module.exports = peopleRoute;
