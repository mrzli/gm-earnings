import React from 'react';
import { Paper, Typography } from '@material-ui/core';

interface SectionContainerProps {
  readonly header: string;
  readonly isDataValid: boolean;
  readonly children: React.ReactNode;
}

export function SectionContainer({
  header,
  isDataValid,
  children
}: SectionContainerProps): React.ReactElement {
  return (
    <Paper variant={'outlined'} style={{ margin: 5, padding: 10 }}>
      <Typography style={{ marginBottom: 10 }} variant={'subtitle1'}>
        {header}
        {isDataValid ? undefined : (
          <span style={{ color: '#DC004E' }}> - Invalid</span>
        )}
      </Typography>
      {children}
    </Paper>
  );
}
