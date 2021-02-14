import React from 'react';
import { AdornedDisplayInGrid } from './AdornedDisplayInGrid';

interface PercentDisplayInGridProps {
  readonly label: string;
  readonly value: string;
  readonly row: number;
  readonly column: number;
}

export function PercentDisplayInGrid({
  label,
  value,
  row,
  column
}: PercentDisplayInGridProps): React.ReactElement {
  return (
    <AdornedDisplayInGrid
      label={label}
      value={value}
      adornmentText={'%'}
      row={row}
      column={column}
    />
  );
}
