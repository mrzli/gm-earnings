import React, { useEffect, useState } from 'react';
import Currency from 'currency.js';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { GridLayout } from '../generic/layout/GridLayout';
import { SalarySectionInputData } from '../../types/salary/salary-section-input-data';
import { SalarySectionOutputData } from '../../types/salary/salary-section-output-data';
import { PercentInput } from '../generic/inputs/PercentInput';
import { GridItem } from '../generic/layout/GridItem';
import {
  currencyToMoneyString,
  moneyStringToCurrency,
  ZERO_MONEY
} from '../../utils/currency-utils';
import {
  MONTHS_PER_YEAR,
  PERCENT_TO_FRACTION_MULTIPLIER,
  ZERO_AMOUNT
} from '../../data/generic-data';
import { NonNullableReadonlyObject } from '../../types/generic/generic-types';
import {
  isInNumericRange,
  isValidMoneyString,
  isValidPercentString
} from '../../utils/validation-utils';
import {
  EMPTY_SALARY_SECTION_OUTPUT_DATA,
  EMPTY_TAX_BRACKET_ITEM
} from '../../data/salary-data';
import { SalaryCalculationParameters } from '../../types/salary/salary-calculation-parameters';
import { MoneyInput } from '../generic/inputs/MoneyInput';
import { EntryList } from '../generic/layout/EntryList';
import { TaxBracketItem } from '../../types/salary/tax-bracket-item';
import { TaxBracketEntry } from './TaxBracketEntry';
import { DividerInGrid } from '../generic/layout/DividerInGrid';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import { formatAsPercent } from '../../utils/generic-utils';
import { PercentDisplayInGrid } from '../generic/displays/PercentDisplayInGrid';
import { IntegerInput } from '../generic/inputs/IntegerInput';
import { TextDisplayInGrid } from '../generic/displays/TextDisplayInGrid';
import { ExchangeRates } from '../../types/generic/exchange-rates';
import { toHrkAmount } from '../../utils/domain-utils';

interface SalarySectionProps {
  readonly defaultInputData: SalarySectionInputData;
  readonly onOutputDataChanged: (data: SalarySectionOutputData) => void;
  readonly exchangeRates: ExchangeRates;
  readonly surtaxPercent: string;
}

