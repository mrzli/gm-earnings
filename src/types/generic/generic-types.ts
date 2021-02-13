export type Tuple<T1, T2> = readonly [T1, T2];

export interface InputListItemProps<TItem> {
  readonly item: TItem;
  readonly onItemChanged: (item: TItem) => void;
}

export type NonNullableReadonlyObject<T> = {
  readonly [K in keyof T]-?: NonNullable<T[K]>;
};
