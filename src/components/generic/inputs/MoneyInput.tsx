import React from 'react';
import { InputAdornment, Menu, MenuItem, TextField } from '@material-ui/core';
import { isValidMoneyString } from '../../../utils/validation-utils';
import { ArrowDropDown } from '@material-ui/icons';
import {
  CURRENCY_SELECTION_VALUE_DISPLAY_PAIRS,
  CurrencySelection,
  toCurrencySelectionDisplay
} from '../../../types/generic/currency-selection';
import { AmountWithCurrency } from '../../../types/generic/amount-with-currency';

interface MoneyInputProps {
  readonly label: string;
  readonly value: AmountWithCurrency;
  readonly onValueChanged: (value: AmountWithCurrency) => void;
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
    if (menuValue !== value.currency) {
      onValueChanged({ ...value, currency: menuValue });
    }
    onMenuClose();
  }

  return (
    <>
      <TextField
        fullWidth={true}
        variant={'outlined'}
        error={!isValidMoneyString(value.amount)}
        label={label}
        value={value.amount}
        onChange={(event) => {
          const amount = event.target.value;
          if (amount !== value.amount) {
            onValueChanged({ ...value, amount: amount });
          }
        }}
        InputProps={{
          endAdornment: getInputAdornmentElement(value.currency, onMenuOpen)
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
  currency: CurrencySelection,
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void
): React.ReactElement {
  return (
    <InputAdornment position={'end'} onClick={onMenuOpen}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <span>{toCurrencySelectionDisplay(currency)}</span>
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
