import React, { useEffect, useState } from 'react';
import { BankExpensesSectionInputData } from '../../types/bank-expenses/bank-expenses-section-input-data';
import { SectionContainer } from '../generic/layout/SectionContainer';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../../utils/currency-utils';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import {
  isInNumericRange,
  isValidMoneyString
} from '../../utils/validation-utils';
import { BankExpensesSectionOutputData } from '../../types/bank-expenses/bank-expenses-section-output-data';
import { GridLayout } from '../generic/layout/GridLayout';
import { MoneyInput } from '../generic/inputs/MoneyInput';
import { IntegerInput } from '../generic/inputs/IntegerInput';
import { TextDisplayInGrid } from '../generic/displays/TextDisplayInGrid';
import { DividerInGrid } from '../generic/layout/DividerInGrid';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import { GridItem } from '../generic/layout/GridItem';
import { EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA } from '../../data/bank-expenses-data';
import { MONTHS_PER_YEAR } from '../../data/generic-data';

interface BankExpensesSectionProps {
  readonly defaultInputData: BankExpensesSectionInputData;
  readonly onOutputDataChanged: (data: BankExpensesSectionOutputData) => void;
  readonly numOutgoingTransactionsPerYear: number;
}

export function BankExpensesSection({
  defaultInputData,
  numOutgoingTransactionsPerYear,
  onOutputDataChanged
}: BankExpensesSectionProps): React.ReactElement {
  const [inputData, setInputData] = useState(defaultInputData);
  const [outputData, setOutputData] = useState(
    EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA
  );

  useEffect(
    () => {
      const newOutputData = getOutputData(
        inputData,
        numOutgoingTransactionsPerYear
      );
      setOutputData(newOutputData);
      onOutputDataChanged(newOutputData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData, numOutgoingTransactionsPerYear]
  );

  return (
    <SectionContainer header={'Bank Expenses'} isDataValid={outputData.isValid}>
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <GridItem row={1} column={1}>
          <MoneyInput
            label={'Monthly Fee'}
            value={inputData.bankMonthlyFee}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, bankMonthlyFee: value }));
            }}
          />
        </GridItem>
        <GridItem row={1} column={2}>
          <MoneyInput
            label={'Incoming Transaction Fee'}
            value={inputData.incomingTransactionFee}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, incomingTransactionFee: value }));
            }}
          />
        </GridItem>
        <GridItem row={1} column={3}>
          <IntegerInput
            label={'Inc. Trans. per Year'}
            value={inputData.numIncomingTransactionsPerYear}
            onValueChanged={(value) => {
              setInputData((s) => ({
                ...s,
                numIncomingTransactionsPerYear: value
              }));
            }}
            minValue={0}
            maxValue={1000}
          />
        </GridItem>
        <GridItem row={1} column={4}>
          <MoneyInput
            label={'Outgoing Transaction Fee'}
            value={inputData.outgoingTransactionFee}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, outgoingTransactionFee: value }));
            }}
          />
        </GridItem>
        <TextDisplayInGrid
          label={'Out. Trans. per Year'}
          value={numOutgoingTransactionsPerYear.toString()}
          row={1}
          column={5}
        />
        <DividerInGrid row={2} span={6} />
        <MoneyDisplayInGrid
          label={'Total Bank Expenses'}
          value={outputData.totalBankExpenses}
          row={3}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Monthly Bank Expenses'}
          value={outputData.monthlyBankExpenses}
          row={3}
          column={2}
        />
      </GridLayout>
    </SectionContainer>
  );
}

function getOutputData(
  input: BankExpensesSectionInputData,
  numOutgoingTransactionsPerYear: number
): BankExpensesSectionOutputData {
  if (!isInputValid(input, numOutgoingTransactionsPerYear)) {
    return EMPTY_BANK_EXPENSES_SECTION_OUTPUT_DATA;
  }

  const incomingTransactionExpenses = moneyStringToCurrency(
    input.incomingTransactionFee
  ).multiply(input.numIncomingTransactionsPerYear);
  const outgoingTransactionExpenses = moneyStringToCurrency(
    input.outgoingTransactionFee
  ).multiply(numOutgoingTransactionsPerYear);
  const bankFeeExpenses = moneyStringToCurrency(input.bankMonthlyFee).multiply(
    MONTHS_PER_YEAR
  );

  const totalBankExpenses = bankFeeExpenses
    .add(incomingTransactionExpenses)
    .add(outgoingTransactionExpenses);

  const monthlyBankExpenses = totalBankExpenses.divide(MONTHS_PER_YEAR);

  return {
    isValid: true,
    totalBankExpenses: currencyToMoneyString(totalBankExpenses),
    monthlyBankExpenses: currencyToMoneyString(monthlyBankExpenses)
  };
}

function isInputValid(
  input: BankExpensesSectionInputData,
  numOutgoingTransactionsPerYear: number
): input is NonNullableReadonlyObject<BankExpensesSectionInputData> {
  return (
    isValidMoneyString(input.bankMonthlyFee) &&
    isValidMoneyString(input.incomingTransactionFee) &&
    input.numIncomingTransactionsPerYear !== undefined &&
    isInNumericRange(input.numIncomingTransactionsPerYear, 0, 1000) &&
    isValidMoneyString(input.outgoingTransactionFee) &&
    isInNumericRange(numOutgoingTransactionsPerYear, 0, 100000)
  );
}
