import fastify from "fastify";
import dotenv from "dotenv";

import categoriesRouter from "./routes/categories.router";
import productsRouter from "./routes/products.router";


const server = fastify();

dotenv.config();

const port = process.env.PORT || 5001;

server.register(categoriesRouter, { prefix: "/api/categories" });
server.register(productsRouter, { prefix: "/api/products" });

server.get("/", async (request, reply) => {
  return "OK";
});
server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: Number(port), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
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
