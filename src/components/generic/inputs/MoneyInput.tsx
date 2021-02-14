import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { isValidMoneyString } from '../../../utils/validation-utils';
import { ArrowDropDown } from '@material-ui/icons';

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
        const newValue = event.target.value;
        if (newValue !== value) {
          onValueChanged(newValue);
        }
      }}
      InputProps={{
        endAdornment: getInputAdornmentElement()
      }}
      disabled={disabled}
    />
  );
}

function getInputAdornmentElement(): React.ReactElement {
  return (
    <InputAdornment position={'end'}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <span>HRK</span>
        <ArrowDropDown />
      </div>
    </InputAdornment>
  );
}
