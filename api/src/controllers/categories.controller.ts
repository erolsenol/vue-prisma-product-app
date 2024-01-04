import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import prisma from "../../prisma";

import { CategoryType, CategoryParamsIdType } from "types/categories";

export const createCategories = async (
  request: FastifyRequest<{ Body: CategoryType }>,
  reply: FastifyReply
) => {
  try {
    const { name, picture, parent_id } = request.body;
    const product = await prisma.category.create({
      data: {
        name,
        picture,
        parent_id,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: product });
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
    
    const product = await prisma.category.update({
      where: { id },
      data: {
        name,
        picture,
        parent_id,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    handleServerError(reply, e);
  }
};
