import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { isValidMoneyString } from '../../utils/validation-utils';

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
