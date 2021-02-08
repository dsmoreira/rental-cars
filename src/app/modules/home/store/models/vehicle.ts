export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  hourlyValue: number;
  fuel: Array<string>;
  trunkCapacity: string;
  category: string;
}
