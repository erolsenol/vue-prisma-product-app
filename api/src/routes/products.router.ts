import { FastifyInstance } from "fastify";
import { ProductCreateSchema, ProductUpdateSchema,ProductGetSchema } from "../schemas/products";
import {
  createProducts,
  updateProducts,
  getProducts,
  getAllProducts
} from "../controllers/products.controller";

async function productsRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
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
}

export default productsRouter;
