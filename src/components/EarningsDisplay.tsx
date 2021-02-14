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

export function EarningsDisplay(): React.ReactElement {
  const [inputData, setInputData] = useState(DEFAULT_EARNINGS_DISPLAY_DATA);

  return (
    <div>
      <EarningsSection
        defaultInputData={DEFAULT_EARNINGS_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setInputData((s) => ({
            ...s,
            earningsSectionOutputData: value
          }));
        }}
      />
      <BusinessExpensesSection
        defaultInputData={DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setInputData((s) => ({
            ...s,
            businessExpensesSectionOutputData: value
          }));
        }}
      />
      <SalarySection
        defaultInputData={DEFAULT_SALARY_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          setInputData((s) => ({
            ...s,
            salarySectionOutputData: value
          }));
        }}
      />
      <BankExpensesSection
        defaultInputData={DEFAULT_BANK_EXPENSES_SECTION_INPUT_DATA}
        numOutgoingTransactionsPerYear={
          inputData.businessExpensesSectionOutputData
            .numOutgoingTransactionsPerYear +
          inputData.salarySectionOutputData.yearlyData.numOutgoingTransactions
        }
        onOutputDataChanged={(value) => {
          setInputData((s) => ({
            ...s,
            bankExpensesSectionOutputData: value
          }));
        }}
      />
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
