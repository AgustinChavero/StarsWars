import { FastifyInstance } from "fastify";
import { postFilm, putFilm, getFilm, getAllFilm, deleteFilm } from "./film-controller";

async function filmRoutes(route: FastifyInstance) {
  route.post("/film", postFilm);
  route.put("/film/:id", putFilm);
  route.get("/film", getAllFilm);
  route.get("/film/:id", getFilm);
  route.delete("/film/:id", deleteFilm);
}

export default filmRoutes;
