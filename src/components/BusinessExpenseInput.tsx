import React from 'react';
import { TextField } from '@material-ui/core';
import { isNameValid } from '../utils/generic-utils';
import { BusinessExpenseItem } from '../types/business-expense-item';
import { InputListItemProps } from '../types/generic/generic-types';
import { VatCheckbox } from './generic/VatCheckbox';
import { MoneyInput } from './generic/MoneyInput';

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
        <MoneyInput
          value={item.amount.amount}
          onValueChanged={(value) => {
            onItemChanged({
              ...item,
              amount: { ...item.amount, amount: value }
            });
          }}
        />
      </div>
      <div style={{ gridColumnStart: 3 }}>
        <VatCheckbox
          value={item.amount.isVat}
          onValueChanged={(value) => {
            onItemChanged({
              ...item,
              amount: { ...item.amount, isVat: value }
            });
          }}
        />
      </div>
    </div>
  );
}
