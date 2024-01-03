"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const querystring_json_1 = __importDefault(require("./schemas/querystring.json"));
const headers_json_1 = __importDefault(require("./schemas/headers.json"));
const server = (0, fastify_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 4000;
server.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return "OK";
}));
server.get("/ping", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return "pong\n";
}));
server.get("/auth", {
    schema: {
        querystring: querystring_json_1.default,
        headers: headers_json_1.default,
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
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.query;
    const customerHeader = request.headers["h-Custom"];
    reply.code(200).send({ success: true });
    // it even works for wildcards
    reply.code(404).send({ error: "Not found" });
    return `logged in!`;
}));
server.route({
    method: "GET",
    url: "/auth2",
    schema: {
        querystring: querystring_json_1.default,
        headers: headers_json_1.default,
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
