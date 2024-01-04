import { FastifyInstance } from "fastify";
import { ProductCreateSchema, ProductUpdateSchema } from "../schemas/products";
import {
  createProducts,
  updateProducts,
} from "../controllers/products.controller";

async function productsRouter(fastify: FastifyInstance) {
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
}

export default productsRouter;
