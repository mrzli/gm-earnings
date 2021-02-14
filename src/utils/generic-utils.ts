import React from 'react';

export function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

export function isNotNullOrUndefined<T>(
  value: T | null | undefined
): value is T {
  return isNullOrUndefined(value);
}

export function mapGetOrThrow<TKey, TValue>(
  map: Map<TKey, TValue>,
  key: TKey
): TValue {
  if (!map.has(key)) {
    throw new Error(`No entry for key '${key}' in map`);
  }

  return map.get(key) as TValue;
}

export function stateValueChange<T, K extends keyof T>(
  key: K,
  newValue: T[K]
): (obj: T) => T {
  return (obj: T) => ({ ...obj, [key]: newValue });
}

export function formatAsPercent(fractionalValue: number): string {
  return (fractionalValue * 100).toFixed(2);
}
