import type { UseQueryResult } from '@tanstack/react-query';

import type { GameAssetTokenUpdates } from 'types/api/gameAssetTokenUpdate';

import type { ResourceError } from 'lib/api/resources';

export type GameAssetTokenUpdateQuery = UseQueryResult<GameAssetTokenUpdates, ResourceError<{ status: number }>>
