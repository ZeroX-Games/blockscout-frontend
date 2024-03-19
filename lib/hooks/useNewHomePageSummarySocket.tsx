import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import type { HomeSummary } from '../../types/api/HomeSummary';

import { getResourceKeyV1 } from '../api/v1/useApiQueryV1';
import type { WebSocketContextType } from '../socket/useSocketContext';
import { useWebSocketContext } from '../socket/useSocketContext';

export function assertIsNewEventResponse(socket: WebSocketContextType) {
  return socket && socket.lastSummaryMessage &&
    socket.lastSummaryMessage.data &&
    typeof socket.lastSummaryMessage.data === 'string';
}

export function assertIsValidNewSummaryMsg(obj: any): obj is HomeSummary {
  return typeof obj === 'object' && obj !== null && 'totalUpdates' in obj;
}

export function assertIsSocketClosed(socket: WebSocketContextType) {
  return socket && (socket.readyBlockState === 3 || socket.readyBlockState === 2);
}

export default function useNewHomePageSummarySocket() {
  const [ socketAlert, setSocketAlert ] = React.useState('');
  const socket = useWebSocketContext();
  const queryClient = useQueryClient();
  const handleNewUpdateMessage = React.useCallback(() => {
    if (assertIsNewEventResponse(socket)) {
      console.log(socket);
      const newSummaryObj = JSON.parse(socket?.lastSummaryMessage?.data);
      if (assertIsValidNewSummaryMsg(newSummaryObj)) {
        const newHomePageSummary = newSummaryObj;
        queryClient.setQueryData(getResourceKeyV1('homepage_summary_stat'), (prevData: HomeSummary | undefined) => {
          let newData = (prevData) ? prevData : {
            totalBlock: 0,
            totalDomains: 0,
            totalCollections: 0,
            totalChains: 0,
            totalUpdates: 0,
          };

          newData = newHomePageSummary;
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
