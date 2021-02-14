import React from 'react';
import Currency from 'currency.js';
import { EntryList } from '../generic/layout/EntryList';
import { BusinessExpenseItem } from '../../types/business-expenses/business-expense-item';
import { BusinessExpenseEntry } from './BusinessExpenseEntry';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import {
  DAYS_PER_YEAR,
  MONTHS_PER_YEAR,
  PERCENT_TO_FRACTION_MULTIPLIER,
  VAT_PERCENT,
  WEEKS_PER_YEAR
} from '../../data/general-data';
import { GridLayout } from '../generic/layout/GridLayout';
import { SectionContainer } from '../generic/layout/SectionContainer';
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
import { DividerInGrid } from '../generic/layout/DividerInGrid';
import { GridItem } from '../generic/layout/GridItem';
import { TextDisplayInGrid } from '../generic/displays/TextDisplayInGrid';

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
      <GridLayout columnsTemplate={'repeat(4, 200px) 1fr'}>
        <GridItem row={1} column={1} span={5}>
          <EntryList<BusinessExpenseItem>
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
        <DividerInGrid row={2} span={5} />
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
        <TextDisplayInGrid
          label={'Out. Trans. p/y'}
          value={outputData.numOutgoingTransactionsPerYear.toString()}
          row={3}
          column={4}
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
        ? currentItemExpenses
            .multiply(VAT_PERCENT)
            .multiply(PERCENT_TO_FRACTION_MULTIPLIER)
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
  return input.items.every(isBusinessExpenseItemValid);
}

function isBusinessExpenseItemValid(item: BusinessExpenseItem): boolean {
  return (
    isValidText(item.name) &&
    isValidMoneyString(item.amount.amount) &&
    item.quantity !== undefined &&
    isInNumericRange(item.quantity, 1, 1000)
  );
}

function getYearlyMultiplierForInterval(interval: ExpenseInterval): number {
  switch (interval) {
    case ExpenseInterval.Daily:
      return DAYS_PER_YEAR;
    case ExpenseInterval.Weekly:
      return WEEKS_PER_YEAR;
    case ExpenseInterval.Monthly:
      return MONTHS_PER_YEAR;
    case ExpenseInterval.Yearly:
      return 1;
    default:
      throw new Error(`Invalid interval '${interval}'`);
  }
}
