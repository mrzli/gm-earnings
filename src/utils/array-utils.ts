export function updateArrayItemAtIndex<T>(
  array: readonly T[],
  updateAtIndex: number,
  value: T
): readonly T[] {
  if (updateAtIndex < 0 || updateAtIndex >= array.length) {
    throw new Error(`Invalid index: '${updateAtIndex}'`);
  }

  return [
    ...array.slice(0, updateAtIndex),
    value,
    ...array.slice(updateAtIndex + 1)
  ];
}

export function removeArrayItemAtIndex<T>(
  array: readonly T[],
  removeAtIndex: number
): readonly T[] {
  if (removeAtIndex < 0 || removeAtIndex >= array.length) {
    throw new Error(`Invalid index: '${removeAtIndex}'`);
  }

  return array.filter((_, index) => index !== removeAtIndex);
}
