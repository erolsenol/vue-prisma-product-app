import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma";

import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";
import { momentClient } from "../helpers/moment";
import {
  getPaginationObj,
  pictureSave,
  pictureDelete,
  fileToBase64,
} from "../helpers";

import { CategoryType, CategoryParamsIdType } from "types/categories";
import { PaginationType } from "types/pagination";

export const getAllCategories = async (
  request: FastifyRequest<{ Querystring: PaginationType }>,
  reply: FastifyReply
) => {
  try {
    let { page = 1, limit = 20, all = 0 } = request.query;

    if (all == 1) {
      limit = limit * 1000;
    }

    const categories = await prisma.category.findMany({
      skip: (page - 1) * limit,
      take: Number(limit),
      where: { deleted: false },
      include: {
        parent_category: true,
        child_category: true,
        products: true,
      },
    });

    const categoryArr = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      let pictureBase64;
      if (category?.picture) {
        const picturePath = categoryPicturePath(category.picture);
        pictureBase64 = await fileToBase64(picturePath, category.picture);
        categoryArr.push({ ...category, picture: pictureBase64 });
      }
    }

    const count = await prisma.category.count({ where: { deleted: false } });

    reply.status(STANDARD.SUCCESS).send({
      data: categoryArr,
      pagination: getPaginationObj(page, limit, count),
    });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const createCategories = async (
  request: FastifyRequest<{ Body: CategoryType }>,
  reply: FastifyReply
) => {
  try {
    const { name, picture, picture_name, parent_id } = request.body;

    await pictureSave(picture, picture_name, "category");

    const category = await prisma.category.create({
      data: {
        name,
        picture: picture_name,
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
    const { name, picture, picture_name, parent_id } = request.body;

    const oldCategory = await prisma.category.findUnique({ where: { id } });
    if (picture && picture_name && oldCategory) {
      await pictureDelete(oldCategory.picture, "category");
      await pictureSave(picture, picture_name, "category");
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        picture: picture_name,
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

    let pictureBase64;
    if (category?.picture) {
      const picturePath = categoryPicturePath(category.picture);
      pictureBase64 = await fileToBase64(picturePath, category.picture);
    }

    reply
      .status(STANDARD.SUCCESS)
      .send({ data: { ...category, picture: pictureBase64 } });
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

    const oldCategory = await prisma.category.findUnique({ where: { id } });
    if (oldCategory?.picture) {
      await pictureDelete(oldCategory.picture, "category");
    }

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

function categoryPicturePath(picture: string) {
  const dir = process.cwd();
  return `${dir}/src/pictures/category/${picture}`;
}
