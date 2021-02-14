import React from 'react';
import { formatAsMoney } from '../../utils/currency-utils';
import { InputAdornment, TextField } from '@material-ui/core';
import { GridItem } from './GridItem';

interface MoneyDisplayInGridProps {
  readonly label: string;
  readonly value: string;
  readonly row: number;
  readonly column: number;
}

export function MoneyDisplayInGrid({
  label,
  value,
  row,
  column
}: MoneyDisplayInGridProps): React.ReactElement {
  return (
    <GridItem row={row} column={column}>
      <TextField
        fullWidth={true}
        variant={'outlined'}
        label={label}
        value={formatAsMoney(value)}
        InputProps={{
          readOnly: true,
          endAdornment: <InputAdornment position={'end'}>kn</InputAdornment>
        }}
      />
    </GridItem>
  );
}
