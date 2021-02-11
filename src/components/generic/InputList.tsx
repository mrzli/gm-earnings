import React from 'react';
import { Button, List, ListItem } from '@material-ui/core';
import { InputListItemProps } from '../../types/generic/generic-types';
import {
  removeArrayItemAtIndex,
  updateArrayItemAtIndex
} from '../../utils/array-utils';

interface InputListProps<TItem> {
  readonly title: string;
  readonly items: readonly TItem[];
  readonly ItemComponent: (
    props: InputListItemProps<TItem>
  ) => React.ReactElement;
  readonly emptyItem: TItem;
  readonly onValueChanged: (items: readonly TItem[]) => void;
}

export function InputList<TItem>({
  title,
  items,
  ItemComponent,
  emptyItem,
  onValueChanged
}: InputListProps<TItem>): React.ReactElement {
  return (
    <div>
      <div>{title}</div>
      <List>
        {items.map((item, index) => {
          return (
            <ListItem key={index}>
              <ItemComponent
                item={item}
                onItemChanged={(updatedItem) => {
                  onValueChanged(
                    updateArrayItemAtIndex(items, index, updatedItem)
                  );
                }}
              />
              <div>
                <Button
                  style={{ marginLeft: 10 }}
                  variant={'contained'}
                  color={'secondary'}
                  onClick={() => {
                    onValueChanged(removeArrayItemAtIndex(items, index));
                  }}
                >
                  Remove
                </Button>
              </div>
            </ListItem>
          );
        })}
      </List>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => {
          onValueChanged([...items, emptyItem]);
        }}
      >
        Add
      </Button>
    </div>
  );
}
