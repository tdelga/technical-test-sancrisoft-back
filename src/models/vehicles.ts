export type Vehicle = {
  id: number;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  location: string;
};

export interface IReplyGPutVehicles {
  200: { vehicle: Vehicle };
  "4xx": { error: string };
}
