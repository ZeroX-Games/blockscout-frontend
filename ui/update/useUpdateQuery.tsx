import { useBoolean } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import type { SocketMessage } from 'lib/socket/types';
import type { BlockDetail } from 'types/api/update';

import type { ResourceError } from 'lib/api/resources';
import useApiQuery, { getResourceKey } from 'lib/api/useApiQuery';
import { retry } from 'lib/api/useQueryClientConfig';
import { SECOND } from 'lib/consts';
import delay from 'lib/delay';
import getQueryParamString from 'lib/router/getQueryParamString';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';

import { BLOCK_DETAIL } from '../../stubs/update';

export type UpdateQuery = UseQueryResult<BlockDetail, ResourceError<{ status: number }>> & {
  socketStatus: 'close' | 'error' | undefined;
  setRefetchOnError: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}

interface Params {
  blockId?: string;
  isEnabled?: boolean;
}

export default function useUpdateQuery(params?: Params): UpdateQuery {
  const [ socketStatus, setSocketStatus ] = React.useState<'close' | 'error'>();
  const [ isRefetchEnabled, setRefetchEnabled ] = useBoolean(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const blockId = params?.blockId ?? getQueryParamString(router.query.blockId);

  const queryResult = useApiQuery<'update', { status: number }>('update', {
    pathParams: { blockId },
    queryOptions: {
      enabled: Boolean(blockId) && params?.isEnabled !== false,
      refetchOnMount: false,
      placeholderData: BLOCK_DETAIL,
      retry: (failureCount, error) => {
        if (isRefetchEnabled) {
          return false;
        }

        return retry(failureCount, error);
      },
      refetchInterval: (): number | false => {
        return isRefetchEnabled ? 15 * SECOND : false;
      },
    },
  });
  const { data, isError, isPlaceholderData, isPending } = queryResult;

  const handleStatusUpdateMessage: SocketMessage.TxStatusUpdate['handler'] = React.useCallback(async() => {
    await delay(5 * SECOND);
    queryClient.invalidateQueries({
      queryKey: getResourceKey('update', { pathParams: { blockId } }),
    });
  }, [ queryClient, blockId ]);

  const handleSocketClose = React.useCallback(() => {
    setSocketStatus('close');
  }, []);

  const handleSocketError = React.useCallback(() => {
    setSocketStatus('error');
  }, []);

  const channel = useSocketChannel({
    topic: `updates:${ blockId }`,
    onSocketClose: handleSocketClose,
    onSocketError: handleSocketError,
    isDisabled: isPending || isPlaceholderData || isError || data.status !== null,
  });
  useSocketMessage({
    channel,
    event: 'collated',
    handler: handleStatusUpdateMessage,
  });

  return React.useMemo(() => ({
    ...queryResult,
    socketStatus,
    setRefetchOnError: setRefetchEnabled,
  }), [ queryResult, socketStatus, setRefetchEnabled ]);
}
