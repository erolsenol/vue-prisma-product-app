import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import prisma from "../../prisma";

import { CategoryType } from "types/categories";

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
    console.log("product", product);
    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    console.log("e", e);
    handleServerError(reply, e);
  }
};
