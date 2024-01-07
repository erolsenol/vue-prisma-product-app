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

    const productArr = [];
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      let pictureBase64;
      if (product?.picture) {
        const picturePath = productPicturePath(product.picture);
        pictureBase64 = await fileToBase64(picturePath, product.picture);
        productArr.push({ ...product, picture: pictureBase64 });
      }
    }

    const count = await prisma.product.count({ where: { deleted: false } });

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

    const oldProduct = await prisma.product.findUnique({ where: { id } });

    if (picture && picture_name && oldProduct) {
      await pictureDelete(oldProduct.picture, "product");
      await pictureSave(picture, picture_name, "product");
    }

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

    const oldProduct = await prisma.product.findUnique({ where: { id } });
    if (oldProduct?.picture) {
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
