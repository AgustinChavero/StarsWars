import { FastifyRequest, FastifyReply } from "fastify";
import Planet from "./planet-schema";
import { NewPlanet } from "./planet-interface";
import { errorResponse } from "../../services/global-errors/custom-error";
import { customResponse } from "../../services/global-errors/custom-response";

import {
  createElement,
  deleteElement,
  findAllElement,
  findElement,
  updateElement,
} from "../../services/global-functions/global-service";
import { bodyValidation } from "../../services/global-validations/global-validation";
import { bodyDTO } from "./planet-dto";

export const postPlanet = async (
  req: FastifyRequest<{ Body: NewPlanet }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewPlanet = req.body;

  const bodyValidate = bodyValidation(bodyDTO, req);
  if (bodyValidate) return errorResponse(reply, 404, `${bodyValidate}`);

  const exist = await findAllElement(data, Planet);
  if (exist.length) return errorResponse(reply, 409, "Values no validates");

  const newPlanet = await createElement(data, Planet);

  customResponse(reply, 200, { message: "Planet created", newPlanet });
};

export const putPlanet = async (
  req: FastifyRequest<{ Params: { id: string }; Body: NewPlanet }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;
  const data: NewPlanet = req.body;

  const exist = await findElement(id, Planet);
  if (!exist) return errorResponse(reply, 409, "Planet doesn't exists");

  const newPlanet = await updateElement(id, data, Planet);

  customResponse(reply, 200, { message: "Planet edited", newPlanet });
};

export const getAllPlanet = async (
  req: FastifyRequest<{ Querystring: NewPlanet }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewPlanet = req.query;

  const planets = await findAllElement(data, Planet);
  if (!planets.length) return errorResponse(reply, 409, "Planets not found");

  customResponse(reply, 200, { message: "Planets founded", planets });
};

export const getPlanet = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const planet = await findElement(id, Planet);
  if (!planet) return errorResponse(reply, 409, "Planet doesn't exists");

  customResponse(reply, 200, { message: "Planet founded", planet });
};

export const deletePlanet = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const exist = await findElement(id, Planet);
  if (!exist) return errorResponse(reply, 409, "Planet doesn't exists");

  const planet = await deleteElement(id, Planet);

  customResponse(reply, 200, { message: "Planet deleted", planet });
};
