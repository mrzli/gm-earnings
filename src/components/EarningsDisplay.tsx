import React, { useEffect, useReducer, useState } from 'react';
import { EarningsData } from '../types/earnings-data';
import {
  DEFAULT_EARNINGS_INPUT_DATA,
  EMPTY_EARNINGS_DATA
} from '../data/earnings-data';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { EarningsInputData } from '../types/earnings-input-data';
import { IntegerInput } from './generic/IntegerInput';
import { MoneyInputWithVatInGrid } from './generic/MoneyInputWithVatInGrid';
import { InputAmountWithVat } from '../types/input-amount-with-vat';
import { LabelledMoneyDisplayInGrid } from './generic/LabelledMoneyDisplayInGrid';
import { LabelInGrid } from './generic/LabelInGrid';
import { GridLayout } from './generic/GridLayout';
import { SalaryBreakdownInput } from './salary/SalaryBreakdownInput';
import { ZERO_AMOUNT } from '../data/general-data';
import { getEarningsData } from './earnings/earnings-calculations';
import { BusinessExpensesInput } from './earnings/BusinessExpensesInput';
import { EarningsSection } from './earnings/EarningsSection';

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
    <GridLayout columnsTemplate={'240px 200px auto 1fr'}>
      <EarningsSection />
      <LabelInGrid text={'Number of Working Days:'} row={1} column={1} />
      <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
        <IntegerInput
          label={'Number of Working Days'}
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
        label={'Total Earnings (without VAT):'}
        value={earnings.totalEarnings}
        row={4}
        column={1}
      />
      <LabelledMoneyDisplayInGrid
        label={'Total VAT:'}
        value={earnings.totalVat}
        row={5}
        column={1}
      />
      <div
        style={{
          gridRowStart: 6,
          gridColumnStart: 1,
          gridColumnEnd: 'span 4'
        }}
      >
        <BusinessExpensesInput
          value={earningsInputState.businessExpenseItems}
          onValueChanged={(value) => {
            earningsInputDispatch({
              type: InputDataActionType.SetBusinessExpenseItems,
              payload: value
            });
          }}
        />
      </div>
      <LabelledMoneyDisplayInGrid
        label={'Earnings After Business Expenses (without VAT):'}
        value={ZERO_AMOUNT}
        row={9}
        column={1}
      />
      <LabelledMoneyDisplayInGrid
        label={'VAT After Expenses:'}
        value={ZERO_AMOUNT}
        row={10}
        column={1}
      />
      <div
        style={{
          gridRowStart: 11,
          gridColumnStart: 1,
          gridColumnEnd: 'span 4'
        }}
      >
        <SalaryBreakdownInput />
      </div>
    </GridLayout>
  );
}
