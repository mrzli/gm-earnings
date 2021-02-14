import React from 'react';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { GridLayout } from '../generic/layout/GridLayout';
import { useInputOutputData } from '../../utils/hooks';
import { EMPTY_GENERAL_SECTION_OUTPUT_DATA } from '../../data/general-data';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import {
  isValidPercentString,
  isValidPositiveNumberString
} from '../../utils/validation-utils';
import { GeneralSectionInputData } from '../../types/general/general-section-input-data';
import { GeneralSectionOutputData } from '../../types/general/general-section-output-data';
import { GridItem } from '../generic/layout/GridItem';
import { TextInput } from '../generic/inputs/TextInput';
import { PercentInput } from '../generic/inputs/PercentInput';

interface GeneralSectionProps {
  readonly defaultInputData: GeneralSectionInputData;
  readonly onOutputDataChanged: (data: GeneralSectionOutputData) => void;
}

export function GeneralSection({
  defaultInputData,
  onOutputDataChanged
}: GeneralSectionProps): React.ReactElement {
  const { inputData, setInputData, outputData } = useInputOutputData(
    defaultInputData,
    EMPTY_GENERAL_SECTION_OUTPUT_DATA,
    getOutputData,
    onOutputDataChanged
  );

  return (
    <SectionContainer header={'General'} isDataValid={outputData.isValid}>
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <GridItem row={1} column={1}>
          <TextInput
            label={'Exchange Rate EUR to HRK'}
            value={inputData.exchangeRateEurToHrk}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, exchangeRateEurToHrk: value }));
            }}
            validator={isValidPositiveNumberString}
          />
        </GridItem>
        <GridItem row={1} column={2}>
          <TextInput
            label={'Exchange Rate USD to HRK'}
            value={inputData.exchangeRateUsdToHrk}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, exchangeRateUsdToHrk: value }));
            }}
            validator={isValidPositiveNumberString}
          />
        </GridItem>
        <GridItem row={1} column={3}>
          <PercentInput
            label={'Surtax'}
            value={inputData.surtaxPercent}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, surtaxPercent: value }));
            }}
          />
        </GridItem>
      </GridLayout>
    </SectionContainer>
  );
}

function getOutputData(
  input: GeneralSectionInputData
): GeneralSectionOutputData {
  if (!isInputValid(input)) {
    return EMPTY_GENERAL_SECTION_OUTPUT_DATA;
  }

  return {
    isValid: true,
    exchangeRateEurToHrk: input.exchangeRateEurToHrk,
    exchangeRateUsdToHrk: input.exchangeRateUsdToHrk,
    surtaxPercent: input.surtaxPercent
  };
}

function isInputValid(
  input: GeneralSectionInputData
): input is NonNullableReadonlyObject<GeneralSectionInputData> {
  return (
    isValidPositiveNumberString(input.exchangeRateEurToHrk) &&
    isValidPositiveNumberString(input.exchangeRateUsdToHrk) &&
    isValidPercentString(input.surtaxPercent)
  );
}
