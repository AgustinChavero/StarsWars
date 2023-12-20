const { Router } = require("express");
const filmRoute = require('./film/film-route');
const peopleRoute = require('./people/people-route');
const planetRoute = require('./planet/planet-route');
const starshipRoute = require('./starship/starship-route');

const routerApi = Router();

routerApi.use("/film", filmRoute);
routerApi.use("/people", peopleRoute);
routerApi.use("/planet", planetRoute);
routerApi.use("/starship", starshipRoute);

module.exports = routerApi;