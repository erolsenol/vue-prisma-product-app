import { FastifyInstance } from "fastify";
import {
  CategoriesCreateSchema,
  CategoriesUpdateSchema,
  CategoriesGetSchema
} from "../schemas/categories";
import {
  createCategories,
  updateCategories,
  getCategories,
  deleteCategories
} from "../controllers/categories.controller";

async function categoriesRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: CategoriesCreateSchema,
    handler: createCategories,
  });
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: CategoriesUpdateSchema,
    handler: updateCategories,
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: CategoriesGetSchema,
    handler: getCategories,
  });
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: CategoriesGetSchema,
    handler: deleteCategories,
  });
}

export default categoriesRouter;
