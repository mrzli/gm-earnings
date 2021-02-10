import React from 'react';
import { TextField } from '@material-ui/core';
import { isInNumericRange } from '../../utils/validation-utils';

interface IntegerInputProps {
  readonly value: number;
  readonly onValueChanged: (value: number) => void;
  readonly minValue: number;
  readonly maxValue: number;
}

export function IntegerInput({
  value,
  onValueChanged,
  minValue,
  maxValue
}: IntegerInputProps): React.ReactElement {
  return (
    <TextField
      type={'number'}
      fullWidth={true}
      error={!isInNumericRange(value, minValue, maxValue)}
      value={value}
      inputProps={{
        min: minValue,
        max: maxValue
      }}
      onChange={(event) => {
        onValueChanged(Number.parseInt(event.target.value));
      }}
    />
  );
}
