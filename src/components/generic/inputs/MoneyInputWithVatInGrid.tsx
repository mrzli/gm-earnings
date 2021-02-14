import React from 'react';
import { InputAmountWithVat } from '../../../types/generic/input-amount-with-vat';
import { MoneyInput } from './MoneyInput';
import { CheckboxInput } from './CheckboxInput';
import { GridItem } from '../layout/GridItem';

interface MoneyInputWithVatInGridProps {
  readonly label: string;
  readonly value: InputAmountWithVat;
  readonly onValueChanged: (value: InputAmountWithVat) => void;
  readonly row: number;
  readonly column: number;
}

export function MoneyInputWithVatInGrid({
  label,
  value,
  onValueChanged,
  row,
  column
}: MoneyInputWithVatInGridProps): React.ReactElement {
  return (
    <>
      <GridItem row={row} column={column}>
        <MoneyInput
          label={label}
          value={value.amount}
          onValueChanged={(amount) => {
            onValueChanged({ ...value, amount });
          }}
        />
      </GridItem>
      <GridItem row={row} column={column + 1}>
        <CheckboxInput
          label={'VAT'}
          value={value.isVat}
          onValueChanged={(isVat) => {
            onValueChanged({ ...value, isVat });
          }}
        />
      </GridItem>
    </>
  );
}
