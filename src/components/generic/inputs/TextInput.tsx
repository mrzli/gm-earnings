import React from 'react';
import { TextField } from '@material-ui/core';
import { isValidText } from '../../../utils/validation-utils';

interface TextInputProps {
  readonly label: string;
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
}

export function TextInput({
  label,
  value,
  onValueChanged
}: TextInputProps): React.ReactElement {
  return (
    <TextField
      label={label}
      fullWidth={true}
      error={!isValidText(value)}
      value={value}
      variant={'outlined'}
      onChange={(event) => {
        onValueChanged(event.target.value);
      }}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}
