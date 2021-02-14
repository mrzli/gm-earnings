import { SalaryYearlyData } from './salary-yearly-data';

export interface SalarySectionOutputData {
  readonly isValid: boolean;
  readonly healthInsurance: string;
  readonly retirementPayments1: string;
  readonly retirementPayments2: string;
  readonly taxDeduction: string;
  readonly taxableIncome: string;
  readonly totalTax: string;
  readonly totalSurtax: string;
  readonly totalTaxAndSurtax: string;
  readonly gross2Salary: string;
  readonly gross1Salary: string;
  readonly netSalary: string;
  readonly yearlyData: SalaryYearlyData;
}
