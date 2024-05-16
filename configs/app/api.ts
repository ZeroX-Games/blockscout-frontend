import stripTrailingSlash from 'lib/stripTrailingSlash';

import { getEnvValue } from './utils';

const apiHost = getEnvValue('NEXT_PUBLIC_API_HOST');
const newApiHost = getEnvValue('NEXT_PUBLIC_NEW_API_HOST');
const apiSchema = getEnvValue('NEXT_PUBLIC_API_PROTOCOL') || 'https';
const apiPort = getEnvValue('NEXT_PUBLIC_API_PORT');
const newApiPort = getEnvValue('NEXT_PUBLIC_NEW_API_PORT');
const apiEndpoint = [
  apiSchema || 'https',
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');

const newApiEndpoint = [
  'http',
  '://',
  newApiHost,
  newApiPort && ':' + newApiPort,
].filter(Boolean).join('');

const socketSchema = getEnvValue('NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL') || 'wss';
const socketEndpoint = [
  socketSchema,
  '://',
  apiHost,
  apiPort && ':' + apiPort,
].filter(Boolean).join('');

const newSocketEndpoint = [
  socketSchema,
  '://',
  newApiHost,
  newApiPort && ':' + newApiPort,
].filter(Boolean).join('');

const api = Object.freeze({
  host: apiHost,
  protocol: apiSchema,
  port: apiPort,
  endpoint: apiEndpoint,
  newEndpoint: newApiEndpoint,
  socket: socketEndpoint,
  newSocket: newSocketEndpoint,
  basePath: stripTrailingSlash(getEnvValue('NEXT_PUBLIC_API_BASE_PATH') || ''),
});

export default api;
