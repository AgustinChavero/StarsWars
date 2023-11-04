const { Router } = require("express");
const starshipRoute = Router();

const {postStarship, putStarship, patchStarship, getAllStarship, getStarship, deleteStarship} = require("./starship-controller.js");

starshipRoute
    .post('/', postStarship)
    .put('/:id', putStarship)
    .patch('/:id', patchStarship)
    .get('/', getAllStarship)
    .get('/:id', getStarship)
    .delete('/:id', deleteStarship)

module.exports = starshipRoute;