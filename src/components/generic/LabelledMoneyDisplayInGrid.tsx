import React from 'react';
import { formatAsMoney } from '../../utils/currency-utils';
import { LabelInGrid } from './LabelInGrid';

interface LabelledMoneyDisplayInGridProps {
  readonly label: string;
  readonly value: string;
  readonly row: number;
  readonly column: number;
}

export function LabelledMoneyDisplayInGrid({
  label,
  value,
  row,
  column
}: LabelledMoneyDisplayInGridProps): React.ReactElement {
  return (
    <>
      <LabelInGrid text={label} row={row} column={column} />
      <div
        style={{
          gridRowStart: row,
          gridColumnStart: column + 1
        }}
      >
        {formatAsMoney(value)}
      </div>
    </>
  );
}
