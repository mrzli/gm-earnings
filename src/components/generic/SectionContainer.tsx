import React from 'react';
import { Paper, Typography } from '@material-ui/core';

interface SectionContainerProps {
  readonly header: string;
  readonly children: React.ReactNode;
}

export function SectionContainer({
  header,
  children
}: SectionContainerProps): React.ReactElement {
  return (
    <Paper variant={'outlined'} style={{ padding: 10 }}>
      <Typography variant={'subtitle1'}>{header}</Typography>
      {children}
    </Paper>
  );
}
