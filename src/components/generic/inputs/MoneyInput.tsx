import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { isValidMoneyString } from '../../../utils/validation-utils';

interface MoneyInputProps {
  readonly label: string;
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
  readonly disabled?: boolean;
}

export function MoneyInput({
  label,
  value,
  onValueChanged,
  disabled
}: MoneyInputProps): React.ReactElement {
  return (
    <TextField
      fullWidth={true}
      variant={'outlined'}
      error={!isValidMoneyString(value)}
      label={label}
      value={value}
      onChange={(event) => {
        onValueChanged(event.target.value);
      }}
      InputProps={{
        endAdornment: <InputAdornment position={'end'}>kn</InputAdornment>
      }}
      disabled={disabled}
    />
  );
}
