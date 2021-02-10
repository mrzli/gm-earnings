export interface InputAmountWithVat {
  readonly amount: string;
  readonly isVat: boolean;
}

export interface BusinessExpenseItem {
  readonly name: string;
  readonly amount: InputAmountWithVat;
}

export interface PersonalExpenseItem {
  readonly name: string;
  readonly amount: string;
}

export interface EarningsInputData {
  readonly workingDays: number;
  readonly workingHours: number;
  readonly hourlyRate: InputAmountWithVat;
  readonly businessExpenseItems: readonly BusinessExpenseItem[];
  readonly personalExpenseItems: readonly PersonalExpenseItem[];
}

export interface EarningsData {
  readonly totalEarnings: number;
  readonly totalEarningsWithVat: number;
}
