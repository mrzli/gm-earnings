import React, { useReducer } from 'react';
import { DEFAULT_EARNINGS_SECTION_INPUT_DATA } from '../data/earnings-data';
import { MoneyDisplayInGrid } from './generic/MoneyDisplayInGrid';
import { SalaryBreakdownInput } from './salary/SalaryBreakdownInput';
import { ZERO_AMOUNT } from '../data/general-data';
import { BusinessExpensesSection } from './business-expenses/BusinessExpensesSection';
import { EarningsSection } from './earnings/EarningsSection';
import { EarningsSectionOutputData } from '../types/earnings/earnings-section-output-data';
import { EarningsDisplayData } from '../types/earnings/earnings-display-data';
import { BusinessExpensesSectionOutputData } from '../types/business-expenses/business-expenses-section-output-data';
import { DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA } from '../data/business-expenses-data';
import { DEFAULT_EARNINGS_DISPLAY_DATA } from '../data/earnings-display-data';

enum EarningsDisplayDataActionType {
  SetEarningsSectionOutputData = 'SetEarningsSectionOutputData',
  SetBusinessExpensesSectionOutputData = 'SetBusinessExpensesSectionOutputData'
}

interface ActionSetEarningsSectionOutputData {
  readonly type: EarningsDisplayDataActionType.SetEarningsSectionOutputData;
  readonly payload: EarningsSectionOutputData;
}

interface ActionSetBusinessExpensesSectionOutputData {
  readonly type: EarningsDisplayDataActionType.SetBusinessExpensesSectionOutputData;
  readonly payload: BusinessExpensesSectionOutputData;
}

type EarningsDisplayDataAction =
  | ActionSetEarningsSectionOutputData
  | ActionSetBusinessExpensesSectionOutputData;

function earningsDisplayReducer(
  state: EarningsDisplayData,
  action: EarningsDisplayDataAction
): EarningsDisplayData {
  switch (action.type) {
    case EarningsDisplayDataActionType.SetEarningsSectionOutputData:
      return { ...state, earningsSectionOutputData: action.payload };
    case EarningsDisplayDataActionType.SetBusinessExpensesSectionOutputData:
      return { ...state, businessExpensesSectionOutputData: action.payload };
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
        defaultInputData={DEFAULT_BUSINESS_EXPENSES_SECTION_INPUT_DATA}
        onOutputDataChanged={(value) => {
          inputDispatch({
            type:
              EarningsDisplayDataActionType.SetBusinessExpensesSectionOutputData,
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
