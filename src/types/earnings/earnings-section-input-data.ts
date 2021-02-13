import { InputAmountWithVat } from '../generic/input-amount-with-vat';

export interface EarningsSectionInputData {
  readonly workingDays: number | undefined;
  readonly workingHours: number | undefined;
  readonly hourlyRate: InputAmountWithVat;
}
