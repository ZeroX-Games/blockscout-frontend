import React, { useMemo } from 'react';
import type { ReadyState } from 'react-use-websocket';
import useWebSocket from 'react-use-websocket';

export interface WebSocketContextType {
  sendMessage: (message: string) => void;
  lastMessage: MessageEvent<any> | null;
  readyState: ReadyState | null;
}

interface SocketProviderProps {
  children: React.ReactNode;
  url: string;
}

const WebSocketContext = React.createContext<WebSocketContextType>({
  sendMessage: () => {},
  lastMessage: null,
  readyState: null,
});

export function WebSocketProvider({ children, url }: SocketProviderProps) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  const value: WebSocketContextType = useMemo(() => ({
    sendMessage,
    lastMessage,
    readyState,
  }), [ sendMessage, lastMessage, readyState ]);

  return (
    <WebSocketContext.Provider value={ value }>
      { children }
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext(): WebSocketContextType {
  const context = React.useContext(WebSocketContext);

  if (context === undefined) {
    throw new Error('useSocket must be used within a WebSocketProvider');
  }

  return context;
}
