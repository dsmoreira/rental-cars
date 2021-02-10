import { Vehicle } from '../../../home/store/models/vehicle';

export interface Rental {
  vehicle?: Vehicle;
  hours: number;
  value: number;
  date?: Date;
}
