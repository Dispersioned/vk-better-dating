import { toastService } from 'shared/services/toast.service';

export function renderFromEnum<T extends string>(enumerable: Record<T, string>, value: T | T[]) {
  if (!value) return 'Не указано';

  if (Array.isArray(value)) {
    const mappedValues = value.map((str) => {
      if (Object.keys(enumerable).includes(str)) return enumerable[str];
      toastService.error(`value ${str} not found in enumerable`);
      return str;
    });

    return mappedValues.join(', ');
  }

  if (Object.keys(enumerable).includes(value)) return enumerable[value];
  return `${value}. "Not found in enum"`;
}
