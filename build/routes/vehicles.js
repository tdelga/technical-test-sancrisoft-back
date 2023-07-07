"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_1 = require("../services/vehicles");
const vehiclesRoutes = async (fastify, options) => {
    fastify.get("/vehicles", async (req, reply) => {
        try {
            const page = req.query.page || "0";
            const limit = req.query.limit || "10";
            if (isNaN(+page) || isNaN(+limit)) {
                throw new Error("Page and Limit must be numbers");
            }
            const vehicles = await (0, vehicles_1.getVehicles)({ limit, page });
            const total = await (0, vehicles_1.getTotal)();
            reply
                .code(200)
                .send({ vehicles, page: +page, limit: +limit, total: total });
        }
        catch (e) {
            let result = "";
            if (e instanceof Error) {
                if (e.message.includes("SQLITE_ERROR"))
                    result = "Error in database";
                result = e.message;
            }
            reply.code(400).send({ error: result });
        }
    });
    fastify.put("/vehicles/:id", async (req, reply) => {
        try {
            const { id } = req.params;
            const { body } = req;
            if (!body.make ||
                !body.model ||
                isNaN(body.year) ||
                typeof body.year !== "number") {
                throw new Error("Invalid body");
            }
            const vehicle = await (0, vehicles_1.updateVehicle)(id, body);
            reply.code(200).send({ vehicle });
        }
        catch (e) {
            let result = "";
            if (e instanceof Error) {
                if (e.message.includes("SQLITE_ERROR"))
                    result = "Error in database";
                result = e.message;
            }
            reply.code(400).send({ error: result });
        }
    });
    fastify.post("/vehicles", async (req, reply) => {
        try {
            const { body } = req;
            if (!body.make ||
                !body.model ||
                isNaN(body.year) ||
                typeof body.year !== "number") {
                throw new Error("Invalid body");
            }
            const vehicle = await (0, vehicles_1.createVehicle)(body);
            reply.code(200).send({ vehicle });
        }
        catch (e) {
            let result = "";
            if (e instanceof Error) {
                if (e.message.includes("SQLITE_ERROR"))
                    result = "Error in database";
                result = e.message;
            }
            reply.code(400).send({ error: result });
        }
    });
    fastify.delete("/vehicles/:id", async (req, reply) => {
        try {
            const { id } = req.params;
            const message = await (0, vehicles_1.deleteVehicle)(id);
            reply.code(200).send({ message: message });
        }
        catch (e) {
            let result = "";
            if (e instanceof Error) {
                if (e.message.includes("SQLITE_ERROR"))
                    result = "Error in database";
                result = e.message;
            }
            reply.code(400).send({ error: result });
        }
    });
};
exports.default = vehiclesRoutes;
