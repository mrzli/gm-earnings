import React from 'react';

interface LabelInGridProps {
  readonly text: string;
  readonly row: number;
  readonly column: number;
}

export function LabelInGrid({
  text,
  row,
  column
}: LabelInGridProps): React.ReactElement {
  return (
    <div style={{ gridRowStart: row, gridColumnStart: column }}>{text}</div>
  );
}
