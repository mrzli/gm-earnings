import { TaxBracketItem } from '../types/salary/tax-bracket-item';
import { EMPTY_AMOUNT_WITH_CURRENCY, ZERO_AMOUNT } from './generic-data';
import { SalarySectionInputData } from '../types/salary/salary-section-input-data';
import { SalarySectionOutputData } from '../types/salary/salary-section-output-data';
import { CurrencySelection } from '../types/generic/currency-selection';

export const DEFAULT_SALARY_SECTION_INPUT_DATA: SalarySectionInputData = {
  calculationParameters: {
    healthInsurancePercent: '16.50',
    retirementPaymentsPillar1Percent: '15.00',
    retirementPaymentsPillar2Percent: '5.00',
    taxDeduction: {
      amount: '4000.00',
      currency: CurrencySelection.HRK
    },
    taxBrackets: [
      {
        amountRange: {
          amount: '30000.00',
          currency: CurrencySelection.HRK
        },
        isInfinite: false,
        taxRatePercent: '20.00'
      },
      {
        amountRange: {
          amount: '0.00',
          currency: CurrencySelection.HRK
        },
        isInfinite: true,
        taxRatePercent: '30.00'
      }
    ]
  },
  gross1Salary: {
    amount: '6000.00',
    currency: CurrencySelection.HRK
  },
  numOutgoingTransactionsPerSalary: 5 // ZO, MIO 1, MIO 2, tax + surtax (one outgoing transaction), net salary
};

export const EMPTY_TAX_BRACKET_ITEM: TaxBracketItem = {
  amountRange: EMPTY_AMOUNT_WITH_CURRENCY,
  isInfinite: false,
  taxRatePercent: ZERO_AMOUNT
};

export const EMPTY_SALARY_SECTION_OUTPUT_DATA: SalarySectionOutputData = {
  isValid: false,
  healthInsurance: ZERO_AMOUNT,
  retirementPayments1: ZERO_AMOUNT,
  retirementPayments2: ZERO_AMOUNT,
  taxDeduction: ZERO_AMOUNT,
  taxableIncome: ZERO_AMOUNT,
  totalTax: ZERO_AMOUNT,
  totalSurtax: ZERO_AMOUNT,
  totalTaxAndSurtax: ZERO_AMOUNT,
  gross2Salary: ZERO_AMOUNT,
  gross1Salary: ZERO_AMOUNT,
  netSalary: ZERO_AMOUNT,
  yearlyData: {
    healthInsurance: ZERO_AMOUNT,
    retirementPayments: ZERO_AMOUNT,
    tax: ZERO_AMOUNT,
    gross2Salary: ZERO_AMOUNT,
    netSalary: ZERO_AMOUNT,
    totalSalaryExpenses: ZERO_AMOUNT,
    percentExpensesOfGross2: ZERO_AMOUNT,
    numOutgoingTransactions: 0
  }
};
