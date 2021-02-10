export interface InputAmountWithVat {
  readonly amount: string;
  readonly isVat: boolean;
}

export interface EarningsInputData {
  readonly workingDays: number;
  readonly workingHours: number;
  readonly hourlyRate: InputAmountWithVat;
}

export interface EarningsData {
  readonly totalEarnings: number;
  readonly totalEarningsWithVat: number;
}
