import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { isValidPercentString } from '../../utils/validation-utils';

interface PercentInputProps {
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
}

export function PercentInput({
  value,
  onValueChanged
}: PercentInputProps): React.ReactElement {
  return (
    <TextField
      fullWidth={true}
      error={!isValidPercentString(value)}
      value={value}
      onChange={(event) => {
        onValueChanged(event.target.value);
      }}
      InputProps={{
        endAdornment: <InputAdornment position={'end'}>%</InputAdornment>
      }}
    />
  );
}
