import { ReactNode } from 'react';
import { toastService } from 'shared/services/toast.service';

type Options = {
  render?: (text: string) => ReactNode;
};

export function renderFromEnum(
  enumerable: Record<string, string>,
  value: undefined | string | string[],
  options: Options = {}
) {
  const renderFunction = options.render;

  if (!value) return 'Не указано';

  if (Array.isArray(value)) {
    if (renderFunction) {
      const mappedValues = value.map((str) => {
        if (Object.keys(enumerable).includes(str)) {
          return renderFunction(enumerable[str]);
        }
        toastService.error(`value ${str} not found in enumerable`);
        return renderFunction(str);
      });

      return <>{mappedValues}</>;
    } else {
      const mappedValues = value.map((str) => {
        if (Object.keys(enumerable).includes(str)) {
          return enumerable[str];
        }
        toastService.error(`value ${str} not found in enumerable`);
        return str;
      });
      return mappedValues.join(', ');
    }
  }

  if (Object.keys(enumerable).includes(value)) return enumerable[value];
  return `${value}. "Not found in enum"`;
}
