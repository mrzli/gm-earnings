import React, { useState } from 'react';
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
import { useUpdateOutputData } from '../../utils/hooks';
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
  const [inputData, setInputData] = useState(defaultInputData);

  const outputData = useUpdateOutputData(
    inputData,
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
        <div
          style={{
            gridRowStart: 1,
            gridColumnStart: 1,
            gridColumnEnd: 'span 4'
          }}
        >
          <InputList<BusinessExpenseItem>
            items={inputData.items}
            ItemComponent={BusinessExpenseEntry}
            emptyItem={EMPTY_BUSINESS_EXPENSE_ITEM}
            onValueChanged={(updatedValue) => {
              setInputData((s) => {
                return { ...s, items: updatedValue };
              });
            }}
          />
        </div>
        <MoneyDisplayInGrid
          label={'Total B. E. (w/o VAT)'}
          value={outputData.totalBusinessExpenses}
          row={2}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total B. E. VAT'}
          value={outputData.totalBusinessExpensesVat}
          row={2}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Monthly B. E. (w/o VAT)'}
          value={outputData.monthlyBusinessExpenses}
          row={2}
          column={3}
        />
      </GridLayout>
    </SectionContainer>
  );
}

interface ExpensesAndVat {
  readonly expenses: Currency;
  readonly vat: Currency;
}

function getOutputData(
  input: BusinessExpensesSectionInputData
): BusinessExpensesSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA;
  }

  const totalBusinessExpenses = input.items.reduce<ExpensesAndVat>(
    (acc, item) => {
      const currentItemExpenses = moneyStringToCurrency(item.amount.amount)
        .multiply(item.quantity as number)
        .multiply(getYearlyMultiplierForInterval(item.interval));

      const currentItemVat = item.amount.isVat
        ? currentItemExpenses.multiply(VAT_PERCENT)
        : ZERO_MONEY;

      return {
        expenses: acc.expenses.add(currentItemExpenses),
        vat: acc.vat.add(currentItemVat)
      };
    },
    { expenses: ZERO_MONEY, vat: ZERO_MONEY }
  );

  const monthlyBusinessExpenses = totalBusinessExpenses.expenses.divide(12);

  return {
    isValid: true,
    totalBusinessExpenses: currencyToMoneyString(
      totalBusinessExpenses.expenses
    ),
    totalBusinessExpensesVat: currencyToMoneyString(totalBusinessExpenses.vat),
    monthlyBusinessExpenses: currencyToMoneyString(monthlyBusinessExpenses)
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
