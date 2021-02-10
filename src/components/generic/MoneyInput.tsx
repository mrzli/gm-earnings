import React from 'react';
import { isValidMoneyString } from '../../utils/currency-utils';
import { InputAdornment, TextField } from '@material-ui/core';

interface MoneyInputProps {
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
}

export function MoneyInput({
  value,
  onValueChanged
}: MoneyInputProps): React.ReactElement {
  return (
    <TextField
      fullWidth={true}
      error={!isValidMoneyString(value)}
      value={value}
      onChange={(event) => {
        onValueChanged(event.target.value);
      }}
      InputProps={{
        endAdornment: <InputAdornment position={'end'}>kn</InputAdornment>
      }}
    />
  );
}
