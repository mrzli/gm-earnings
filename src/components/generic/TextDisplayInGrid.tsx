import React from 'react';
import { TextField } from '@material-ui/core';
import { GridItem } from './GridItem';

interface TextDisplayInGridProps {
  readonly label: string;
  readonly value: string;
  readonly row: number;
  readonly column: number;
}

export function TextDisplayInGrid({
  label,
  value,
  row,
  column
}: TextDisplayInGridProps): React.ReactElement {
  return (
    <GridItem row={row} column={column}>
      <TextField
        fullWidth={true}
        variant={'outlined'}
        label={label}
        value={value}
        InputProps={{
          readOnly: true
        }}
        disabled={true}
      />
    </GridItem>
  );
}
