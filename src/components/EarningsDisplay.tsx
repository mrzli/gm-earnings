import React, { useState } from 'react';
import { DEFAULT_EARNINGS_SECTION_INPUT_DATA } from '../data/earnings-data';
import { MoneyDisplayInGrid } from './generic/MoneyDisplayInGrid';
import { ZERO_AMOUNT } from '../data/general-data';
import { BusinessExpensesSection } from './business-expenses/BusinessExpensesSection';
import { EarningsSection } from './earnings/EarningsSection';
import { DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA } from '../data/business-expenses-data';
import { DEFAULT_EARNINGS_DISPLAY_DATA } from '../data/earnings-display-data';
import { BankExpensesSection } from './bank-expenses/BankExpensesSection';
import { DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA } from '../data/bank-expenses-data';
import { SalarySection } from './salary/SalarySection';
import { DEFAULT_SALARY_SECTION_INPUT_DATA } from '../data/salary-data';
import { EarningsDisplayData } from '../types/earnings/earnings-display-data';
import { BusinessResultsSection } from './business-results/BusinessResultsSection';
import { BusinessResultsData } from '../types/business-results/business-results-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../utils/currency-utils';

export function EarningsDisplay(): React.ReactElement {
  const [state, setState] = useState(DEFAULT_EARNINGS_DISPLAY_DATA);

  return (
    <div>
      <EarningsSection
        defaultInputData={DEFAULT_EARNINGS_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            earnings: value
          }));
        }}
      />
      <BusinessExpensesSection
        defaultInputData={DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            businessExpenses: value
          }));
        }}
      />
      <SalarySection
        defaultInputData={DEFAULT_SALARY_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            salary: value
          }));
        }}
      />
      <BankExpensesSection
        defaultInputData={DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            bankExpenses: value
          }));
        }}
        numOutgoingTransactionsPerYear={
          state.businessExpenses.numOutgoingTransactionsPerYear +
          state.salary.yearlyData.numOutgoingTransactions
        }
      />
      <BusinessResultsSection data={getBusinessResultsData(state)} />
      <MoneyDisplayInGrid
        label={'Earnings After Business Expenses (without VAT):'}
        value={ZERO_AMOUNT}
        row={9}
        column={1}
      />
      <MoneyDisplayInGrid
        label={'VAT After Expenses:'}
        value={ZERO_AMOUNT}
        row={10}
        column={1}
      />
    </div>
  );
}

function getBusinessResultsData(
  state: EarningsDisplayData
): BusinessResultsData {
  const totalBusinessExpenses = moneyStringToCurrency(
    state.businessExpenses.totalBusinessExpenses
  )
    .add(state.salary.yearlyData.totalSalaryExpenses)
    .add(state.bankExpenses.totalBankExpenses);

  const businessNetEarnings = moneyStringToCurrency(
    state.earnings.totalEarnings
  ).subtract(totalBusinessExpenses);

  const businessExpensesVat = moneyStringToCurrency(
    state.earnings.totalVat
  ).subtract(state.businessExpenses.totalBusinessExpensesVat);

  return {
    totalEarnings: state.earnings.totalEarnings,
    totalVat: state.earnings.totalVat,
    genericBusinessExpenses: state.businessExpenses.totalBusinessExpenses,
    businessExpensesVat: state.businessExpenses.totalBusinessExpensesVat,
    salaryExpenses: state.salary.yearlyData.totalSalaryExpenses,
    bankExpenses: state.bankExpenses.totalBankExpenses,
    totalBusinessExpenses: currencyToMoneyString(totalBusinessExpenses),
    businessNetEarnings: currencyToMoneyString(businessNetEarnings),
    businessRemainingVat: currencyToMoneyString(businessExpensesVat),
    personalSalaryIncome: state.salary.yearlyData.netSalary
  };
}
