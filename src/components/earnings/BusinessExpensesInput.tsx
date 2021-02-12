import React from 'react';
import { InputList } from '../generic/InputList';
import { BusinessExpenseItem } from '../../types/business-expense-item';
import { BusinessExpenseInput } from './BusinessExpenseInput';
import { EMPTY_BUSINESS_EXPENSE_ITEM } from '../../data/earnings-data';
import { LabelledMoneyDisplayInGrid } from '../generic/LabelledMoneyDisplayInGrid';
import { ZERO_AMOUNT } from '../../data/general-data';
import { GridLayout } from '../generic/GridLayout';

interface BusinessExpensesInputProps {
  readonly value: readonly BusinessExpenseItem[];
  readonly onValueChanged: (value: readonly BusinessExpenseItem[]) => void;
}

export function BusinessExpensesInput({
  value,
  onValueChanged
}: BusinessExpensesInputProps): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'240px 200px 1fr'}>
      <div
        style={{
          gridRowStart: 1,
          gridColumnStart: 1,
          gridColumnEnd: 'span 3'
        }}
      >
        <InputList<BusinessExpenseItem>
          title={'Business Expenses:'}
          items={value}
          ItemComponent={BusinessExpenseInput}
          emptyItem={EMPTY_BUSINESS_EXPENSE_ITEM}
          onValueChanged={(updatedValue) => {
            onValueChanged(updatedValue);
          }}
        />
      </div>
      <LabelledMoneyDisplayInGrid
        label={'Total Business Expenses (without VAT):'}
        value={ZERO_AMOUNT}
        row={2}
        column={1}
      />
      <LabelledMoneyDisplayInGrid
        label={'Total Business Expenses VAT:'}
        value={ZERO_AMOUNT}
        row={3}
        column={1}
      />
    </GridLayout>
  );
}
