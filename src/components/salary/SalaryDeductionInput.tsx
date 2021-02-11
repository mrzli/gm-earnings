import React from 'react';
import { SalaryDeductionData } from '../../types/salary/salary-deduction-data';
import { GridLayout } from '../generic/GridLayout';
import { PercentInput } from '../generic/PercentInput';
import { MoneyInput } from '../generic/MoneyInput';

interface SalaryDeductionInputProps {
  readonly value: SalaryDeductionData;
  readonly onValueChanged: (value: SalaryDeductionData) => void;
}

export function SalaryDeductionInput({
  value,
  onValueChanged
}: SalaryDeductionInputProps): React.ReactElement {
  return (
    <GridLayout columns={2}>
      <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
        Retirement Payments 1st Pillar Percent:
      </div>
      <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
        <PercentInput
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
        Retirement Payments 2st Pillar Percent:
      </div>
      <div style={{ gridRowStart: 2, gridColumnStart: 2 }}>
        <PercentInput
          value={value.retirementPaymentsPillar2Percent}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              retirementPaymentsPillar2Percent: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 3, gridColumnStart: 1 }}>Tax Deduction:</div>
      <div style={{ gridRowStart: 3, gridColumnStart: 2 }}>
        <MoneyInput
          value={value.taxDeduction}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              taxDeduction: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridRowStart: 5, gridColumnStart: 1 }}>Surtax Percent:</div>
      <div style={{ gridRowStart: 5, gridColumnStart: 2 }}>
        <PercentInput
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
        Health Insurance Percent:
      </div>
      <div style={{ gridRowStart: 6, gridColumnStart: 2 }}>
        <PercentInput
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
