import React from 'react';
import { Divider } from '@material-ui/core';

interface DividerInGridProps {
  readonly row: number;
  readonly span: number;
}

export function DividerInGrid({
  row,
  span
}: DividerInGridProps): React.ReactElement {
  return (
    <Divider
      style={{
        gridRowStart: row,
        gridColumnStart: 1,
        gridColumnEnd: `span ${span}`
      }}
    />
  );
}
