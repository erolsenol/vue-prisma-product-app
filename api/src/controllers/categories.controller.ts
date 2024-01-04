import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma";

import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import { momentClient } from "../helpers/moment";
import { getPaginationObj } from "../helpers";

import { CategoryType, CategoryParamsIdType } from "types/categories";
import { PaginationType } from "types/pagination";

export const getAllCategories = async (
  request: FastifyRequest<{ Querystring: PaginationType }>,
  reply: FastifyReply
) => {
  try {
    const { page = 1, limit = 20 } = request.query;

    const categories = await prisma.category.findMany({
      skip: (page - 1) * limit,
      take: Number(limit),
      where: { deleted: false },
      include: {
        child_category: true,
        products: true,
      },
    });

    const count = await prisma.category.count({ where: { deleted: false } });

    reply
      .status(STANDARD.SUCCESS)
      .send({ data: categories, pagination: getPaginationObj(page,limit,count) });
  } catch (e) {
    handleServerError(reply, e);
  }
};

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

    const category = await prisma.category.update({
      where: {
        id,
        NOT: {
          deleted: true,
        },
      },
      data: { deleted: true, deleted_time },
    });

    reply.status(STANDARD.SUCCESS).send({ data: category });
  } catch (e) {
    handleServerError(reply, e);
  }
};
