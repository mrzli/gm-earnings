import React, { useReducer } from 'react';
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
import { useUpdateOutputData } from '../../utils/hooks';
import { Divider } from '@material-ui/core';

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
  const [inputData, inputDataDispatch] = useReducer(
    earningsSectionInputReducer,
    defaultInputData
  );

  const outputData = useUpdateOutputData(
    inputData,
    EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
    getOutputData,
    onOutputDataChanged
  );

  return (
    <SectionContainer header={'Earnings'} isDataValid={outputData.isValid}>
      <GridLayout columnsTemplate={'200px 200px 200px auto'}>
        <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
          <IntegerInput
            label={'Number of Working Days'}
            value={inputData.workingDays}
            onValueChanged={(value) => {
              inputDataDispatch({
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
            value={inputData.workingHours}
            onValueChanged={(value) => {
              inputDataDispatch({
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
          value={inputData.hourlyRate}
          onValueChanged={(value) => {
            inputDataDispatch({
              type: EarningsSectionInputActionType.SetHourlyRate,
              payload: value
            });
          }}
          row={1}
          column={3}
        />
        <Divider
          style={{
            gridRowStart: 2,
            gridColumnStart: 1,
            gridColumnEnd: 'span 4'
          }}
        />
        <MoneyDisplayInGrid
          label={'Total Earnings (w/o VAT):'}
          value={outputData.totalEarnings}
          row={3}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total VAT:'}
          value={outputData.totalVat}
          row={3}
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
  input: EarningsSectionInputData
): input is NonNullableReadonlyObject<EarningsSectionInputData> {
  return (
    input.workingDays !== undefined &&
    isInNumericRange(input.workingDays, 0, 365) &&
    input.workingHours !== undefined &&
    isInNumericRange(input.workingHours, 0, 24) &&
    isValidMoneyString(input.hourlyRate.amount)
  );
}
