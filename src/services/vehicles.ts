import VehiclePut from "../models/vehiclePut.js";
import { Vehicle } from "../models/vehicles.js";
import db from "./database.js";

type VehiclesGet = {
  limit: string;
  page: string;
};

export const getVehicles = async (
  pagOptions: VehiclesGet
): Promise<Vehicle[]> => {
  const getVehiclesPromise = new Promise<Vehicle[]>((resolve, reject) => {
    db.all(
      `SELECT * FROM vehicles LIMIT ${pagOptions.limit} OFFSET ${
        +pagOptions.page * +pagOptions.limit
      };`,
      (err, rows: Vehicle[]) => {
        if (err) reject(err);

        resolve(rows);
      }
    );
  });
  const vehicles = await getVehiclesPromise;
  return vehicles;
};

export const getVehicle = async (id: number): Promise<Vehicle> => {
  const getVehiclePromise = new Promise<Vehicle>((resolve, reject) => {
    db.get(
      `SELECT * FROM vehicles WHERE id = ?;`,
      [id],
      (err, row: Vehicle) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
  const vehicle = await getVehiclePromise;
  return vehicle;
};

export const updateVehicle = async (
  id: string,
  vehicle: VehiclePut
): Promise<Vehicle> => {
  const updateVehiclePromise = new Promise((resolve, reject) => {
    db.run(
      `UPDATE vehicles SET year = ?, model = ?, make = ? WHERE id = ?;`,
      [vehicle.year, vehicle.model, vehicle.make, id],
      (err) => {
        if (err) reject(err);
        resolve("Vehicle updated");
      }
    );
  });
  await updateVehiclePromise;
  return await getVehicle(vehicle.id);
};

type Total = {
  total: number;
};

export const getTotal = async (): Promise<number> => {
  const getTotalPromise = new Promise<number>((resolve, reject) => {
    db.get(`SELECT count(*) as total FROM vehicles;`, (err, row: Total) => {
      if (err) reject(err);
      resolve(row.total);
    });
  });
  const total = await getTotalPromise;
  return total;
};
