export type GameAssetTokenUpdate = {
  id: string;
  name: string;
  updates: Array<number>;
}

export type GameAssetTokenUpdates = {
  updatedTokens: Array<GameAssetTokenUpdate>;
  game: string;
  collectionAddress: string;
  chainId: number;
  attributes: Array<string>;
}
