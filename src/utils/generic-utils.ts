export function isNameValid(value: string): boolean {
  return value.length >= 1 && value.length <= 100;
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
