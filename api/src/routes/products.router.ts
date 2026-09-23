import { FastifyInstance } from "fastify";
import { ProductCreateSchema, ProductUpdateSchema,ProductGetSchema } from "../schemas/products";
import { PaginationSchema } from "../schemas/pagination";
import {
  createProducts,
  updateProducts,
  getProducts,
  getAllProducts,
  deleteProducts
} from "../controllers/products.controller";

async function productsRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: { querystring: PaginationSchema },
    handler: getAllProducts,
  });
  fastify.route({
    method: "POST",
    url: "/",
    schema: ProductCreateSchema,
    handler: createProducts,
  });
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: ProductUpdateSchema,
    handler: updateProducts,
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: ProductGetSchema,
    handler: getProducts,
  });
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: ProductGetSchema,
    handler: deleteProducts,
  });
}

export default productsRouter;
