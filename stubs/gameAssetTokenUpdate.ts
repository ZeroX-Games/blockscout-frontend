import type { GameAssetTokenUpdate, GameAssetTokenUpdates } from '../types/api/gameAssetTokenUpdate';

export const GAME_ASSET_TOKEN_UPDATE: GameAssetTokenUpdate = {
  id: '1',
  name: 'Test',
  updates: [ 1, 2, 3, 4, 5, 6, 7 ],
};

export const GAME_ASSET_TOKEN_UPDATES: GameAssetTokenUpdates = {
  updatedTokens: [ GAME_ASSET_TOKEN_UPDATE, GAME_ASSET_TOKEN_UPDATE, GAME_ASSET_TOKEN_UPDATE ],
  game: 'Test Game',
  collectionAddress: '0x1234567890',
  chainId: 1,
  attributes: [ 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test' ],
};
