import React from 'react';
import { TaxBracketItem } from '../../types/salary/tax-bracket-item';
import { MoneyInput } from '../generic/MoneyInput';
import { PercentInput } from '../generic/PercentInput';
import { CheckboxInput } from '../generic/CheckboxInput';
import { ZERO_AMOUNT } from '../../data/general-data';
import { InputListItemProps } from '../../types/generic/generic-types';

export function TaxBracketInput({
  item,
  onItemChanged
}: InputListItemProps<TaxBracketItem>): React.ReactElement {
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
          label={'Amount Range'}
          value={item.amountRange}
          onValueChanged={(updatedValue) => {
            onItemChanged({ ...item, amountRange: updatedValue });
          }}
          disabled={item.isInfinite}
        />
      </div>
      <div style={{ gridColumnStart: 2 }}>
        <CheckboxInput
          label={'Infinite Range'}
          value={item.isInfinite}
          onValueChanged={(updatedValue) => {
            onItemChanged({
              ...item,
              amountRange: updatedValue ? ZERO_AMOUNT : item.amountRange,
              isInfinite: updatedValue
            });
          }}
        />
      </div>
      <div style={{ gridColumnStart: 3 }}>
        <PercentInput
          label={'Tax'}
          value={item.taxRatePercent}
          onValueChanged={(updatedValue) => {
            onItemChanged({ ...item, taxRatePercent: updatedValue });
          }}
        />
      </div>
    </div>
  );
}
