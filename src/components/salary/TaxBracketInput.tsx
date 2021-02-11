import React from 'react';
import { TaxBracketItem } from '../../types/salary/tax-bracket-item';
import { MoneyInput } from '../generic/MoneyInput';
import { PercentInput } from '../generic/PercentInput';
import { CheckboxInput } from '../generic/CheckboxInput';
import { ZERO_AMOUNT } from '../../data/general-data';

interface TaxBracketInputProps {
  readonly value: TaxBracketItem;
  readonly onValueChanged: (value: TaxBracketItem) => void;
}

export function TaxBracketInput({
  value,
  onValueChanged
}: TaxBracketInputProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px auto 120px',
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10
      }}
    >
      <div style={{ gridColumnStart: 1 }}>
        <MoneyInput
          value={value.amountRange}
          onValueChanged={(updatedValue) => {
            onValueChanged({ ...value, amountRange: updatedValue });
          }}
          disabled={value.isInfinite}
        />
      </div>
      <div style={{ gridColumnStart: 2 }}>
        <CheckboxInput
          label={'Infinite Range'}
          value={value.isInfinite}
          onValueChanged={(updatedValue) => {
            onValueChanged({
              ...value,
              amountRange: updatedValue ? ZERO_AMOUNT : value.amountRange,
              isInfinite: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridColumnStart: 3 }}>
        <PercentInput
          value={value.taxRatePercent}
          onValueChanged={(updatedValue) => {
            onValueChanged({ ...value, taxRatePercent: updatedValue });
          }}
        />
      </div>
    </div>
  );
}
