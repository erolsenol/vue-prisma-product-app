import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import prisma from "../../prisma";

import { ProductType, ProductParamsIdType } from "types/products";

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
    handleServerError(reply, e);
  }
};

export const updateProducts = async (
  request: FastifyRequest<{ Body: ProductType; Params: ProductParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const { name, picture, category_id } = request.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        picture,
        category_id,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getProducts = async (
  request: FastifyRequest<{Params: ProductParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    handleServerError(reply, e);
  }
};
