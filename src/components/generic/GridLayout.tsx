import React from 'react';

interface GridLayoutProps {
  readonly columns: number;
  readonly children: React.ReactNode;
}

export function GridLayout({
  columns,
  children
}: GridLayoutProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, fit-content(${
          100 / columns
        }%))`,
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10
      }}
    >
      {children}
    </div>
  );
}
