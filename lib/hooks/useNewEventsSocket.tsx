import React, { useEffect } from 'react';

import useGradualIncrement from 'lib/hooks/useGradualIncrement';

import type { WebSocketContextType } from '../socket/useSocketContext';
import { useWebSocketContext } from '../socket/useSocketContext';

interface NewEventMsg {
  message: string;

}

export function assertIsNewEventResponse(socket: WebSocketContextType) {
  return socket && socket.lastMessage &&
    socket.lastMessage.data &&
    typeof socket.lastMessage.data === 'string' &&
    socket.lastMessage.data.includes('New block added:');
}

export function assertIsValidNewEventMsg(obj: any): obj is NewEventMsg {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

export function assertIsSocketClosed(socket: WebSocketContextType) {
  return socket && (socket.readyState === 3 || socket.readyState === 2);
}

export default function useNewEventsSocket(currentEvent: number | undefined) {
  const [ num, setNum ] = useGradualIncrement(0);
  const [ socketAlert, setSocketAlert ] = React.useState('');
  const socket = useWebSocketContext();

  const handleNewUpdateMessage = React.useCallback(() => {
    if (currentEvent && assertIsNewEventResponse(socket)) {
      const obj = JSON.parse(socket?.lastMessage?.data);
      if (assertIsValidNewEventMsg(obj)) {
        const newEvent = Number(obj.message.split(': ')[1]);
        // setNum(currentBlock - currentEvent);
        if (newEvent > currentEvent) {
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
