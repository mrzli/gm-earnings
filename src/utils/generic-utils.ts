export function isNameValid(value: string): boolean {
  return value.length >= 1 && value.length <= 100;
}
