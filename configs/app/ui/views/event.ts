import type { EventFieldId } from 'types/views/event';
import { EVENT_FIELDS_IDS } from 'types/views/event';

import { getEnvValue, parseEnvJson } from 'configs/app/utils';

const eventHiddenFields = (() => {
  const parsedValue = parseEnvJson<Array<EventFieldId>>(getEnvValue('NEXT_PUBLIC_VIEWS_EVENT_HIDDEN_FIELDS')) || [];

  if (!Array.isArray(parsedValue)) {
    return undefined;
  }

  const result = EVENT_FIELDS_IDS.reduce((result, item) => {
    result[item] = parsedValue.includes(item);
    return result;
  }, {} as Record<EventFieldId, boolean>);

  return result;
})();

const config = Object.freeze({
  hiddenFields: eventHiddenFields,
});

export default config;
