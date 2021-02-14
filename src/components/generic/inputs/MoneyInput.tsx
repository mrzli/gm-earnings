import React from 'react';
import { InputAdornment, Menu, MenuItem, TextField } from '@material-ui/core';
import { isValidMoneyString } from '../../../utils/validation-utils';
import { ArrowDropDown } from '@material-ui/icons';
import {
  CURRENCY_SELECTION_VALUE_DISPLAY_PAIRS,
  CurrencySelection
} from '../../../types/generic/currency-selection';

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  function onMenuOpen(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function onMenuClose(): void {
    setAnchorEl(null);
  }

  function onMenuValueSelected(menuValue: CurrencySelection): void {
    console.log(menuValue);
    onMenuClose();
  }

  return (
    <>
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
          endAdornment: getInputAdornmentElement(onMenuOpen)
        }}
        disabled={disabled}
      />
      {getCurrencySelectionMenuElement(
        anchorEl,
        onMenuClose,
        onMenuValueSelected
      )}
    </>
  );
}

function getInputAdornmentElement(
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
): React.ReactElement {
  return (
    <InputAdornment position={'end'} onClick={onMenuOpen}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <span>HRK</span>
        <ArrowDropDown />
      </div>
    </InputAdornment>
  );
}

function getCurrencySelectionMenuElement(
  anchorEl: HTMLElement | null,
  onMenuClose: () => void,
  onMenuValueSelected: (menuValue: CurrencySelection) => void
): React.ReactElement {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted={true}
      open={Boolean(anchorEl)}
      onClose={onMenuClose}
    >
      {CURRENCY_SELECTION_VALUE_DISPLAY_PAIRS.map((pair) => {
        return (
          <MenuItem
            key={pair[0]}
            value={pair[0]}
            onClick={() => {
              onMenuValueSelected(pair[0]);
            }}
          >
            {pair[1]}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
