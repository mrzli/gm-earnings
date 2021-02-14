import React from 'react';
import { TextField } from '@material-ui/core';
import { isInNumericRange } from '../../../utils/validation-utils';

interface IntegerInputProps {
  readonly label: string;
  readonly value: number | undefined;
  readonly onValueChanged: (value: number | undefined) => void;
  readonly minValue: number;
  readonly maxValue: number;
}

export function IntegerInput({
  label,
  value,
  onValueChanged,
  minValue,
  maxValue
}: IntegerInputProps): React.ReactElement {
  return (
    <TextField
      type={'number'}
      fullWidth={true}
      label={label}
      variant={'outlined'}
      error={
        value === undefined || !isInNumericRange(value, minValue, maxValue)
      }
      value={value ?? ''}
      inputProps={{
        min: minValue,
        max: maxValue
      }}
      InputLabelProps={{
        shrink: true
      }}
      onChange={(event) => {
        const updatedValue = event.target.value;
        if (/^0|[1-9][0-9]*$/.test(updatedValue)) {
          const newValue = Number.parseInt(updatedValue);
          if (newValue !== value) {
            onValueChanged(newValue);
          }
        } else {
          if (value !== undefined) {
            onValueChanged(undefined);
          }
        }
      }}
    />
  );
}
