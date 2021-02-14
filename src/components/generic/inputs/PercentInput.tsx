import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { isValidPercentString } from '../../../utils/validation-utils';

interface PercentInputProps {
  readonly label: string;
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
}

export function PercentInput({
  label,
  value,
  onValueChanged
}: PercentInputProps): React.ReactElement {
  return (
    <TextField
      label={label}
      fullWidth={true}
      variant={'outlined'}
      error={!isValidPercentString(value)}
      value={value}
      onChange={(event) => {
        const newValue = event.target.value;
        if (newValue !== value) {
          onValueChanged(newValue);
        }
      }}
      InputProps={{
        endAdornment: <InputAdornment position={'end'}>%</InputAdornment>
      }}
    />
  );
}
