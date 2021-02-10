import React from 'react';
import { Button, List, ListItem } from '@material-ui/core';

interface ExpenseInputListProps<TItem> {
  readonly title: string;
  readonly items: readonly TItem[];
  readonly itemRenderer: (item: TItem, index: number) => React.ReactElement;
  readonly onAddItem: () => void;
  readonly onRemoveItem: (index: number) => void;
}

export function ExpenseInputList<TItem>({
  title,
  items,
  itemRenderer,
  onAddItem,
  onRemoveItem
}: ExpenseInputListProps<TItem>): React.ReactElement {
  return (
    <div>
      <div>{title}</div>
      <List>
        {items.map((item, index) => {
          return (
            <ListItem key={index}>
              <div>{itemRenderer(item, index)}</div>
              <div>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  onClick={() => {
                    onRemoveItem(index);
                  }}
                >
                  Remove
                </Button>
              </div>
            </ListItem>
          );
        })}
      </List>
      <Button variant={'contained'} color={'primary'} onClick={onAddItem}>
        Add
      </Button>
    </div>
  );
}
