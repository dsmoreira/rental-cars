export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  hourlyValue: number;
  fuel: string[];
  trunkCapacity: string;
  category: string;
  image?: string;
}
