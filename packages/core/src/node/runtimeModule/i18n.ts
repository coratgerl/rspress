import { join } from 'node:path';
import type { UserConfig } from '@rspress/shared';
import { logger } from '@rspress/shared/logger';
import { type FactoryContext, RuntimeModuleID } from '.';

const DEFAULT_I18N_SOURCE = join(process.cwd(), 'i18n.json');

export function getI18nData(docConfig: UserConfig) {
  const { i18nSourcePath = DEFAULT_I18N_SOURCE } = docConfig;
  try {
    // require.cache is an API in Rslib.
    delete REQUIRE_CACHE[i18nSourcePath];
    // eslint-disable-next-line import/no-dynamic-require
    const i18nSource = require(i18nSourcePath);
    return i18nSource;
  } catch (e) {
    logger.debug('getI18nData Failed: \n', e);
    return {};
  }
}

export function i18nVMPlugin(context: FactoryContext) {
  const { config } = context;
  const i18nData = getI18nData(config);
  return {
    [RuntimeModuleID.I18nText]: `export default ${JSON.stringify(i18nData, null, 2)}`,
  };
}
