import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface CheckboxInputProps {
  readonly label: string;
  readonly value: boolean;
  readonly onValueChanged: (value: boolean) => void;
}

export function CheckboxInput({
  label,
  value,
  onValueChanged
}: CheckboxInputProps): React.ReactElement {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(event, checked) => {
            onValueChanged(checked);
          }}
        />
      }
      label={label}
    />
  );
}
