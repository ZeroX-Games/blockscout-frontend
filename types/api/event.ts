import type { DomainParam } from './domainParams';

export type EventType = 'event' | 'reorg' | 'uncle';

export type MatrixEntry = {
  collectionAddr: string;
  token_id: string;
  delta: Array<number>;
}

export type EventDetail = {
  'block_number': number;
  'eventHash': string;
  'transactionHash': string;
  'numberOfUpdates': number;
  'status': boolean;
  'domain_details': DomainParam;
  'timestamp': string;
  confirmations?: number;
  matrix_entries: Array<MatrixEntry>;
}
