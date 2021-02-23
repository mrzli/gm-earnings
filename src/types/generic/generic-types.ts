export type Tuple<T1, T2> = readonly [T1, T2];

export type Fn1<P1, R> = (param1: P1) => R;

export interface InputListItemProps<TItem> {
  readonly item: TItem;
  readonly onItemChanged: (item: TItem) => void;
}

export type NonNullableReadonlyObject<T> = {
  readonly [K in keyof T]-?: NonNullable<T[K]>;
};

export type ReadonlyPick<T, K extends keyof T> = Readonly<Pick<T, K>>;
export type ReadonlyOmit<T, K extends keyof T> = Readonly<Omit<T, K>>;
