import React from 'react';

interface GridLayoutProps {
  readonly columnsTemplate: string;
  readonly children: React.ReactNode;
}

export function GridLayout({
  columnsTemplate,
  children
}: GridLayoutProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columnsTemplate,
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10
      }}
    >
      {children}
    </div>
  );
}
