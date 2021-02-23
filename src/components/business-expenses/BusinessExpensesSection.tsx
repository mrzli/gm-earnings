import React, { useEffect, useState } from 'react';
import Currency from 'currency.js';
import { EntryList } from '../generic/layout/EntryList';
import { BusinessExpenseItem } from '../../types/business-expenses/business-expense-item';
import { BusinessExpenseEntry } from './BusinessExpenseEntry';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import {
  MONTHS_PER_YEAR,
  PERCENT_TO_FRACTION_MULTIPLIER,
  VAT_PERCENT
} from '../../data/generic-data';
import { GridLayout } from '../generic/layout/GridLayout';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { BusinessExpensesSectionInputData } from '../../types/business-expenses/business-expenses-section-input-data';
import { BusinessExpensesSectionOutputData } from '../../types/business-expenses/business-expenses-section-output-data';
import {
  EMPTY_BUSINESS_EXPENSE_ITEM,
  EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA
} from '../../data/business-expenses-data';
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

interface BusinessExpensesSectionProps {
  readonly defaultInputData: BusinessExpensesSectionInputData;
  readonly onOutputDataChanged: (
    data: BusinessExpensesSectionOutputData
  ) => void;
  readonly exchangeRates: ExchangeRates;
}

export function BusinessExpensesSection({
  defaultInputData,
  onOutputDataChanged,
  exchangeRates
}: BusinessExpensesSectionProps): React.ReactElement {
  const [inputData, setInputData] = useState(defaultInputData);
  const [outputData, setOutputData] = useState(
    EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA
  );

  useEffect(() => {
    const newOutputData = getOutputData(inputData, exchangeRates);
    setOutputData(newOutputData);
    onOutputDataChanged(newOutputData);
  }, [exchangeRates, inputData, onOutputDataChanged]);

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
  input: BusinessExpensesSectionInputData,
  exchangeRates: ExchangeRates
): BusinessExpensesSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_BUSINESS_EXPENSES_SECTION_OUTPUT_DATA;
  }

  const collatedData = input.items.reduce<ExpenseCollatedData>(
    (acc, item) => {
      const yearlyQuantity =
        (item.quantity as number) *
        getYearlyMultiplierForInterval(item.interval);

      const currentItemExpensesHrk = toHrkAmount(
        item.amount.amount,
        exchangeRates
      );
      const currentItemExpenses = moneyStringToCurrency(
        currentItemExpensesHrk
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

  const monthlyBusinessExpenses = collatedData.expenses.divide(MONTHS_PER_YEAR);

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
    isValidMoneyString(item.amount.amount.amount) &&
    item.quantity !== undefined &&
    isInNumericRange(item.quantity, 1, 1000)
  );
}
