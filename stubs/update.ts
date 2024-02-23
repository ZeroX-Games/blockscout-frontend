import type { Update, UpdateSummary } from 'types/api/update';

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

export const UPDATE_SUMMARY: UpdateSummary = {
  count: 30,
  next: 'https://2c24-207-194-2-34.ngrok-free.app/api/v1/blocks/?limit=5&offset=5',
  previous: null,
  results: [
    {
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42087',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42087',
      numberOfUpdates: 184000,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-02-16T21:12:57.180073Z',
        updated_at: '2024-02-16T21:12:57.180106Z',
        attributes: null,
      },
      timestamp: '2024-02-16T22:35:52.704887Z',
    },
    {
      eventHash: '0x75f0038260e915d62c0072e7731405364bf6fe011b89f44436c7a75c0bc4307c',
      transactionHash: '0x75f0038260e915d62c0072e7731405364bf6fe011b89f44436c7a75c0bc4307c',
      numberOfUpdates: 1000,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-02-16T21:12:57.180073Z',
        updated_at: '2024-02-16T21:12:57.180106Z',
        attributes: null,
      },
      timestamp: '2024-02-16T22:25:17.347522Z',
    },
    {
      eventHash: '0x58251949818c5f2a214bc426794fb872149ea6160ea437034669339b2ec94ed1',
      transactionHash: '0x58251949818c5f2a214bc426794fb872149ea6160ea437034669339b2ec94ed1',
      numberOfUpdates: 1000,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-02-16T21:12:57.180073Z',
        updated_at: '2024-02-16T21:12:57.180106Z',
        attributes: null,
      },
      timestamp: '2024-02-16T22:24:02.668832Z',
    },
    {
      eventHash: '0xd4b8abae903d58b154e85e480d768def1cedc368d64b65abb33da8dd2e0e33b4',
      transactionHash: '0xd4b8abae903d58b154e85e480d768def1cedc368d64b65abb33da8dd2e0e33b4',
      numberOfUpdates: 1000,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-02-16T21:12:57.180073Z',
        updated_at: '2024-02-16T21:12:57.180106Z',
        attributes: null,
      },
      timestamp: '2024-02-16T22:14:39.870545Z',
    },
    {
      eventHash: '0x95f4cfa0d762e6518054d8bb65a212db467ce1e81b0d445ce6421ece840efc88',
      transactionHash: '0x95f4cfa0d762e6518054d8bb65a212db467ce1e81b0d445ce6421ece840efc88',
      numberOfUpdates: 1000,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-02-16T21:12:57.180073Z',
        updated_at: '2024-02-16T21:12:57.180106Z',
        attributes: null,
      },
      timestamp: '2024-02-16T22:11:01.734160Z',
    },
  ],
};
