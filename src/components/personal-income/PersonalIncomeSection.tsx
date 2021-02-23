import React, { useEffect, useState } from 'react';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { GridLayout } from '../generic/layout/GridLayout';
import { GridItem } from '../generic/layout/GridItem';
import { PersonalIncomeSectionInputData } from '../../types/personal-income/personal-income-section-input-data';
import { PersonalIncomeSectionOutputData } from '../../types/personal-income/personal-income-section-output-data';
import { EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA } from '../../data/personal-income-data';
import {
  currencyToMoneyString,
  moneyStringToCurrency
} from '../../utils/currency-utils';
import {
  MONTHS_PER_YEAR,
  PERCENT_TO_FRACTION_MULTIPLIER
} from '../../data/generic-data';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import { isValidPercentString } from '../../utils/validation-utils';
import { PercentDisplayInGrid } from '../generic/displays/PercentDisplayInGrid';
import { PercentInput } from '../generic/inputs/PercentInput';
import { DividerInGrid } from '../generic/layout/DividerInGrid';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import { formatAsPercent } from '../../utils/generic-utils';

interface PersonalIncomeSectionProps {
  readonly defaultInputData: PersonalIncomeSectionInputData;
  readonly onOutputDataChanged: (data: PersonalIncomeSectionOutputData) => void;
  readonly businessTotalEarnings: string;
  readonly businessNetEarnings: string;
  readonly yearlyNetSalary: string;
  readonly surtaxPercent: string;
}

export function PersonalIncomeSection({
  defaultInputData,
  onOutputDataChanged,
  businessTotalEarnings,
  businessNetEarnings,
  yearlyNetSalary,
  surtaxPercent
}: PersonalIncomeSectionProps): React.ReactElement {
  const [inputData, setInputData] = useState(defaultInputData);
  const [outputData, setOutputData] = useState(
    EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA
  );

  useEffect(() => {
    const newOutputData = getOutputData(
      inputData,
      businessTotalEarnings,
      businessNetEarnings,
      yearlyNetSalary,
      surtaxPercent
    );
    setOutputData(newOutputData);
    onOutputDataChanged(newOutputData);
  }, [
    inputData,
    businessNetEarnings,
    yearlyNetSalary,
    surtaxPercent,
    businessTotalEarnings,
    onOutputDataChanged
  ]);

  return (
    <SectionContainer
      header={'Personal Income'}
      isDataValid={outputData.isValid}
    >
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <GridItem row={1} column={1}>
          <PercentInput
            label={'Corporate Tax Rate'}
            value={inputData.corporateTaxPercent}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, corporateTaxPercent: value }));
            }}
          />
        </GridItem>
        <GridItem row={1} column={2}>
          <PercentInput
            label={'Pers. Cap. Income Tax Rate'}
            value={inputData.personalCapitalIncomeTaxPercent}
            onValueChanged={(value) => {
              setInputData((s) => ({
                ...s,
                personalCapitalIncomeTaxPercent: value
              }));
            }}
          />
        </GridItem>
        <PercentDisplayInGrid
          label={'Surtax'}
          value={surtaxPercent}
          row={1}
          column={3}
        />
        <DividerInGrid row={2} span={6} />
        <MoneyDisplayInGrid
          label={'Corporate Tax'}
          value={outputData.corporateTax}
          row={3}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Bus. After Tax Earnings'}
          value={outputData.businessAfterTaxEarnings}
          row={3}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Per. Cap. Income Tax'}
          value={outputData.personalCapitalIncomeTax}
          row={4}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Per. Cap. Income Surtax'}
          value={outputData.personalCapitalIncomeSurtax}
          row={4}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'P. C. I. Tax and Surtax'}
          value={outputData.personalCapitalIncomeTaxAndSurtax}
          row={4}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Total Tax'}
          value={outputData.totalTax}
          row={4}
          column={4}
        />
        <MoneyDisplayInGrid
          label={'Personal Capital Income'}
          value={outputData.personalCapitalIncome}
          row={5}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total Personal Income'}
          value={outputData.totalPersonalIncome}
          row={5}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Monthly Personal Income'}
          value={outputData.monthlyPersonalIncome}
          row={5}
          column={3}
        />
        <PercentDisplayInGrid
          label={'Income out of Tot. Earnings'}
          value={outputData.percentIncomeOfTotalEarnings}
          row={5}
          column={4}
        />
      </GridLayout>
    </SectionContainer>
  );
}

function getOutputData(
  input: PersonalIncomeSectionInputData,
  businessTotalEarnings: string,
  businessNetEarnings: string,
  yearlyNetSalary: string,
  surtaxPercent: string
): PersonalIncomeSectionOutputData {
  if (!isInputValid(input, surtaxPercent)) {
    return EMPTY_PERSONAL_INCOME_SECTION_OUTPUT_DATA;
  }

  const businessNetEarningsCurrency = moneyStringToCurrency(
    businessNetEarnings
  );

  const corporateTax = businessNetEarningsCurrency
    .multiply(input.corporateTaxPercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const businessAfterTaxIncome = businessNetEarningsCurrency.subtract(
    corporateTax
  );

  const personalCapitalIncomeTax = businessAfterTaxIncome
    .multiply(input.personalCapitalIncomeTaxPercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const personalCapitalIncomeSurtax = personalCapitalIncomeTax
    .multiply(surtaxPercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const personalCapitalIncomeTaxAndSurtax = personalCapitalIncomeTax.add(
    personalCapitalIncomeSurtax
  );
  const totalTax = corporateTax.add(personalCapitalIncomeTaxAndSurtax);

  const personalCapitalIncome = businessAfterTaxIncome.subtract(
    personalCapitalIncomeTaxAndSurtax
  );
  const totalPersonalIncome = personalCapitalIncome.add(yearlyNetSalary);
  const monthlyPersonalIncome = totalPersonalIncome.divide(MONTHS_PER_YEAR);

  const businessTotalEarningsValue = moneyStringToCurrency(
    businessTotalEarnings
  ).value;
  const fractionIncomeOfTotalEarnings =
    businessTotalEarningsValue > 0
      ? totalPersonalIncome.value / businessTotalEarningsValue
      : 0;

  return {
    isValid: true,
    corporateTax: currencyToMoneyString(corporateTax),
    businessAfterTaxEarnings: currencyToMoneyString(businessAfterTaxIncome),
    personalCapitalIncomeTax: currencyToMoneyString(personalCapitalIncomeTax),
    personalCapitalIncomeSurtax: currencyToMoneyString(
      personalCapitalIncomeSurtax
    ),
    personalCapitalIncomeTaxAndSurtax: currencyToMoneyString(
      personalCapitalIncomeTaxAndSurtax
    ),
    totalTax: currencyToMoneyString(totalTax),
    personalCapitalIncome: currencyToMoneyString(personalCapitalIncome),
    totalPersonalIncome: currencyToMoneyString(totalPersonalIncome),
    monthlyPersonalIncome: currencyToMoneyString(monthlyPersonalIncome),
    percentIncomeOfTotalEarnings: formatAsPercent(fractionIncomeOfTotalEarnings)
  };
}

function isInputValid(
  input: PersonalIncomeSectionInputData,
  surtaxPercent: string
): input is NonNullableReadonlyObject<PersonalIncomeSectionInputData> {
  return (
    isValidPercentString(input.corporateTaxPercent) &&
    isValidPercentString(input.personalCapitalIncomeTaxPercent) &&
    isValidPercentString(surtaxPercent)
  );
}
