import React, { useEffect, useReducer, useState } from 'react';
import { SectionContainer } from '../generic/SectionContainer';
import { InputAmountWithVat } from '../../types/generic/input-amount-with-vat';
import { EarningsSectionInputData } from '../../types/earnings/earnings-section-input-data';
import { GridLayout } from '../generic/GridLayout';
import { IntegerInput } from '../generic/IntegerInput';
import { MoneyInputWithVatInGrid } from '../generic/MoneyInputWithVatInGrid';
import { MoneyDisplayInGrid } from '../generic/MoneyDisplayInGrid';
import { EarningsSectionOutputData } from '../../types/earnings/earnings-section-output-data';
import { VAT_PERCENT } from '../../data/general-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency,
  ZERO_MONEY
} from '../../utils/currency-utils';
import {
  isInNumericRange,
  isValidMoneyString
} from '../../utils/validation-utils';
import { EMPTY_EARNINGS_SECTION_OUTPUT_DATA } from '../../data/earnings-data';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';

interface EarningsSectionProps {
  readonly defaultInputData: EarningsSectionInputData;
  readonly onOutputDataChanged: (data: EarningsSectionOutputData) => void;
}

enum EarningsSectionInputActionType {
  SetWorkingDays = 'SetWorkingDays',
  SetWorkingHours = 'SetWorkingHours',
  SetHourlyRate = 'SetHourlyRate'
}

interface ActionSetWorkingDays {
  readonly type: EarningsSectionInputActionType.SetWorkingDays;
  readonly payload: number | undefined;
}

interface ActionSetWorkingHours {
  readonly type: EarningsSectionInputActionType.SetWorkingHours;
  readonly payload: number | undefined;
}

interface ActionSetHourlyRate {
  readonly type: EarningsSectionInputActionType.SetHourlyRate;
  readonly payload: InputAmountWithVat;
}

type EarningsSectionInputAction =
  | ActionSetWorkingDays
  | ActionSetWorkingHours
  | ActionSetHourlyRate;

function earningsSectionInputReducer(
  state: EarningsSectionInputData,
  action: EarningsSectionInputAction
): EarningsSectionInputData {
  switch (action.type) {
    case EarningsSectionInputActionType.SetWorkingDays:
      return { ...state, workingDays: action.payload };
    case EarningsSectionInputActionType.SetWorkingHours:
      return { ...state, workingHours: action.payload };
    case EarningsSectionInputActionType.SetHourlyRate:
      return { ...state, hourlyRate: action.payload };
    default:
      return state;
  }
}

export function EarningsSection({
  defaultInputData,
  onOutputDataChanged
}: EarningsSectionProps): React.ReactElement {
  const [inputState, inputStateDispatch] = useReducer(
    earningsSectionInputReducer,
    defaultInputData
  );

  const [outputData, setOutputData] = useState(
    EMPTY_EARNINGS_SECTION_OUTPUT_DATA
  );

  useEffect(
    () => {
      const newOutputData = getOutputData(inputState);
      setOutputData(newOutputData);
      onOutputDataChanged(newOutputData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputState]
  );

  return (
    <SectionContainer
      header={'Earnings'}
      isDataValid={isInputValid(inputState)}
    >
      <GridLayout columnsTemplate={'200px 200px 200px auto'}>
        <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
          <IntegerInput
            label={'Number of Working Days'}
            value={inputState.workingDays}
            onValueChanged={(value) => {
              inputStateDispatch({
                type: EarningsSectionInputActionType.SetWorkingDays,
                payload: value
              });
            }}
            minValue={0}
            maxValue={365}
          />
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
          <IntegerInput
            label={'Working Hours per Day'}
            value={inputState.workingHours}
            onValueChanged={(value) => {
              inputStateDispatch({
                type: EarningsSectionInputActionType.SetWorkingHours,
                payload: value
              });
            }}
            minValue={0}
            maxValue={24}
          />
        </div>
        <MoneyInputWithVatInGrid
          label={'Hourly Rate'}
          value={inputState.hourlyRate}
          onValueChanged={(value) => {
            inputStateDispatch({
              type: EarningsSectionInputActionType.SetHourlyRate,
              payload: value
            });
          }}
          row={1}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Total Earnings (w/o VAT):'}
          value={outputData.totalEarnings}
          row={2}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total VAT:'}
          value={outputData.totalVat}
          row={2}
          column={2}
        />
      </GridLayout>
    </SectionContainer>
  );
}

function getOutputData(
  input: EarningsSectionInputData
): EarningsSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_EARNINGS_SECTION_OUTPUT_DATA;
  }

  const totalEarnings = moneyStringToCurrency(input.hourlyRate.amount)
    .multiply(input.workingHours)
    .multiply(input.workingDays);
  const totalVat = input.hourlyRate.isVat
    ? totalEarnings.multiply(VAT_PERCENT)
    : ZERO_MONEY;

  return {
    isValid: true,
    totalEarnings: currencyToMoneyString(totalEarnings),
    totalVat: currencyToMoneyString(totalVat)
  };
}

function isInputValid(
  earningsInput: EarningsSectionInputData
): earningsInput is NonNullableReadonlyObject<EarningsSectionInputData> {
  return (
    earningsInput.workingDays !== undefined &&
    isInNumericRange(earningsInput.workingDays, 0, 365) &&
    earningsInput.workingHours !== undefined &&
    isInNumericRange(earningsInput.workingHours, 0, 24) &&
    isValidMoneyString(earningsInput.hourlyRate.amount)
  );
}
