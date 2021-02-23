import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
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
import { PersonalExpensesSection } from './personal-expenses/PersonalExpensesSection';
import { DEFAULT_PERSONAL_EXPENSES_SECTION_INPUT_DATA } from '../data/personal-expenses-data';
import { Fn1 } from '../types/generic/generic-types';
import { SavingsSection } from './savings/SavingsSection';
import { SavingsData } from '../types/savings/savings-data';
import { MONTHS_PER_YEAR } from '../data/generic-data';

type EarningsDisplayDataKey = keyof EarningsDisplayData;

type EarningsDisplayDataSetters = {
  readonly [K in EarningsDisplayDataKey]: Fn1<EarningsDisplayData[K], void>;
};

function createSetStateField<K extends EarningsDisplayDataKey>(
  key: K,
  setState: Dispatch<SetStateAction<EarningsDisplayData>>
): Fn1<EarningsDisplayData[K], void> {
  return (value: EarningsDisplayData[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };
}

export function EarningsDisplay(): React.ReactElement {
  const [state, setState] = useState(DEFAULT_EARNINGS_DISPLAY_DATA);

  const setStateFieldFunctions = useMemo<EarningsDisplayDataSetters>(
    () => ({
      general: createSetStateField('general', setState),
      earnings: createSetStateField('earnings', setState),
      businessExpenses: createSetStateField('businessExpenses', setState),
      bankExpenses: createSetStateField('bankExpenses', setState),
      salary: createSetStateField('salary', setState),
      personalIncome: createSetStateField('personalIncome', setState),
      personalExpenses: createSetStateField('personalExpenses', setState)
    }),
    [setState]
  );

  const businessResultsData = getBusinessResultsData(state);
  const savingsData = getSavingsData(state);

  return (
    <div>
      <GeneralSection
        defaultInputData={DEFAULT_GENERAL_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['general']}
      />
      <EarningsSection
        defaultInputData={DEFAULT_EARNINGS_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['earnings']}
        exchangeRates={state.general.exchangeRates}
      />
      <BusinessExpensesSection
        defaultInputData={DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['businessExpenses']}
        exchangeRates={state.general.exchangeRates}
      />
      <SalarySection
        defaultInputData={DEFAULT_SALARY_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['salary']}
        exchangeRates={state.general.exchangeRates}
        surtaxPercent={state.general.surtaxPercent}
      />
      <BankExpensesSection
        defaultInputData={DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['bankExpenses']}
        numOutgoingTransactionsPerYear={
          state.businessExpenses.numOutgoingTransactionsPerYear +
          state.salary.yearlyData.numOutgoingTransactions
        }
        exchangeRates={state.general.exchangeRates}
      />
      <BusinessResultsSection data={businessResultsData} />
      <PersonalIncomeSection
        defaultInputData={DEFAULT_PERSONAL_INCOME_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['personalIncome']}
        businessTotalEarnings={state.earnings.totalEarnings}
        businessNetEarnings={businessResultsData.businessNetEarnings}
        yearlyNetSalary={businessResultsData.personalSalaryIncome}
        surtaxPercent={state.general.surtaxPercent}
      />
      <PersonalExpensesSection
        defaultInputData={DEFAULT_PERSONAL_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={setStateFieldFunctions['personalExpenses']}
        exchangeRates={state.general.exchangeRates}
      />
      <SavingsSection data={savingsData} />
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

function getSavingsData(state: EarningsDisplayData): SavingsData {
  const totalSavings = moneyStringToCurrency(
    state.personalIncome.totalPersonalIncome
  ).subtract(state.personalExpenses.totalPersonalExpenses);

  const monthlySavings = totalSavings.divide(MONTHS_PER_YEAR);

  return {
    totalSavings: currencyToMoneyString(totalSavings),
    savingsPerMonth: currencyToMoneyString(monthlySavings)
  };
}
