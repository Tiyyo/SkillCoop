import { io, Socket } from 'socket.io-client';
import { CHAT_SERVER_URL } from '../../utils/server';

const options = {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
};

export const socket: Socket = io(CHAT_SERVER_URL, options);
