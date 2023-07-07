"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.createVehicle = exports.getTotal = exports.updateVehicle = exports.getVehicle = exports.getVehicles = void 0;
const database_js_1 = __importDefault(require("./database.js"));
const getVehicles = async (pagOptions) => {
    const getVehiclesPromise = new Promise((resolve, reject) => {
        database_js_1.default.all(`SELECT * FROM vehicles LIMIT ${pagOptions.limit} OFFSET ${+pagOptions.page * +pagOptions.limit};`, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
    const vehicles = await getVehiclesPromise;
    return vehicles;
};
exports.getVehicles = getVehicles;
const getVehicle = async (id) => {
    const getVehiclePromise = new Promise((resolve, reject) => {
        database_js_1.default.get(`SELECT * FROM vehicles WHERE id = ?;`, [id], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
    const vehicle = await getVehiclePromise;
    return vehicle;
};
exports.getVehicle = getVehicle;
const updateVehicle = async (id, vehicle) => {
    const updateVehiclePromise = new Promise((resolve, reject) => {
        database_js_1.default.run(`UPDATE vehicles SET year = ?, model = ?, make = ? WHERE id = ?;`, [vehicle.year, vehicle.model, vehicle.make, id], (err) => {
            if (err)
                reject(err);
            resolve("Vehicle updated");
        });
    });
    await updateVehiclePromise;
    return await (0, exports.getVehicle)(vehicle.id);
};
exports.updateVehicle = updateVehicle;
const getTotal = async () => {
    const getTotalPromise = new Promise((resolve, reject) => {
        database_js_1.default.get(`SELECT count(*) as total FROM vehicles;`, (err, row) => {
            if (err)
                reject(err);
            resolve(row.total);
        });
    });
    const total = await getTotalPromise;
    return total;
};
exports.getTotal = getTotal;
const createVehicle = async (vehicle) => {
    const createVehiclePromise = new Promise((resolve, reject) => {
        database_js_1.default.run(`INSERT INTO vehicles (city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) returning id;`, [...Object.values(vehicle)], (err, row) => {
            if (err)
                reject(err);
            resolve(row.id);
        });
    });
    const id = await createVehiclePromise;
    return await (0, exports.getVehicle)(id);
};
exports.createVehicle = createVehicle;
const deleteVehicle = async (id) => {
    const deleteVehiclePromise = new Promise((resolve, reject) => {
        database_js_1.default.run(`DELETE FROM vehicles WHERE id = ?;`, [id], (err) => {
            if (err)
                reject(err);
            resolve("Vehicle deleted");
        });
    });
    return await deleteVehiclePromise;
};
exports.deleteVehicle = deleteVehicle;
