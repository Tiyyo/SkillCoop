import { io, Socket } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8083';
const options = {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
};

export const socket: Socket = io(URL as string, options);
