import { KEY_GLOBAL_CONFIG } from 'shared/config/consts';
import { toastService } from 'shared/services/toast.service';

import { IGlobalConfig } from '../types';

export function loadGlobalFilters() {
  try {
    const jsonString = localStorage.getItem(KEY_GLOBAL_CONFIG);
    if (!jsonString) return null;
    const config = JSON.parse(jsonString);
    return config;
  } catch (e) {
    toastService.error('Ошибка загрузки глобальных настроек. Восстанавливаю стандартные');
  }
  return null;
}

export function createDefaultGlobalFilters(): IGlobalConfig {
  return {
    autoFilter: false,
    hiddenFields: [],
    hideEmpty: false,
    hideEmptyPlus: false,
    hiddenTargets: [],
  };
}
