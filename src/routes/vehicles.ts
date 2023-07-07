import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import { getVehicles, updateVehicle, getTotal } from "../services/vehicles";
import { IQuerystringGetVehicles, IReplyGetVehicles } from "../models/request";
import { IReplyGPutVehicles, Vehicle } from "../models/vehicles";
import VehiclePut from "../models/vehiclePut";

const vehiclesRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get<{
    Querystring: IQuerystringGetVehicles;
    Reply: IReplyGetVehicles;
  }>("/vehicles", async (req, reply) => {
    try {
      const page = req.query.page || "0";
      const limit = req.query.limit || "10";
      if (isNaN(+page) || isNaN(+limit)) {
        throw new Error("Page and Limit must be numbers");
      }
      const vehicles = await getVehicles({ limit, page });
      const total = await getTotal();
      reply
        .code(200)
        .send({ vehicles, page: +page, limit: +limit, total: total });
    } catch (e: unknown) {
      let result = "";
      if (e instanceof Error) {
        if (e.message.includes("SQLITE_ERROR")) result = "Error in database";
        result = e.message;
      }
      reply.code(400).send({ error: result });
    }
  });

  fastify.put<{ Body: VehiclePut; Reply: IReplyGPutVehicles }>(
    "/vehicles/:id",
    async (req, reply) => {
      try {
        const { id } = req.params as { id: string };
        const { body } = req as { body: VehiclePut };
        if (
          !body.make ||
          !body.model ||
          isNaN(body.year) ||
          typeof body.year !== "number"
        ) {
          throw new Error("Invalid body");
        }
        const vehicle = await updateVehicle(id, body);
        reply.code(200).send({ vehicle });
      } catch (e) {
        let result = "";
        if (e instanceof Error) {
          if (e.message.includes("SQLITE_ERROR")) result = "Error in database";
          result = e.message;
        }
        reply.code(400).send({ error: result });
      }
    }
  );
};
export default vehiclesRoutes;
