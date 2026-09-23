import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import Fastify, { FastifyInstance } from "fastify";

import categoriesRouter from "./routes/categories.router";
import productsRouter from "./routes/products.router";
import prisma from "../prisma";

export interface AppOptions {
  corsOrigin?: string;
  logger?: boolean;
}

export async function buildApp(options: AppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger: options.logger ?? true });

  app.setErrorHandler((error, _request, reply) => {
    if (error.validation) {
      return reply.code(400).send({
        message: "Request validation failed",
        details: error.validation,
      });
    }

    app.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  });

  await app.register(cors, {
    origin: options.corsOrigin ?? process.env.API_CORS_ORIGIN ?? true,
  });
  await app.register(multipart, { attachFieldsToBody: true });

  app.get("/", async () => ({ message: "OK" }));
  app.get("/ping", async () => ({ message: "pong" }));
  app.get("/health/live", async () => ({ status: "ok" }));
  app.get("/health/ready", async (_request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch {
      return reply.code(503).send({ status: "unavailable" });
    }
  });

  app.register(categoriesRouter, { prefix: "/api/categories" });
  app.register(productsRouter, { prefix: "/api/products" });

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return app;
}
