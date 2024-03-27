export type NetworkType = 'networks/base' | 'networks/arbitrum' | 'networks/ethereum';
export type NetworkId = 84532 | 421614 | 1 | 11155111;
export type NetworkName = 'Base Sepolia' | 'Arbitrum Sepolia' | 'Ethereum Mainnet' | 'ETH Sepolia';

export type ChainType = {
  [Key in NetworkId as string]: {title: NetworkName; icon: NetworkType};
}
