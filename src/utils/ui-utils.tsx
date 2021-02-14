import { Tuple } from '../types/generic/generic-types';
import React from 'react';
import { MenuItem } from '@material-ui/core';

export function optionsToSelectMenuItems<TItem extends string>(
  options: readonly Tuple<TItem, string>[]
): React.ReactElement[] {
  return options.map((pair) => {
    return (
      <MenuItem key={pair[0]} value={pair[0]}>
        {pair[1]}
      </MenuItem>
    );
  });
}
