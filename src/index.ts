import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import vehiclesRoutes from "./routes/vehicles";
import cors from "@fastify/cors";

const server: FastifyInstance = Fastify({ logger: true });

server.register(cors, {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

server.register(vehiclesRoutes);

const start = async () => {
  try {
    console.info("Starting server...");
    await server.listen({ port: 8080 });
    console.info("Server started successfully");
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
