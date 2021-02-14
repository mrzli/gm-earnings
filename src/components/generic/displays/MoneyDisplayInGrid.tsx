import React from 'react';
import { AdornedDisplayInGrid } from './AdornedDisplayInGrid';

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
    <AdornedDisplayInGrid
      label={label}
      value={value}
      adornmentText={'HRK'}
      row={row}
      column={column}
    />
  );
}
