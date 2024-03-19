import React, { useMemo } from 'react';
import type { ReadyState } from 'react-use-websocket';
import useWebSocket from 'react-use-websocket';

export interface WebSocketContextType {
  sendBlockMessage: (message: string) => void;
  lastBlockMessage: MessageEvent<any> | null;
  readyBlockState: ReadyState | null;
  sendSummaryMessage: (message: string) => void;
  lastSummaryMessage: MessageEvent<any> | null;
  readySummaryState: ReadyState | null;
  sendUpdatesMessage: (message: string) => void;
  lastUpdatesMessage: MessageEvent<any> | null;
  readyUpdatesState: ReadyState | null;
}

interface SocketProviderProps {
  children: React.ReactNode;
  url: string;
}

const WebSocketContext = React.createContext<WebSocketContextType>({
  sendBlockMessage: () => {},
  sendSummaryMessage: () => {},
  sendUpdatesMessage: () => {},
  lastBlockMessage: null,
  readyBlockState: null,
  lastSummaryMessage: null,
  readySummaryState: null,
  lastUpdatesMessage: null,
  readyUpdatesState: null,
});

export function WebSocketProvider({ children, url }: SocketProviderProps) {
  const { sendMessage: sendBlockMessage, lastMessage: lastBlockMessage, readyState: readyBlockState } = useWebSocket(url + 'blocks/');
  const { sendMessage: sendSummaryMessage, lastMessage: lastSummaryMessage, readyState: readySummaryState } = useWebSocket(url + 'summary/');
  const { sendMessage: sendUpdatesMessage, lastMessage: lastUpdatesMessage, readyState: readyUpdatesState } = useWebSocket(url + 'daily-updates/');

  const value: WebSocketContextType = useMemo(() => ({
    sendBlockMessage,
    lastBlockMessage,
    readyBlockState,
    sendSummaryMessage,
    lastSummaryMessage,
    readySummaryState,
    sendUpdatesMessage,
    lastUpdatesMessage,
    readyUpdatesState,
  }), [
    sendBlockMessage,
    lastBlockMessage,
    readyBlockState,
    sendSummaryMessage,
    lastSummaryMessage,
    readySummaryState,
    sendUpdatesMessage,
    lastUpdatesMessage,
    readyUpdatesState ]);

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
