import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import { CategoryType, CategoryParamsIdType } from "types/categories";
import { momentClient } from "../helpers/moment";

export const createCategories = async (
  request: FastifyRequest<{ Body: CategoryType }>,
  reply: FastifyReply
) => {
  try {
    const { name, picture, parent_id } = request.body;
    const category = await prisma.category.create({
      data: {
        name,
        picture,
        parent_id,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: category });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const updateCategories = async (
  request: FastifyRequest<{ Body: CategoryType; Params: CategoryParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const { name, picture, parent_id } = request.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        picture,
        parent_id,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: category });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getCategories = async (
  request: FastifyRequest<{ Params: CategoryParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);

    const category = await prisma.category.findUnique({
      where: { id },
    });

    reply.status(STANDARD.SUCCESS).send({ data: category });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const deleteCategories = async (
  request: FastifyRequest<{ Params: CategoryParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const deleted_time = momentClient.getDeleteTime(Date.now());
    console.log("deleted_time", deleted_time);

    const category = await prisma.category.update({
      where: { id },
      data: { deleted: true, deleted_time },
    });

    reply.status(STANDARD.SUCCESS).send({ data: category });
  } catch (e) {
    console.log("e",e);
    handleServerError(reply, e);
  }
};
