import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface VatCheckboxProps {
  readonly value: boolean;
  readonly onValueChanged: (value: boolean) => void;
}

export function VatCheckbox({
  value,
  onValueChanged
}: VatCheckboxProps): React.ReactElement {
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
      label={'VAT'}
    />
  );
}
