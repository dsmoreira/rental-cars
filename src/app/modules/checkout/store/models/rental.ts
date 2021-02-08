export interface Rental {
  vehicleId: string;
  hourlyValue: number;
  hours: number;
  value: number;
  date: Date | null;
}
