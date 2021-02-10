import React from 'react';
import { BusinessExpenseItem } from '../types/earnings-data';
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { isNameValid } from '../utils/generic-utils';
import { isValidMoneyString } from '../utils/currency-utils';

interface BusinessExpenseInputProps {
  readonly item: BusinessExpenseItem;
  readonly onItemChanged: (item: BusinessExpenseItem) => void;
}

export function BusinessExpenseInput({
  item,
  onItemChanged
}: BusinessExpenseInputProps): React.ReactElement {
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
