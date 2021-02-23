import React, { useEffect, useState } from 'react';
import Currency from 'currency.js';
import { EntryList } from '../generic/layout/EntryList';
import { PersonalExpenseEntry } from './PersonalExpenseEntry';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import { MONTHS_PER_YEAR } from '../../data/generic-data';
import { GridLayout } from '../generic/layout/GridLayout';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import {
  isInNumericRange,
  isValidMoneyString,
  isValidText
} from '../../utils/validation-utils';
import {
  currencyToMoneyString,
  moneyStringToCurrency,
  ZERO_MONEY
} from '../../utils/currency-utils';
import { DividerInGrid } from '../generic/layout/DividerInGrid';
import { GridItem } from '../generic/layout/GridItem';
import { TextDisplayInGrid } from '../generic/displays/TextDisplayInGrid';
import { ExchangeRates } from '../../types/generic/exchange-rates';
import {
  getYearlyMultiplierForInterval,
  toHrkAmount
} from '../../utils/domain-utils';
import { PersonalExpenseItem } from '../../types/personal-expenses/personal-expense-item';
import {
  EMPTY_PERSONAL_EXPENSE_ITEM,
  EMPTY_PERSONAL_EXPENSES_SECTION_OUTPUT_DATA
} from '../../data/personal-expenses-data';
import { PersonalExpensesSectionInputData } from '../../types/personal-expenses/personal-expenses-section-input-data';
import { PersonalExpensesSectionOutputData } from '../../types/personal-expenses/personal-expenses-section-output-data';

interface PersonalExpensesSectionProps {
  readonly defaultInputData: PersonalExpensesSectionInputData;
  readonly onOutputDataChanged: (
    data: PersonalExpensesSectionOutputData
  ) => void;
  readonly exchangeRates: ExchangeRates;
}

export function PersonalExpensesSection({
  defaultInputData,
  onOutputDataChanged,
  exchangeRates
}: PersonalExpensesSectionProps): React.ReactElement {
  const [inputData, setInputData] = useState(defaultInputData);
  const [outputData, setOutputData] = useState(
    EMPTY_PERSONAL_EXPENSES_SECTION_OUTPUT_DATA
  );

  useEffect(() => {
    const newOutputData = getOutputData(inputData, exchangeRates);
    setOutputData(newOutputData);
    onOutputDataChanged(newOutputData);
  }, [inputData, setOutputData, onOutputDataChanged, exchangeRates]);

  return (
    <SectionContainer
      header={'Personal Expenses'}
      isDataValid={outputData.isValid}
    >
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <GridItem row={1} column={1} span={6}>
          <EntryList<PersonalExpenseItem>
            items={inputData.items}
            ItemComponent={PersonalExpenseEntry}
            emptyItem={EMPTY_PERSONAL_EXPENSE_ITEM}
            onValueChanged={(updatedValue) => {
              setInputData((s) => ({
                ...s,
                items: updatedValue
              }));
            }}
          />
        </GridItem>
        <DividerInGrid row={2} span={6} />
        <MoneyDisplayInGrid
          label={'Total Personal Expenses'}
          value={outputData.totalPersonalExpenses}
          row={3}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Monthly Pers. Expenses'}
          value={outputData.monthlyPersonalExpenses}
          row={3}
          column={2}
        />
        <TextDisplayInGrid
          label={'Out. Trans. p/y'}
          value={outputData.numOutgoingTransactionsPerYear.toString()}
          row={3}
          column={3}
        />
      </GridLayout>
    </SectionContainer>
  );
}

interface ExpenseCollatedData {
  readonly expenses: Currency;
  readonly numOutgoingTransactionsPerYear: number;
}

function getOutputData(
  input: PersonalExpensesSectionInputData,
  exchangeRates: ExchangeRates
): PersonalExpensesSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_PERSONAL_EXPENSES_SECTION_OUTPUT_DATA;
  }

  const collatedData = input.items.reduce<ExpenseCollatedData>(
    (acc, item) => {
      const yearlyQuantity =
        (item.quantity as number) *
        getYearlyMultiplierForInterval(item.interval);

      const currentItemExpensesHrk = toHrkAmount(item.amount, exchangeRates);
      const currentItemExpenses = moneyStringToCurrency(
        currentItemExpensesHrk
      ).multiply(yearlyQuantity);

      return {
        expenses: acc.expenses.add(currentItemExpenses),
        numOutgoingTransactionsPerYear:
          acc.numOutgoingTransactionsPerYear + yearlyQuantity
      };
    },
    { expenses: ZERO_MONEY, numOutgoingTransactionsPerYear: 0 }
  );

  const monthlyPersonalExpenses = collatedData.expenses.divide(MONTHS_PER_YEAR);

  return {
    isValid: true,
    totalPersonalExpenses: currencyToMoneyString(collatedData.expenses),
    monthlyPersonalExpenses: currencyToMoneyString(monthlyPersonalExpenses),
    numOutgoingTransactionsPerYear: collatedData.numOutgoingTransactionsPerYear
  };
}

function isInputValid(
  input: PersonalExpensesSectionInputData
): input is NonNullableReadonlyObject<PersonalExpensesSectionInputData> {
  return input.items.every(isPersonalExpenseItemValid);
}

function isPersonalExpenseItemValid(item: PersonalExpenseItem): boolean {
  return (
    isValidText(item.name) &&
    isValidMoneyString(item.amount.amount) &&
    item.quantity !== undefined &&
    isInNumericRange(item.quantity, 1, 1000)
  );
}
