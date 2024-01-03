import { FastifyInstance } from "fastify";
import { ProductCreateSchema, ProductSchema } from "../schemas/products";
import { createProducts } from "../controllers/products.controller";

async function productsRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: ProductCreateSchema,
    handler: createProducts,
  });
}

export default productsRouter;
