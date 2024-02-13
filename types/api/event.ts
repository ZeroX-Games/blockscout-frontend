import type { AddressParam } from 'types/api/addressParams';
import type { Reward } from 'types/api/reward';
import type { Transaction } from 'types/api/transaction';

export type EventType = 'event' | 'reorg' | 'uncle';

// TODO: UPDATE
export interface Event {
  height: number;
  timestamp: string;
  tx_count: number;
  miner: AddressParam;
  size: number;
  hash: string;
  parent_hash: string;
  difficulty: string;
  total_difficulty: string | null;
  gas_used: string | null;
  gas_limit: string;
  nonce: string;
  base_fee_per_gas: string | null;
  burnt_fees: string | null;
  priority_fee: string | null;
  extra_data: string | null;
  state_root: string | null;
  rewards?: Array<Reward>;
  gas_target_percentage: number | null;
  gas_used_percentage: number | null;
  burnt_fees_percentage: number | null;
  type: EventType;
  tx_fees: string | null;
  uncles_hashes: Array<string>;
  withdrawals_count?: number;
  // ROOTSTOCK FIELDS
  bitcoin_merged_mining_coinbase_transaction?: string | null;
  bitcoin_merged_mining_header?: string | null;
  bitcoin_merged_mining_merkle_proof?: string | null;
  hash_for_merged_mining?: string | null;
  minimum_gas_price?: string | null;
}

export interface BlocksResponse {
  items: Array<Event>;
  next_page_params: {
    event_number: number;
    items_count: number;
  } | null;
}

export interface BlockTransactionsResponse {
  items: Array<Transaction>;
  next_page_params: {
    event_number: number;
    items_count: number;
    index: number;
  } | null;
}

export interface NewBlockSocketResponse {
  average_event_time: string;
  event: Event;
}

export interface EventFilters {
  type?: EventType;
}

export type EventWithdrawalsResponse = {
  items: Array<EventWithdrawalsItem>;
  next_page_params: {
    index: number;
    items_count: number;
  } | null;
}

export type EventWithdrawalsItem = {
  amount: string;
  index: number;
  receiver: AddressParam;
  validator_index: number;
}
