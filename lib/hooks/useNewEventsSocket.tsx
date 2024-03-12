import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import type { EventSummary, EventSummaryResult } from '../../types/api/update';

import { getResourceKeyV1 } from '../api/v1/useApiQueryV1';
import type { WebSocketContextType } from '../socket/useSocketContext';
import { useWebSocketContext } from '../socket/useSocketContext';

interface NewEventMsg {
  block: EventSummaryResult;
}

export function assertIsNewEventResponse(socket: WebSocketContextType) {
  return socket && socket.lastMessage &&
    socket.lastMessage.data &&
    typeof socket.lastMessage.data === 'string';
}

export function assertIsValidNewEventMsg(obj: any): obj is NewEventMsg {
  return typeof obj === 'object' && obj !== null && 'block' in obj;
}

export function assertIsSocketClosed(socket: WebSocketContextType) {
  return socket && (socket.readyState === 3 || socket.readyState === 2);
}

export default function useNewEventsSocket() {
  const [ socketAlert, setSocketAlert ] = React.useState('');
  const socket = useWebSocketContext();
  const queryClient = useQueryClient();
  const handleNewUpdateMessage = React.useCallback(() => {
    if (assertIsNewEventResponse(socket)) {
      const newEventSummaryObj = JSON.parse(socket?.lastMessage?.data);
      if (assertIsValidNewEventMsg(newEventSummaryObj)) {
        const newEventSummary = newEventSummaryObj.block;
        queryClient.setQueryData(getResourceKeyV1('homepage_events_summary'), (prevData: EventSummary | undefined) => {

          const newData = (prevData && prevData.results) ? prevData : { results: [] };

          if (newData.results.some((event => event.block_number === newEventSummary.block_number))) {
            return newData;
          }
          newData.results = [ newEventSummary, ...newData.results ]
            .sort((b1, b2) => b2.block_number - b1.block_number).slice(0, 5);
          return newData;
        });
      }
    }
  }, [ socket, queryClient ]);

  const handleSocketClose = React.useCallback(() => {
    if (assertIsSocketClosed(socket)) {
      setSocketAlert('Connection is lost. Please reload page.');
    }
  }, [ socket ]);

  useEffect(() => {
    handleNewUpdateMessage();
    handleSocketClose();
  }, [ socket, handleNewUpdateMessage, handleSocketClose ]);

  return { socketAlert };
}
