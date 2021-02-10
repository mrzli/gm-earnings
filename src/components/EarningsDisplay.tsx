import React, { useEffect, useReducer, useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { EarningsData } from '../types/earnings-data';
import {
  DEFAULT_EARNINGS_INPUT_DATA,
  EMPTY_BUSINESS_EXPENSE_ITEM,
  EMPTY_EARNINGS_DATA,
  VAT_MULTIPLIER
} from '../data/earnings-data';
import {
  currencyToCents,
  formatAsMoney,
  isValidMoneyString,
  moneyStringToCurrency
} from '../utils/currency-utils';
import { InputList } from './InputList';
import { BusinessExpenseInput } from './BusinessExpenseInput';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { EarningsInputData } from '../types/earnings-input-data';

enum InputDataActionType {
  SetWorkingDays = 'SetWorkingDays',
  SetWorkingHours = 'SetWorkingHours',
  SetHourlyRateAmount = 'SetHourlyRateAmount',
  SetHourlyRateIsVat = 'SetHourlyRateIsVat',
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

interface ActionSetHourlyRateAmount {
  readonly type: InputDataActionType.SetHourlyRateAmount;
  readonly payload: string;
}

interface ActionSetHourlyRateIsVat {
  readonly type: InputDataActionType.SetHourlyRateIsVat;
  readonly payload: boolean;
}

interface ActionSetBusinessExpenseItems {
  readonly type: InputDataActionType.SetBusinessExpenseItems;
  readonly payload: readonly BusinessExpenseItem[];
}

type InputDataAction =
  | ActionSetWorkingDays
  | ActionSetWorkingHours
  | ActionSetHourlyRateAmount
  | ActionSetHourlyRateIsVat
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
    case InputDataActionType.SetHourlyRateAmount:
      return {
        ...state,
        hourlyRate: { ...state.hourlyRate, amount: action.payload }
      };
    case InputDataActionType.SetHourlyRateIsVat:
      return {
        ...state,
        hourlyRate: { ...state.hourlyRate, isVat: action.payload }
      };
    case InputDataActionType.SetBusinessExpenseItems:
      return {
        ...state,
        businessExpenseItems: action.payload
      };
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, fit-content(${
          100 / GRID_COLUMNS
        }%))`,
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10
      }}
    >
      <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
        Number of Working Days:
      </div>
      <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
        <TextField
          type={'number'}
          fullWidth={true}
          error={!isValidWorkingDays(earningsInputState.workingDays)}
          value={earningsInputState.workingDays}
          inputProps={{
            min: 0,
            max: 365
          }}
          onChange={(event) => {
            earningsInputDispatch({
              type: InputDataActionType.SetWorkingDays,
              payload: Number.parseInt(event.target.value)
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 2, gridColumnStart: 1 }}>
        Number of Working Hours in a Day:
      </div>
      <div style={{ gridRowStart: 2, gridColumnStart: 2 }}>
        <TextField
          type={'number'}
          fullWidth={true}
          error={!isValidWorkingHours(earningsInputState.workingHours)}
          value={earningsInputState.workingHours}
          inputProps={{
            min: 0,
            max: 24
          }}
          onChange={(event) => {
            earningsInputDispatch({
              type: InputDataActionType.SetWorkingHours,
              payload: Number.parseInt(event.target.value)
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 3, gridColumnStart: 1 }}>Hourly Rate:</div>
      <div style={{ gridRowStart: 3, gridColumnStart: 2 }}>
        <TextField
          fullWidth={true}
          error={!isValidMoneyString(earningsInputState.hourlyRate.amount)}
          value={earningsInputState.hourlyRate.amount}
          onChange={(event) => {
            earningsInputDispatch({
              type: InputDataActionType.SetHourlyRateAmount,
              payload: event.target.value
            });
          }}
          InputProps={{
            endAdornment: <InputAdornment position={'start'}>kn</InputAdornment>
          }}
        />
      </div>
      <div style={{ gridRowStart: 3, gridColumnStart: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={earningsInputState.hourlyRate.isVat}
              onChange={(event, checked) => {
                earningsInputDispatch({
                  type: InputDataActionType.SetHourlyRateIsVat,
                  payload: checked
                });
              }}
            />
          }
          label={'VAT'}
        />
      </div>
      <div style={{ gridRowStart: 4, gridColumnStart: 1 }}>Total Earnings:</div>
      <div
        style={{
          gridRowStart: 4,
          gridColumnStart: 2
        }}
      >
        {formatAsMoney(earnings.totalEarnings)}
      </div>
      <div style={{ gridRowStart: 5, gridColumnStart: 1 }}>
        Total Earnings with VAT:
      </div>
      <div
        style={{
          gridRowStart: 5,
          gridColumnStart: 2
        }}
      >
        {formatAsMoney(earnings.totalEarningsWithVat)}
      </div>
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
    </div>
  );
}

function getEarningsData(input: EarningsInputData): EarningsData {
  if (!isEarningsInputValid(input)) {
    return {
      totalEarnings: 0,
      totalEarningsWithVat: 0
    };
  }

  const totalEarnings = moneyStringToCurrency(input.hourlyRate.amount)
    .multiply(input.workingHours)
    .multiply(input.workingDays);
  const totalEarningsWithVat = input.hourlyRate.isVat
    ? totalEarnings.multiply(VAT_MULTIPLIER)
    : totalEarnings;

  return {
    totalEarnings: currencyToCents(totalEarnings),
    totalEarningsWithVat: currencyToCents(totalEarningsWithVat)
  };
}

function isEarningsInputValid(earningsInput: EarningsInputData): boolean {
  return (
    isValidWorkingDays(earningsInput.workingDays) &&
    isValidWorkingHours(earningsInput.workingHours) &&
    isValidMoneyString(earningsInput.hourlyRate.amount)
  );
}

function isValidWorkingDays(workingDays: number): boolean {
  return workingDays >= 1 && workingDays <= 365;
}

function isValidWorkingHours(workingHours: number): boolean {
  return workingHours >= 1 && workingHours <= 24;
}
