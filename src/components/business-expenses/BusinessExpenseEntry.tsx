import React from 'react';
import { BusinessExpenseItem } from '../../types/business-expenses/business-expense-item';
import { InputListItemProps } from '../../types/generic/generic-types';
import { MoneyInputWithVatInGrid } from '../generic/inputs/MoneyInputWithVatInGrid';
import { IntegerInput } from '../generic/inputs/IntegerInput';
import {
  EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS,
  ExpenseInterval
} from '../../types/generic/expense-interval';
import { SingleSelectInput } from '../generic/inputs/SingleSelectInput';
import { GridLayout } from '../generic/layout/GridLayout';
import { TextInput } from '../generic/inputs/TextInput';
import { GridItem } from '../generic/layout/GridItem';

export function BusinessExpenseEntry({
  item,
  onItemChanged
}: InputListItemProps<BusinessExpenseItem>): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'320px 200px auto 120px 120px'}>
      <GridItem row={1} column={1}>
        <TextInput
          label={'Name'}
          value={item.name}
          onValueChanged={(value) => {
            onItemChanged({ ...item, name: value });
          }}
        />
      </GridItem>
      <MoneyInputWithVatInGrid
        label={'Amount'}
        value={item.amount}
        onValueChanged={(value) => {
          onItemChanged({ ...item, amount: value });
        }}
        row={1}
        column={2}
      />
      <GridItem row={1} column={4}>
        <SingleSelectInput<ExpenseInterval>
          label={'Interval'}
          options={EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS}
          value={item.interval}
          onValueChanged={(value) => {
            onItemChanged({
              ...item,
              interval: value
            });
          }}
        />
      </GridItem>
      <GridItem row={1} column={5}>
        <IntegerInput
          label={'Quantity'}
          value={item.quantity}
          onValueChanged={(value) => {
            onItemChanged({ ...item, quantity: value });
          }}
          minValue={1}
          maxValue={1000}
        />
      </GridItem>
    </GridLayout>
  );
}
