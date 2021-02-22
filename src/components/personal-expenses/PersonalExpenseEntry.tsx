import React from 'react';
import {
  EXPENSE_INTERVAL_VALUE_DISPLAY_PAIRS,
  ExpenseInterval
} from '../../types/generic/expense-interval';
import { SingleSelectInput } from '../generic/inputs/SingleSelectInput';
import { GridLayout } from '../generic/layout/GridLayout';
import { TextInput } from '../generic/inputs/TextInput';
import { GridItem } from '../generic/layout/GridItem';
import { isValidText } from '../../utils/validation-utils';
import { PersonalExpenseItem } from '../../types/personal-expenses/personal-expense-item';
import { InputListItemProps } from '../../types/generic/generic-types';
import { MoneyInput } from '../generic/inputs/MoneyInput';
import { IntegerInput } from '../generic/inputs/IntegerInput';

export function PersonalExpenseEntry({
  item,
  onItemChanged
}: InputListItemProps<PersonalExpenseItem>): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'320px 200px 120px 120px'}>
      <GridItem row={1} column={1}>
        <TextInput
          label={'Name'}
          value={item.name}
          onValueChanged={(value) => {
            onItemChanged({ ...item, name: value });
          }}
          validator={isValidText}
        />
      </GridItem>
      <GridItem row={1} column={2}>
        <MoneyInput
          label={'Amount'}
          value={item.amount}
          onValueChanged={(value) => {
            onItemChanged({ ...item, amount: value });
          }}
        />
      </GridItem>
      <GridItem row={1} column={3}>
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
      <GridItem row={1} column={4}>
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
