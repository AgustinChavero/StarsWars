import { FastifyRequest, FastifyReply } from "fastify";
import Starship from "./starship-schema";
import { NewStarship } from "./starship-schema";
import { errorResponse } from "../../services/global-errors/custom-error";
import { customResponse } from "../../services/global-errors/custom-response";

import {
  createElement,
  deleteElement,
  findAllElement,
  findElement,
  updateElement,
} from "../../services/global-services/global-service";

export const postStarship = async (
  req: FastifyRequest<{ Body: NewStarship }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewStarship = req.body;

  const exist = await findAllElement(data, Starship);
  if (exist.length) return errorResponse(reply, 409, "Values no validates");

  const newStarship = await createElement(data, Starship);

  customResponse(reply, 200, { message: "Starship created", newStarship });
};

export const putStarship = async (
  req: FastifyRequest<{ Params: { id: string }; Body: NewStarship }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;
  const data: NewStarship = req.body;

  const exist = await findElement(id, Starship);
  if (!exist) return errorResponse(reply, 409, "Starship doesn't exists");

  const newStarship = await updateElement(id, data, Starship);

  customResponse(reply, 200, { message: "Starship edited", newStarship });
};

export const getAllStarship = async (
  req: FastifyRequest<{ Querystring: NewStarship }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewStarship = req.query;

  const starships = await findAllElement(data, Starship);
  if (!starships.length) return errorResponse(reply, 409, "Starships not found");

  customResponse(reply, 200, { message: "Starships founded", starships });
};

export const getStarship = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const starship = await findElement(id, Starship);
  if (!starship) return errorResponse(reply, 409, "Starship doesn't exists");

  customResponse(reply, 200, { message: "Starship founded", starship });
};

export const deleteStarship = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const exist = await findElement(id, Starship);
  if (!exist) return errorResponse(reply, 409, "Starship doesn't exists");

  const starship = await deleteElement(id, Starship);

  customResponse(reply, 200, { message: "Starship deleted", starship });
};
