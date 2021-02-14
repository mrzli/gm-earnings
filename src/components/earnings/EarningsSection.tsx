import React from 'react';
import { SectionContainer } from '../generic/SectionContainer';
import { EarningsSectionInputData } from '../../types/earnings/earnings-section-input-data';
import { GridLayout } from '../generic/GridLayout';
import { IntegerInput } from '../generic/IntegerInput';
import { MoneyInputWithVatInGrid } from '../generic/MoneyInputWithVatInGrid';
import { MoneyDisplayInGrid } from '../generic/MoneyDisplayInGrid';
import { EarningsSectionOutputData } from '../../types/earnings/earnings-section-output-data';
import {
  PERCENT_TO_FRACTION_MULTIPLIER,
  VAT_PERCENT
} from '../../data/general-data';
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
import { useInputOutputData } from '../../utils/hooks';
import { DividerInGrid } from '../generic/DividerInGrid';
import { GridItem } from '../generic/GridItem';
import { stateValueChange } from '../../utils/generic-utils';

interface EarningsSectionProps {
  readonly defaultInputData: EarningsSectionInputData;
  readonly onOutputDataChanged: (data: EarningsSectionOutputData) => void;
}

export function EarningsSection({
  defaultInputData,
  onOutputDataChanged
}: EarningsSectionProps): React.ReactElement {
  const { inputData, setInputData, outputData } = useInputOutputData(
    defaultInputData,
    EMPTY_EARNINGS_SECTION_OUTPUT_DATA,
    getOutputData,
    onOutputDataChanged
  );

  return (
    <SectionContainer header={'Earnings'} isDataValid={outputData.isValid}>
      <GridLayout columnsTemplate={'200px 200px 200px auto'}>
        <GridItem row={1} column={1}>
          <IntegerInput
            label={'Number of Working Days'}
            value={inputData.workingDays}
            onValueChanged={(value) => {
              setInputData((s) => ({
                ...s,
                workingDays: value
              }));
            }}
            minValue={0}
            maxValue={365}
          />
        </GridItem>
        <GridItem row={1} column={2}>
          <IntegerInput
            label={'Working Hours per Day'}
            value={inputData.workingHours}
            onValueChanged={(value) => {
              setInputData((s) => ({
                ...s,
                workingHours: value
              }));
            }}
            minValue={0}
            maxValue={24}
          />
        </GridItem>
        <MoneyInputWithVatInGrid
          label={'Hourly Rate'}
          value={inputData.hourlyRate}
          onValueChanged={(value) => {
            setInputData((s) => ({
              ...s,
              hourlyRate: value
            }));
          }}
          row={1}
          column={3}
        />
        <DividerInGrid row={2} span={4} />
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
    ? totalEarnings
        .multiply(VAT_PERCENT)
        .multiply(PERCENT_TO_FRACTION_MULTIPLIER)
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
