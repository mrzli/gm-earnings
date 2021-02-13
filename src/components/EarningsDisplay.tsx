import React, { useReducer } from 'react';
import {
  DEFAULT_EARNINGS_DISPLAY_DATA,
  DEFAULT_EARNINGS_SECTION_INPUT_DATA
} from '../data/earnings-data';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { MoneyDisplayInGrid } from './generic/MoneyDisplayInGrid';
import { SalaryBreakdownInput } from './salary/SalaryBreakdownInput';
import { ZERO_AMOUNT } from '../data/general-data';
import { BusinessExpensesSection } from './earnings/BusinessExpensesSection';
import { EarningsSection } from './earnings/EarningsSection';
import { EarningsSectionOutputData } from '../types/earnings/earnings-section-output-data';
import { EarningsDisplayData } from '../types/earnings/earnings-display-data';

enum EarningsDisplayDataActionType {
  SetEarningsSectionOutputData = 'SetEarningsSectionOutputData',
  SetBusinessExpenseItems = 'SetBusinessExpenseItems'
}

interface ActionSetEarningsSectionOutputData {
  readonly type: EarningsDisplayDataActionType.SetEarningsSectionOutputData;
  readonly payload: EarningsSectionOutputData;
}

interface ActionSetBusinessExpenseItems {
  readonly type: EarningsDisplayDataActionType.SetBusinessExpenseItems;
  readonly payload: readonly BusinessExpenseItem[];
}

type EarningsDisplayDataAction =
  | ActionSetEarningsSectionOutputData
  | ActionSetBusinessExpenseItems;

function earningsDisplayReducer(
  state: EarningsDisplayData,
  action: EarningsDisplayDataAction
): EarningsDisplayData {
  switch (action.type) {
    case EarningsDisplayDataActionType.SetEarningsSectionOutputData:
      return { ...state, earningsSectionOutputData: action.payload };
    case EarningsDisplayDataActionType.SetBusinessExpenseItems:
      return { ...state, businessExpenseItems: action.payload };
    default:
      return state;
  }
}

export function EarningsDisplay(): React.ReactElement {
  const [inputState, inputDispatch] = useReducer(
    earningsDisplayReducer,
    DEFAULT_EARNINGS_DISPLAY_DATA
  );

  return (
    <div>
      <EarningsSection
        defaultInputData={DEFAULT_EARNINGS_SECTION_INPUT_DATA}
        onOutputDataChanged={(output) => {
          inputDispatch({
            type: EarningsDisplayDataActionType.SetEarningsSectionOutputData,
            payload: output
          });
        }}
      />
      <BusinessExpensesSection
        value={inputState.businessExpenseItems}
        onValueChanged={(value) => {
          inputDispatch({
            type: EarningsDisplayDataActionType.SetBusinessExpenseItems,
            payload: value
          });
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
      <SalaryBreakdownInput />
    </div>
  );
}
