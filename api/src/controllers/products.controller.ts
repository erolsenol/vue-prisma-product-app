import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import prisma from "../../prisma";

import { ProductType } from "types/products";

export const createProducts = async (
  request: FastifyRequest<{ Body: ProductType }>,
  reply: FastifyReply
) => {
  try {
    const { name, picture, category_id } = request.body;
    const product = await prisma.product.create({
      data: {
        name,
        picture,
        category_id,
      },
    });
    
    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    console.log("e", e);
    handleServerError(reply, e);
  }
};
