import type { AddressParam } from './addressParams';

export type ZeroXAppRegistration = {
  txHash: string;
  contract_address: AddressParam;
}

export type ZeroXCollectionRegistration = {
  chain_id: number;
  app: ZeroXAppRegistration;
  contract_address: string;
}

export type TxZeroXTransaction = ZeroXAppRegistration;
