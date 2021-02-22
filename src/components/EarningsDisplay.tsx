import React, { useState } from 'react';
import { DEFAULT_EARNINGS_SECTION_INPUT_DATA } from '../data/earnings-data';
import { BusinessExpensesSection } from './business-expenses/BusinessExpensesSection';
import { EarningsSection } from './earnings/EarningsSection';
import { DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA } from '../data/business-expenses-data';
import { DEFAULT_EARNINGS_DISPLAY_DATA } from '../data/earnings-display-data';
import { BankExpensesSection } from './bank-expenses/BankExpensesSection';
import { DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA } from '../data/bank-expenses-data';
import { SalarySection } from './salary/SalarySection';
import { DEFAULT_SALARY_SECTION_INPUT_DATA } from '../data/salary-data';
import { EarningsDisplayData } from '../types/earnings-display-data';
import { BusinessResultsSection } from './business-results/BusinessResultsSection';
import { BusinessResultsData } from '../types/business-results/business-results-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../utils/currency-utils';
import { GeneralSection } from './general/GeneralSection';
import { DEFAULT_GENERAL_SECTION_INPUT_DATA } from '../data/general-data';
import { PersonalIncomeSection } from './personal-income/PersonalIncomeSection';
import { DEFAULT_PERSONAL_INCOME_SECTION_INPUT_DATA } from '../data/personal-income-data';

export function EarningsDisplay(): React.ReactElement {
  const [state, setState] = useState(DEFAULT_EARNINGS_DISPLAY_DATA);

  const businessResultsData = getBusinessResultsData(state);

  return (
    <div>
      <GeneralSection
        defaultInputData={DEFAULT_GENERAL_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            general: value
          }));
        }}
      />
      <EarningsSection
        defaultInputData={DEFAULT_EARNINGS_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            earnings: value
          }));
        }}
        exchangeRates={state.general.exchangeRates}
      />
      <BusinessExpensesSection
        defaultInputData={DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            businessExpenses: value
          }));
        }}
        exchangeRates={state.general.exchangeRates}
      />
      <SalarySection
        defaultInputData={DEFAULT_SALARY_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            salary: value
          }));
        }}
        exchangeRates={state.general.exchangeRates}
        surtaxPercent={state.general.surtaxPercent}
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
        exchangeRates={state.general.exchangeRates}
      />
      <BusinessResultsSection data={businessResultsData} />
      <PersonalIncomeSection
        defaultInputData={DEFAULT_PERSONAL_INCOME_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setState((s) => ({
            ...s,
            personalIncome: value
          }));
        }}
        businessTotalEarnings={state.earnings.totalEarnings}
        businessNetEarnings={businessResultsData.businessNetEarnings}
        yearlyNetSalary={businessResultsData.personalSalaryIncome}
        surtaxPercent={state.general.surtaxPercent}
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
    .add(state.salary.yearlyData.gross2Salary)
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
    gross2SalaryExpenses: state.salary.yearlyData.gross2Salary,
    bankExpenses: state.bankExpenses.totalBankExpenses,
    totalBusinessExpenses: currencyToMoneyString(totalBusinessExpenses),
    businessNetEarnings: currencyToMoneyString(businessNetEarnings),
    businessRemainingVat: currencyToMoneyString(businessExpensesVat),
    personalSalaryIncome: state.salary.yearlyData.netSalary
  };
}
