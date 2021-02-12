import React from 'react';
import { TextField } from '@material-ui/core';
import { isNameValid } from '../../utils/generic-utils';
import { BusinessExpenseItem } from '../../types/business-expense-item';
import { InputListItemProps } from '../../types/generic/generic-types';
import { MoneyInputWithVatInGrid } from '../generic/MoneyInputWithVatInGrid';
import { IntegerInput } from '../generic/IntegerInput';
import {
  EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS,
  ExpenseInterval
} from '../../types/expense-interval';
import { SingleSelectInput } from '../generic/SingleSelectInput';
import { GridLayout } from '../generic/GridLayout';

export function BusinessExpenseInput({
  item,
  onItemChanged
}: InputListItemProps<BusinessExpenseItem>): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'120px 120px auto 120px 120px'}>
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
      <MoneyInputWithVatInGrid
        value={item.amount}
        onValueChanged={(value) => {
          onItemChanged({ ...item, amount: value });
        }}
        row={1}
        column={2}
      />
      <div style={{ gridColumnStart: 4 }}>
        <SingleSelectInput<ExpenseInterval>
          options={EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS}
          value={item.interval}
          onValueChanged={(value) => {
            onItemChanged({
              ...item,
              interval: value
            });
          }}
        />
      </div>
      <div style={{ gridColumnStart: 5 }}>
        <IntegerInput
          value={item.timesPerInterval}
          onValueChanged={(value) => {
            onItemChanged({ ...item, timesPerInterval: value });
          }}
          minValue={1}
          maxValue={1000}
        />
      </div>
    </GridLayout>
  );
}
