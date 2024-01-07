import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import categoriesRouter from "./routes/categories.router";
import productsRouter from "./routes/products.router";

const server = fastify();

dotenv.config();

const port = process.env.PORT || 5001;

server.register(cors, {});
server.register(require("@fastify/multipart"), {
  addToBody: true,
});

server.register(categoriesRouter, { prefix: "/api/categories" });
server.register(productsRouter, { prefix: "/api/products" });

server.get("/", async () => {
  return { message: "OK" };
});
server.get("/ping", async () => {
  return { message: "pong" };
});

server.listen({ port: Number(port), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}
