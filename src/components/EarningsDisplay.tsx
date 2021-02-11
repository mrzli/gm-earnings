import React, { useEffect, useReducer, useState } from 'react';
import { EarningsData } from '../types/earnings-data';
import {
  DEFAULT_EARNINGS_INPUT_DATA,
  EMPTY_BUSINESS_EXPENSE_ITEM,
  EMPTY_EARNINGS_DATA,
  VAT_MULTIPLIER
} from '../data/earnings-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../utils/currency-utils';
import { InputList } from './generic/InputList';
import { BusinessExpenseInput } from './BusinessExpenseInput';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { EarningsInputData } from '../types/earnings-input-data';
import {
  isInNumericRange,
  isValidMoneyString
} from '../utils/validation-utils';
import { IntegerInput } from './generic/IntegerInput';
import { MoneyInputWithVatInGrid } from './generic/MoneyInputWithVatInGrid';
import { InputAmountWithVat } from '../types/input-amount-with-vat';
import { LabelledMoneyDisplayInGrid } from './generic/LabelledMoneyDisplayInGrid';
import { LabelInGrid } from './generic/LabelInGrid';
import { GridLayout } from './generic/GridLayout';

enum InputDataActionType {
  SetWorkingDays = 'SetWorkingDays',
  SetWorkingHours = 'SetWorkingHours',
  SetHourlyRate = 'SetHourlyRate',
  SetBusinessExpenseItems = 'SetBusinessExpenseItems'
}

interface ActionSetWorkingDays {
  readonly type: InputDataActionType.SetWorkingDays;
  readonly payload: number;
}

interface ActionSetWorkingHours {
  readonly type: InputDataActionType.SetWorkingHours;
  readonly payload: number;
}

interface ActionSetHourlyRate {
  readonly type: InputDataActionType.SetHourlyRate;
  readonly payload: InputAmountWithVat;
}

interface ActionSetBusinessExpenseItems {
  readonly type: InputDataActionType.SetBusinessExpenseItems;
  readonly payload: readonly BusinessExpenseItem[];
}

type InputDataAction =
  | ActionSetWorkingDays
  | ActionSetWorkingHours
  | ActionSetHourlyRate
  | ActionSetBusinessExpenseItems;

function earningsInputReducer(
  state: EarningsInputData,
  action: InputDataAction
): EarningsInputData {
  switch (action.type) {
    case InputDataActionType.SetWorkingDays:
      return { ...state, workingDays: action.payload };
    case InputDataActionType.SetWorkingHours:
      return { ...state, workingHours: action.payload };
    case InputDataActionType.SetHourlyRate:
      return { ...state, hourlyRate: action.payload };
    case InputDataActionType.SetBusinessExpenseItems:
      return { ...state, businessExpenseItems: action.payload };
    default:
      return state;
  }
}

const GRID_COLUMNS = 4;

export function EarningsDisplay(): React.ReactElement {
  const [earningsInputState, earningsInputDispatch] = useReducer(
    earningsInputReducer,
    DEFAULT_EARNINGS_INPUT_DATA
  );

  const [earnings, setEarnings] = useState<EarningsData>(EMPTY_EARNINGS_DATA);

  useEffect(() => {
    setEarnings(getEarningsData(earningsInputState));
  }, [earningsInputState]);

  return (
    <GridLayout columns={GRID_COLUMNS}>
      <LabelInGrid text={'Number of Working Days:'} row={1} column={1} />
      <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
        <IntegerInput
          value={earningsInputState.workingDays}
          onValueChanged={(value) => {
            earningsInputDispatch({
              type: InputDataActionType.SetWorkingDays,
              payload: value
            });
          }}
          minValue={0}
          maxValue={365}
        />
      </div>
      <LabelInGrid
        text={'Number of Working Hours in a Day:'}
        row={2}
        column={1}
      />
      <div style={{ gridRowStart: 2, gridColumnStart: 2 }}>
        <IntegerInput
          value={earningsInputState.workingHours}
          onValueChanged={(value) => {
            earningsInputDispatch({
              type: InputDataActionType.SetWorkingHours,
              payload: value
            });
          }}
          minValue={0}
          maxValue={24}
        />
      </div>
      <LabelInGrid text={'Hourly Rate:'} row={3} column={1} />
      <MoneyInputWithVatInGrid
        value={earningsInputState.hourlyRate}
        onValueChanged={(value) => {
          earningsInputDispatch({
            type: InputDataActionType.SetHourlyRate,
            payload: value
          });
        }}
        row={3}
        column={2}
      />
      <LabelledMoneyDisplayInGrid
        label={'Total Earnings:'}
        value={earnings.totalEarnings}
        row={4}
        column={1}
      />
      <LabelledMoneyDisplayInGrid
        label={'Total Earnings with VAT:'}
        value={earnings.totalEarningsWithVat}
        row={5}
        column={1}
      />
      <div
        style={{
          gridRowStart: 6,
          gridColumnStart: 1,
          gridColumnEnd: `span ${GRID_COLUMNS}`
        }}
      >
        <InputList<BusinessExpenseItem>
          title={'Business Expenses:'}
          items={earningsInputState.businessExpenseItems}
          ItemComponent={BusinessExpenseInput}
          emptyItem={EMPTY_BUSINESS_EXPENSE_ITEM}
          onValueChanged={(value) => {
            earningsInputDispatch({
              type: InputDataActionType.SetBusinessExpenseItems,
              payload: value
            });
          }}
        />
      </div>
    </GridLayout>
  );
}

function getEarningsData(input: EarningsInputData): EarningsData {
  if (!isEarningsInputValid(input)) {
    return EMPTY_EARNINGS_DATA;
  }

  const totalEarnings = moneyStringToCurrency(input.hourlyRate.amount)
    .multiply(input.workingHours)
    .multiply(input.workingDays);
  const totalEarningsWithVat = input.hourlyRate.isVat
    ? totalEarnings.multiply(VAT_MULTIPLIER)
    : totalEarnings;

  return {
    totalEarnings: currencyToMoneyString(totalEarnings),
    totalEarningsWithVat: currencyToMoneyString(totalEarningsWithVat)
  };
}

function isEarningsInputValid(earningsInput: EarningsInputData): boolean {
  return (
    isInNumericRange(earningsInput.workingDays, 0, 365) &&
    isInNumericRange(earningsInput.workingHours, 0, 24) &&
    isValidMoneyString(earningsInput.hourlyRate.amount)
  );
}
