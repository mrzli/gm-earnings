import React from 'react';
import { TextField } from '@material-ui/core';

interface TextInputProps {
  readonly label: string;
  readonly value: string;
  readonly onValueChanged: (value: string) => void;
  readonly validator: (value: string) => boolean;
}

export function TextInput({
  label,
  value,
  onValueChanged,
  validator
}: TextInputProps): React.ReactElement {
  return (
    <TextField
      label={label}
      fullWidth={true}
      error={!validator(value)}
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
