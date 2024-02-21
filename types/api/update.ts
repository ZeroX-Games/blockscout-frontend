import type { AddressParam } from './addressParams';
import type { BlockUpdatesResponse } from './block';
import type { DecodedInput } from './decodedInput';
import type { DomainParam } from './domainParams';
import type { Fee } from './fee';
import type { L2WithdrawalStatus } from './l2Withdrawals';
import type { TokenInfo } from './token';
import type { TokenTransfer } from './tokenTransfer';
import type { TxAction } from './txAction';

export type UpdateRevertReason = {
  raw: string;
} | DecodedInput;

type WrappedUpdateFields = 'decoded_input' | 'fee' | 'gas_limit' | 'gas_price' | 'eventHash' | 'txHash' | 'max_fee_per_gas' |
'max_priority_fee_per_gas' | 'method' | 'nonce' | 'raw_input' | 'to' | 'type' | 'value';

export interface OpWithdrawal {
  l1_transaction_hash: string;
  nonce: number;
  status: L2WithdrawalStatus;
}

export type Update = {
  to: DomainParam;
  created_contract: AddressParam | null;
  txHash: string;
  eventHash: string;
  result: string;
  confirmations: number;
  status: 'ok' | 'error' | null | undefined;
  block: number | null;
  timestamp: string | null;
  confirmation_duration: Array<number> | null;
  from: DomainParam;
  value: string;
  fee: Fee;
  gas_price: string | null;
  type: number | null;
  gas_used: string | null;
  gas_limit: string;
  max_fee_per_gas: string | null;
  max_priority_fee_per_gas: string | null;
  priority_fee: string | null;
  base_fee_per_gas: string | null;
  tx_burnt_fee: string | null;
  nonce: number;
  position: number | null;
  revert_reason: UpdateRevertReason | null;
  raw_input: string;
  decoded_input: DecodedInput | null;
  token_transfers: Array<TokenTransfer> | null;
  token_transfers_overflow: boolean;
  exchange_rate: string | null;
  method: string | null;
  tx_types: Array<UpdateType>;
  tx_tag: string | null;
  actions: Array<TxAction>;
  l1_fee?: string;
  l1_fee_scalar?: string;
  l1_gas_price?: string;
  l1_gas_used?: string;
  has_error_in_internal_txs: boolean | null;
  // optimism fields
  op_withdrawals?: Array<OpWithdrawal>;
  // SUAVE fields
  execution_node?: AddressParam | null;
  allowed_peekers?: Array<string>;
  wrapped?: Pick<Update, WrappedUpdateFields>;
  // Stability fields
  stability_fee?: {
    dapp_address: AddressParam;
    dapp_fee: string;
    token: TokenInfo;
    total_fee: string;
    validator_address: AddressParam;
    validator_fee: string;
  };
  // zkEvm fields
  zkevm_verify_hash?: string;
  zkevm_batch_number?: number;
  zkevm_status?: typeof ZKEVM_L2_TX_STATUSES[number];
  zkevm_sequence_hash?: string;
}

export const ZKEVM_L2_TX_STATUSES = [ 'Confirmed by Sequencer', 'L1 Confirmed' ];

export type UpdatesResponse = UpdatesResponseValidated | UpdatesResponsePending;

export interface UpdatesResponseValidated {
  items: Array<Update>;
  next_page_params: {
    block_number: number;
    index: number;
    items_count: number;
    filter: 'validated';
  } | null;
}

export interface UpdatesResponsePending {
  items: Array<Update>;
  next_page_params: {
    inserted_at: string;
    hash: string;
    filter: 'pending';
  } | null;
}

export interface UpdatesResponseWatchlist {
  items: Array<Update>;
  next_page_params: {
    block_number: number;
    index: number;
    items_count: 50;
  } | null;
}

export type UpdateType = 'rootstock_remasc' |
'rootstock_bridge' |
'token_transfer' |
'contract_creation' |
'contract_call' |
'token_creation' |
'coin_transfer'

export type TxsResponse = UpdatesResponseValidated | UpdatesResponsePending | BlockUpdatesResponse;

export interface UpdatesSorting {
  sort: 'value' | 'fee';
  order: 'asc' | 'desc';
}

export type UpdatesSortingField = UpdatesSorting['sort'];

export type UpdatesSortingValue = `${ UpdatesSortingField }-${ UpdatesSorting['order'] }`;
