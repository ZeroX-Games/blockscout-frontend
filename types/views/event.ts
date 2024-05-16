import type { ArrayElement } from 'types/utils';

export const EVENT_FIELDS_IDS = [
  'burnt_fees',
  'total_reward',
  'nonce',
  'miner',
] as const;

export type EventFieldId = ArrayElement<typeof EVENT_FIELDS_IDS>;
