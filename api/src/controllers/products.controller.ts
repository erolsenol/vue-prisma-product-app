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
      where: { deleted: false, category: { deleted: false } },
      include: {
        category: true,
      },
    });

    const productArr = await Promise.all(products.map(async (product) => {
      const pictureBase64 = product.picture
        ? await fileToBase64(productPicturePath(product.picture), product.picture)
        : undefined;

      return { ...product, picture: pictureBase64 };
    }));

    const count = await prisma.product.count({
      where: { deleted: false, category: { deleted: false } },
    });

    reply.status(STANDARD.SUCCESS).send({
      data: productArr,
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
    const { name, picture, picture_name, category_id } = request.body;

    const category = await prisma.category.findFirst({ where: { id: category_id, deleted: false } });
    if (!category) throw new HttpError(400, "Category not found");

    await pictureSave(picture, picture_name, "product");

    const product = await prisma.product.create({
      data: {
        name,
        picture: picture_name,
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
    const { name, picture, picture_name, category_id } = request.body;

    const oldProduct = await prisma.product.findFirst({ where: { id, deleted: false } });
    if (!oldProduct) throw new HttpError(404, "Product not found");

    if (category_id !== undefined) {
      const category = await prisma.category.findFirst({ where: { id: category_id, deleted: false } });
      if (!category) throw new HttpError(400, "Category not found");
    }

    if (picture && picture_name) {
      await pictureSave(picture, picture_name, "product");
      await pictureDelete(oldProduct.picture, "product");
    }

    const data = {
      ...(name !== undefined ? { name } : {}),
      ...(picture_name !== undefined ? { picture: picture_name } : {}),
      ...(category_id !== undefined ? { category_id } : {}),
    };

    const product = await prisma.product.update({
      where: { id },
      data,
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

    const product = await prisma.product.findFirst({
      where: { id, deleted: false },
      include: { category: true },
    });

    if (!product) throw new HttpError(404, "Product not found");

    let pictureBase64;
    if (product?.picture) {
      const picturePath = productPicturePath(product.picture);
      pictureBase64 = await fileToBase64(picturePath, product.picture);
    }

    reply
      .status(STANDARD.SUCCESS)
      .send({ data: { ...product, picture: pictureBase64 } });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const deleteProducts = async (
  request: FastifyRequest<{ Params: ProductParamsIdType }>,
  reply: FastifyReply
) => {
  try {
    const id = Number(request.params.id);
    const deleted_time = momentClient.getDeleteTime(Date.now());

    const oldProduct = await prisma.product.findFirst({ where: { id, deleted: false } });
    if (!oldProduct) throw new HttpError(404, "Product not found");
    if (oldProduct.picture) {
      await pictureDelete(oldProduct.picture, "product");
    }

    const product = await prisma.product.update({
      where: {
        id,
        NOT: {
          deleted: true,
        },
      },
      data: { deleted: true, deleted_time },
    });

    reply.status(STANDARD.SUCCESS).send({ data: product });
  } catch (e) {
    handleServerError(reply, e);
  }
};

function productPicturePath(picture: string) {
  const dir = process.cwd();
  return `${dir}/src/pictures/product/${picture}`;
}
