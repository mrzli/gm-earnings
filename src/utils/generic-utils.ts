export function isTextValid(value: string): boolean {
  return value.length >= 1 && value.length <= 100;
}

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
