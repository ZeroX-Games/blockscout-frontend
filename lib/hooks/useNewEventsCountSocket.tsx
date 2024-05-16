import React, { useEffect } from 'react';

import useGradualIncrement from 'lib/hooks/useGradualIncrement';

import { useWebSocketContext } from '../socket/useSocketContext';
import { assertIsNewEventResponse, assertIsSocketClosed, assertIsValidNewEventMsg } from './useNewEventsSocket';

export default function useNewEventsCountSocket(currentEvent: number | undefined) {
  const [ num, setNum ] = useGradualIncrement(0);
  const [ socketAlert, setSocketAlert ] = React.useState('');
  const socket = useWebSocketContext();

  const handleNewUpdateMessage = React.useCallback(() => {
    if (currentEvent && socket !== null &&
      typeof socket === 'object' && assertIsNewEventResponse(socket.lastMessage)) {
      const obj = JSON.parse(socket?.lastMessage?.data);
      if (assertIsValidNewEventMsg(obj)) {
        const newEventNum = obj.block.block_number;
        if (newEventNum > currentEvent) {
          setNum(1);
        }
      }
    }
  }, [ setNum, currentEvent, socket ]);

  const handleSocketClose = React.useCallback(() => {
    if (assertIsSocketClosed(socket)) {
      setSocketAlert('Connection is lost. Please reload page.');
    }
  }, [ socket ]);

  useEffect(() => {
    handleNewUpdateMessage();
    handleSocketClose();
  }, [ socket, setNum, currentEvent, handleNewUpdateMessage, handleSocketClose ]);

  return { num, socketAlert };
}
