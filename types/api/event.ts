import type { DomainParam } from './domainParams';

export type EventType = 'event' | 'reorg' | 'uncle';

export type MatrixUpdate = {
  'token_id': string;
  delta: Array<number>;
}

export type MatrixEntry = {
  collectionAddr: string;
  attributes: Array<string>;
  updates: Array<MatrixUpdate>;
}

export type EventDetail = {
  'block_number': number;
  'destination': string;
  'chainId': number;
  'eventHash': string;
  'transactionHash': string;
  'numberOfUpdates': number;
  'status': boolean;
  'domain_details': DomainParam;
  'timestamp': string;
  confirmations?: number;
  matrix_entries: Array<MatrixEntry>;
}

export interface EventFilters {
  type?: EventType;
}

export interface EventsSorting {
  sort: 'blockId';
  order: 'asc' | 'desc';
}

export type EventsSortingField = EventsSorting['sort'];

export type EventsSortingValue = `${ EventsSortingField }-${ EventsSorting['order'] }`;
