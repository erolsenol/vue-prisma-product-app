import { FastifyInstance } from "fastify";
import {
  CategoriesCreateSchema,
  CategoriesUpdateSchema,
} from "../schemas/categories";
import {
  createCategories,
  updateCategories,
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
}

export default categoriesRouter;
