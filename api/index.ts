import fastify from "fastify";
import dotenv from  'dotenv'

import QuerystringSchema from "./schemas/querystring.json";
import HeadersSchema from "./schemas/headers.json";

import { QuerystringSchema as QuerystringSchemaInterface } from "./types/querystring";
import { HeadersSchema as HeadersSchemaInterface } from "./types/headers";

const server = fastify();

dotenv.config()

const port = process.env.PORT || 4000;

server.get("/", async (request, reply) => {
  return "OK";
});
server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.get<{
  Querystring: QuerystringSchemaInterface;
  Headers: HeadersSchemaInterface;
}>(
  "/auth",
  {
    schema: {
      querystring: QuerystringSchema,
      headers: HeadersSchema,
    },
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(username !== "admin" ? new Error("Must be admin") : undefined);
    },
    //  or if using async
    //  preValidation: async (request, reply) => {
    //    const { username, password } = request.query
    //    if (username !== "admin") throw new Error("Must be admin");
    //  }
  },
  async (request, reply): Promise<any> => {
    const { username, password } = request.query;
    const customerHeader = request.headers["h-Custom"];

    reply.code(200).send({ success: true });
    // it even works for wildcards
    reply.code(404).send({ error: "Not found" });
    return `logged in!`;
  }
);

server.route<{
  Querystring: QuerystringSchemaInterface;
  Headers: HeadersSchemaInterface;
}>({
  method: "GET",
  url: "/auth2",
  schema: {
    querystring: QuerystringSchema,
    headers: HeadersSchema,
  },
  preHandler: (request, reply, done) => {
    const { username, password } = request.query;
    const customerHeader = request.headers["h-Custom"];
    done();
  },
  handler: (request, reply) => {
    const { username, password } = request.query;
    const customerHeader = request.headers["h-Custom"];
    reply.status(200).send({ username });
  },
});
console.log("process.env.PORT", process.env.PORT);

server.listen({ port: Number(port) }, (err, address) => {
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
