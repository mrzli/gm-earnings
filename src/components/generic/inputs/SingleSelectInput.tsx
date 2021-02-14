import React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { Tuple } from '../../../types/generic/generic-types';

interface SingleSelectInputProps<TItem extends string> {
  readonly label: string;
  readonly options: readonly Tuple<TItem, string>[];
  readonly value: TItem;
  readonly onValueChanged: (value: TItem) => void;
}

export function SingleSelectInput<TItem extends string>({
  label,
  options,
  value,
  onValueChanged
}: SingleSelectInputProps<TItem>): React.ReactElement {
  return (
    <Select
      label={label}
      fullWidth={true}
      multiple={false}
      variant={'outlined'}
      value={value}
      onChange={(event) => {
        const newValue = event.target.value;
        if (newValue !== value) {
          onValueChanged(newValue as TItem);
        }
      }}
    >
      {options.map((pair) => {
        return (
          <MenuItem key={pair[0]} value={pair[0]}>
            {pair[1]}
          </MenuItem>
        );
      })}
    </Select>
  );
}
