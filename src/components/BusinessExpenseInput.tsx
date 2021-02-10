import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { isNameValid } from '../utils/generic-utils';
import { isValidMoneyString } from '../utils/currency-utils';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { InputListItemProps } from '../types/generic/generic-types';

export function BusinessExpenseInput({
  item,
  onItemChanged
}: InputListItemProps<BusinessExpenseItem>): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 120px auto',
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10
      }}
    >
      <div style={{ gridColumnStart: 1 }}>
        <TextField
          fullWidth={true}
          placeholder={'Name'}
          error={!isNameValid(item.name)}
          value={item.name}
          onChange={(event) => {
            onItemChanged({ ...item, name: event.target.value });
          }}
        />
      </div>
      <div style={{ gridColumnStart: 2 }}>
        <TextField
          fullWidth={true}
          error={!isValidMoneyString(item.amount.amount)}
          value={item.amount.amount}
          onChange={(event) => {
            onItemChanged({
              ...item,
              amount: { ...item.amount, amount: event.target.value }
            });
          }}
          InputProps={{
            endAdornment: <InputAdornment position={'start'}>kn</InputAdornment>
          }}
        />
      </div>
      <div style={{ gridColumnStart: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={item.amount.isVat}
              onChange={(event, checked) => {
                onItemChanged({
                  ...item,
                  amount: { ...item.amount, isVat: checked }
                });
              }}
            />
          }
          label={'VAT'}
        />
      </div>
    </div>
  );
}
