export type NetworkType = 'networks/base' | 'networks/arbitrum' | 'networks/ethereum';
export type NetworkId = 84532 | 421614 | 1;
export type NetworkName = 'Base Testnet' | 'Arbitrum Sepolia' | 'Ethereum Mainnet';

export type DomainChainType = {
  [Key in NetworkId as string]: {title: NetworkName; icon: NetworkType};
}
