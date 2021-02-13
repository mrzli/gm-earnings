import React from 'react';
import { SalaryDeductionData } from '../../types/salary/salary-deduction-data';
import { GridLayout } from '../generic/GridLayout';
import { PercentInput } from '../generic/PercentInput';
import { MoneyInput } from '../generic/MoneyInput';
import { InputList } from '../generic/InputList';
import { TaxBracketItem } from '../../types/salary/tax-bracket-item';
import { TaxBracketInput } from './TaxBracketInput';
import { EMPTY_TAX_BRACKET_ITEM } from '../../data/salary-data';

interface SalaryDeductionInputProps {
  readonly value: SalaryDeductionData;
  readonly onValueChanged: (value: SalaryDeductionData) => void;
}

export function SalaryDeductionInput({
  value,
  onValueChanged
}: SalaryDeductionInputProps): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'240px 200px'}>
      <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
        <PercentInput
          label={'Retirement 1st Pillar'}
          value={value.retirementPaymentsPillar1Percent}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              retirementPaymentsPillar1Percent: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 2, gridColumnStart: 1 }}>
        <PercentInput
          label={'Retirement 2nd Pillar'}
          value={value.retirementPaymentsPillar2Percent}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              retirementPaymentsPillar2Percent: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 3, gridColumnStart: 1 }}>
        <MoneyInput
          label={'Tax Deduction'}
          value={value.taxDeduction}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              taxDeduction: updatedValue
            });
          }}
        />
      </div>
      <div
        style={{
          gridRowStart: 4,
          gridColumnStart: 1,
          gridColumnEnd: 'span 2'
        }}
      >
        <InputList<TaxBracketItem>
          items={value.taxBrackets}
          ItemComponent={TaxBracketInput}
          emptyItem={EMPTY_TAX_BRACKET_ITEM}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              taxBrackets: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 5, gridColumnStart: 1 }}>
        <PercentInput
          label={'Surtax'}
          value={value.surtaxPercent}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              surtaxPercent: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 6, gridColumnStart: 1 }}>
        <PercentInput
          label={'Health Insurance'}
          value={value.healthInsurancePercent}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              healthInsurancePercent: updatedValue
            });
          }}
        />
      </div>
    </GridLayout>
  );
}
