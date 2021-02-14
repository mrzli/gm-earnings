import React from 'react';

interface GridItemProps {
  readonly row: number;
  readonly column: number;
  readonly span?: number;
  readonly children: React.ReactNode;
}

export function GridItem({
  row,
  column,
  span,
  children
}: GridItemProps): React.ReactElement {
  return (
    <div
      style={{
        gridRowStart: row,
        gridColumnStart: column,
        gridColumnEnd: span ? `span ${span}` : undefined
      }}
    >
      {children}
    </div>
  );
}
