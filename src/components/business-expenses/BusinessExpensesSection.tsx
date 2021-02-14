import React from 'react';
import Currency from 'currency.js';
import { InputList } from '../generic/InputList';
import { BusinessExpenseItem } from '../../types/business-expenses/business-expense-item';
import { BusinessExpenseEntry } from './BusinessExpenseEntry';
import { MoneyDisplayInGrid } from '../generic/MoneyDisplayInGrid';
import { VAT_PERCENT } from '../../data/general-data';
import { GridLayout } from '../generic/GridLayout';
import { SectionContainer } from '../generic/SectionContainer';
import { BusinessExpensesSectionInputData } from '../../types/business-expenses/business-expenses-section-input-data';
import { BusinessExpensesSectionOutputData } from '../../types/business-expenses/business-expenses-section-output-data';
import {
  EMPTY_BUSINESS_EXPENSE_ITEM,
  EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA
} from '../../data/business-expenses-data';
import { useInputOutputData } from '../../utils/hooks';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import {
  isInNumericRange,
  isValidMoneyString,
  isValidText
} from '../../utils/validation-utils';
import { ExpenseInterval } from '../../types/generic/expense-interval';
import {
  currencyToMoneyString,
  moneyStringToCurrency,
  ZERO_MONEY
} from '../../utils/currency-utils';
import { DividerInGrid } from '../generic/DividerInGrid';
import { GridItem } from '../generic/GridItem';

interface BusinessExpensesSectionProps {
  readonly defaultInputData: BusinessExpensesSectionInputData;
  readonly onOutputDataChanged: (
    data: BusinessExpensesSectionOutputData
  ) => void;
}

export function BusinessExpensesSection({
  defaultInputData,
  onOutputDataChanged
}: BusinessExpensesSectionProps): React.ReactElement {
  const { inputData, setInputData, outputData } = useInputOutputData(
    defaultInputData,
    EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA,
    getOutputData,
    onOutputDataChanged
  );

  return (
    <SectionContainer
      header={'Business Expenses'}
      isDataValid={outputData.isValid}
    >
      <GridLayout columnsTemplate={'200px 200px 200px 1fr'}>
        <GridItem row={1} column={1} span={4}>
          <InputList<BusinessExpenseItem>
            items={inputData.items}
            ItemComponent={BusinessExpenseEntry}
            emptyItem={EMPTY_BUSINESS_EXPENSE_ITEM}
            onValueChanged={(updatedValue) => {
              setInputData((s) => ({
                ...s,
                items: updatedValue
              }));
            }}
          />
        </GridItem>
        <DividerInGrid row={2} span={4} />
        <MoneyDisplayInGrid
          label={'Total B. E. (w/o VAT)'}
          value={outputData.totalBusinessExpenses}
          row={3}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total B. E. VAT'}
          value={outputData.totalBusinessExpensesVat}
          row={3}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Monthly B. E. (w/o VAT)'}
          value={outputData.monthlyBusinessExpenses}
          row={3}
          column={3}
        />
      </GridLayout>
    </SectionContainer>
  );
}

interface ExpenseCollatedData {
  readonly expenses: Currency;
  readonly vat: Currency;
  readonly numOutgoingTransactionsPerYear: number;
}

function getOutputData(
  input: BusinessExpensesSectionInputData
): BusinessExpensesSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA;
  }

  const collatedData = input.items.reduce<ExpenseCollatedData>(
    (acc, item) => {
      const yearlyQuantity =
        (item.quantity as number) *
        getYearlyMultiplierForInterval(item.interval);

      const currentItemExpenses = moneyStringToCurrency(
        item.amount.amount
      ).multiply(yearlyQuantity);

      const currentItemVat = item.amount.isVat
        ? currentItemExpenses.multiply(VAT_PERCENT)
        : ZERO_MONEY;

      return {
        expenses: acc.expenses.add(currentItemExpenses),
        vat: acc.vat.add(currentItemVat),
        numOutgoingTransactionsPerYear:
          acc.numOutgoingTransactionsPerYear + yearlyQuantity
      };
    },
    { expenses: ZERO_MONEY, vat: ZERO_MONEY, numOutgoingTransactionsPerYear: 0 }
  );

  const monthlyBusinessExpenses = collatedData.expenses.divide(12);

  return {
    isValid: true,
    totalBusinessExpenses: currencyToMoneyString(collatedData.expenses),
    totalBusinessExpensesVat: currencyToMoneyString(collatedData.vat),
    monthlyBusinessExpenses: currencyToMoneyString(monthlyBusinessExpenses),
    numOutgoingTransactionsPerYear: collatedData.numOutgoingTransactionsPerYear
  };
}

function isInputValid(
  input: BusinessExpensesSectionInputData
): input is NonNullableReadonlyObject<BusinessExpensesSectionInputData> {
  return input.items.every((item) => {
    return (
      isValidText(item.name) &&
      isValidMoneyString(item.amount.amount) &&
      item.quantity !== undefined &&
      isInNumericRange(item.quantity, 1, 1000)
    );
  });
}

function getYearlyMultiplierForInterval(interval: ExpenseInterval): number {
  switch (interval) {
    case ExpenseInterval.Daily:
      return 365;
    case ExpenseInterval.Weekly:
      return 52;
    case ExpenseInterval.Monthly:
      return 12;
    case ExpenseInterval.Yearly:
      return 1;
    default:
      throw new Error(`Invalid interval '${interval}'`);
  }
}