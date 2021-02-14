import React from 'react';
import { formatAsMoney } from '../../../utils/currency-utils';
import { InputAdornment, TextField } from '@material-ui/core';
import { GridItem } from '../layout/GridItem';

interface AdornedDisplayInGridProps {
  readonly label: string;
  readonly value: string;
  readonly adornmentText: string;
  readonly row: number;
  readonly column: number;
}

export function AdornedDisplayInGrid({
  label,
  value,
  adornmentText,
  row,
  column
}: AdornedDisplayInGridProps): React.ReactElement {
  return (
    <GridItem row={row} column={column}>
      <TextField
        fullWidth={true}
        variant={'outlined'}
        label={label}
        value={formatAsMoney(value)}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position={'end'}>{adornmentText}</InputAdornment>
          )
        }}
      />
    </GridItem>
  );
}
