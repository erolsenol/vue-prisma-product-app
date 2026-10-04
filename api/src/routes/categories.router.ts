import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  CategoryCreateSchema,
  CategoryParamsIdSchema,
  CategoryUpdateSchema,
} from "../schemas/categories";
import { PaginationSchema } from "../schemas/pagination";
import {
  createCategories,
  updateCategories,
  getCategories,
  deleteCategories,
  getAllCategories
} from "../controllers/categories.controller";

async function categoriesRouter(fastify: FastifyInstance) {
  const router = fastify.withTypeProvider<TypeBoxTypeProvider>();
  router.route({
    method: "GET",
    url: "/",
    schema: { querystring: PaginationSchema },
    handler: getAllCategories,
  });
  router.route({
    method: "POST",
    url: "/",
    schema: { body: CategoryCreateSchema },
    handler: createCategories,
  });
  router.route({
    method: "PUT",
    url: "/:id",
    schema: { params: CategoryParamsIdSchema, body: CategoryUpdateSchema },
    handler: updateCategories,
  });
  router.route({
    method: "GET",
    url: "/:id",
    schema: { params: CategoryParamsIdSchema },
    handler: getCategories,
  });
  router.route({
    method: "DELETE",
    url: "/:id",
    schema: { params: CategoryParamsIdSchema },
    handler: deleteCategories,
  });
}

export default categoriesRouter;
