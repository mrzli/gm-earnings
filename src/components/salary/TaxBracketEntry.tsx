import React from 'react';
import { TaxBracketItem } from '../../types/salary/tax-bracket-item';
import { MoneyInput } from '../generic/inputs/MoneyInput';
import { PercentInput } from '../generic/inputs/PercentInput';
import { CheckboxInput } from '../generic/inputs/CheckboxInput';
import { ZERO_AMOUNT } from '../../data/general-data';
import { InputListItemProps } from '../../types/generic/generic-types';
import { GridLayout } from '../generic/layout/GridLayout';
import { GridItem } from '../generic/layout/GridItem';

export function TaxBracketEntry({
  item,
  onItemChanged
}: InputListItemProps<TaxBracketItem>): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'200px auto 120px'}>
      <GridItem row={1} column={1}>
        <MoneyInput
          label={'Amount Range'}
          value={item.amountRange}
          onValueChanged={(updatedValue) => {
            onItemChanged({ ...item, amountRange: updatedValue });
          }}
          disabled={item.isInfinite}
        />
      </GridItem>
      <GridItem row={1} column={2}>
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
      </GridItem>
      <GridItem row={1} column={3}>
        <PercentInput
          label={'Tax'}
          value={item.taxRatePercent}
          onValueChanged={(updatedValue) => {
            onItemChanged({ ...item, taxRatePercent: updatedValue });
          }}
        />
      </GridItem>
    </GridLayout>
  );
}
