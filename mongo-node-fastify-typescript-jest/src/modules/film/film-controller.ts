import { FastifyRequest, FastifyReply } from "fastify";
import Film from "./film-schema";
import { NewFilm } from "./film-interface";
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
import { bodyDTO } from "./film-dto";

export const postFilm = async (
  req: FastifyRequest<{ Body: NewFilm }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewFilm = req.body;

  const bodyValidate = bodyValidation(bodyDTO, req);
  if (bodyValidate) return errorResponse(reply, 404, `${bodyValidate}`);

  const exist = await findAllElement(data, Film);
  if (exist.length) return errorResponse(reply, 409, "Values no validates");

  const newFilm = await createElement(data, Film);

  customResponse(reply, 200, { message: "Film created", newFilm });
};

export const putFilm = async (
  req: FastifyRequest<{ Params: { id: string }; Body: NewFilm }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;
  const data: NewFilm = req.body;

  const exist = await findElement(id, Film);
  if (!exist) return errorResponse(reply, 409, "Film doesn't exists");

  const film = await updateElement(id, data, Film);

  customResponse(reply, 200, { message: "Film edited", film });
};

export const getAllFilm = async (
  req: FastifyRequest<{ Querystring: NewFilm }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewFilm = req.query;

  const films = await findAllElement(data, Film);
  if (!films.length) return errorResponse(reply, 409, "Films not found");

  customResponse(reply, 200, { message: "Films founded", films });
};

export const getFilm = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const film = await findElement(id, Film);
  if (!film) return errorResponse(reply, 409, "Film doesn't exists");

  customResponse(reply, 200, { message: "Film founded", film });
};

export const deleteFilm = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const exist = await findElement(id, Film);
  if (!exist) return errorResponse(reply, 409, "Film doesn't exists");

  const film = await deleteElement(id, Film);

  customResponse(reply, 200, { message: "Film deleted", film });
};
