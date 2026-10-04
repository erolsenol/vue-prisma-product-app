import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import { ProductCreateSchema, ProductParamsIdSchema, ProductUpdateSchema } from "../schemas/products";
import { PaginationSchema } from "../schemas/pagination";
import {
  createProducts,
  updateProducts,
  getProducts,
  getAllProducts,
  deleteProducts
} from "../controllers/products.controller";

async function productsRouter(fastify: FastifyInstance) {
  const router = fastify.withTypeProvider<TypeBoxTypeProvider>();
  router.route({
    method: "GET",
    url: "/",
    schema: { querystring: PaginationSchema },
    handler: getAllProducts,
  });
  router.route({
    method: "POST",
    url: "/",
    schema: { body: ProductCreateSchema },
    handler: createProducts,
  });
  router.route({
    method: "PUT",
    url: "/:id",
    schema: { params: ProductParamsIdSchema, body: ProductUpdateSchema },
    handler: updateProducts,
  });
  router.route({
    method: "GET",
    url: "/:id",
    schema: { params: ProductParamsIdSchema },
    handler: getProducts,
  });
  router.route({
    method: "DELETE",
    url: "/:id",
    schema: { params: ProductParamsIdSchema },
    handler: deleteProducts,
  });
}

export default productsRouter;
