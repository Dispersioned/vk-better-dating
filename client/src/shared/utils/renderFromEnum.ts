export function renderFromEnum<T extends string>(enumerable: Record<T, string>, value: T) {
  if (!value) return 'Не указано';
  if (Object.keys(enumerable).includes(value)) return enumerable[value];
  return `${value}. "Not found in enum"`;
}
