import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma";

import { STANDARD } from "../helpers/constants";
import { handleServerError, HttpError } from "../helpers/errors";
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
        parent_category: { where: { deleted: false } },
        child_category: { where: { deleted: false } },
        products: { where: { deleted: false } },
      },
    });

    const categoryArr = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      let pictureBase64;
      if (category?.picture) {
        const picturePath = categoryPicturePath(category.picture);
        pictureBase64 = await fileToBase64(picturePath, category.picture);
      }
      categoryArr.push({ ...category, picture: pictureBase64 });
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

    if (parent_id !== undefined && parent_id !== null) {
      const parent = await prisma.category.findFirst({ where: { id: parent_id, deleted: false } });
      if (!parent) throw new HttpError(400, "Parent category not found");
    }

    await pictureSave(picture, picture_name, "category");

    const category = await prisma.category.create({
      data: {
        name,
        picture: picture_name,
        parent_id: parent_id ?? null,
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

    const oldCategory = await prisma.category.findFirst({ where: { id, deleted: false } });
    if (!oldCategory) throw new HttpError(404, "Category not found");
    if (parent_id === id) throw new HttpError(400, "Category cannot be its own parent");
    if (parent_id !== undefined && parent_id !== null) {
      const parent = await prisma.category.findFirst({ where: { id: parent_id, deleted: false } });
      if (!parent) throw new HttpError(400, "Parent category not found");
    }
    const data = {
      ...(name !== undefined ? { name } : {}),
      ...(picture_name !== undefined ? { picture: picture_name } : {}),
      ...(parent_id !== undefined ? { parent_id } : {}),
    };

    if (picture && picture_name) {
      await pictureSave(picture, picture_name, "category");
      await pictureDelete(oldCategory.picture, "category");
    }

    const category = await prisma.category.update({
      where: { id },
      data,
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

    const category = await prisma.category.findFirst({
      where: { id, deleted: false },
    });

    if (!category) throw new HttpError(404, "Category not found");

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

    const oldCategory = await prisma.category.findFirst({ where: { id, deleted: false } });
    if (!oldCategory) throw new HttpError(404, "Category not found");
    const activeProducts = await prisma.product.count({ where: { category_id: id, deleted: false } });
    if (activeProducts > 0) {
      throw new HttpError(409, "Category cannot be deleted while it has active products");
    }
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
