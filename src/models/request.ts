import { Vehicle } from "./vehicles";
export interface IQuerystringGetVehicles {
  page?: string | null;
  limit?: string | null;
}

export interface IReplyGetVehicles {
  200: { vehicles: Vehicle[]; page: number; limit: number; total: number };
  "4xx": { error: string };
}

export interface IReplyDeleteVehicle {
  200: { message: string };
  "4xx": { error: string };
}
