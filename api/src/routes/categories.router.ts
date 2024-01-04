import { FastifyInstance } from "fastify";
// import { CategoriesCreateSchema } from "../schemas/categories";
import { createCategories } from "../controllers/categories.controller";

async function categoriesRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    
    handler: createCategories,
  });
}

export default categoriesRouter;
