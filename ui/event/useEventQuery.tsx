import { useBoolean } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import type { SocketMessage } from 'lib/socket/types';
import type { EventDetail } from 'types/api/event';

import type { ResourceError } from 'lib/api/resources';
import useApiQuery, { getResourceKey } from 'lib/api/useApiQuery';
import { retry } from 'lib/api/useQueryClientConfig';
import { SECOND } from 'lib/consts';
import delay from 'lib/delay';
import getQueryParamString from 'lib/router/getQueryParamString';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';

import { BLOCK_DETAIL } from '../../stubs/update';

export type EventQuery = UseQueryResult<EventDetail, ResourceError<{ status: number }>> & {
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

export default function useEventQuery(params?: Params): EventQuery {
  const [ socketStatus, setSocketStatus ] = React.useState<'close' | 'error'>();
  const [ isRefetchEnabled, setRefetchEnabled ] = useBoolean(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const eventId = params?.blockId ?? getQueryParamString(router.query.event_id);
  const queryResult = useApiQuery<'event', { status: number }>('event', {
    pathParams: { eventId },
    queryOptions: {
      enabled: Boolean(eventId) && params?.isEnabled !== false,
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
      queryKey: getResourceKey('event', { pathParams: { eventId } }),
    });
  }, [ queryClient, eventId ]);

  const handleSocketClose = React.useCallback(() => {
    setSocketStatus('close');
  }, []);

  const handleSocketError = React.useCallback(() => {
    setSocketStatus('error');
  }, []);

  const channel = useSocketChannel({
    topic: `updates:${ eventId }`,
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
