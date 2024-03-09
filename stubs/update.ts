import type { EventDetail } from 'types/api/event';
import type { EventSummary } from 'types/api/update';

// export const TX_HASH = '0x3ed9d81e7c1001bdda1caa1dc62c0acbbe3d2c671cdc20dc1e65efdaa4186967';

// export const UPDATE: Update = {
//   timestamp: '2022-11-11T11:11:11.000000Z',
//   fee: {
//     type: 'actual',
//     value: '2100000000000000',
//   },
//   gas_limit: '21000',
//   block: 9004925,
//   status: 'ok',
//   method: 'placeholder',
//   confirmations: 71,
//   type: 0,
//   exchange_rate: '1828.71',
//   to: DOMAIN_PARAMS1,
//   tx_burnt_fee: null,
//   max_fee_per_gas: null,
//   result: 'success',
//   txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cc',
//   eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cc',
//   gas_price: '100000000000',
//   priority_fee: null,
//   base_fee_per_gas: '24',
//   from: DOMAIN_PARAMS2,
//   token_transfers: null,
//   tx_types: [
//     'coin_transfer',
//   ],
//   gas_used: '21000',
//   created_contract: null,
//   position: 0,
//   nonce: 295929,
//   has_error_in_internal_txs: false,
//   actions: [],
//   decoded_input: null,
//   token_transfers_overflow: false,
//   raw_input: '0x',
//   value: '42000420000000000000',
//   max_priority_fee_per_gas: null,
//   revert_reason: null,
//   confirmation_duration: [
//     0,
//     14545,
//   ],
//   tx_tag: null,
// };
//
// const UPDATE_2: Update = {
//   ...UPDATE,
//   txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cb',
//   eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567cb',
// };
//
// const UPDATE_3: Update = {
//   ...UPDATE,
//   txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567ca',
//   eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567ca',
// };
//
// const UPDATE_4: Update = {
//   ...UPDATE,
//   txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c9',
//   eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c9',
// };
//
// const UPDATE_5: Update = {
//   ...UPDATE,
//   txHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c8',
//   eventHash: '0x2b824349b320cfa72f292ab26bf525adb00083ba9fa097141896c3c8c74567c8',
// };

// export const UPDATES = [ UPDATE, UPDATE_2, UPDATE_3, UPDATE_4, UPDATE_5 ];

export const EVENT_SUMMARY: EventSummary = {
  count: 13,
  next: 'http://127.0.0.1:8000/api/v1/blocks/?limit=5&offset=5',
  previous: null,
  results: [
    {
      block_number: -1,
      destination: '0x123',
      chainId: 84532,
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      collectionsAddrs: [ '0x1', '0x2' ],
      numberOfUpdates: 2,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-03-08T19:39:04.830782Z',
        updated_at: '2024-03-08T19:39:04.830842Z',
      },
      timestamp: '2024-03-08T20:03:36.298092Z',
    },
    {
      block_number: -2,
      destination: '0x123',
      chainId: 84532,
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      collectionsAddrs: [ '0x1', '0x2' ],
      numberOfUpdates: 2,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-03-08T19:39:04.830782Z',
        updated_at: '2024-03-08T19:39:04.830842Z',
      },
      timestamp: '2024-03-08T20:03:33.106905Z',
    },
    {
      block_number: -3,
      destination: '0x123',
      chainId: 84532,
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      collectionsAddrs: [ '0x1', '0x2' ],
      numberOfUpdates: 2,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-03-08T19:39:04.830782Z',
        updated_at: '2024-03-08T19:39:04.830842Z',
      },
      timestamp: '2024-03-08T20:03:05.929927Z',
    },
    {
      block_number: 10,
      destination: '0x123',
      chainId: 84532,
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      collectionsAddrs: [ '0x1', '0x2' ],
      numberOfUpdates: 2,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-03-08T19:39:04.830782Z',
        updated_at: '2024-03-08T19:39:04.830842Z',
      },
      timestamp: '2024-03-08T20:02:28.887432Z',
    },
    {
      block_number: 9,
      destination: '0x123',
      chainId: 84532,
      eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
      collectionsAddrs: [ '0x1', '0x2' ],
      numberOfUpdates: 2,
      status: true,
      domain_details: {
        domainId: '1',
        name: '',
        description: null,
        created_at: '2024-03-08T19:39:04.830782Z',
        updated_at: '2024-03-08T19:39:04.830842Z',
      },
      timestamp: '2024-03-08T20:02:00.750455Z',
    },
  ],
};

export const BLOCK_DETAIL: EventDetail = {
  block_number: 6,
  destination: '0x123',
  chainId: 84532,
  eventHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
  transactionHash: '0xccf546fa45608329ba11a952311c18a16001bf370684d8e72ddcbb18b7c42089',
  numberOfUpdates: 2,
  status: true,
  domain_details: {
    domainId: '1',
    name: '',
    description: null,
    created_at: '2024-03-08T19:39:04.830782Z',
    updated_at: '2024-03-08T19:39:04.830842Z',
  },
  timestamp: '2024-03-08T19:58:13.781646Z',
  matrix_entries: [
    {
      collectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C556',
      attributes: [
        'att1',
        'att1',
        'att1',
        'att1',
      ],
      updates: [
        {
          token_id: '179',
          delta: [
            2,
            0,
            -5,
            3,
          ],
        },
        {
          token_id: '23',
          delta: [
            0,
            5,
            6,
            -20,
          ],
        },
      ],
    },
    {
      collectionAddr: '0xED5AF388653567Af2F388E6224dC7C4b3241C557',
      attributes: [
        'att2',
        'att2',
        'att2',
        'att2',
        'att2',
      ],
      updates: [
        {
          token_id: '572',
          delta: [
            0,
            0,
            0,
            -13,
            32,
          ],
        },
        {
          token_id: '462',
          delta: [
            26,
            157,
            -100,
            52,
            -123,
          ],
        },
      ],
    },
  ],
};
