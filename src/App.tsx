import React from 'react';
import { EarningsDisplay } from './components/EarningsDisplay';
import { CssBaseline } from '@material-ui/core';

export function App(): React.ReactElement {
  return (
    <div>
      <CssBaseline />
      <EarningsDisplay />
    </div>
  );
}
