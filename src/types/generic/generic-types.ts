export interface InputListItemProps<TItem> {
  readonly item: TItem;
  readonly onItemChanged: (item: TItem) => void;
}
