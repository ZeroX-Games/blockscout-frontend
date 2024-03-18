export type NetworkType = 'networks/base' | 'networks/arbitrum' | 'networks/ethereum';
export type NetworkId = 84532 | 421613 | 1;
export type NetworkName = 'Base Testnet' | 'Arbitrum Goerli' | 'Ethereum Mainnet';

export type DomainChainType = {
  [Key in NetworkId as string]: {title: NetworkName; icon: NetworkType};
}
