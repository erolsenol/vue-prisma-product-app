import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma";

import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import { momentClient } from "../helpers/moment";
import { getPaginationObj } from "../helpers";

import { ProductType, ProductParamsIdType } from "types/products";
import { PaginationType } from "types/pagination";

export const getAllProducts = async (
  request: FastifyRequest<{ Querystring: PaginationType }>,
  reply: FastifyReply
) => {
  try {
    const { page = 1, limit = 20 } = request.query;

    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: Number(limit),
      where: { deleted: false },
      include: {
        category: true,
      },
    });

    const count = await prisma.product.count({ where: { deleted: false } });

    reply
      .status(STANDARD.SUCCESS)
      .send({
        data: products,
        pagination: getPaginationObj(page, limit, count),
      });
  } catch (e) {
    handleServerError(reply, e);
  }
};

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
  request: FastifyRequest<{ Params: ProductParamsIdType }>,
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