export function SalarySection({
  defaultInputData,
  onOutputDataChanged,
  exchangeRates,
  surtaxPercent
}: SalarySectionProps): React.ReactElement {
  const [inputData, setInputData] = useState(defaultInputData);
  const [outputData, setOutputData] = useState(
    EMPTY_SALARY_SECTION_OUTPUT_DATA
  );

  useEffect(
    () => {
      const newOutputData = getOutputData(
        inputData,
        exchangeRates,
        surtaxPercent
      );
      setOutputData(newOutputData);
      onOutputDataChanged(newOutputData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData, surtaxPercent]
  );

  return (
    <SectionContainer header={'Salary'} isDataValid={outputData.isValid}>
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <GridItem row={1} column={1}>
          <PercentInput
            label={'Health Insurance'}
            value={inputData.calculationParameters.healthInsurancePercent}
            onValueChanged={(value) => {
              setInputData(
                changeCalculationParameterField('healthInsurancePercent', value)
              );
            }}
          />
        </GridItem>
        <GridItem row={1} column={2}>
          <PercentInput
            label={'Retirement 1st Pillar'}
            value={
              inputData.calculationParameters.retirementPaymentsPillar1Percent
            }
            onValueChanged={(value) => {
              setInputData(
                changeCalculationParameterField(
                  'retirementPaymentsPillar1Percent',
                  value
                )
              );
            }}
          />
        </GridItem>
        <GridItem row={1} column={3}>
          <PercentInput
            label={'Retirement 2nd Pillar'}
            value={
              inputData.calculationParameters.retirementPaymentsPillar2Percent
            }
            onValueChanged={(value) => {
              setInputData(
                changeCalculationParameterField(
                  'retirementPaymentsPillar2Percent',
                  value
                )
              );
            }}
          />
        </GridItem>
        <GridItem row={2} column={1} span={6}>
          <EntryList<TaxBracketItem>
            items={inputData.calculationParameters.taxBrackets}
            ItemComponent={TaxBracketEntry}
            emptyItem={EMPTY_TAX_BRACKET_ITEM}
            onValueChanged={(value) => {
              setInputData(
                changeCalculationParameterField('taxBrackets', value)
              );
            }}
          />
        </GridItem>
        <GridItem row={3} column={1}>
          <MoneyInput
            label={'Tax Deduction'}
            value={inputData.calculationParameters.taxDeduction}
            onValueChanged={(value) => {
              setInputData(
                changeCalculationParameterField('taxDeduction', value)
              );
            }}
          />
        </GridItem>
        <PercentDisplayInGrid
          label={'Surtax'}
          value={surtaxPercent}
          row={3}
          column={2}
        />
        <DividerInGrid row={4} span={6} />
        <GridItem row={5} column={1}>
          <MoneyInput
            label={'Gross 1 Salary'}
            value={inputData.gross1Salary}
            onValueChanged={(value) => {
              setInputData((s) => ({ ...s, gross1Salary: value }));
            }}
          />
        </GridItem>
        <GridItem row={5} column={2}>
          <IntegerInput
            label={'Out. Trans. per Salary'}
            value={inputData.numOutgoingTransactionsPerSalary}
            onValueChanged={(value) => {
              setInputData((s) => ({
                ...s,
                numOutgoingTransactionsPerSalary: value
              }));
            }}
            minValue={0}
            maxValue={20}
          />
        </GridItem>
        <DividerInGrid row={6} span={6} />
        <MoneyDisplayInGrid
          label={'Health Insurance p/m'}
          value={outputData.healthInsurance}
          row={7}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Retirement 1st Pillar p/m'}
          value={outputData.retirementPayments1}
          row={7}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Retirement 2nd Pillar p/m'}
          value={outputData.retirementPayments2}
          row={7}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Tax Deduction'}
          value={outputData.taxDeduction}
          row={8}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Taxable Income'}
          value={outputData.taxableIncome}
          row={8}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Total Tax p/m'}
          value={outputData.totalTax}
          row={8}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Total Surtax p/m'}
          value={outputData.totalSurtax}
          row={8}
          column={4}
        />
        <MoneyDisplayInGrid
          label={'Total Tax and Surtax p/m'}
          value={outputData.totalTaxAndSurtax}
          row={8}
          column={5}
        />
        <MoneyDisplayInGrid
          label={'Gross 2 Salary p/m'}
          value={outputData.gross2Salary}
          row={9}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Gross 1 Salary p/m'}
          value={outputData.gross1Salary}
          row={9}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Net Salary p/m'}
          value={outputData.netSalary}
          row={9}
          column={3}
        />
        <DividerInGrid row={10} span={6} />
        <MoneyDisplayInGrid
          label={'Health Insurance p/y'}
          value={outputData.yearlyData.healthInsurance}
          row={11}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Retirement p/y'}
          value={outputData.yearlyData.retirementPayments}
          row={11}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Tax p/y'}
          value={outputData.yearlyData.tax}
          row={11}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Gross 2 Salary p/y'}
          value={outputData.yearlyData.gross2Salary}
          row={12}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Net Salary p/y'}
          value={outputData.yearlyData.netSalary}
          row={12}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Total Salary Expenses p/y'}
          value={outputData.yearlyData.totalSalaryExpenses}
          row={12}
          column={3}
        />
        <PercentDisplayInGrid
          label={'Expenses out of Total'}
          value={outputData.yearlyData.percentExpensesOfGross2}
          row={12}
          column={4}
        />
        <TextDisplayInGrid
          label={'Out. Trans. for Salary p/y'}
          value={outputData.yearlyData.numOutgoingTransactions.toString()}
          row={12}
          column={5}
        />
      </GridLayout>
    </SectionContainer>
  );
}

function getOutputData(
  input: SalarySectionInputData,
  exchangeRates: ExchangeRates,
  surtaxPercent: string
): SalarySectionOutputData {
  if (!isInputValid(input, surtaxPercent)) {
    return EMPTY_SALARY_SECTION_OUTPUT_DATA;
  }

  const calcParams = input.calculationParameters;
  const gross1SalaryHrk = toHrkAmount(input.gross1Salary, exchangeRates);
  const gross1Salary = moneyStringToCurrency(gross1SalaryHrk);

  const healthInsurance = gross1Salary
    .multiply(calcParams.healthInsurancePercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const retirement1 = gross1Salary
    .multiply(calcParams.retirementPaymentsPillar1Percent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const retirement2 = gross1Salary
    .multiply(calcParams.retirementPaymentsPillar2Percent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const allRetirement = retirement1.add(retirement2);
  const incomeAfterHealthAndRetirementPayments = gross1Salary.subtract(
    allRetirement
  );
  const taxDeductionHrk = toHrkAmount(calcParams.taxDeduction, exchangeRates);
  const taxDeduction = moneyStringToCurrency(taxDeductionHrk);
  const taxableIncome = incomeAfterHealthAndRetirementPayments.subtract(
    taxDeduction
  );
  const totalTax = calculateTax(
    taxableIncome,
    calcParams.taxBrackets,
    exchangeRates
  );
  const totalSurtax = totalTax
    .multiply(surtaxPercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
  const totalTaxAndSurtax = totalTax.add(totalSurtax);
  const gross2Salary = gross1Salary.add(healthInsurance);
  const netSalary = incomeAfterHealthAndRetirementPayments.subtract(
    totalTaxAndSurtax
  );

  const healthInsuranceYearly = healthInsurance.multiply(MONTHS_PER_YEAR);
  const retirementYearly = allRetirement.multiply(MONTHS_PER_YEAR);
  const taxYearly = totalTaxAndSurtax.multiply(MONTHS_PER_YEAR);
  const gross2SalaryYearly = gross2Salary.multiply(MONTHS_PER_YEAR);
  const netSalaryYearly = netSalary.multiply(MONTHS_PER_YEAR);
  const totalSalaryExpensesYearly = gross2SalaryYearly.subtract(
    netSalaryYearly
  );
  const fractionExpensesOfGross2 =
    totalSalaryExpensesYearly.value / gross2SalaryYearly.value;
  const numOutgoingTransactionsPerYear =
    input.numOutgoingTransactionsPerSalary * MONTHS_PER_YEAR;

  return {
    isValid: true,
    healthInsurance: currencyToMoneyString(healthInsurance),
    retirementPayments1: currencyToMoneyString(retirement1),
    retirementPayments2: currencyToMoneyString(retirement2),
    taxDeduction: currencyToMoneyString(taxDeduction),
    taxableIncome: currencyToMoneyString(taxableIncome),
    totalTax: currencyToMoneyString(totalTax),
    totalSurtax: currencyToMoneyString(totalSurtax),
    totalTaxAndSurtax: currencyToMoneyString(totalTaxAndSurtax),
    gross2Salary: currencyToMoneyString(gross2Salary),
    gross1Salary: currencyToMoneyString(gross1Salary),
    netSalary: currencyToMoneyString(netSalary),
    yearlyData: {
      healthInsurance: currencyToMoneyString(healthInsuranceYearly),
      retirementPayments: currencyToMoneyString(retirementYearly),
      tax: currencyToMoneyString(taxYearly),
      gross2Salary: currencyToMoneyString(gross2SalaryYearly),
      netSalary: currencyToMoneyString(netSalaryYearly),
      totalSalaryExpenses: currencyToMoneyString(totalSalaryExpensesYearly),
      percentExpensesOfGross2: formatAsPercent(fractionExpensesOfGross2),
      numOutgoingTransactions: numOutgoingTransactionsPerYear
    }
  };
}

function isInputValid(
  input: SalarySectionInputData,
  surtaxPercent: string
): input is NonNullableReadonlyObject<SalarySectionInputData> {
  const calcParams = input.calculationParameters;

  return (
    isValidPercentString(calcParams.healthInsurancePercent) &&
    isValidPercentString(calcParams.retirementPaymentsPillar1Percent) &&
    isValidPercentString(calcParams.retirementPaymentsPillar2Percent) &&
    areTaxBracketsValid(calcParams.taxBrackets) &&
    isValidMoneyString(calcParams.taxDeduction.amount) &&
    isValidPercentString(surtaxPercent) &&
    isValidMoneyString(input.gross1Salary.amount) &&
    input.numOutgoingTransactionsPerSalary !== undefined &&
    isInNumericRange(input.numOutgoingTransactionsPerSalary, 0, 20)
  );
}

function areTaxBracketsValid(taxBrackets: readonly TaxBracketItem[]): boolean {
  if (taxBrackets.length === 0) {
    return false;
  }

  const nonLastTaxBrackets = taxBrackets.slice(0, -1);
  const lastTaxBracket = taxBrackets.slice(-1)[0];

  return (
    nonLastTaxBrackets.every(isNonLastTaxBracketItemValid) &&
    isLastTaxBracketItemValid(lastTaxBracket)
  );
}

function isNonLastTaxBracketItemValid(item: TaxBracketItem): boolean {
  return (
    isValidMoneyString(item.amountRange.amount) &&
    !item.isInfinite &&
    isValidPercentString(item.taxRatePercent)
  );
}

function isLastTaxBracketItemValid(item: TaxBracketItem): boolean {
  return (
    item.amountRange.amount === ZERO_AMOUNT &&
    item.isInfinite &&
    isValidPercentString(item.taxRatePercent)
  );
}

function calculateTax(
  taxableIncome: Currency,
  taxBrackets: readonly TaxBracketItem[],
  exchangeRates: ExchangeRates
): Currency {
  let accumulatedTax = ZERO_MONEY;
  let remainingTaxableIncome = taxableIncome;
  for (let item of taxBrackets) {
    if (remainingTaxableIncome.intValue <= 0) {
      break;
    }

    const taxBracketAmountHrk = toHrkAmount(item.amountRange, exchangeRates);
    const taxBracketAmount = moneyStringToCurrency(taxBracketAmountHrk);
    if (
      remainingTaxableIncome.intValue < taxBracketAmount.intValue ||
      item.isInfinite
    ) {
      const bracketTax = calculateBracketTax(
        remainingTaxableIncome,
        item.taxRatePercent
      );
      accumulatedTax = accumulatedTax.add(bracketTax);
      break;
    } else {
      const bracketTax = calculateBracketTax(
        taxBracketAmount,
        item.taxRatePercent
      );
      accumulatedTax = accumulatedTax.add(bracketTax);
      remainingTaxableIncome = remainingTaxableIncome.subtract(
        taxBracketAmount
      );
    }
  }
  return accumulatedTax;
}

function calculateBracketTax(
  bracketTaxableIncome: Currency,
  bracketTaxPercent: string
): Currency {
  return bracketTaxableIncome
    .multiply(bracketTaxPercent)
    .multiply(PERCENT_TO_FRACTION_MULTIPLIER);
}

function changeCalculationParameterField<
  K extends keyof SalaryCalculationParameters
>(
  key: K,
  newValue: SalaryCalculationParameters[K]
): (state: SalarySectionInputData) => SalarySectionInputData {
  return (state) => ({
    ...state,
    calculationParameters: {
      ...state.calculationParameters,
      [key]: newValue
    }
  });
}
