import { InputAmountWithVat } from '../generic/input-amount-with-vat';

export interface EarningsSectionInputData {
  readonly workingDays: number;
  readonly workingHours: number;
  readonly hourlyRate: InputAmountWithVat;
}
