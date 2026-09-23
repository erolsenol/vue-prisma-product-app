import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";
import Fastify, { FastifyInstance } from "fastify";

import categoriesRouter from "./routes/categories.router";
import productsRouter from "./routes/products.router";
import prisma from "../prisma";

export interface AppOptions {
  corsOrigin?: string;
  logger?: boolean;
  rateLimitMax?: number;
  rateLimitTimeWindow?: string | number;
}

export async function buildApp(options: AppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? true,
    bodyLimit: 6 * 1024 * 1024,
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error.validation) {
      return reply.code(400).send({
        message: "Request validation failed",
        details: error.validation,
      });
    }

    if (isClientError(error)) {
      return reply.code(error.statusCode).send({
        message: error.statusCode === 429 ? "Rate limit exceeded" : error.message,
      });
    }

    app.log.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  });

  await app.register(cors, {
    origin: options.corsOrigin ?? process.env.API_CORS_ORIGIN ?? false,
  });
  await app.register(helmet);
  await app.register(rateLimit, {
    max: options.rateLimitMax ?? Number(process.env.API_RATE_LIMIT_MAX ?? 100),
    timeWindow: options.rateLimitTimeWindow ?? process.env.API_RATE_LIMIT_WINDOW ?? "1 minute",
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

function isClientError(error: unknown): error is { statusCode: number; message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    error.statusCode >= 400 &&
    error.statusCode < 500 &&
    "message" in error &&
    typeof error.message === "string"
  );
}
