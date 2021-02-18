export interface PersonalIncomeSectionOutputData {
  readonly isValid: boolean;
  readonly corporateTax: string;
  readonly businessAfterTaxEarnings: string;
  readonly personalCapitalIncomeTax: string;
  readonly personalCapitalIncomeSurtax: string;
  readonly personalCapitalIncomeTaxAndSurtax: string;
  readonly totalTax: string;
  readonly personalCapitalIncome: string;
  readonly totalPersonalIncome: string;
  readonly monthlyPersonalIncome: string;
  readonly percentIncomeOfTotalEarnings: string;
}
