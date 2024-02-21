import type { Update } from 'types/api/update';

import { DOMAIN_PARAMS1, DOMAIN_PARAMS2 } from './domainParams';

export const TX_HASH = '0x3ed9d81e7c1001bdda1caa1dc62c0acbbe3d2c671cdc20dc1e65efdaa4186967';

export const UPDATE: Update = {
  timestamp: '2022-11-11T11:11:11.000000Z',
  fee: {
    type: 'actual',
    value: '2100000000000000',
  },
  gas_limit: '21000',
  block: 9004925,
  status: 'ok',
  method: 'placeholder',
  confirmations: 71,
  type: 0,
  exchange_rate: '1828.71',
  to: DOMAIN_PARAMS1,
  tx_burnt_fee: null,
  max_fee_per_gas: null,
  result: 'success',
  txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cc',
  eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cc',
  gas_price: '100000000000',
  priority_fee: null,
  base_fee_per_gas: '24',
  from: DOMAIN_PARAMS2,
  token_transfers: null,
  tx_types: [
    'coin_transfer',
  ],
  gas_used: '21000',
  created_contract: null,
  position: 0,
  nonce: 295929,
  has_error_in_internal_txs: false,
  actions: [],
  decoded_input: null,
  token_transfers_overflow: false,
  raw_input: '0x',
  value: '42000420000000000000',
  max_priority_fee_per_gas: null,
  revert_reason: null,
  confirmation_duration: [
    0,
    14545,
  ],
  tx_tag: null,
};

const UPDATE_2: Update = {
  ...UPDATE,
  txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cb',
  eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cb',
};

const UPDATE_3: Update = {
  ...UPDATE,
  txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567ca',
  eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567ca',
};

const UPDATE_4: Update = {
  ...UPDATE,
  txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c9',
  eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c9',
};

const UPDATE_5: Update = {
  ...UPDATE,
  txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c8',
  eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c8',
};

export const UPDATES = [ UPDATE, UPDATE_2, UPDATE_3, UPDATE_4, UPDATE_5 ];
