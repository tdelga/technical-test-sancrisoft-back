"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const vehicles_1 = __importDefault(require("./routes/vehicles"));
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.default)({ logger: true });
server.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});
server.register(vehicles_1.default);
const start = async () => {
    try {
        console.info("Starting server...");
        await server.listen({ port: 8080 });
        console.info("Server started successfully");
        const address = server.server.address();
        const port = typeof address === "string" ? address : address?.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
